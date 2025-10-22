import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { ChevronRight, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Simulation {
  title: string;
  description: string;
  type: 'budget' | 'savings' | 'investment' | 'credit' | 'loan' | 'compound';
}

interface SimulationComponentProps {
  simulation: Simulation;
  onComplete: () => void;
  onBack: () => void;
}

export function SimulationComponent({ simulation, onComplete, onBack }: SimulationComponentProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-green-900">Simulation Complete!</CardTitle>
            <CardDescription>Great job working through this practical exercise</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onComplete} className="w-full">
              Continue to Summary
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
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
      </div>

      {simulation.type === 'budget' && <BudgetSimulation onComplete={handleComplete} />}
      {simulation.type === 'savings' && <SavingsSimulation onComplete={handleComplete} />}
      {simulation.type === 'investment' && <InvestmentSimulation onComplete={handleComplete} />}
      {simulation.type === 'credit' && <CreditSimulation onComplete={handleComplete} />}
      {simulation.type === 'loan' && <LoanSimulation onComplete={handleComplete} />}
      {simulation.type === 'compound' && <CompoundInterestSimulation onComplete={handleComplete} />}
    </div>
  );
}

function BudgetSimulation({ onComplete }: { onComplete: () => void }) {
  const [income, setIncome] = useState(25000);
  const [expense1, setExpense1] = useState({ name: 'Rent', amount: 8000, type: 'need' as 'need' | 'want' });
  const [expense2, setExpense2] = useState({ name: 'Food', amount: 5000, type: 'need' as 'need' | 'want' });
  const [expense3, setExpense3] = useState({ name: 'Entertainment', amount: 3000, type: 'want' as 'need' | 'want' });

  const totalExpenses = expense1.amount + expense2.amount + expense3.amount;
  const savings = income - totalExpenses;
  const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;
  const needsTotal = (expense1.type === 'need' ? expense1.amount : 0) + 
                     (expense2.type === 'need' ? expense2.amount : 0) + 
                     (expense3.type === 'need' ? expense3.amount : 0);
  const wantsTotal = totalExpenses - needsTotal;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Builder: Needs vs Wants</CardTitle>
        <CardDescription>
          Create a simple 3-item budget and see how your choices impact monthly savings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Monthly Income: ₹{income.toLocaleString()}</Label>
          <Slider
            value={[income]}
            onValueChange={(v) => setIncome(v[0])}
            min={5000}
            max={100000}
            step={1000}
          />
        </div>

        <div className="space-y-4">
          <ExpenseInput
            label="Expense 1"
            expense={expense1}
            onChange={setExpense1}
          />
          <ExpenseInput
            label="Expense 2"
            expense={expense2}
            onChange={setExpense2}
          />
          <ExpenseInput
            label="Expense 3"
            expense={expense3}
            onChange={setExpense3}
          />
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
          <h4 className="mb-4">Budget Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Income:</span>
              <span className="text-green-600">₹{income.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Needs:</span>
              <span className="text-blue-600">₹{needsTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Wants:</span>
              <span className="text-purple-600">₹{wantsTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Expenses:</span>
              <span className="text-red-600">₹{totalExpenses.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span>Monthly Savings:</span>
              <span className={savings >= 0 ? 'text-green-600' : 'text-red-600'}>
                ₹{savings.toLocaleString()} ({savingsRate}%)
              </span>
            </div>
          </div>

          {savings < 0 && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-900">
                You're spending more than you earn! Try reducing wants or finding ways to increase income.
              </p>
            </div>
          )}

          {savings >= income * 0.2 && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-900">
                Great job! You're saving at least 20% of your income. This is a strong foundation.
              </p>
            </div>
          )}
        </div>

        <Button onClick={onComplete} className="w-full">
          Complete Simulation
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

function ExpenseInput({ 
  label, 
  expense, 
  onChange 
}: { 
  label: string; 
  expense: { name: string; amount: number; type: 'need' | 'want' };
  onChange: (expense: { name: string; amount: number; type: 'need' | 'want' }) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 items-end">
      <div>
        <Label className="text-xs">{label} Name</Label>
        <Input
          value={expense.name}
          onChange={(e) => onChange({ ...expense, name: e.target.value })}
          placeholder="e.g., Rent"
        />
      </div>
      <div>
        <Label className="text-xs">Amount (₹)</Label>
        <Input
          type="number"
          value={expense.amount}
          onChange={(e) => onChange({ ...expense, amount: parseInt(e.target.value) || 0 })}
          min={0}
        />
      </div>
      <div>
        <Label className="text-xs">Type</Label>
        <Select value={expense.type} onValueChange={(v: 'need' | 'want') => onChange({ ...expense, type: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="need">Need</SelectItem>
            <SelectItem value="want">Want</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function SavingsSimulation({ onComplete }: { onComplete: () => void }) {
  const [accountType, setAccountType] = useState<'savings' | 'fd'>('savings');
  const [amount, setAmount] = useState(50000);
  const [years, setYears] = useState(2);

  const savingsRate = 3.5;
  const fdRate = 6.5;
  const rate = accountType === 'savings' ? savingsRate : fdRate;
  const finalAmount = amount * Math.pow(1 + rate / 400, 4 * years);
  const interest = finalAmount - amount;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Type Selector</CardTitle>
        <CardDescription>Compare different savings account types and their returns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setAccountType('savings')}
            className={`p-4 rounded-lg border-2 transition-all ${
              accountType === 'savings' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <h4 className="mb-2">Savings Account</h4>
            <p className="text-sm text-gray-600">~3.5% interest</p>
            <p className="text-sm text-gray-600">High liquidity</p>
          </button>
          <button
            onClick={() => setAccountType('fd')}
            className={`p-4 rounded-lg border-2 transition-all ${
              accountType === 'fd' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <h4 className="mb-2">Fixed Deposit</h4>
            <p className="text-sm text-gray-600">~6.5% interest</p>
            <p className="text-sm text-gray-600">Locked for term</p>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Initial Amount: ₹{amount.toLocaleString()}</Label>
            <Slider value={[amount]} onValueChange={(v) => setAmount(v[0])} min={1000} max={500000} step={1000} />
          </div>
          <div>
            <Label>Time Period: {years} years</Label>
            <Slider value={[years]} onValueChange={(v) => setYears(v[0])} min={1} max={10} step={1} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
          <h4 className="mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Results
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Account Type:</span>
              <span>{accountType === 'savings' ? 'Savings Account' : 'Fixed Deposit'}</span>
            </div>
            <div className="flex justify-between">
              <span>Interest Rate:</span>
              <span>{rate}% per year</span>
            </div>
            <div className="flex justify-between">
              <span>Initial Amount:</span>
              <span>₹{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Interest Earned:</span>
              <span className="text-green-600">₹{Math.round(interest).toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span>Final Amount:</span>
              <span className="text-blue-600">₹{Math.round(finalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Button onClick={onComplete} className="w-full">
          Complete Simulation
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

function InvestmentSimulation({ onComplete }: { onComplete: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Simulator</CardTitle>
        <CardDescription>Explore different investment strategies and outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Coming soon: Interactive investment simulation</p>
        <Button onClick={onComplete} className="w-full">
          Complete Simulation
        </Button>
      </CardContent>
    </Card>
  );
}

function CreditSimulation({ onComplete }: { onComplete: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Card Simulator</CardTitle>
        <CardDescription>Learn responsible credit card usage</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Coming soon: Credit card simulation</p>
        <Button onClick={onComplete} className="w-full">
          Complete Simulation
        </Button>
      </CardContent>
    </Card>
  );
}

function LoanSimulation({ onComplete }: { onComplete: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan EMI Calculator</CardTitle>
        <CardDescription>Calculate and compare loan offers</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Coming soon: Loan EMI simulation</p>
        <Button onClick={onComplete} className="w-full">
          Complete Simulation
        </Button>
      </CardContent>
    </Card>
  );
}

function CompoundInterestSimulation({ onComplete }: { onComplete: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compound Interest Explorer</CardTitle>
        <CardDescription>See the power of compound interest over time</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Coming soon: Compound interest simulation</p>
        <Button onClick={onComplete} className="w-full">
          Complete Simulation
        </Button>
      </CardContent>
    </Card>
  );
}
