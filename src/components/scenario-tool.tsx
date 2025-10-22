import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Lightbulb, AlertTriangle } from 'lucide-react';

export function ScenarioTool() {
  const [age, setAge] = useState('25');
  const [incomeType, setIncomeType] = useState('student');
  const [monthlyIncome, setMonthlyIncome] = useState('15000');
  const [country, setCountry] = useState('india');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const generateSuggestions = () => {
    setShowSuggestions(true);
  };

  const getSuggestions = () => {
    const ageNum = parseInt(age);
    const income = parseInt(monthlyIncome);
    const suggestions: string[] = [];

    // Age-based suggestions
    if (ageNum < 25) {
      suggestions.push("Build emergency fund first—even ₹10,000 provides significant cushion at this stage");
      suggestions.push("Start SIP with small amounts (₹500-1,000) to benefit from decades of compounding");
      suggestions.push("Focus on skill development and increasing earning potential");
    } else if (ageNum < 35) {
      suggestions.push("Aggressive allocation: 70-80% equity, rest in debt and gold");
      suggestions.push("Max out tax-saving options like ELSS for 80C deduction");
      suggestions.push("Build 6-month emergency fund in liquid funds");
    } else if (ageNum < 50) {
      suggestions.push("Moderate allocation: 60-70% equity, increase debt allocation gradually");
      suggestions.push("Ensure adequate health and term life insurance");
      suggestions.push("Plan for children's education and major life goals");
    } else {
      suggestions.push("Conservative allocation: Reduce equity to 40-50%, focus on capital preservation");
      suggestions.push("Ensure retirement corpus is on track for post-60 expenses");
      suggestions.push("Consider annuities and guaranteed income products");
    }

    // Income type based
    if (incomeType === 'student') {
      suggestions.push("Even small savings (₹500-1,000/month) build powerful habits");
      suggestions.push("Focus on needs vs wants—every rupee saved now grows for decades");
      suggestions.push("Avoid credit cards until you have steady income");
    } else if (incomeType === 'freelance') {
      suggestions.push("Build larger emergency fund (6-12 months) due to income variability");
      suggestions.push("Set aside 30% of income for taxes and file quarterly advance tax");
      suggestions.push("Consider professional indemnity and health insurance");
    } else if (incomeType === 'salaried') {
      suggestions.push("Automate savings—SIP and emergency fund contributions on salary day");
      suggestions.push("Maximize employer benefits: EPF, health insurance, NPS if offered");
      suggestions.push("Check Form 16 and file returns to claim refunds if TDS excess");
    }

    // Income-level based
    if (income < 20000) {
      suggestions.push("Priority order: 1) Small emergency fund (₹10k), 2) Increase income skills, 3) Start micro-SIP (₹500)");
      suggestions.push("Use free/low-cost learning resources to increase earning potential");
      suggestions.push("Track expenses religiously—small leaks sink ships at this income level");
    } else if (income < 50000) {
      suggestions.push("Follow 50/30/20 rule: ₹" + Math.round(income * 0.5) + " needs, ₹" + Math.round(income * 0.3) + " wants, ₹" + Math.round(income * 0.2) + " savings");
      suggestions.push("Build ₹" + (income * 6).toLocaleString() + " emergency fund (6 months expenses)");
      suggestions.push("Invest ₹" + Math.round(income * 0.15).toLocaleString() + "/month in index funds or ELSS");
    } else {
      suggestions.push("You have capacity for significant wealth building—aim to save 30%+ of income");
      suggestions.push("Max out tax deductions: ₹1.5L (80C) + ₹25k (80D) + ₹50k (NPS)");
      suggestions.push("Consider consulting fee-only financial planner for comprehensive planning");
    }

    // Country-specific
    if (country === 'india') {
      suggestions.push("Tax regime: Calculate old vs new to see which saves more with your deductions");
      suggestions.push("Consider PPF (15yr lock, tax-free returns) or ELSS (3yr lock, equity returns) for 80C");
      suggestions.push("File ITR by July 31st annually even if zero tax—builds financial record");
    }

    return suggestions;
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          Ask a Scenario
        </CardTitle>
        <CardDescription>
          Get personalized educational suggestions based on your situation. This is general education, not personalized financial advice.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Your Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="13"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-type">Income Type</Label>
            <Select value={incomeType} onValueChange={setIncomeType}>
              <SelectTrigger id="income-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student / No Income</SelectItem>
                <SelectItem value="parttime">Part-time / Gig Work</SelectItem>
                <SelectItem value="salaried">Salaried Employee</SelectItem>
                <SelectItem value="freelance">Freelancer / Self-employed</SelectItem>
                <SelectItem value="business">Business Owner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income">Monthly Income (₹)</Label>
            <Input
              id="income"
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              min="0"
              step="1000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="other">Other (General advice)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={generateSuggestions} className="w-full">
          Get Educational Suggestions
        </Button>

        {showSuggestions && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h4 className="mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                Suggestions for Your Situation
              </h4>
              <ul className="space-y-3">
                {getSuggestions().map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-600 flex-shrink-0 mt-0.5">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="mb-2">
                  <strong>Important Disclaimer:</strong> These are general educational suggestions based on common principles, not personalized financial, legal, or tax advice.
                </p>
                <p>
                  Your specific situation may require different strategies. For personalized advice tailored to your circumstances, consult licensed financial advisors, tax professionals, or legal experts.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
