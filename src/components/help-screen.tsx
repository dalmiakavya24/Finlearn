import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, Calculator, Award, Download, Lightbulb, Shield, Sparkles, Lock } from 'lucide-react';

interface HelpScreenProps {
  onClose: () => void;
}

export function HelpScreen({ onClose }: HelpScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl">Welcome to FinLearn</h1>
          </div>
          <Button onClick={onClose} variant="outline">
            Start Learning →
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What is FinLearn?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              FinLearn is a <strong>free, ad-free, privacy-first</strong> financial education platform designed for ages 13-25. 
              Learn practical money skills from absolute basics to advanced investing—everything you need to build a strong 
              financial foundation.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm mb-1">100% Privacy-First</p>
                  <p className="text-xs text-gray-600">No ads. Your data never sold. Everything self-contained.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm mb-1">Complete Curriculum</p>
                  <p className="text-xs text-gray-600">9 progressive modules covering basics to advanced investing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm mb-1">Progress Tracking</p>
                  <p className="text-xs text-gray-600">Your learning progress is saved and synced across devices.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Path</CardTitle>
            <CardDescription>9 progressive modules that build on each other</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm text-gray-700">
              <li><strong>1. Money Basics</strong> – What is money, income vs expenses, needs vs wants</li>
              <li><strong>2. Budgeting & Bills</strong> – Creating budgets, tracking expenses, managing bills</li>
              <li><strong>3. Banking Products</strong> – Savings/current/fixed deposits, interest calculations</li>
              <li><strong>4. Credit & Debt</strong> – Credit scores, credit cards, responsible borrowing</li>
              <li><strong>5. Savings Vehicles</strong> – Emergency funds, savings strategies</li>
              <li><strong>6. Investing Fundamentals</strong> – Risk vs return, mutual funds, SIPs, diversification</li>
              <li><strong>7. Market Mechanics</strong> – How stock markets work, orders, indices, reading news</li>
              <li><strong>8. Advanced Investing</strong> – Stocks, ETFs, portfolio construction, rebalancing</li>
              <li><strong>9. Taxes & Legal Planning</strong> – Tax basics, legal saving instruments, filing returns</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What Each Lesson Includes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm mb-1">Comprehensive Lessons</p>
                  <p className="text-xs text-gray-600">Detailed content broken into digestible sections with key takeaways</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calculator className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm mb-1">Interactive Calculators</p>
                  <p className="text-xs text-gray-600">Real-life examples with adjustable inputs to see outcomes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm mb-1">Knowledge Quizzes</p>
                  <p className="text-xs text-gray-600">5-8 questions per lesson to test understanding (one at a time)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm mb-1">Practical Simulations</p>
                  <p className="text-xs text-gray-600">Hands-on exercises like building budgets and comparing accounts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm mb-1">Downloadable Cheat Sheets</p>
                  <p className="text-xs text-gray-600">One-page summaries of key concepts for quick reference</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm mb-1">Daily Action Tips</p>
                  <p className="text-xs text-gray-600">Practical steps you can implement immediately</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
              "Ask a Scenario" Tool
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <p className="mb-2">
              Need personalized guidance? Use the "Ask a Scenario" tool (available in the menu) to input your 
              situation—age, income type, monthly income, student status—and receive compliant, general educational 
              suggestions tailored to your circumstances.
            </p>
            <p className="text-xs text-gray-600">
              Note: This provides general education, not legal or tax advice. For specific situations, consult licensed professionals.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-orange-600" />
              Important Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Educational Purpose:</strong> FinLearn provides general financial education only, not personalized 
              financial, legal, or tax advice. Every person's situation is unique.
            </p>
            <p>
              <strong>Tax Information:</strong> All tax guidance provided covers lawful tax planning strategies only. 
              We explicitly do not teach or encourage illegal tax evasion. Tax laws vary by jurisdiction and change 
              over time—always verify current regulations.
            </p>
            <p>
              <strong>Professional Advice:</strong> For personalized advice tailored to your specific situation, consult 
              licensed financial advisors, certified tax professionals, or legal experts. This app helps you understand 
              concepts so you can have informed conversations with professionals.
            </p>
            <p>
              <strong>No Investment Recommendations:</strong> This app does not recommend specific investments or 
              securities. All examples are for educational illustration only.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={onClose} size="lg" className="px-8">
            Start Learning Journey
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            Your progress will be saved. You can access your profile anytime from the menu.
          </p>
        </div>
      </div>
    </div>
  );
}
