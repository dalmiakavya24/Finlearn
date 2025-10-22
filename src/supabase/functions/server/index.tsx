import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Create Supabase clients
const getServiceClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
};

const getAnonClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );
};

// Health check endpoint
app.get("/make-server-95f0af75/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-95f0af75/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, phoneNumber } = body;

    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    const supabase = getServiceClient();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, phoneNumber },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error("Signup error creating user:", error);
      return c.json({ error: error.message }, 400);
    }

    // Initialize user progress in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}:profile`, {
      name,
      email,
      phoneNumber: phoneNumber || null,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    });

    await kv.set(`user:${userId}:progress`, {
      completedLessons: [],
      quizScores: {},
      currentModule: 0,
      currentLesson: 0,
      totalScore: 0
    });

    return c.json({ 
      success: true, 
      userId: data.user.id,
      message: "User created successfully" 
    });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Get user profile
app.get("/make-server-95f0af75/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = getAnonClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.error("Authorization error while fetching user profile:", error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userId = user.id;
    const profile = await kv.get(`user:${userId}:profile`);
    const progress = await kv.get(`user:${userId}:progress`);

    return c.json({ 
      success: true,
      profile: profile || {},
      progress: progress || { completedLessons: [], quizScores: {}, currentModule: 0, currentLesson: 0 }
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update progress
app.post("/make-server-95f0af75/progress", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = getAnonClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.error("Authorization error while updating progress:", error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userId = user.id;
    const body = await c.req.json();
    const { lessonId, moduleId, quizScore } = body;

    // Get current progress
    const currentProgress = await kv.get(`user:${userId}:progress`) || {
      completedLessons: [],
      quizScores: {},
      currentModule: 0,
      currentLesson: 0,
      totalScore: 0
    };

    // Update completed lessons
    const lessonKey = `${moduleId}-${lessonId}`;
    if (!currentProgress.completedLessons.includes(lessonKey)) {
      currentProgress.completedLessons.push(lessonKey);
    }

    // Update quiz score
    if (quizScore !== undefined) {
      currentProgress.quizScores[lessonKey] = quizScore;
      
      // Recalculate total score
      const scores = Object.values(currentProgress.quizScores);
      currentProgress.totalScore = scores.length > 0 
        ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length)
        : 0;
    }

    // Save updated progress
    await kv.set(`user:${userId}:progress`, currentProgress);

    // Update last active
    const profile = await kv.get(`user:${userId}:profile`);
    if (profile) {
      profile.lastActive = new Date().toISOString();
      await kv.set(`user:${userId}:profile`, profile);
    }

    return c.json({ 
      success: true,
      progress: currentProgress
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update current position (for tracking where user is)
app.post("/make-server-95f0af75/position", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = getAnonClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userId = user.id;
    const body = await c.req.json();
    const { moduleId, lessonId } = body;

    const currentProgress = await kv.get(`user:${userId}:progress`) || {
      completedLessons: [],
      quizScores: {},
      currentModule: 0,
      currentLesson: 0,
      totalScore: 0
    };

    currentProgress.currentModule = moduleId;
    currentProgress.currentLesson = lessonId;

    await kv.set(`user:${userId}:progress`, currentProgress);

    return c.json({ success: true });
  } catch (error) {
    console.error("Error updating position:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);
