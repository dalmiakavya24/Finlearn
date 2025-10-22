import { useState, useEffect } from 'react';
import { AuthScreen } from './components/auth-screen';
import { Roadmap } from './components/roadmap';
import { LessonViewer } from './components/lesson-viewer';
import { ProfileDashboard } from './components/profile-dashboard';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Sparkles, User, Shield, Menu, Lightbulb, Calculator } from 'lucide-react';
import { modules } from './data/modules';
import { ScenarioTool } from './components/scenario-tool';
import { PracticeCalculators } from './components/practice-calculators';
import { createClient } from './utils/supabase/client';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';

type ViewState = 'roadmap' | 'lesson' | 'profile' | 'scenario' | 'practice';

interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  currentModule: number;
  currentLesson: number;
  totalScore: number;
}

interface UserProfile {
  name: string;
  email: string;
  phoneNumber?: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>('roadmap');
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedLessons: [],
    quizScores: {},
    currentModule: 0,
    currentLesson: 0,
    totalScore: 0
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: ''
  });

  // Check for existing session on load
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const supabase = createClient();
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session && session.user) {
        setUserId(session.user.id);
        setAccessToken(session.access_token);
        setIsAuthenticated(true);
        await fetchUserData(session.user.id, session.access_token);
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async (uid: string, token: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-95f0af75/profile`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.profile);
        setUserProgress(data.progress);
        setSelectedModule(data.progress.currentModule || 0);
        setSelectedLesson(data.progress.currentLesson || 0);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleAuthSuccess = async (uid: string, token: string) => {
    setUserId(uid);
    setAccessToken(token);
    setIsAuthenticated(true);
    await fetchUserData(uid, token);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserId(null);
    setAccessToken(null);
    setViewState('roadmap');
    setUserProgress({
      completedLessons: [],
      quizScores: {},
      currentModule: 0,
      currentLesson: 0,
      totalScore: 0
    });
    toast.success('Signed out successfully');
  };

  const handleSelectLesson = async (moduleId: number, lessonId: number) => {
    setSelectedModule(moduleId);
    setSelectedLesson(lessonId);
    setViewState('lesson');

    // Update current position on server
    if (accessToken) {
      try {
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-95f0af75/position`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ moduleId, lessonId })
          }
        );
      } catch (error) {
        console.error('Error updating position:', error);
      }
    }
  };

  const handleLessonComplete = async (quizScore: number) => {
    const lessonKey = `${selectedModule}-${selectedLesson}`;
    
    // Update local state
    const updatedProgress = {
      ...userProgress,
      completedLessons: userProgress.completedLessons.includes(lessonKey)
        ? userProgress.completedLessons
        : [...userProgress.completedLessons, lessonKey],
      quizScores: {
        ...userProgress.quizScores,
        [lessonKey]: quizScore
      }
    };

    // Recalculate total score
    const scores = Object.values(updatedProgress.quizScores);
    updatedProgress.totalScore = scores.length > 0
      ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length)
      : 0;

    setUserProgress(updatedProgress);

    // Save to server
    if (accessToken) {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-95f0af75/progress`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              lessonId: selectedLesson,
              moduleId: selectedModule,
              quizScore
            })
          }
        );

        if (response.ok) {
          toast.success('Progress saved!');
        }
      } catch (error) {
        console.error('Error saving progress:', error);
        toast.error('Failed to save progress');
      }
    }

    setViewState('roadmap');
  };

  const getTotalLessons = () => {
    return modules.reduce((sum, module) => sum + module.lessons.length, 0);
  };

  if (isLoading) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading FinLearn...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
        <Toaster />
      </>
    );
  }

  if (viewState === 'profile') {
    return (
      <>
        <ProfileDashboard
          profile={userProfile}
          progress={userProgress}
          totalLessons={getTotalLessons()}
          onSignOut={handleSignOut}
          onClose={() => setViewState('roadmap')}
        />
        <Toaster />
      </>
    );
  }

  if (viewState === 'scenario') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <span className="text-blue-900">FinLearn</span>
            </div>
            <Button onClick={() => setViewState('roadmap')} variant="ghost" size="sm">
              ← Back to Learning
            </Button>
          </div>
        </div>
        <div className="p-4 pt-8">
          <ScenarioTool />
        </div>
        <Toaster />
      </div>
    );
  }

  if (viewState === 'practice') {
    return (
      <>
        <PracticeCalculators onClose={() => setViewState('roadmap')} />
        <Toaster />
      </>
    );
  }

  if (viewState === 'lesson') {
    const module = modules[selectedModule];
    const lesson = module?.lessons[selectedLesson];

    if (!lesson) {
      setViewState('roadmap');
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <span className="text-blue-900">FinLearn</span>
            </div>
            <Button onClick={() => setViewState('profile')} variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
        <div className="pb-8">
          <LessonViewer
            lesson={lesson}
            onComplete={handleLessonComplete}
            onBack={() => setViewState('roadmap')}
          />
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl">FinLearn</h1>
              <p className="text-xs text-gray-600">Your Financial Education Journey</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary">
              {userProgress.completedLessons.length} / {getTotalLessons()} lessons
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setViewState('profile')}>
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewState('practice')}>
                  <Calculator className="w-4 h-4 mr-2" />
                  Practice Tools
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewState('scenario')}>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Ask a Scenario
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <Shield className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-8 pt-4">
        <Roadmap
          modules={modules}
          completedLessons={userProgress.completedLessons}
          currentModule={selectedModule}
          currentLesson={selectedLesson}
          onSelectLesson={handleSelectLesson}
        />
      </div>

      {/* Footer Disclaimer */}
      <div className="bg-white/80 backdrop-blur-sm border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4" />
            <span>Privacy-First Financial Education</span>
          </div>
          <p>
            <strong>Ethical Disclaimer:</strong> FinLearn provides general financial education only, 
            not personalized financial, legal, or tax advice. All tax guidance provided is for educational 
            purposes and covers lawful tax planning strategies only. For specific advice tailored to your 
            situation, consult licensed financial advisors, tax professionals, or legal experts.
          </p>
          <p className="mt-2 text-xs">
            We never sell your data. No ads. No tracking. Your learning is private.
          </p>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
