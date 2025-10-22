import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  Lightbulb,
  Calculator,
  PlayCircle,
  Award
} from "lucide-react";
import { Lesson } from "../data/modules";
import { QuizComponent } from "./quiz-component";
import { SimulationComponent } from "./simulation-component";

interface LessonViewerProps {
  lesson: Lesson;
  onComplete: (quizScore: number) => void;
  onBack: () => void;
}

type ViewState = 'lesson' | 'calculator' | 'quiz' | 'simulation' | 'complete';

export function LessonViewer({ lesson, onComplete, onBack }: LessonViewerProps) {
  const [viewState, setViewState] = useState<ViewState>('lesson');
  const [currentSection, setCurrentSection] = useState(0);
  const [calculatorInputs, setCalculatorInputs] = useState<number[]>(
    lesson.realLifeExample.inputs.map(input => input.defaultValue)
  );
  const [quizScore, setQuizScore] = useState(0);

  const totalSections = lesson.content.sections.length;
  const progress = ((currentSection + 1) / totalSections) * 100;

  const calculatedResults = lesson.realLifeExample.calculate(calculatorInputs);

  const handleNextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setViewState('calculator');
    }
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setViewState('simulation');
  };

  const handleSimulationComplete = () => {
    setViewState('complete');
  };

  const handleFinalComplete = () => {
    onComplete(quizScore);
  };

  const downloadCheatSheet = () => {
    const content = `${lesson.cheatSheet.title}\n\n${lesson.cheatSheet.points.map((p, i) => `${i + 1}. ${p}`).join('\n\n')}\n\nDaily Tip: ${lesson.dailyTip}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lesson.title.replace(/\s+/g, '_')}_CheatSheet.txt`;
    a.click();
  };

  if (viewState === 'quiz') {
    return (
      <QuizComponent
        questions={lesson.quiz}
        onComplete={handleQuizComplete}
        onBack={() => setViewState('calculator')}
      />
    );
  }

  if (viewState === 'simulation') {
    return (
      <SimulationComponent
        simulation={lesson.simulation}
        onComplete={handleSimulationComplete}
        onBack={() => setViewState('quiz')}
      />
    );
  }

  if (viewState === 'complete') {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-green-900">Lesson Complete!</CardTitle>
            <CardDescription>
              You scored {quizScore}% on the quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm mb-1">Daily Action Tip</p>
                  <p className="text-gray-700">{lesson.dailyTip}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Key Takeaways
              </h4>
              <ul className="space-y-2">
                {lesson.cheatSheet.points.map((point, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={downloadCheatSheet} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Cheat Sheet
            </Button>

            <div className="flex gap-3">
              <Button onClick={onBack} variant="outline" className="flex-1">
                Back to Roadmap
              </Button>
              <Button onClick={handleFinalComplete} className="flex-1">
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="ghost">
          ← Back
        </Button>
        <Badge variant="secondary">{lesson.duration}</Badge>
      </div>

      <div className="space-y-2">
        <h2 className="text-blue-900">{lesson.title}</h2>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-600">
          {viewState === 'lesson' 
            ? `Section ${currentSection + 1} of ${totalSections}` 
            : viewState === 'calculator' 
            ? 'Interactive Calculator' 
            : 'Quiz Time'}
        </p>
      </div>

      {viewState === 'lesson' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm">Lesson Content</span>
            </div>
            {currentSection === 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-gray-700">{lesson.content.intro}</p>
              </div>
            )}
            <CardTitle>{lesson.content.sections[currentSection].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {lesson.content.sections[currentSection].content}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
              <h4 className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                Key Points
              </h4>
              <ul className="space-y-2">
                {lesson.content.sections[currentSection].keyPoints.map((point, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-purple-600 flex-shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {currentSection === totalSections - 1 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm mb-2">Summary</p>
                <p className="text-gray-700">{lesson.content.summary}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <Button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                variant="outline"
                disabled={currentSection === 0}
              >
                Previous
              </Button>
              <Button onClick={handleNextSection}>
                {currentSection === totalSections - 1 ? 'Continue to Examples' : 'Next Section'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {viewState === 'calculator' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Calculator className="w-5 h-5" />
                <span className="text-sm">Real-Life Example</span>
              </div>
              <CardTitle>Interactive Calculator</CardTitle>
              <CardDescription>{lesson.realLifeExample.scenario}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {lesson.realLifeExample.inputs.map((input, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">{input.label}</Label>
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-lg">
                        {input.unit}{calculatorInputs[idx].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      value={[calculatorInputs[idx]]}
                      onValueChange={(value) => {
                        const newInputs = [...calculatorInputs];
                        newInputs[idx] = value[0];
                        setCalculatorInputs(newInputs);
                      }}
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{input.unit}{input.min.toLocaleString()}</span>
                      <span>{input.unit}{input.max.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                <h4 className="mb-4">Results</h4>
                <div className="space-y-3">
                  {calculatedResults.map((result, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-green-200 last:border-0">
                      <span className="text-sm text-gray-700">{result.label}</span>
                      <span className="text-blue-900">{result.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  💡 <strong>Insight:</strong> {lesson.infographic}
                </p>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setViewState('lesson')} variant="outline" className="flex-1">
                  Review Lesson
                </Button>
                <Button onClick={() => setViewState('quiz')} className="flex-1">
                  Take Quiz
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
