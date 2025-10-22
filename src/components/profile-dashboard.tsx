import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Award, BookOpen, TrendingUp, LogOut, User } from 'lucide-react';

interface ProfileDashboardProps {
  profile: {
    name: string;
    email: string;
  };
  progress: {
    completedLessons: string[];
    quizScores: Record<string, number>;
    totalScore: number;
  };
  totalLessons: number;
  onSignOut: () => void;
  onClose: () => void;
}

export function ProfileDashboard({ profile, progress, totalLessons, onSignOut, onClose }: ProfileDashboardProps) {
  const completionRate = totalLessons > 0 
    ? Math.round((progress.completedLessons.length / totalLessons) * 100)
    : 0;

  const initials = profile.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const averageScore = progress.totalScore || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button onClick={onClose} variant="ghost">
            ← Back to Learning
          </Button>
          <Button onClick={onSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-blue-500 text-white text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-1">{profile.name}</CardTitle>
                <CardDescription>{profile.email}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {progress.completedLessons.length} of {totalLessons} lessons completed
                    </span>
                  </div>
                  <Progress value={completionRate} className="h-2" />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Lessons Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl">{progress.completedLessons.length}</div>
                  <div className="text-xs text-gray-500">of {totalLessons}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl">{completionRate}%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Average Quiz Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl">{averageScore}%</div>
                  <div className="text-xs text-gray-500">
                    {Object.keys(progress.quizScores).length} quizzes
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quiz Scores</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(progress.quizScores).length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No quizzes taken yet. Complete a lesson to take your first quiz!
              </p>
            ) : (
              <div className="space-y-2">
                {Object.entries(progress.quizScores)
                  .slice(-5)
                  .reverse()
                  .map(([lessonKey, score]) => (
                    <div
                      key={lessonKey}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm">Lesson {lessonKey.replace('-', ' - ')}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={score} className="w-20 h-2" />
                        <span className={`text-sm ${
                          score >= 80 ? 'text-green-600' : score >= 60 ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                          {score}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600" />
              Keep Going!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              {completionRate === 0 && "Start your financial education journey today! Complete your first lesson."}
              {completionRate > 0 && completionRate < 25 && "Great start! Keep learning to build strong financial foundations."}
              {completionRate >= 25 && completionRate < 50 && "You're making excellent progress! Keep up the momentum."}
              {completionRate >= 50 && completionRate < 75 && "Over halfway there! You're building real financial knowledge."}
              {completionRate >= 75 && completionRate < 100 && "Almost there! Finish strong and master all the concepts."}
              {completionRate === 100 && "🎉 Congratulations! You've completed the entire curriculum. Consider reviewing topics to reinforce your knowledge."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
