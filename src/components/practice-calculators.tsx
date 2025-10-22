import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Calculator, 
  TrendingUp, 
  Wallet, 
  Home, 
  PiggyBank,
  ArrowLeft 
} from 'lucide-react';
import { Badge } from './ui/badge';

interface PracticeCalculatorsProps {
  onClose: () => void;
}

export function PracticeCalculators({ onClose }: PracticeCalculatorsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            <span className="text-blue-900">Practice Tools</span>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 pt-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl mb-2">Financial Calculators</h1>
          <p className="text-gray-600">Practice and experiment with different financial scenarios</p>
        </div>

        <Tabs defaultValue="simple-interest" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="simple-interest" className="flex flex-col gap-1 py-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Simple Interest</span>
            </TabsTrigger>
            <TabsTrigger value="compound-interest" className="flex flex-col gap-1 py-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Compound Interest</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex flex-col gap-1 py-2">
              <Wallet className="w-4 h-4" />
              <span className="text-xs">Budget Builder</span>
            </TabsTrigger>
            <TabsTrigger value="emi" className="flex flex-col gap-1 py-2">
              <Home className="w-4 h-4" />
              <span className="text-xs">EMI</span>
            </TabsTrigger>
            <TabsTrigger value="sip" className="flex flex-col gap-1 py-2">
              <PiggyBank className="w-4 h-4" />
              <span className="text-xs">SIP</span>
            </TabsTrigger>
          </TabsList>

          {/* Simple Interest Calculator */}
          <TabsContent value="simple-interest">
            <SimpleInterestCalculator />
          </TabsContent>

          {/* Compound Interest Calculator */}
          <TabsContent value="compound-interest">
            <CompoundInterestCalculator />
          </TabsContent>

          {/* Budget Builder */}
          <TabsContent value="budget">
            <BudgetBuilder />
          </TabsContent>

          {/* EMI Calculator */}
          <TabsContent value="emi">
            <EMICalculator />
          </TabsContent>

          {/* SIP Calculator */}
          <TabsContent value="sip">
            <SIPCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Simple Interest Calculator Component
function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('7');
  const [time, setTime] = useState('3');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    
    if (p && r && t) {
      const interest = (p * r * t) / 100;
      setResult(interest);
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Simple Interest Calculator
        </CardTitle>
        <CardDescription>
          Calculate interest earned on a fixed principal amount
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="si-principal">Principal Amount (₹)</Label>
            <Input
              id="si-principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter principal amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="si-rate">Annual Interest Rate (%)</Label>
            <Input
              id="si-rate"
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="si-time">Time Period (Years)</Label>
            <Input
              id="si-time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time period"
            />
          </div>

          <Button onClick={calculate} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate
          </Button>
        </div>

        {result !== null && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Principal Amount:</span>
              <span className="text-lg">₹{parseFloat(principal).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Interest Rate:</span>
              <span className="text-lg">{rate}% per year</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Time Period:</span>
              <span className="text-lg">{time} years</span>
            </div>
            <div className="border-t border-blue-300 pt-3 flex items-center justify-between">
              <span className="text-blue-900">Simple Interest:</span>
              <span className="text-2xl text-blue-600">₹{result.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-900">Total Amount:</span>
              <span className="text-2xl text-green-600">₹{(parseFloat(principal) + result).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Formula: SI = (P × R × T) / 100
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compound Interest Calculator Component
function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('7');
  const [time, setTime] = useState('3');
  const [frequency, setFrequency] = useState('1');
  const [result, setResult] = useState<{ amount: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);
    
    if (p && r && t && n) {
      const amount = p * Math.pow((1 + r / n), n * t);
      const interest = amount - p;
      setResult({ amount, interest });
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Compound Interest Calculator
        </CardTitle>
        <CardDescription>
          Calculate interest with compounding effect
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="ci-principal">Principal Amount (₹)</Label>
            <Input
              id="ci-principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter principal amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ci-rate">Annual Interest Rate (%)</Label>
            <Input
              id="ci-rate"
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ci-time">Time Period (Years)</Label>
            <Input
              id="ci-time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time period"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ci-frequency">Compounding Frequency (per year)</Label>
            <select
              id="ci-frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="1">Annually (1)</option>
              <option value="2">Semi-Annually (2)</option>
              <option value="4">Quarterly (4)</option>
              <option value="12">Monthly (12)</option>
              <option value="365">Daily (365)</option>
            </select>
          </div>

          <Button onClick={calculate} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate
          </Button>
        </div>

        {result !== null && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Principal Amount:</span>
              <span className="text-lg">₹{parseFloat(principal).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Interest Rate:</span>
              <span className="text-lg">{rate}% per year</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Time Period:</span>
              <span className="text-lg">{time} years</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Compounding:</span>
              <span className="text-lg">{frequency === '1' ? 'Annually' : frequency === '2' ? 'Semi-Annually' : frequency === '4' ? 'Quarterly' : frequency === '12' ? 'Monthly' : 'Daily'}</span>
            </div>
            <div className="border-t border-purple-300 pt-3 flex items-center justify-between">
              <span className="text-purple-900">Compound Interest:</span>
              <span className="text-2xl text-purple-600">₹{result.interest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-900">Total Amount:</span>
              <span className="text-2xl text-green-600">₹{result.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Formula: A = P(1 + r/n)^(nt)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Budget Builder Component
function BudgetBuilder() {
  const [income, setIncome] = useState('50000');
  const [needs, setNeeds] = useState('');
  const [wants, setWants] = useState('');
  const [savings, setSavings] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);

  const calculateSuggestion = () => {
    const totalIncome = parseFloat(income);
    if (totalIncome) {
      const suggested50 = totalIncome * 0.5;
      const suggested30 = totalIncome * 0.3;
      const suggested20 = totalIncome * 0.2;
      
      setNeeds(suggested50.toString());
      setWants(suggested30.toString());
      setSavings(suggested20.toString());
      setShowSuggestion(true);
    }
  };

  const totalBudget = parseFloat(needs || '0') + parseFloat(wants || '0') + parseFloat(savings || '0');
  const incomeValue = parseFloat(income || '0');
  const remaining = incomeValue - totalBudget;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-green-600" />
          Budget Builder (50/30/20 Rule)
        </CardTitle>
        <CardDescription>
          Plan your monthly budget using the 50/30/20 rule
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-2">The 50/30/20 Rule:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>50%</strong> for Needs (rent, groceries, utilities, EMIs)</li>
            <li>• <strong>30%</strong> for Wants (entertainment, dining out, hobbies)</li>
            <li>• <strong>20%</strong> for Savings & Investments</li>
          </ul>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget-income">Monthly Income (₹)</Label>
            <Input
              id="budget-income"
              type="number"
              value={income}
              onChange={(e) => {
                setIncome(e.target.value);
                setShowSuggestion(false);
              }}
              placeholder="Enter monthly income"
            />
          </div>

          <Button onClick={calculateSuggestion} variant="outline" className="w-full">
            Get 50/30/20 Suggestion
          </Button>

          <div className="space-y-2">
            <Label htmlFor="budget-needs">Needs - 50% (₹)</Label>
            <Input
              id="budget-needs"
              type="number"
              value={needs}
              onChange={(e) => setNeeds(e.target.value)}
              placeholder="Rent, groceries, utilities, EMIs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-wants">Wants - 30% (₹)</Label>
            <Input
              id="budget-wants"
              type="number"
              value={wants}
              onChange={(e) => setWants(e.target.value)}
              placeholder="Entertainment, dining, hobbies"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-savings">Savings & Investments - 20% (₹)</Label>
            <Input
              id="budget-savings"
              type="number"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              placeholder="Savings, investments, emergency fund"
            />
          </div>
        </div>

        {income && needs && wants && savings && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Monthly Income:</span>
              <span className="text-lg">₹{incomeValue.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-green-300 pt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Needs:</span>
                <div className="text-right">
                  <span className="text-lg">₹{parseFloat(needs).toLocaleString('en-IN')}</span>
                  <Badge variant="secondary" className="ml-2">
                    {((parseFloat(needs) / incomeValue) * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Wants:</span>
                <div className="text-right">
                  <span className="text-lg">₹{parseFloat(wants).toLocaleString('en-IN')}</span>
                  <Badge variant="secondary" className="ml-2">
                    {((parseFloat(wants) / incomeValue) * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Savings:</span>
                <div className="text-right">
                  <span className="text-lg">₹{parseFloat(savings).toLocaleString('en-IN')}</span>
                  <Badge variant="secondary" className="ml-2">
                    {((parseFloat(savings) / incomeValue) * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
            </div>
            <div className="border-t border-green-400 pt-3 flex items-center justify-between">
              <span className="text-green-900">Remaining:</span>
              <span className={`text-2xl ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{remaining.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </span>
            </div>
            {remaining < 0 && (
              <p className="text-sm text-red-600">
                ⚠️ Budget exceeds income! Reduce expenses by ₹{Math.abs(remaining).toLocaleString('en-IN')}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// EMI Calculator Component
function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState('1000000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [result, setResult] = useState<{ emi: number; totalInterest: number; totalAmount: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const n = parseFloat(tenure) * 12; // Tenure in months
    
    if (p && r && n) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emi * n;
      const totalInterest = totalAmount - p;
      
      setResult({ emi, totalInterest, totalAmount });
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5 text-orange-600" />
          EMI Calculator
        </CardTitle>
        <CardDescription>
          Calculate Equated Monthly Installment for loans
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="emi-loan">Loan Amount (₹)</Label>
            <Input
              id="emi-loan"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emi-rate">Annual Interest Rate (%)</Label>
            <Input
              id="emi-rate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emi-tenure">Loan Tenure (Years)</Label>
            <Input
              id="emi-tenure"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter tenure in years"
            />
          </div>

          <Button onClick={calculate} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate EMI
          </Button>
        </div>

        {result !== null && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Loan Amount:</span>
              <span className="text-lg">₹{parseFloat(loanAmount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Interest Rate:</span>
              <span className="text-lg">{interestRate}% per year</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Tenure:</span>
              <span className="text-lg">{tenure} years ({parseFloat(tenure) * 12} months)</span>
            </div>
            <div className="border-t border-orange-300 pt-3 flex items-center justify-between">
              <span className="text-orange-900">Monthly EMI:</span>
              <span className="text-2xl text-orange-600">₹{result.emi.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Total Interest:</span>
              <span className="text-lg text-red-600">₹{result.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-orange-900">Total Amount Payable:</span>
              <span className="text-2xl text-blue-600">₹{result.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="bg-white rounded p-3 mt-4">
              <p className="text-sm text-gray-600">
                <strong>Principal:</strong> {((parseFloat(loanAmount) / result.totalAmount) * 100).toFixed(1)}% | 
                <strong> Interest:</strong> {((result.totalInterest / result.totalAmount) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// SIP Calculator Component
function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('5000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [timePeriod, setTimePeriod] = useState('10');
  const [result, setResult] = useState<{ maturityAmount: number; invested: number; returns: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 12 / 100; // Monthly return rate
    const n = parseFloat(timePeriod) * 12; // Tenure in months
    
    if (p && r && n) {
      // SIP Future Value Formula: FV = P × [(1 + r)^n - 1] / r × (1 + r)
      const maturityAmount = p * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      const invested = p * n;
      const returns = maturityAmount - invested;
      
      setResult({ maturityAmount, invested, returns });
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PiggyBank className="w-5 h-5 text-pink-600" />
          SIP Calculator
        </CardTitle>
        <CardDescription>
          Calculate returns on Systematic Investment Plan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="sip-monthly">Monthly Investment (₹)</Label>
            <Input
              id="sip-monthly"
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="Enter monthly investment"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sip-return">Expected Annual Return (%)</Label>
            <Input
              id="sip-return"
              type="number"
              step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              placeholder="Enter expected return"
            />
            <p className="text-xs text-gray-500">
              Typical equity mutual funds: 10-15% | Debt funds: 6-8%
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sip-period">Investment Period (Years)</Label>
            <Input
              id="sip-period"
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              placeholder="Enter time period"
            />
          </div>

          <Button onClick={calculate} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Returns
          </Button>
        </div>

        {result !== null && (
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Monthly Investment:</span>
              <span className="text-lg">₹{parseFloat(monthlyInvestment).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Expected Return:</span>
              <span className="text-lg">{expectedReturn}% per year</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Time Period:</span>
              <span className="text-lg">{timePeriod} years ({parseFloat(timePeriod) * 12} months)</span>
            </div>
            <div className="border-t border-pink-300 pt-3 flex items-center justify-between">
              <span className="text-gray-700">Total Invested:</span>
              <span className="text-lg">₹{result.invested.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-pink-900">Estimated Returns:</span>
              <span className="text-2xl text-green-600">₹{result.returns.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-pink-900">Maturity Amount:</span>
              <span className="text-3xl text-blue-600">₹{result.maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="bg-white rounded p-3 mt-4">
              <p className="text-sm text-gray-600">
                <strong>Investment:</strong> {((result.invested / result.maturityAmount) * 100).toFixed(1)}% | 
                <strong> Returns:</strong> {((result.returns / result.maturityAmount) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 mt-2">
                💡 Returns are estimates. Actual returns may vary based on market performance.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
