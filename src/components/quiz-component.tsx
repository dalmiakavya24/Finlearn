import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { CheckCircle2, XCircle, ChevronRight, Award } from 'lucide-react';
import { QuizQuestion } from '../data/modules';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

type QuestionState = 'unanswered' | 'correct' | 'incorrect';

export function QuizComponent({ questions, onComplete, onBack }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionState, setQuestionState] = useState<QuestionState>('unanswered');
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const finalScore = Math.round((correctCount / questions.length) * 100);

  const handleAnswerSelect = (answerIndex: number) => {
    if (questionState !== 'unanswered') return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setQuestionState(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setQuestionState('unanswered');
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-blue-900">Quiz Complete!</CardTitle>
            <CardDescription>
              You answered {correctCount} out of {questions.length} questions correctly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-5xl mb-2">{finalScore}%</div>
              <p className="text-gray-600">
                {finalScore >= 80 ? '🎉 Excellent work!' : finalScore >= 60 ? '👍 Good job!' : '💪 Keep learning!'}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-green-600 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{correctCount}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Correct</p>
                </div>
                <div>
                  <div className="text-red-600 flex items-center justify-center gap-1">
                    <XCircle className="w-5 h-5" />
                    <span>{questions.length - correctCount}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Incorrect</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={onBack} variant="outline" className="flex-1">
                Review Lesson
              </Button>
              <Button onClick={() => onComplete(finalScore)} className="flex-1">
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="ghost">
          ← Back
        </Button>
        <span className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showCorrect = questionState !== 'unanswered' && isCorrect;
            const showIncorrect = questionState !== 'unanswered' && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={questionState !== 'unanswered'}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } ${questionState !== 'unanswered' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  {showIncorrect && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                </div>
              </button>
            );
          })}

          {questionState !== 'unanswered' && (
            <div className={`mt-4 p-4 rounded-lg ${
              questionState === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`mb-2 flex items-center gap-2 ${
                questionState === 'correct' ? 'text-green-900' : 'text-red-900'
              }`}>
                {questionState === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    <span>Incorrect</span>
                  </>
                )}
              </p>
              <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}

          {questionState !== 'unanswered' && (
            <Button onClick={handleNext} className="w-full mt-4">
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
