import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Lock, CheckCircle2, Circle, Play } from 'lucide-react';
import { Module } from '../data/modules';
import * as Icons from 'lucide-react';

interface RoadmapProps {
  modules: Module[];
  completedLessons: string[];
  currentModule: number;
  currentLesson: number;
  onSelectLesson: (moduleId: number, lessonId: number) => void;
}

export function Roadmap({ modules, completedLessons, currentModule, currentLesson, onSelectLesson }: RoadmapProps) {
  const getModuleProgress = (moduleId: number) => {
    const module = modules[moduleId];
    if (!module || module.lessons.length === 0) return 0;
    
    const completed = module.lessons.filter((_, lessonIdx) => 
      completedLessons.includes(`${moduleId}-${lessonIdx}`)
    ).length;
    
    return (completed / module.lessons.length) * 100;
  };

  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 0) return true;
    const previousModuleProgress = getModuleProgress(moduleId - 1);
    return previousModuleProgress === 100;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4">
      <div className="text-center space-y-2">
        <h2 className="text-blue-900">Your Financial Education Roadmap</h2>
        <p className="text-gray-600">
          Progress through 9 comprehensive modules from basics to advanced investing
        </p>
      </div>

      <div className="space-y-6">
        {modules.map((module, moduleIdx) => {
          const progress = getModuleProgress(moduleIdx);
          const isUnlocked = isModuleUnlocked(moduleIdx);
          const isActive = moduleIdx === currentModule;
          const IconComponent = (Icons as any)[module.icon] || Icons.BookOpen;

          return (
            <Card 
              key={module.id} 
              className={`${
                isActive ? 'border-blue-500 shadow-lg' : 'border-gray-200'
              } ${!isUnlocked ? 'opacity-60' : ''}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-14 h-14 rounded-full ${module.color} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-gray-900">{module.title}</CardTitle>
                        {!isUnlocked && <Lock className="w-4 h-4 text-gray-400" />}
                        {progress === 100 && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={progress === 100 ? 'default' : 'secondary'}>
                    {Math.round(progress)}%
                  </Badge>
                </div>
                {isUnlocked && <Progress value={progress} className="h-2 mt-4" />}
              </CardHeader>

              {isUnlocked && module.lessons.length > 0 && (
                <CardContent>
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIdx) => {
                      const lessonKey = `${moduleIdx}-${lessonIdx}`;
                      const isCompleted = completedLessons.includes(lessonKey);
                      const isCurrent = moduleIdx === currentModule && lessonIdx === currentLesson;

                      return (
                        <button
                          key={lessonIdx}
                          onClick={() => onSelectLesson(moduleIdx, lessonIdx)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            isCurrent
                              ? 'border-blue-500 bg-blue-50'
                              : isCompleted
                              ? 'border-green-200 bg-green-50 hover:bg-green-100'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : isCurrent ? (
                              <Play className="w-5 h-5 text-blue-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm">{lesson.title}</div>
                            <div className="text-xs text-gray-500">{lesson.duration}</div>
                          </div>
                        </button>
                      );
                    })}

                    {module.lessons.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        Coming soon: Lessons for this module are being prepared
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
