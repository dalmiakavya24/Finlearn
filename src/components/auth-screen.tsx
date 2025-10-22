import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Sparkles, Shield, BookOpen, TrendingUp } from 'lucide-react';
import { createClient } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

interface AuthScreenProps {
  onAuthSuccess: (userId: string, accessToken: string) => void;
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (signupData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-95f0af75/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          email: signupData.email,
          password: signupData.password,
          name: signupData.name,
          phoneNumber: signupData.phone || undefined
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.error || 'Signup failed');
        setIsLoading(false);
        return;
      }
      
      // Now sign in
      const supabase = createClient();
      const { data: sessionData, error } = await supabase.auth.signInWithPassword({
        email: signupData.email,
        password: signupData.password
      });
      
      if (error || !sessionData.session) {
        toast.error('Signup successful but login failed. Please try logging in.');
        setIsLoading(false);
        return;
      }
      
      toast.success('Welcome to FinLearn!');
      onAuthSuccess(sessionData.user.id, sessionData.session.access_token);
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Network error during signup');
    }
    
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
      });
      
      if (error || !data.session) {
        toast.error(error?.message || 'Login failed');
        setIsLoading(false);
        return;
      }
      
      toast.success('Welcome back!');
      onAuthSuccess(data.user.id, data.session.access_token);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error during login');
    }
    
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl">FinLearn</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Free, ad-free, privacy-first financial education for ages 13–25. 
            Master money skills from basics to advanced investing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Benefits */}
          <div className="space-y-4">
            <Card className="border-blue-200 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <CardTitle>100% Privacy-First</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• No ads, ever</li>
                  <li>• Your data never sold or shared</li>
                  <li>• No external links required</li>
                  <li>• Everything self-contained</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  <CardTitle>Complete Curriculum</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 9 progressive learning modules</li>
                  <li>• Interactive simulations & calculators</li>
                  <li>• Safe mock investing practice</li>
                  <li>• Downloadable cheat sheets</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  <CardTitle>Real Financial Skills</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Budgeting & expense tracking</li>
                  <li>• Banking products explained</li>
                  <li>• Credit scores & responsible borrowing</li>
                  <li>• Investing from basics to advanced</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right: Auth Forms */}
          <Card className="bg-white/90 backdrop-blur shadow-xl">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Create an account or sign in to track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signup">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <Label htmlFor="signup-name">Full Name *</Label>
                      <Input
                        id="signup-name"
                        required
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-email">Email *</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        required
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-phone">Phone Number (Optional)</Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-password">Password *</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        required
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        placeholder="Min 6 characters"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-confirm">Confirm Password *</Label>
                      <Input
                        id="signup-confirm"
                        type="password"
                        required
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        placeholder="Re-enter password"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        
                      </div>
                    </div>

            
                  </form>
                </TabsContent>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="Enter your password"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                      
                      </div>
                    </div>

                  
                  </form>
                </TabsContent>
              </Tabs>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By signing up, you agree to our privacy-first approach. We never sell your data or show ads.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            <Shield className="inline w-4 h-4 mr-1" />
            Ethical Disclaimer: FinLearn provides general financial education only, not personalized financial, legal, or tax advice.
            Consult licensed professionals for your specific situation.
          </p>
        </div>
      </div>
    </div>
  );
}
