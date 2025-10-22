export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  title: string;
  duration: string;
  content: {
    intro: string;
    sections: {
      title: string;
      content: string;
      keyPoints: string[];
    }[];
    summary: string;
  };
  infographic: string;
  realLifeExample: {
    scenario: string;
    inputs: {
      label: string;
      defaultValue: number;
      min: number;
      max: number;
      step: number;
      unit?: string;
    }[];
    calculate: (inputs: number[]) => { label: string; value: string }[];
  };
  quiz: QuizQuestion[];
  simulation: {
    title: string;
    description: string;
    type: 'budget' | 'savings' | 'investment' | 'credit' | 'loan' | 'compound';
  };
  dailyTip: string;
  cheatSheet: {
    title: string;
    points: string[];
  };
}

export interface Module {
  id: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  color: string;
}

export const modules: Module[] = [
  {
    id: 0,
    title: "Money Basics",
    description: "Foundation concepts: What is money, income vs expenses, needs vs wants",
    icon: "Coins",
    color: "bg-blue-500",
    lessons: [
      {
        title: "Understanding Money & Its Purpose",
        duration: "8 min",
        content: {
          intro: "Money is more than just paper and coins—it's a tool that represents value and enables exchange in modern society. Understanding what money really is and how it works is the first step toward financial literacy.",
          sections: [
            {
              title: "What is Money?",
              content: "Money serves three primary functions: it's a medium of exchange (you can trade it for goods and services), a unit of account (it measures value), and a store of value (it holds purchasing power over time). Throughout history, societies have used shells, stones, precious metals, and now digital entries in bank accounts as money. What makes something 'money' is that people agree it has value and accept it in trade.",
              keyPoints: [
                "Money is a tool that represents value and enables trade",
                "Functions: medium of exchange, unit of account, store of value",
                "Value comes from collective agreement and trust in the system",
                "Modern money includes physical cash and digital balances"
              ]
            },
            {
              title: "Income vs. Expenses: The Foundation",
              content: "Your financial health depends on a simple equation: income minus expenses equals what you have left. Income is money flowing in—from jobs, allowances, gifts, or investments. Expenses are money flowing out—rent, food, entertainment, subscriptions. If your expenses exceed your income, you'll go into debt. If income exceeds expenses, you can save and invest. Understanding this flow is critical.",
              keyPoints: [
                "Income = money coming in (salary, allowance, side gigs)",
                "Expenses = money going out (rent, food, entertainment)",
                "Positive cash flow (income > expenses) = ability to save",
                "Negative cash flow (expenses > income) = debt accumulation"
              ]
            },
            {
              title: "Needs vs. Wants: The Critical Distinction",
              content: "A need is something essential for survival and basic functioning: food, shelter, basic clothing, healthcare, transportation to work or school. A want is something that improves quality of life but isn't essential: designer clothes, streaming subscriptions, eating out, the latest smartphone. The challenge is that modern marketing often makes wants feel like needs. Learning to distinguish between them is crucial for financial success, especially when resources are limited.",
              keyPoints: [
                "Needs: essential for survival (food, shelter, basic healthcare)",
                "Wants: improve quality of life but not essential (entertainment, luxury items)",
                "Marketing often blurs the line—stay mindful",
                "Prioritize needs first, then allocate remaining funds to wants"
              ]
            }
          ],
          summary: "Money is a tool with agreed-upon value that enables exchange. Your financial foundation rests on understanding income (money in) versus expenses (money out), and making smart choices by prioritizing needs over wants. Master these basics, and you're ready to build a strong financial future."
        },
        infographic: "Simple visual: Income (green arrow up) - Expenses (red arrow down) = Savings (blue box). Then: Needs (house, food) vs Wants (game controller, coffee cup).",
        realLifeExample: {
          scenario: "Calculate your monthly cash flow and see how small changes impact your savings ability",
          inputs: [
            { label: "Monthly Income", defaultValue: 15000, min: 0, max: 100000, step: 1000, unit: "₹" },
            { label: "Monthly Needs (rent, food, transport)", defaultValue: 8000, min: 0, max: 50000, step: 500, unit: "₹" },
            { label: "Monthly Wants (entertainment, eating out)", defaultValue: 4000, min: 0, max: 50000, step: 500, unit: "₹" }
          ],
          calculate: (inputs) => {
            const income = inputs[0];
            const needs = inputs[1];
            const wants = inputs[2];
            const totalExpenses = needs + wants;
            const savings = income - totalExpenses;
            const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : "0";
            const yearlyPotential = savings * 12;
            
            return [
              { label: "Total Monthly Expenses", value: `₹${totalExpenses.toLocaleString()}` },
              { label: "Monthly Savings", value: `₹${savings.toLocaleString()}` },
              { label: "Savings Rate", value: `${savingsRate}%` },
              { label: "Annual Savings Potential", value: `₹${yearlyPotential.toLocaleString()}` },
              { label: "Status", value: savings >= 0 ? "✅ Positive Cash Flow" : "⚠️ Spending More Than Earning" }
            ];
          }
        },
        quiz: [
          {
            question: "Which of the following is NOT a primary function of money?",
            options: [
              "Medium of exchange",
              "Unit of account",
              "Source of happiness",
              "Store of value"
            ],
            correctAnswer: 2,
            explanation: "Money serves three primary functions: medium of exchange, unit of account, and store of value. While money can facilitate experiences that bring happiness, happiness itself is not a function of money."
          },
          {
            question: "If your monthly income is ₹20,000 and your expenses are ₹22,000, what is your financial situation?",
            options: [
              "You have positive cash flow of ₹2,000",
              "You have negative cash flow of ₹2,000",
              "You are breaking even",
              "You can save ₹2,000 per month"
            ],
            correctAnswer: 1,
            explanation: "When expenses (₹22,000) exceed income (₹20,000), you have negative cash flow of ₹2,000, meaning you're spending more than you earn and likely going into debt."
          },
          {
            question: "Which of these is a 'need' rather than a 'want'?",
            options: [
              "The latest smartphone model",
              "Designer sneakers",
              "Basic healthcare",
              "Premium streaming subscription"
            ],
            correctAnswer: 2,
            explanation: "Basic healthcare is essential for survival and well-being, making it a need. The other options are wants—they may improve quality of life but aren't essential."
          },
          {
            question: "What happens if you consistently spend less than you earn?",
            options: [
              "You will accumulate debt",
              "You will have money left to save and invest",
              "Your credit score will decrease",
              "You will lose purchasing power"
            ],
            correctAnswer: 1,
            explanation: "When income exceeds expenses consistently, you create positive cash flow, giving you money to save, invest, and build wealth over time."
          },
          {
            question: "Why is distinguishing between needs and wants important?",
            options: [
              "It helps you impress others with your spending",
              "It allows you to prioritize essential expenses and make better financial decisions",
              "It means you should never buy wants",
              "It only matters for wealthy people"
            ],
            correctAnswer: 1,
            explanation: "Distinguishing needs from wants helps you prioritize essential expenses first, ensuring you can meet your basic requirements before spending on non-essentials. This leads to better financial decisions, especially when money is tight."
          },
          {
            question: "If you save ₹2,000 per month, how much will you have saved in one year (without interest)?",
            options: [
              "₹12,000",
              "₹20,000",
              "₹24,000",
              "₹30,000"
            ],
            correctAnswer: 2,
            explanation: "₹2,000 per month × 12 months = ₹24,000 saved in one year. This demonstrates how small, consistent savings add up significantly over time."
          }
        ],
        simulation: {
          title: "Budget Builder: Needs vs Wants",
          description: "Create a simple 3-item budget and see how your choices impact monthly savings",
          type: "budget"
        },
        dailyTip: "Track every rupee you spend today in a notes app. Awareness is the first step to control.",
        cheatSheet: {
          title: "Money Basics Cheat Sheet",
          points: [
            "Money = Medium of Exchange + Unit of Account + Store of Value",
            "Income - Expenses = Savings (or Debt if negative)",
            "Needs: Essential for survival (food, shelter, healthcare)",
            "Wants: Nice to have but not essential (entertainment, luxury)",
            "Positive cash flow = path to financial freedom",
            "Track spending to understand where your money goes"
          ]
        }
      }
    ]
  },
  {
    id: 1,
    title: "Budgeting & Bills",
    description: "Creating budgets, tracking expenses, managing recurring bills",
    icon: "Calculator",
    color: "bg-green-500",
    lessons: [
      {
        title: "Creating Your First Budget",
        duration: "10 min",
        content: {
          intro: "A budget is simply a plan for your money. It tells your money where to go instead of wondering where it went. Whether you're earning ₹5,000 or ₹50,000 per month, budgeting is the single most powerful tool for financial success.",
          sections: [
            {
              title: "The 50/30/20 Rule",
              content: "This simple framework divides your after-tax income: 50% for needs (rent, utilities, groceries, insurance, minimum debt payments), 30% for wants (dining out, hobbies, entertainment, subscriptions), and 20% for savings and debt payoff beyond minimums. It's not rigid—adjust based on your situation. Living with parents? You might do 30/20/50. High rent area? Maybe 60/20/20. The key is having a framework.",
              keyPoints: [
                "50% Needs: essentials like housing, food, utilities, transport",
                "30% Wants: entertainment, hobbies, non-essential purchases",
                "20% Savings: emergency fund, investments, extra debt payments",
                "Adjust percentages based on your life situation"
              ]
            },
            {
              title: "Zero-Based Budgeting",
              content: "Every rupee gets a job. At the start of the month, allocate all your income across categories: rent, food, transport, savings, fun money, etc. Income minus all allocations should equal zero. This doesn't mean spending everything—savings is a category too. This method ensures you're intentional with every rupee and nothing 'disappears' without accounting.",
              keyPoints: [
                "Assign every rupee a specific purpose before the month starts",
                "Income - All Allocations = Zero",
                "Include savings and investments as budget categories",
                "Adjust throughout the month as needed, but stay intentional"
              ]
            },
            {
              title: "Tracking Methods",
              content: "Use what works for you: pen and paper, spreadsheets (Google Sheets is free), budgeting apps, or even envelopes with cash. Digital methods offer automatic tracking via bank connections. Manual methods force you to confront each expense. Many people start manual to build awareness, then move to apps for convenience. Review your budget weekly at first, then monthly once you have a rhythm.",
              keyPoints: [
                "Choose a method you'll actually use consistently",
                "Digital: apps, spreadsheets (automatic, convenient)",
                "Manual: paper, envelopes (builds stronger awareness)",
                "Review weekly initially, monthly once established"
              ]
            }
          ],
          summary: "Budgeting is telling your money where to go. Use frameworks like 50/30/20 for simplicity or zero-based budgeting for precision. Track with tools that fit your style. The best budget is the one you'll actually follow."
        },
        infographic: "Pie chart showing 50/30/20 split with icons. Then: calendar with money flowing into labeled buckets (rent, food, savings, fun).",
        realLifeExample: {
          scenario: "Apply the 50/30/20 rule to your income and see the breakdown",
          inputs: [
            { label: "Monthly After-Tax Income", defaultValue: 25000, min: 5000, max: 200000, step: 1000, unit: "₹" }
          ],
          calculate: (inputs) => {
            const income = inputs[0];
            const needs = income * 0.5;
            const wants = income * 0.3;
            const savings = income * 0.2;
            
            return [
              { label: "Needs (50%)", value: `₹${needs.toLocaleString()}` },
              { label: "Wants (30%)", value: `₹${wants.toLocaleString()}` },
              { label: "Savings (20%)", value: `₹${savings.toLocaleString()}` },
              { label: "Annual Savings", value: `₹${(savings * 12).toLocaleString()}` },
              { label: "Daily Spending Money (Wants ÷ 30)", value: `₹${Math.round(wants / 30).toLocaleString()}` }
            ];
          }
        },
        quiz: [
          {
            question: "In the 50/30/20 rule, what does the 20% represent?",
            options: [
              "Entertainment and hobbies",
              "Housing and utilities",
              "Savings and debt repayment",
              "Transportation costs"
            ],
            correctAnswer: 2,
            explanation: "The 20% in the 50/30/20 rule is allocated to savings, investments, and paying off debt beyond minimum payments. This is your wealth-building category."
          },
          {
            question: "What is zero-based budgeting?",
            options: [
              "Starting your budget from zero savings",
              "Assigning every rupee of income a specific purpose so income minus allocations equals zero",
              "Spending everything you earn",
              "Only budgeting when you have zero debt"
            ],
            correctAnswer: 1,
            explanation: "Zero-based budgeting means giving every rupee a job—allocating all income across categories (including savings) so that income minus all allocations equals zero. You're intentional with every rupee."
          },
          {
            question: "If your monthly income is ₹30,000, how much should you ideally save according to the 50/30/20 rule?",
            options: [
              "₹3,000",
              "₹6,000",
              "₹9,000",
              "₹15,000"
            ],
            correctAnswer: 1,
            explanation: "20% of ₹30,000 is ₹6,000. This should go toward savings, investments, and extra debt payments beyond minimums."
          },
          {
            question: "Which statement about budgeting is TRUE?",
            options: [
              "Budgets are only for people with low income",
              "A budget restricts you from ever having fun",
              "A budget is a plan that tells your money where to go",
              "You should never adjust your budget once created"
            ],
            correctAnswer: 2,
            explanation: "A budget is simply a plan for your money—it tells your money where to go rather than wondering where it went. Everyone benefits from budgeting, regardless of income level."
          },
          {
            question: "What's the main advantage of manual budget tracking (pen and paper) over apps?",
            options: [
              "It's faster",
              "It syncs with your bank automatically",
              "It forces you to confront and think about each expense",
              "It provides better reports"
            ],
            correctAnswer: 2,
            explanation: "Manual tracking makes you write down and think about each transaction, building stronger awareness of spending patterns. This psychological engagement is powerful for behavior change."
          },
          {
            question: "How often should you review your budget when first starting out?",
            options: [
              "Once a year",
              "Every 6 months",
              "Weekly",
              "Never—set it and forget it"
            ],
            correctAnswer: 2,
            explanation: "When starting out, review your budget weekly to catch issues early, make adjustments, and build the habit. Once established, monthly reviews are usually sufficient."
          },
          {
            question: "If you live with parents and have minimal expenses, how might you adjust the 50/30/20 rule?",
            options: [
              "Keep it exactly the same",
              "Spend more on wants since you can",
              "Increase the savings percentage since needs are lower",
              "Ignore budgeting altogether"
            ],
            correctAnswer: 2,
            explanation: "With lower needs (e.g., living with parents), you have an opportunity to save more aggressively—perhaps 30/20/50 or even better. Take advantage of low-expense periods to build wealth."
          }
        ],
        simulation: {
          title: "Monthly Budget Planner",
          description: "Build a complete monthly budget and track week-by-week cashflow",
          type: "budget"
        },
        dailyTip: "Set up a recurring monthly reminder to review your budget on the 1st of each month.",
        cheatSheet: {
          title: "Budgeting Essentials",
          points: [
            "50/30/20: 50% needs, 30% wants, 20% savings",
            "Zero-based: Every rupee gets a specific job",
            "Track using tools you'll actually use consistently",
            "Review weekly at first, monthly once established",
            "Adjust percentages based on your life situation",
            "Budget = telling money where to go, not restricting fun"
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Banking Products",
    description: "Savings accounts, current accounts, fixed deposits, and when to use each",
    icon: "Building2",
    color: "bg-purple-500",
    lessons: [
      {
        title: "Understanding Bank Accounts",
        duration: "12 min",
        content: {
          intro: "Banks offer different types of accounts designed for different purposes. Choosing the right account type can save you fees, earn you interest, and make managing money easier. Let's break down the main account types and who should use each.",
          sections: [
            {
              title: "Savings Accounts",
              content: "Savings accounts are designed for individuals to park money they don't need immediately while earning modest interest (typically 2.5-4% annually in India). They usually have transaction limits (often 3-5 free withdrawals per month at ATMs), minimum balance requirements (₹1,000-₹10,000), and restrictions on check usage. Ideal for: emergency funds, short-term savings, salary deposits for most employees. Interest is calculated daily but credited quarterly. Look for accounts with low/zero minimum balance if you're just starting out.",
              keyPoints: [
                "Purpose: Personal use, earn interest on idle money",
                "Interest: 2.5-4% per year, compounded quarterly",
                "Limits: Transaction limits, minimum balance requirements",
                "Best for: Emergency funds, salary accounts, short-term savings"
              ]
            },
            {
              title: "Current Accounts",
              content: "Current accounts are built for businesses and frequent transactors. They typically pay zero interest but allow unlimited transactions—deposits, withdrawals, checks. They often have higher minimum balance requirements (₹25,000-₹100,000) and charge fees if balances drop below that. Banks provide extras like overdraft facilities and bundled services. Ideal for: business owners, freelancers with frequent transactions, anyone writing many checks. Not recommended for students or salaried employees saving money.",
              keyPoints: [
                "Purpose: Business use, frequent transactions",
                "Interest: Usually 0% (no interest earned)",
                "Limits: Unlimited transactions, high minimum balance",
                "Best for: Businesses, freelancers, not for personal savings"
              ]
            },
            {
              title: "Fixed Deposits (FDs)",
              content: "FDs are time deposits where you lock money for a fixed period (7 days to 10 years) at a guaranteed interest rate (typically 5-7%). Break it early and you'll pay penalties and get lower rates. Interest can be paid monthly, quarterly, annually, or at maturity. They're safe (government insured up to ₹5 lakh per bank), predictable, and great for goals with specific timelines. Ideal for: emergency fund core (3-6 months expenses), medium-term goals (1-5 years), conservative investors. Not ideal for: money you might need soon, long-term wealth building (returns often don't beat inflation after tax).",
              keyPoints: [
                "Purpose: Lock money for fixed term at guaranteed rate",
                "Interest: 5-7% typically, higher than savings accounts",
                "Liquidity: Low—penalties for early withdrawal",
                "Best for: Short to medium-term goals, risk-averse savers"
              ]
            },
            {
              title: "How Interest is Calculated",
              content: "Simple interest: I = P × R × T (Principal × Rate × Time). ₹10,000 at 5% for 1 year = ₹500. Compound interest is more powerful: interest earns interest. A = P(1 + r/n)^(nt). ₹10,000 at 5% compounded quarterly for 1 year = ₹10,509. Savings accounts use daily balance method: they calculate interest on the daily closing balance and compound quarterly. This means keeping higher balances throughout the month earns more. Pro tip: Interest is taxable. If you earn >₹10,000 interest per year, TDS (tax deducted at source) may apply.",
              keyPoints: [
                "Simple interest: I = P × R × T (one-time calculation)",
                "Compound interest: Interest earns interest (more powerful)",
                "Savings accounts: Daily balance, quarterly compounding",
                "Interest income is taxable; TDS applies on high interest"
              ]
            }
          ],
          summary: "Savings accounts are for personal use with modest interest. Current accounts are for businesses with zero interest but unlimited transactions. Fixed deposits lock money for guaranteed returns. Choose based on your needs: liquidity, interest, or transaction frequency. Understand how interest compounds to maximize earnings."
        },
        infographic: "Three columns: Savings (piggy bank icon, ~3% interest, transaction limits), Current (briefcase icon, 0% interest, unlimited), FD (locked vault, ~6% interest, time-locked).",
        realLifeExample: {
          scenario: "Compare returns between savings account and fixed deposit over time",
          inputs: [
            { label: "Initial Amount", defaultValue: 50000, min: 1000, max: 1000000, step: 1000, unit: "₹" },
            { label: "Time Period (years)", defaultValue: 2, min: 1, max: 10, step: 1 },
            { label: "Savings Account Interest Rate", defaultValue: 3.5, min: 2, max: 6, step: 0.5, unit: "%" },
            { label: "FD Interest Rate", defaultValue: 6.5, min: 4, max: 9, step: 0.5, unit: "%" }
          ],
          calculate: (inputs) => {
            const principal = inputs[0];
            const years = inputs[1];
            const savingsRate = inputs[2] / 100;
            const fdRate = inputs[3] / 100;
            
            // Savings: Quarterly compounding
            const savingsAmount = principal * Math.pow(1 + savingsRate / 4, 4 * years);
            const savingsInterest = savingsAmount - principal;
            
            // FD: Quarterly compounding
            const fdAmount = principal * Math.pow(1 + fdRate / 4, 4 * years);
            const fdInterest = fdAmount - principal;
            
            const difference = fdAmount - savingsAmount;
            
            return [
              { label: "Savings Account Final Amount", value: `₹${Math.round(savingsAmount).toLocaleString()}` },
              { label: "Savings Account Interest Earned", value: `₹${Math.round(savingsInterest).toLocaleString()}` },
              { label: "Fixed Deposit Final Amount", value: `₹${Math.round(fdAmount).toLocaleString()}` },
              { label: "Fixed Deposit Interest Earned", value: `₹${Math.round(fdInterest).toLocaleString()}` },
              { label: "Additional Earnings with FD", value: `₹${Math.round(difference).toLocaleString()}` }
            ];
          }
        },
        quiz: [
          {
            question: "What is the primary purpose of a savings account?",
            options: [
              "For businesses to conduct unlimited transactions",
              "To lock money for a fixed period at high interest",
              "For individuals to save money while earning modest interest",
              "To get zero interest but unlimited withdrawals"
            ],
            correctAnswer: 2,
            explanation: "Savings accounts are designed for individuals to park personal funds while earning modest interest (typically 2.5-4% annually). They're ideal for emergency funds and short-term savings."
          },
          {
            question: "Which account type typically pays NO interest?",
            options: [
              "Savings Account",
              "Fixed Deposit",
              "Current Account",
              "Recurring Deposit"
            ],
            correctAnswer: 2,
            explanation: "Current accounts typically pay zero interest because they're designed for business transactions and frequent activity, not for saving and earning returns."
          },
          {
            question: "What happens if you withdraw from a Fixed Deposit before maturity?",
            options: [
              "Nothing—you get full interest",
              "The bank thanks you with a bonus",
              "You pay penalties and receive reduced interest",
              "Your account is permanently closed"
            ],
            correctAnswer: 2,
            explanation: "Breaking an FD early results in penalties and a lower interest rate than originally promised. FDs are meant for money you won't need before the maturity date."
          },
          {
            question: "If you're a freelancer with frequent transactions, which account is most suitable?",
            options: [
              "Savings Account",
              "Current Account",
              "Fixed Deposit",
              "No account needed"
            ],
            correctAnswer: 1,
            explanation: "Current accounts are designed for frequent transactions without limits, making them ideal for freelancers and businesses. Savings accounts have transaction limits."
          },
          {
            question: "How is interest typically compounded in savings accounts in India?",
            options: [
              "Daily",
              "Quarterly",
              "Annually",
              "Never"
            ],
            correctAnswer: 1,
            explanation: "Savings accounts in India calculate interest daily on the closing balance and compound it quarterly. This means maintaining higher balances throughout the month earns more interest."
          },
          {
            question: "What is the insurance coverage for bank deposits in India per bank?",
            options: [
              "₹1 lakh",
              "₹5 lakh",
              "₹10 lakh",
              "Unlimited"
            ],
            correctAnswer: 1,
            explanation: "The Deposit Insurance and Credit Guarantee Corporation (DICGC) insures deposits up to ₹5 lakh per depositor per bank. This protects your money if the bank fails."
          },
          {
            question: "Which statement about compound interest is TRUE?",
            options: [
              "It's calculated only once at maturity",
              "It's always worse than simple interest",
              "Interest earns interest, making it more powerful over time",
              "It only applies to loans, not savings"
            ],
            correctAnswer: 2,
            explanation: "Compound interest means interest earns interest over time, making it significantly more powerful than simple interest for long-term savings and investments."
          },
          {
            question: "What is a minimum balance requirement?",
            options: [
              "The maximum amount you can deposit",
              "The minimum amount you must maintain to avoid fees",
              "The interest you must earn monthly",
              "The number of transactions allowed"
            ],
            correctAnswer: 1,
            explanation: "Minimum balance is the amount you must maintain in your account. Falling below this threshold typically results in penalty fees. Requirements vary by bank and account type."
          }
        ],
        simulation: {
          title: "Account Type Selector",
          description: "Answer questions about your needs and see which account type is recommended",
          type: "savings"
        },
        dailyTip: "Check your savings account balance and calculate how much interest you earned last quarter. Is it working hard enough for you?",
        cheatSheet: {
          title: "Banking Products Quick Guide",
          points: [
            "Savings: Personal use, 2.5-4% interest, transaction limits",
            "Current: Business use, 0% interest, unlimited transactions",
            "FD: Lock money for 5-7% guaranteed, penalties for early exit",
            "Interest calculation: Compound > Simple (long term)",
            "Savings accounts: Daily calculation, quarterly compounding",
            "Deposits insured up to ₹5 lakh per bank (DICGC)",
            "Choose based on: liquidity needs, interest goals, transaction frequency"
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Credit & Debt",
    description: "Credit scores, credit cards, responsible borrowing, loan basics",
    icon: "CreditCard",
    color: "bg-red-500",
    lessons: [
      {
        title: "Understanding Credit Scores & Credit Cards",
        duration: "12 min",
        content: {
          intro: "Credit is a powerful financial tool that can help you build wealth—or trap you in debt. Understanding how credit works, what credit scores mean, and how to use credit cards responsibly is essential for financial success in modern life.",
          sections: [
            {
              title: "What is a Credit Score?",
              content: "A credit score is a three-digit number (typically 300-900 in India, 300-850 in the US) that represents your creditworthiness—how likely you are to repay borrowed money. Lenders use this score to decide whether to approve loans, what interest rates to offer, and credit limits. Your score is calculated based on: payment history (35%), credit utilization (30%), length of credit history (15%), types of credit (10%), and new credit inquiries (10%). In India, CIBIL is the primary credit bureau. Scores above 750 are considered excellent, 650-750 good, 550-650 fair, and below 550 poor. A good score can save you lakhs in interest over your lifetime.",
              keyPoints: [
                "Credit score = 3-digit number showing creditworthiness (300-900 in India)",
                "Calculated from: payment history (35%), utilization (30%), history length (15%), credit mix (10%), inquiries (10%)",
                "750+ = excellent, 650-750 = good, 550-650 = fair, <550 = poor",
                "Higher scores = better loan terms, lower interest rates, higher limits"
              ]
            },
            {
              title: "How Credit Cards Work",
              content: "A credit card is a revolving line of credit. The bank gives you a credit limit (e.g., ₹50,000), and you can borrow up to that amount. Each month, you receive a statement showing your balance and minimum payment due. Here's the key: if you pay the FULL balance by the due date, you pay ZERO interest. If you pay only the minimum (usually 5% of balance), you're charged interest on the remaining balance (typically 24-48% annually in India—extremely high). Credit cards also charge late fees (₹500-₹1,000+), over-limit fees, and sometimes annual fees. Used responsibly, credit cards offer convenience, rewards, and build credit history. Used carelessly, they're a debt trap.",
              keyPoints: [
                "Credit card = revolving credit line with a limit",
                "Pay full balance by due date = zero interest",
                "Pay only minimum = charged 24-48% annual interest on remainder",
                "Fees: late payment, over-limit, annual (varies by card)",
                "Benefits: convenience, rewards, builds credit if used responsibly"
              ]
            },
            {
              title: "The Minimum Payment Trap",
              content: "Paying only the minimum payment is one of the biggest financial mistakes. Example: You have a ₹50,000 balance at 36% annual interest (3% monthly). Minimum payment is ₹2,500 (5%). If you pay only minimums, it will take over 7 YEARS to pay off, and you'll pay over ₹60,000 in interest alone—more than doubling your debt. Credit card companies design minimum payments to keep you in debt longer, maximizing their profit. The right strategy: pay the full statement balance every month. If you can't afford to pay in full, you can't afford the purchase. Treat credit cards like debit cards with rewards, not as extra money.",
              keyPoints: [
                "Minimum payment = designed to maximize bank profit, not help you",
                "Example: ₹50k at 36% APR, paying minimums = 7+ years, ₹60k+ interest",
                "Always pay FULL statement balance to avoid interest",
                "If you can't pay in full, you can't afford the purchase",
                "Treat credit cards like debit cards with rewards, not free money"
              ]
            },
            {
              title: "Building Credit Responsibly",
              content: "To build excellent credit: (1) Always pay on time—even one late payment can drop your score 50-100 points. (2) Keep credit utilization below 30% of your limit (ideally below 10%). If your limit is ₹50k, keep balances under ₹15k, better under ₹5k. (3) Don't close old credit cards—length of history matters. (4) Limit credit applications—each hard inquiry drops your score 5-10 points temporarily. (5) Mix credit types over time (credit card + loan shows you can handle different credit). (6) Check your credit report annually for errors (free once per year from CIBIL). Building good credit takes time but opens doors to better financial opportunities.",
              keyPoints: [
                "Always pay on time—late payments hurt scores significantly",
                "Keep utilization <30% of limit (ideally <10%)",
                "Don't close old cards—history length matters",
                "Limit credit applications—each inquiry drops score temporarily",
                "Check credit report annually for errors (free from CIBIL)",
                "Good credit = years to build, easy to damage, worth protecting"
              ]
            }
          ],
          summary: "Credit scores (300-900 in India) determine your borrowing terms. Credit cards offer convenience and rewards if paid in full monthly, but become debt traps if you carry balances due to high interest (24-48%). Always pay full statement balances, keep utilization low, pay on time, and check reports annually. Good credit takes years to build but opens financial opportunities."
        },
        infographic: "Visual: Credit score meter showing ranges (300-900). Then: credit card with two paths—'Pay Full' leads to rewards and good score, 'Pay Minimum' leads to debt spiral and interest charges.",
        realLifeExample: {
          scenario: "See the true cost of carrying credit card debt vs paying in full",
          inputs: [
            { label: "Credit Card Balance", defaultValue: 50000, min: 1000, max: 500000, step: 1000, unit: "₹" },
            { label: "Annual Interest Rate", defaultValue: 36, min: 12, max: 48, step: 1, unit: "%" },
            { label: "Monthly Payment", defaultValue: 2500, min: 500, max: 50000, step: 500, unit: "₹" }
          ],
          calculate: (inputs) => {
            const balance = inputs[0];
            const annualRate = inputs[1] / 100;
            const monthlyRate = annualRate / 12;
            const payment = inputs[2];

            if (payment <= balance * monthlyRate) {
              return [
                { label: "Status", value: "⚠️ Payment too low! Won't reduce balance." },
                { label: "Note", value: "Payment must exceed monthly interest" }
              ];
            }

            let remainingBalance = balance;
            let totalPaid = 0;
            let months = 0;

            while (remainingBalance > 0 && months < 360) {
              const interest = remainingBalance * monthlyRate;
              const principal = payment - interest;
              remainingBalance -= principal;
              totalPaid += payment;
              months++;

              if (remainingBalance < 0) {
                totalPaid += remainingBalance;
                remainingBalance = 0;
              }
            }

            const totalInterest = totalPaid - balance;
            const years = (months / 12).toFixed(1);

            return [
              { label: "Time to Pay Off", value: `${months} months (${years} years)` },
              { label: "Total Amount Paid", value: `₹${Math.round(totalPaid).toLocaleString()}` },
              { label: "Total Interest Paid", value: `₹${Math.round(totalInterest).toLocaleString()}` },
              { label: "Cost Multiplier", value: `${(totalPaid / balance).toFixed(2)}x original debt` },
              { label: "Better Strategy", value: "Pay full balance each month = ₹0 interest!" }
            ];
          }
        },
        quiz: [
          {
            question: "What is the most important factor in calculating your credit score?",
            options: [
              "Your annual income",
              "Payment history (whether you pay on time)",
              "The type of credit cards you have",
              "Your age"
            ],
            correctAnswer: 1,
            explanation: "Payment history accounts for 35% of your credit score—the largest single factor. Paying on time consistently is the most important thing you can do for your credit score."
          },
          {
            question: "In India, what credit score range is considered excellent?",
            options: [
              "300-500",
              "500-650",
              "650-750",
              "750-900"
            ],
            correctAnswer: 3,
            explanation: "In India's CIBIL scoring system (300-900), scores above 750 are considered excellent and will get you the best loan terms and interest rates."
          },
          {
            question: "If you have a ₹50,000 credit limit, what's the ideal maximum balance to maintain for good credit?",
            options: [
              "₹50,000 (use the full limit)",
              "₹35,000 (70% utilization)",
              "₹15,000 (30% utilization)",
              "₹5,000 (10% utilization)"
            ],
            correctAnswer: 3,
            explanation: "While staying under 30% (₹15,000) is good, keeping utilization below 10% (₹5,000) is ideal for maintaining the best credit score. Lower utilization shows you're not credit-dependent."
          },
          {
            question: "What happens if you only pay the minimum payment on your credit card?",
            options: [
              "You avoid all interest charges",
              "You're charged high interest (24-48%) on the remaining balance",
              "Your credit score automatically improves",
              "The bank waives your annual fee"
            ],
            correctAnswer: 1,
            explanation: "Paying only the minimum means you're charged interest on the remaining balance. In India, credit card interest rates are typically 24-48% annually—one of the most expensive forms of debt."
          },
          {
            question: "Why should you avoid closing your oldest credit card?",
            options: [
              "Because you'll be charged a closing fee",
              "Because it will anger the bank",
              "Because length of credit history affects your credit score",
              "Because you legally cannot close it"
            ],
            correctAnswer: 2,
            explanation: "Length of credit history accounts for 15% of your credit score. Closing your oldest card shortens your average account age, potentially lowering your score. Keep old cards open (but use them responsibly)."
          },
          {
            question: "What's the best way to use a credit card to build credit without paying interest?",
            options: [
              "Use it for everything and pay only minimum payments",
              "Never use it at all",
              "Use it for purchases and pay the full statement balance by the due date",
              "Max out the card every month"
            ],
            correctAnswer: 2,
            explanation: "The winning strategy: Use your credit card for purchases you can afford, then pay the FULL statement balance by the due date. This builds credit history, earns rewards, and costs you zero interest."
          },
          {
            question: "If you have a ₹50,000 balance at 36% interest and pay only ₹2,500/month minimum, roughly how long will it take to pay off?",
            options: [
              "Less than 1 year",
              "About 2 years",
              "About 4 years",
              "Over 7 years"
            ],
            correctAnswer: 3,
            explanation: "At 36% annual interest (3% monthly), paying only minimums on ₹50,000 takes over 7 years and costs ₹60,000+ in interest. This demonstrates why minimum payments are a trap."
          },
          {
            question: "What is credit utilization?",
            options: [
              "The number of credit cards you own",
              "The percentage of your available credit limit that you're using",
              "How often you apply for new credit",
              "Your total debt divided by your income"
            ],
            correctAnswer: 1,
            explanation: "Credit utilization is the percentage of your available credit that you're using. It's calculated as (total balances / total credit limits) × 100. It accounts for 30% of your credit score, so keeping it low (<30%, ideally <10%) is important."
          }
        ],
        simulation: {
          title: "Credit Card Decision Simulator",
          description: "Make purchasing decisions and see the impact on your finances",
          type: "credit"
        },
        dailyTip: "Set up autopay for your credit card to pay the full statement balance each month. Never miss a payment, never pay interest.",
        cheatSheet: {
          title: "Credit & Debt Essentials",
          points: [
            "Credit score: 750+ excellent, 650-750 good, 550-650 fair, <550 poor (India: 300-900 scale)",
            "Payment history = 35% of score. Always pay on time!",
            "Utilization = 30% of score. Keep below 30% of limit, ideally <10%",
            "Pay FULL statement balance monthly = zero interest",
            "Pay only minimum = 24-48% interest = debt trap",
            "Don't close old cards—history length matters (15% of score)",
            "Check credit report free annually from CIBIL",
            "Good credit takes years to build, minutes to damage"
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: "Savings Vehicles",
    description: "Emergency funds, high-yield savings, recurring deposits",
    icon: "PiggyBank",
    color: "bg-yellow-500",
    lessons: [
      {
        title: "Emergency Funds & Savings Strategies",
        duration: "10 min",
        content: {
          intro: "An emergency fund is the foundation of financial security—it's money set aside specifically for unexpected expenses like medical emergencies, job loss, or urgent home/car repairs. Without one, any financial setback can spiral into debt. Let's build yours.",
          sections: [
            {
              title: "Why Emergency Funds Matter",
              content: "Life is unpredictable. Medical emergencies, job loss, vehicle breakdowns, family crises—these aren't 'if' scenarios, they're 'when' scenarios. Without an emergency fund, you're forced to choose between bad options: high-interest credit card debt, personal loans at 12-18%, borrowing from family (straining relationships), or selling investments at a loss during market downturns. An emergency fund gives you breathing room to handle crises without derailing your financial life. It's not about being pessimistic—it's about being prepared. Studies show that people with emergency funds experience significantly less financial stress and make better long-term decisions.",
              keyPoints: [
                "Emergencies are inevitable—medical issues, job loss, urgent repairs",
                "Without emergency fund: forced into debt, expensive loans, or bad decisions",
                "With emergency fund: handle crises without derailing finances",
                "Reduces financial stress and improves decision-making",
                "Foundation of financial security—build this FIRST before investing"
              ]
            },
            {
              title: "How Much to Save",
              content: "The standard recommendation is 3-6 months of essential expenses. Calculate your monthly needs (rent, food, utilities, insurance, debt payments—not wants like entertainment). Multiply by 3-6. Job stability matters: stable government job or established career? 3 months may suffice. Freelancer, single income household, or uncertain job market? Aim for 6+ months. Students and young professionals just starting out: even ₹10,000-₹25,000 covers many common emergencies. Start small—something is infinitely better than nothing. Build gradually. Your goal isn't perfection; it's protection.",
              keyPoints: [
                "Standard target: 3-6 months of essential expenses (not total income)",
                "Calculate: Monthly needs × 3 to 6 (rent, food, utilities, debt minimums)",
                "More stable job = 3 months; uncertain/freelance = 6+ months",
                "Starting out: Even ₹10k-₹25k provides significant cushion",
                "Start small, build gradually—something is better than nothing"
              ]
            },
            {
              title: "Where to Keep Emergency Funds",
              content: "Emergency funds need three qualities: (1) Liquidity—accessible within 24 hours without penalties. (2) Safety—principal should not fluctuate. (3) Modest returns—earn something, but returns are secondary to access and safety. Best options: High-yield savings accounts (3-4% interest, instant access), liquid funds (mutual funds investing in very short-term debt, slightly higher returns than savings accounts, 1-2 day withdrawal), or split strategy—keep 1 month in savings account for immediate access, rest in liquid funds for better returns. AVOID: stocks (volatile), locked instruments like FDs with penalties, or real estate (illiquid). Your emergency fund is insurance, not an investment.",
              keyPoints: [
                "Emergency funds need: Liquidity + Safety + Modest returns",
                "Best options: High-yield savings (3-4%, instant), liquid funds (4-5%, 1-2 days)",
                "Split strategy: 1 month in savings, rest in liquid funds",
                "AVOID: stocks (volatile), locked FDs (penalties), real estate (illiquid)",
                "This is insurance, not investment—prioritize access and safety"
              ]
            },
            {
              title: "Building Your Fund Step by Step",
              content: "Don't be overwhelmed by the target. Break it into milestones: (1) First ₹5,000—covers small emergencies like minor medical bills or urgent home repairs. Celebrate this! (2) ₹25,000—covers most common middle-class emergencies. (3) 1 month of expenses—breathing room during temporary setbacks. (4) 3 months—solid foundation for most people. (5) 6 months—excellent security. Automate savings: set up automatic transfer to a separate savings account on payday (pay yourself first principle). Even ₹500-₹1,000 monthly adds up. If you get a bonus, tax refund, or windfall—route a portion to your emergency fund. As income grows, increase contributions. Treat this as a non-negotiable bill.",
              keyPoints: [
                "Milestone 1: ₹5,000 (small emergencies)",
                "Milestone 2: ₹25,000 (most common emergencies)",
                "Milestone 3: 1 month expenses (temporary setbacks)",
                "Milestones 4-5: 3-6 months (full security)",
                "Automate savings: Set up auto-transfer on payday",
                "Even ₹500-1,000/month builds up. Treat as non-negotiable bill"
              ]
            }
          ],
          summary: "Emergency funds are essential financial insurance—3-6 months of essential expenses kept in accessible, safe accounts like high-yield savings or liquid funds. Build gradually through milestones, automate contributions, and prioritize access and safety over returns. This is your foundation—build it first before investing."
        },
        infographic: "Visual: Three-layer pyramid. Base: Emergency Fund (3-6 months). Middle: Savings goals. Top: Investments. Icons showing savings account and liquid fund as storage options.",
        realLifeExample: {
          scenario: "Calculate your emergency fund target and see how long it takes to build",
          inputs: [
            { label: "Monthly Essential Expenses", defaultValue: 25000, min: 5000, max: 200000, step: 1000, unit: "₹" },
            { label: "Target Months of Coverage", defaultValue: 6, min: 3, max: 12, step: 1 },
            { label: "Monthly Savings Contribution", defaultValue: 3000, min: 500, max: 50000, step: 500, unit: "₹" },
            { label: "Current Emergency Savings", defaultValue: 10000, min: 0, max: 500000, step: 5000, unit: "₹" }
          ],
          calculate: (inputs) => {
            const monthlyExpenses = inputs[0];
            const targetMonths = inputs[1];
            const monthlySavings = inputs[2];
            const currentSavings = inputs[3];

            const targetAmount = monthlyExpenses * targetMonths;
            const remaining = Math.max(0, targetAmount - currentSavings);
            const monthsToTarget = monthlySavings > 0 ? Math.ceil(remaining / monthlySavings) : 0;
            const progress = targetAmount > 0 ? ((currentSavings / targetAmount) * 100).toFixed(1) : 0;

            return [
              { label: "Target Emergency Fund", value: `₹${targetAmount.toLocaleString()}` },
              { label: "Current Progress", value: `${progress}% (₹${currentSavings.toLocaleString()})` },
              { label: "Amount Remaining", value: `₹${remaining.toLocaleString()}` },
              { label: "Months to Reach Target", value: monthsToTarget > 0 ? `${monthsToTarget} months` : "Already reached!" },
              { label: "Status", value: currentSavings >= targetAmount ? "✅ Fully Funded!" : remaining <= monthlyExpenses ? "🎯 Almost there!" : "💪 Keep building!" }
            ];
          }
        },
        quiz: [
          {
            question: "What is the primary purpose of an emergency fund?",
            options: [
              "To invest in the stock market for high returns",
              "To cover unexpected expenses without going into debt",
              "To save for planned purchases like vacations",
              "To maximize interest earnings"
            ],
            correctAnswer: 1,
            explanation: "An emergency fund's primary purpose is to cover unexpected expenses (medical emergencies, job loss, urgent repairs) without forcing you into high-interest debt or selling investments at a loss."
          },
          {
            question: "How many months of essential expenses should you aim to save in your emergency fund?",
            options: [
              "1-2 months",
              "3-6 months",
              "12-24 months",
              "No specific amount needed"
            ],
            correctAnswer: 1,
            explanation: "The standard recommendation is 3-6 months of essential expenses. More stable job = closer to 3 months; uncertain income or freelance = closer to 6+ months."
          },
          {
            question: "Where is the BEST place to keep your emergency fund?",
            options: [
              "Invested in stocks for maximum growth",
              "In a high-yield savings account or liquid fund for safety and accessibility",
              "Locked in a 10-year fixed deposit",
              "Under your mattress in cash"
            ],
            correctAnswer: 1,
            explanation: "Emergency funds should be kept in high-yield savings accounts (instant access, 3-4% return) or liquid funds (1-2 day access, 4-5% return). The priority is liquidity and safety, not maximum returns."
          },
          {
            question: "What does 'liquidity' mean in the context of emergency funds?",
            options: [
              "How much water the fund contains",
              "How easily and quickly you can access the money without penalties",
              "The interest rate you earn",
              "The government's approval rating"
            ],
            correctAnswer: 1,
            explanation: "Liquidity refers to how easily and quickly you can convert an asset to cash without significant loss. Emergency funds must be highly liquid—accessible within 24-48 hours without penalties."
          },
          {
            question: "You earn ₹30,000/month with essential expenses of ₹20,000. What's your minimum 3-month emergency fund target?",
            options: [
              "₹30,000",
              "₹60,000",
              "₹90,000",
              "₹20,000"
            ],
            correctAnswer: 1,
            explanation: "Your emergency fund should cover essential EXPENSES, not total income. 3 months × ₹20,000 = ₹60,000 minimum target. (6 months would be ₹120,000)."
          },
          {
            question: "What should you do if you need to use money from your emergency fund?",
            options: [
              "Never touch it under any circumstances",
              "Use it for the emergency, then prioritize rebuilding it",
              "Close the account permanently",
              "Convert it all to stocks immediately"
            ],
            correctAnswer: 1,
            explanation: "Emergency funds exist to be used for true emergencies. If you need to use it, do so without guilt—that's its purpose. Then prioritize rebuilding it back to your target level before focusing on other financial goals."
          },
          {
            question: "Which is NOT a good use of your emergency fund?",
            options: [
              "Unexpected medical emergency",
              "Job loss requiring months to find new employment",
              "Urgent car repair needed to get to work",
              "Buying a new smartphone on sale"
            ],
            correctAnswer: 3,
            explanation: "Emergency funds are for true emergencies—unexpected events that threaten your financial stability or well-being. A sale on a smartphone is a want, not an emergency. That's what your 'wants' budget category is for."
          },
          {
            question: "What's a good first milestone when building an emergency fund from zero?",
            options: [
              "₹500",
              "₹5,000",
              "₹1,00,000",
              "₹10,00,000"
            ],
            correctAnswer: 1,
            explanation: "₹5,000 is an excellent first milestone—it covers many small to medium emergencies like minor medical bills, urgent home repairs, or small vehicle issues. It's achievable but meaningful. Celebrate reaching it!"
          }
        ],
        simulation: {
          title: "Emergency Fund Builder",
          description: "Set up automatic savings and track progress toward your emergency fund goal",
          type: "savings"
        },
        dailyTip: "Set up an automatic transfer of ₹500-₹1,000 to a separate 'Emergency Fund' savings account on your payday. Out of sight, out of mind, but building security.",
        cheatSheet: {
          title: "Emergency Fund Essentials",
          points: [
            "Emergency fund = 3-6 months of essential expenses",
            "Purpose: Cover unexpected costs without debt",
            "Keep in: High-yield savings (3-4%) or liquid funds (4-5%)",
            "Prioritize: Liquidity + Safety > Returns",
            "First milestone: ₹5,000, then ₹25,000, then 1 month, then 3-6 months",
            "Automate savings: Set up auto-transfer on payday",
            "Build this FIRST before investing—it's your financial foundation",
            "If used: Rebuild immediately before other goals"
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "Investing Fundamentals",
    description: "Risk vs return, asset classes, mutual funds, SIPs, diversification",
    icon: "TrendingUp",
    color: "bg-indigo-500",
    lessons: [
      {
        title: "Introduction to Investing: Risk, Return & Asset Classes",
        duration: "14 min",
        content: {
          intro: "Investing is how you make your money work for you—earning returns that outpace inflation and build long-term wealth. But investing involves risk. Understanding the relationship between risk and return, knowing different asset classes, and learning to diversify are the foundations of successful investing.",
          sections: [
            {
              title: "Risk vs Return: The Fundamental Trade-off",
              content: "In investing, risk and return are inseparable. Higher potential returns come with higher risk (chance of loss). Lower-risk investments offer lower returns. This isn't a choice—it's a law of markets. A savings account (3% return) has near-zero risk of loss. A fixed deposit (6% return) is very safe but locked for a term. Stock market investments can return 10-15% long-term but can drop 30-40% in bad years. The key is matching your risk tolerance and time horizon to appropriate investments. Young investors with 20-30 years before retirement can afford more risk (stocks) because they have time to recover from downturns. Someone needing money in 2 years should stick to safer options (FDs, debt funds). Risk isn't bad—unmanaged risk is bad.",
              keyPoints: [
                "Risk and return are inseparable: Higher return potential = higher risk",
                "Low risk = low return (savings accounts ~3%), High risk = high potential return (stocks ~10-15% long-term)",
                "Match investments to your time horizon: Long-term = can take more risk, Short-term = stick to safety",
                "Risk isn't bad if managed properly—it's how wealth is built",
                "Diversification reduces risk without sacrificing returns"
              ]
            },
            {
              title: "Asset Classes Explained",
              content: "Asset classes are categories of investments with similar characteristics. Main classes: (1) Cash/Savings: Highest safety, lowest return (~3%), instant liquidity. Good for emergency funds. (2) Fixed Income/Debt: Bonds, FDs, debt funds. Lower risk, predictable returns (5-8%). Good for short-medium term goals. (3) Equities/Stocks: Ownership in companies. Higher risk, higher potential returns (10-15% long-term). Best for long-term wealth building. (4) Real Estate: Property ownership. Illiquid, high capital requirement, potential for appreciation and rental income. (5) Gold: Hedge against inflation, cultural value in India, moderate returns (8-10% long-term). (6) Alternative investments: Commodities, crypto (very high risk). Each class behaves differently under market conditions—diversifying across classes reduces overall portfolio risk.",
              keyPoints: [
                "Cash/Savings: Highest safety, lowest return (~3%), maximum liquidity",
                "Fixed Income/Debt: Bonds, FDs—lower risk, 5-8% returns, good for short-term",
                "Equities/Stocks: Highest growth potential (10-15% long-term), highest volatility",
                "Real Estate: Illiquid, high capital, potential appreciation + rental income",
                "Gold: Inflation hedge, cultural value, moderate returns (8-10%)",
                "Different classes behave differently—diversification reduces risk"
              ]
            },
            {
              title: "Mutual Funds: Professional Management for Everyone",
              content: "Mutual funds pool money from many investors and invest in a diversified portfolio of stocks, bonds, or both, managed by professionals. Benefits: (1) Diversification—even ₹500 buys you a piece of dozens or hundreds of companies. (2) Professional management—expert fund managers research and pick investments. (3) Liquidity—most can be sold within 1-3 days. (4) Accessibility—start with as little as ₹100-₹500. Types: Equity funds (stocks, higher risk/return), Debt funds (bonds, lower risk/return), Hybrid funds (mix of both), Index funds (track market indices like Nifty 50, low cost). Costs: Expense ratio (annual fee, typically 0.5-2.5%) and sometimes exit loads. Mutual funds are ideal for beginners—you get diversification and professional management without needing to pick individual stocks.",
              keyPoints: [
                "Mutual funds = pooled money invested by professionals",
                "Benefits: Diversification, professional management, liquidity, low minimum (₹100-500)",
                "Types: Equity (stocks, higher risk), Debt (bonds, lower risk), Hybrid (mix), Index (tracks market)",
                "Costs: Expense ratio (0.5-2.5% annually), sometimes exit loads",
                "Ideal for beginners—instant diversification without stock picking"
              ]
            },
            {
              title: "SIPs: The Power of Systematic Investing",
              content: "A Systematic Investment Plan (SIP) means investing a fixed amount at regular intervals (usually monthly) regardless of market conditions. Example: ₹2,000 every month into a mutual fund. Benefits: (1) Rupee cost averaging—when markets are down, you buy more units; when high, fewer units. This averages out your purchase cost over time. (2) Discipline—removes emotion from investing; you invest consistently. (3) Affordability—start with as little as ₹500/month. (4) Power of compounding—regular investments grow exponentially over decades. Example: ₹5,000/month for 20 years at 12% returns = ₹50 lakh invested becomes ~₹1.5 crore. SIPs are perfect for salaried individuals—set up auto-debit and forget it. Time in the market beats timing the market.",
              keyPoints: [
                "SIP = fixed amount invested at regular intervals (monthly)",
                "Rupee cost averaging: Buy more when low, less when high—averages cost",
                "Discipline: Automate investing, remove emotion and timing guesswork",
                "Start small: ₹500-₹1,000/month is enough to begin",
                "Example: ₹5k/month × 20 years at 12% = ₹50L invested → ~₹1.5 crore",
                "Time in market > timing the market—consistency wins"
              ]
            }
          ],
          summary: "Investing means making your money grow faster than inflation. Risk and return are linked—higher returns require accepting higher risk, matched to your time horizon. Asset classes (cash, debt, equity, real estate, gold) behave differently; diversifying reduces risk. Mutual funds offer professional management and diversification for everyone. SIPs build wealth through consistent monthly investing, rupee cost averaging, and the power of compounding over time."
        },
        infographic: "Visual: Risk-return spectrum showing cash/savings (low risk, low return) to stocks (high risk, high return). Then: SIP illustration showing consistent monthly contributions growing into large corpus over time.",
        realLifeExample: {
          scenario: "See the power of SIP investing over different time periods and returns",
          inputs: [
            { label: "Monthly SIP Amount", defaultValue: 5000, min: 500, max: 100000, step: 500, unit: "₹" },
            { label: "Investment Period (years)", defaultValue: 20, min: 5, max: 40, step: 1 },
            { label: "Expected Annual Return", defaultValue: 12, min: 6, max: 20, step: 1, unit: "%" }
          ],
          calculate: (inputs) => {
            const monthlyAmount = inputs[0];
            const years = inputs[1];
            const annualReturn = inputs[2] / 100;
            const monthlyReturn = annualReturn / 12;
            const months = years * 12;

            // Future value of SIP formula: P × [(1 + r)^n - 1] / r × (1 + r)
            const futureValue = monthlyAmount * 
              (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn * 
              (1 + monthlyReturn);

            const totalInvested = monthlyAmount * months;
            const returns = futureValue - totalInvested;
            const returnsMultiple = (futureValue / totalInvested).toFixed(2);

            return [
              { label: "Total Amount Invested", value: `₹${totalInvested.toLocaleString()}` },
              { label: "Final Value", value: `₹${Math.round(futureValue).toLocaleString()}` },
              { label: "Returns Earned", value: `₹${Math.round(returns).toLocaleString()}` },
              { label: "Returns Multiple", value: `${returnsMultiple}x your investment` },
              { label: "Status", value: years >= 15 ? "✨ Long-term wealth building!" : "🎯 Good start!" }
            ];
          }
        },
        quiz: [
          {
            question: "What is the fundamental relationship between risk and return in investing?",
            options: [
              "Higher risk always guarantees higher returns",
              "Higher potential returns typically require accepting higher risk",
              "Risk and return are completely unrelated",
              "Lower risk investments always give better returns"
            ],
            correctAnswer: 1,
            explanation: "In investing, higher potential returns come with higher risk. This is a fundamental law of markets—you can't get high returns without accepting higher risk of loss. The key is managing risk appropriately for your situation."
          },
          {
            question: "Which asset class typically offers the highest long-term returns but also the highest volatility?",
            options: [
              "Savings accounts",
              "Fixed deposits",
              "Equities (stocks)",
              "Gold"
            ],
            correctAnswer: 2,
            explanation: "Equities (stocks) have historically offered the highest long-term returns (~10-15% annually) but come with the highest volatility—they can drop 30-40% in bad years. This makes them suitable for long-term investors who can ride out downturns."
          },
          {
            question: "What is a mutual fund?",
            options: [
              "A type of savings account",
              "A pooled investment vehicle managed by professionals that invests in diversified portfolios",
              "A government bond",
              "A type of credit card"
            ],
            correctAnswer: 1,
            explanation: "A mutual fund pools money from many investors and invests it in a diversified portfolio of stocks, bonds, or both, managed by professional fund managers. It offers instant diversification and professional management."
          },
          {
            question: "What does SIP stand for and what is its main benefit?",
            options: [
              "Stock Investment Program - helps you pick individual stocks",
              "Systematic Investment Plan - invests fixed amounts regularly, providing rupee cost averaging",
              "Savings Interest Plan - maximizes interest from savings accounts",
              "Special Insurance Policy - protects your investments"
            ],
            correctAnswer: 1,
            explanation: "SIP (Systematic Investment Plan) means investing a fixed amount at regular intervals (usually monthly). The main benefit is rupee cost averaging—you buy more units when prices are low and fewer when high, averaging your cost over time."
          },
          {
            question: "If you invest ₹5,000 per month for 20 years with 12% annual returns, approximately how much will you accumulate?",
            options: [
              "₹12 lakhs",
              "₹50 lakhs",
              "₹1 crore",
              "₹1.5 crores"
            ],
            correctAnswer: 3,
            explanation: "With ₹5,000/month for 20 years, you invest a total of ₹12 lakhs. At 12% annual returns through compounding, this grows to approximately ₹1.5 crores. This demonstrates the incredible power of consistent long-term investing."
          },
          {
            question: "What is diversification in investing?",
            options: [
              "Putting all your money in one investment",
              "Spreading investments across different asset classes and securities to reduce risk",
              "Only investing in your home country",
              "Checking your portfolio daily"
            ],
            correctAnswer: 1,
            explanation: "Diversification means spreading your investments across different asset classes (stocks, bonds, gold, etc.) and securities. This reduces risk because different assets perform differently under various conditions—when one falls, others may rise."
          },
          {
            question: "For someone who needs money in 2 years, which investment is most appropriate?",
            options: [
              "High-risk stock mutual funds",
              "Fixed deposits or debt funds",
              "Cryptocurrencies",
              "Real estate"
            ],
            correctAnswer: 1,
            explanation: "For short-term goals (2-3 years), stick to low-risk investments like fixed deposits or debt funds. Stock markets can be volatile in the short term, and you might be forced to sell at a loss if markets are down when you need the money."
          },
          {
            question: "What is 'rupee cost averaging'?",
            options: [
              "Converting rupees to dollars",
              "Investing a fixed amount regularly, buying more units when prices are low and fewer when high",
              "Calculating average expense per day",
              "A type of bank account"
            ],
            correctAnswer: 1,
            explanation: "Rupee cost averaging happens when you invest a fixed amount regularly (like through SIPs). When markets are down, your fixed amount buys more units; when markets are up, it buys fewer. This averages out your purchase cost over time, reducing the risk of investing all your money at a market peak."
          }
        ],
        simulation: {
          title: "SIP Investment Simulator",
          description: "Set up a mock SIP and watch your wealth grow over time with different scenarios",
          type: "investment"
        },
        dailyTip: "Set up your first SIP today—even ₹500/month into an index fund. Start small, start now. Time in the market is more important than timing the market.",
        cheatSheet: {
          title: "Investing Fundamentals Cheat Sheet",
          points: [
            "Risk ↔ Return: Higher potential returns = higher risk (unavoidable trade-off)",
            "Asset classes: Cash (3%), Debt (5-8%), Equity (10-15%), Gold (8-10%), Real Estate",
            "Mutual funds = pooled, professionally managed, diversified, accessible (start with ₹100-500)",
            "SIP = regular fixed investments (monthly), provides rupee cost averaging + discipline",
            "Example: ₹5k/month × 20 years at 12% = ₹1.5 crore (from ₹12L invested)",
            "Diversify across asset classes to reduce risk",
            "Match investments to time horizon: Short-term = debt, Long-term = equity",
            "Time in market > timing the market—start early, stay consistent"
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: "Market Mechanics",
    description: "How stock markets work, orders, exchanges, indices, reading news",
    icon: "BarChart3",
    color: "bg-pink-500",
    lessons: [
      {
        title: "How Stock Markets Actually Work",
        duration: "12 min",
        content: {
          intro: "Stock markets can seem like magical black boxes where prices jump around randomly. But they're actually organized marketplaces with clear rules, participants, and mechanisms. Understanding how markets work helps you invest intelligently and avoid costly mistakes.",
          sections: [
            {
              title: "What Stock Markets Do",
              content: "Stock markets are marketplaces where buyers and sellers trade ownership stakes in companies (stocks/shares). When you buy a stock, you become a part-owner of that company. Markets serve two purposes: (1) Primary market—companies raise capital by selling shares to investors (IPOs). (2) Secondary market—existing shares trade between investors (where most trading happens). Markets provide liquidity (ability to buy/sell quickly), price discovery (supply and demand determine fair prices), and transparency (prices and trades are public). In India, the main stock exchanges are NSE (National Stock Exchange) and BSE (Bombay Stock Exchange). Globally: NYSE and NASDAQ (US), LSE (UK), etc.",
              keyPoints: [
                "Stock markets = marketplaces for buying/selling company ownership",
                "Primary market: Companies raise capital (IPOs)",
                "Secondary market: Investors trade existing shares (most trading)",
                "Markets provide: Liquidity, price discovery, transparency",
                "India: NSE & BSE. Global: NYSE, NASDAQ, LSE"
              ]
            },
            {
              title: "Understanding Stock Prices & Market Orders",
              content: "Stock prices are determined by supply and demand—more buyers than sellers = price goes up; more sellers than buyers = price goes down. Trading happens through orders. Market order: Buy/sell immediately at current market price (fast execution, price not guaranteed). Limit order: Buy/sell only at your specified price or better (price controlled, execution not guaranteed). Stop-loss order: Automatically sell if price drops to your specified level (protects against big losses). Example: Stock trading at ₹100. Market buy order = you get it around ₹100 immediately. Limit buy at ₹95 = you only buy if price drops to ₹95 or below. Stop-loss at ₹90 = if price hits ₹90, your shares are automatically sold to limit loss.",
              keyPoints: [
                "Prices determined by supply & demand: More buyers = up, More sellers = down",
                "Market order: Execute immediately at current price (fast, price not guaranteed)",
                "Limit order: Execute only at your price or better (price controlled, may not execute)",
                "Stop-loss order: Auto-sell if price drops to specified level (limits losses)",
                "Example: Stock at ₹100 - market buy ≈₹100 now, limit buy ₹95 = wait for price drop"
              ]
            },
            {
              title: "Indices: Measuring the Market",
              content: "A stock index measures the performance of a group of stocks, representing a segment of the market. Nifty 50 (India): Top 50 companies by market cap on NSE—represents India's large-cap stocks. Sensex (India): 30 major companies on BSE—India's oldest index. S&P 500 (US): 500 large US companies—represents US market. Dow Jones: 30 major US companies. Indices are calculated using market capitalization weighting (bigger companies have more influence on index movement). When people say 'the market is up,' they usually mean major indices rose. Index funds track these indices—if you own a Nifty 50 index fund, you own a piece of all 50 companies in the index. This is passive investing—you get market returns without picking stocks.",
              keyPoints: [
                "Index = basket of stocks representing market segment",
                "Nifty 50: India's top 50 large-cap companies (NSE)",
                "Sensex: India's 30 major companies (BSE), oldest index",
                "S&P 500: 500 large US companies, represents US market",
                "Indices use market-cap weighting: Bigger companies = more influence",
                "Index funds track indices = easy diversification, market returns"
              ]
            },
            {
              title: "Reading Market News vs Market Noise",
              content: "Financial news is everywhere, but most is noise—short-term reactions, speculation, and opinions that don't affect long-term investors. Signal (what matters): Company fundamentals (earnings, revenue growth, debt levels), long-term economic trends, regulatory changes affecting industries, major management changes. Noise (ignore): Daily price movements, analyst predictions, hot stock tips, fear/greed headlines ('Market Crashes!' or 'This Stock Will 10x!'). Example of noise: 'Tech stocks down 2% today!'—irrelevant for long-term investors. Example of signal: 'Company reports 30% earnings growth, no debt, expanding to new markets'—relevant fundamental information. Develop a filter: Ask 'Will this matter in 5-10 years?' If no, it's noise. Focus on fundamentals, not fluctuations.",
              keyPoints: [
                "Most financial news = noise (short-term reactions, opinions, speculation)",
                "Signal (matters): Company fundamentals, earnings, economic trends, regulations",
                "Noise (ignore): Daily moves, predictions, hot tips, panic headlines",
                "Example noise: 'Market down 2% today!' Example signal: 'Company earnings up 30%'",
                "Filter: 'Will this matter in 5-10 years?' If no = noise",
                "Focus on fundamentals, not daily fluctuations"
              ]
            }
          ],
          summary: "Stock markets are organized marketplaces where companies raise capital and investors trade ownership. Prices are set by supply/demand, traded through market/limit/stop-loss orders. Indices like Nifty 50 and Sensex measure market performance; index funds offer easy diversification. Most news is short-term noise—focus on long-term fundamentals and company performance instead of daily fluctuations."
        },
        infographic: "Visual: Stock exchange building with buyers and sellers. Order types shown with simple icons. Nifty 50 index represented as basket of 50 company logos.",
        realLifeExample: {
          scenario: "Understand how order types work at different price levels",
          inputs: [
            { label: "Current Stock Price", defaultValue: 100, min: 10, max: 5000, step: 5, unit: "₹" },
            { label: "Your Limit Buy Price", defaultValue: 95, min: 10, max: 5000, step: 5, unit: "₹" },
            { label: "Your Stop-Loss Price", defaultValue: 85, min: 10, max: 5000, step: 5, unit: "₹" }
          ],
          calculate: (inputs) => {
            const currentPrice = inputs[0];
            const limitBuy = inputs[1];
            const stopLoss = inputs[2];

            const limitStatus = limitBuy >= currentPrice 
              ? "✅ Would execute immediately (limit >= current)"
              : "⏳ Waiting for price to drop to ₹" + limitBuy;

            const downside = currentPrice - stopLoss;
            const downsidePercent = ((downside / currentPrice) * 100).toFixed(1);

            return [
              { label: "Current Market Price", value: `₹${currentPrice}` },
              { label: "Your Limit Buy Order", value: `₹${limitBuy}` },
              { label: "Limit Order Status", value: limitStatus },
              { label: "Your Stop-Loss", value: `₹${stopLoss}` },
              { label: "Protected Downside", value: `${downsidePercent}% (₹${downside})` },
              { label: "Insight", value: stopLoss < currentPrice * 0.85 ? "⚠️ Consider tighter stop-loss" : "✓ Reasonable protection" }
            ];
          }
        },
        quiz: [
          {
            question: "What determines stock prices in the market?",
            options: [
              "The government sets all prices",
              "The company's CEO decides the price",
              "Supply and demand—more buyers push prices up, more sellers push down",
              "Stock prices are random and unpredictable"
            ],
            correctAnswer: 2,
            explanation: "Stock prices are determined by supply and demand. When more people want to buy (demand) than sell (supply), prices rise. When more want to sell than buy, prices fall. This is the fundamental mechanism of free markets."
          },
          {
            question: "What is a market order?",
            options: [
              "An order to buy/sell immediately at the current market price",
              "An order that only executes at your specified price",
              "An order from the government",
              "An order that takes exactly one day to execute"
            ],
            correctAnswer: 0,
            explanation: "A market order executes immediately at the current market price. You're prioritizing speed of execution over price control. It's the fastest way to buy or sell, but you don't control the exact price."
          },
          {
            question: "What is the Nifty 50?",
            options: [
              "A type of savings account",
              "India's stock index of the top 50 companies by market cap on NSE",
              "A government bond",
              "A credit score range"
            ],
            correctAnswer: 1,
            explanation: "Nifty 50 is India's major stock index, representing the top 50 companies by market capitalization listed on the National Stock Exchange (NSE). It's used to measure the performance of India's large-cap stock market."
          },
          {
            question: "What is a stop-loss order used for?",
            options: [
              "To buy stocks at the lowest price",
              "To automatically sell if the price drops to a specified level, limiting losses",
              "To stop trading for the day",
              "To increase your profits"
            ],
            correctAnswer: 1,
            explanation: "A stop-loss order automatically sells your shares if the price drops to your specified level. It's a risk management tool to limit potential losses. For example, if you buy at ₹100 and set stop-loss at ₹90, your shares will automatically sell if price hits ₹90."
          },
          {
            question: "Which of these is 'market noise' that long-term investors should generally ignore?",
            options: [
              "Company reports 40% earnings growth",
              "Company announces major expansion plans",
              "Stock price drops 2% in one day",
              "New regulations affecting the industry"
            ],
            correctAnswer: 2,
            explanation: "A 2% daily price drop is market noise—normal short-term volatility that doesn't affect long-term value. Earnings growth, expansion plans, and regulations are signals that can affect long-term fundamentals. Focus on substance, not short-term fluctuations."
          },
          {
            question: "What does it mean when someone says 'the market is up today'?",
            options: [
              "All stocks went up in price",
              "Major stock indices like Nifty 50 or Sensex increased",
              "The stock exchange building is physically elevated",
              "Interest rates increased"
            ],
            correctAnswer: 1,
            explanation: "When people say 'the market is up,' they typically mean major stock indices (like Nifty 50 or Sensex) increased. Not every individual stock rises—the indices represent the aggregate performance of large groups of stocks."
          },
          {
            question: "You own a stock trading at ₹200. You want to sell if it drops to ₹180 to limit losses. What order do you use?",
            options: [
              "Market order",
              "Limit order",
              "Stop-loss order at ₹180",
              "No order needed"
            ],
            correctAnswer: 2,
            explanation: "You'd use a stop-loss order at ₹180. This automatically sells your shares if the price hits ₹180, limiting your loss to ₹20 per share. It's a protective mechanism for risk management."
          },
          {
            question: "What is an index fund?",
            options: [
              "A fund that tries to beat the market",
              "A fund that tracks a specific market index like Nifty 50, providing diversification and market returns",
              "A type of savings account",
              "A government bond"
            ],
            correctAnswer: 1,
            explanation: "An index fund is a mutual fund that tracks a specific market index (like Nifty 50 or S&P 500). Instead of trying to beat the market, it aims to match the index's performance. This provides instant diversification and typically has lower fees than actively managed funds."
          }
        ],
        simulation: {
          title: "Mock Market Order Practice",
          description: "Practice placing different order types in a simulated market environment",
          type: "investment"
        },
        dailyTip: "When reading financial news today, ask: 'Will this matter in 5 years?' Filter signal from noise.",
        cheatSheet: {
          title: "Market Mechanics Essentials",
          points: [
            "Markets = organized marketplaces for trading company ownership",
            "Price = supply & demand (more buyers = up, more sellers = down)",
            "Market order: Execute now at current price (fast, price uncertain)",
            "Limit order: Execute only at your price (price controlled, may not execute)",
            "Stop-loss: Auto-sell at specified price to limit losses",
            "Nifty 50 = India's top 50 companies index (NSE), Sensex = top 30 (BSE)",
            "Index funds = track indices, easy diversification, market returns",
            "News filter: Fundamentals = signal, Daily moves = noise"
          ]
        }
      }
    ]
  },
  {
    id: 7,
    title: "Advanced Investing",
    description: "Stocks, ETFs, index funds, portfolio construction, rebalancing",
    icon: "LineChart",
    color: "bg-teal-500",
    lessons: [
      {
        title: "Building Your Investment Portfolio",
        duration: "14 min",
        content: {
          intro: "A well-constructed portfolio is diversified across asset classes, matched to your goals and risk tolerance, and requires periodic rebalancing. Whether you choose index funds, actively managed funds, or individual stocks, the principles of portfolio construction determine your long-term success.",
          sections: [
            {
              title: "Asset Allocation: The Most Important Decision",
              content: "Asset allocation—how you divide your money across different asset classes (stocks, bonds, gold, real estate, cash)—determines 80-90% of your portfolio's returns and risk. Your allocation should reflect: (1) Time horizon—longer time = more stocks, shorter = more bonds/cash. (2) Risk tolerance—comfortable with volatility = more stocks, want stability = more bonds. (3) Goals—retirement in 30 years = aggressive, house down payment in 3 years = conservative. Example allocations: Age 25, long-term: 80% equity, 15% debt, 5% gold. Age 40: 65% equity, 25% debt, 10% gold. Age 55 (near retirement): 40% equity, 50% debt, 10% gold. Rule of thumb: Equity % = 100 - your age (rough guideline, not gospel). Rebalance annually to maintain target allocation.",
              keyPoints: [
                "Asset allocation = how you divide money across asset classes",
                "Determines 80-90% of returns and risk—more important than stock picking",
                "Based on: Time horizon, risk tolerance, specific goals",
                "Example: Age 25 → 80% equity, 15% debt, 5% gold",
                "Rule of thumb: Equity % ≈ 100 - age (flexible guideline)",
                "Rebalance annually to maintain target allocation"
              ]
            },
            {
              title: "Index Funds vs Active Funds vs Individual Stocks",
              content: "Index funds: Track market indices (Nifty 50, S&P 500). Pros: Low fees (0.1-0.5%), guaranteed market returns, maximum diversification. Cons: Won't beat the market, will match it. Best for: Most investors, especially beginners. Active funds: Managers try to beat the market through stock selection. Pros: Potential to outperform. Cons: Higher fees (1-2.5%), 80% fail to beat index long-term, harder to pick winners. Individual stocks: You pick companies yourself. Pros: Potential for huge returns, full control, no fund fees. Cons: Requires significant research, time, and skill; high risk if not diversified; most individual investors underperform. Recommendation: Core portfolio = index funds (70-80%), satellite = active funds or individual stocks (20-30%) if you're interested and willing to research.",
              keyPoints: [
                "Index funds: Track indices, low fees (0.1-0.5%), market returns, max diversification",
                "Active funds: Try to beat market, higher fees (1-2.5%), 80% fail long-term",
                "Individual stocks: Potential huge returns, requires research/skill, high risk",
                "Best strategy: Core (70-80%) = index funds, Satellite (20-30%) = active/stocks if interested",
                "For most people: 100% low-cost index funds is an excellent strategy"
              ]
            },
            {
              title: "ETFs: The Flexible Alternative",
              content: "ETFs (Exchange-Traded Funds) are like mutual funds but trade on stock exchanges like individual stocks. You can buy/sell them during market hours at current prices, unlike regular mutual funds (processed once daily at closing NAV). Benefits: Lower expense ratios than most mutual funds, tax efficiency, flexibility to trade intraday, no minimum investment beyond one unit. Drawbacks: Brokerage fees per transaction, requires demat account, can trade emotionally (buying/selling too much). Popular Indian ETFs: Nifty BeES (tracks Nifty 50), Gold ETFs (track gold prices). ETFs are ideal for: Investors wanting index exposure with trading flexibility, dollar-cost averaging with smaller amounts, tax-efficient investing. Choose based on tracking error (how closely it follows index) and liquidity (trading volume).",
              keyPoints: [
                "ETFs = mutual funds that trade on exchanges like stocks",
                "Buy/sell during market hours at current prices (flexible)",
                "Benefits: Low fees, tax efficient, no minimum investment",
                "Drawbacks: Brokerage fees, need demat account, temptation to overtrade",
                "Popular: Nifty BeES (Nifty 50), Gold ETFs",
                "Choose based on: Low tracking error, high liquidity (volume)"
              ]
            },
            {
              title: "Rebalancing: Maintaining Your Strategy",
              content: "Over time, different assets grow at different rates, throwing off your target allocation. If you started with 70% equity, 30% debt, and equity outperforms, you might end up 85% equity, 15% debt—more risk than intended. Rebalancing means selling some outperformers and buying underperformers to return to your target allocation. How often: Annually or when allocation drifts 5-10% from target. Methods: (1) Sell high-performing assets, buy low-performing (forces 'buy low, sell high'). (2) Direct new contributions to underweight assets. Tax consideration: Rebalancing can trigger capital gains tax—do it tax-efficiently (use tax-advantaged accounts if available, time sales to minimize tax). Rebalancing seems counterintuitive (selling winners, buying losers) but maintains your risk level and captures gains systematically.",
              keyPoints: [
                "Rebalancing = returning portfolio to target allocation after market moves",
                "Example: Started 70/30 equity/debt, now 85/15 → rebalance back to 70/30",
                "When: Annually or when allocation drifts 5-10% from target",
                "Method: Sell outperformers, buy underperformers (forces 'buy low, sell high')",
                "Or: Direct new money to underweight assets",
                "Tax consideration: Can trigger capital gains—time strategically",
                "Maintains risk level and captures gains systematically"
              ]
            }
          ],
          summary: "Asset allocation (how you divide money across stocks, bonds, gold, etc.) is your most important investment decision. Index funds offer low-cost, diversified market returns and should form your core portfolio. ETFs provide similar benefits with trading flexibility. Rebalance annually to maintain target allocation, which systematically enforces 'buy low, sell high' and controls risk."
        },
        infographic: "Visual: Pie charts showing asset allocation at different ages (25, 40, 55). Then: Index fund vs active fund comparison. Finally: Rebalancing illustration showing portfolio drift and correction.",
        realLifeExample: {
          scenario: "Design your portfolio allocation based on age and see projected growth",
          inputs: [
            { label: "Your Age", defaultValue: 25, min: 18, max: 65, step: 1 },
            { label: "Initial Investment", defaultValue: 100000, min: 10000, max: 10000000, step: 10000, unit: "₹" },
            { label: "Years to Invest", defaultValue: 20, min: 5, max: 40, step: 1 }
          ],
          calculate: (inputs) => {
            const age = inputs[0];
            const initialInvestment = inputs[1];
            const years = inputs[2];

            // Asset allocation based on age
            const equityPercent = Math.max(20, Math.min(85, 100 - age));
            const debtPercent = Math.max(10, Math.min(70, age - 10));
            const goldPercent = Math.max(5, 100 - equityPercent - debtPercent);

            const equityAmount = initialInvestment * (equityPercent / 100);
            const debtAmount = initialInvestment * (debtPercent / 100);
            const goldAmount = initialInvestment * (goldPercent / 100);

            // Projected returns (simplified)
            const equityReturn = 0.12; // 12% annual
            const debtReturn = 0.07; // 7% annual
            const goldReturn = 0.08; // 8% annual

            const futureEquity = equityAmount * Math.pow(1 + equityReturn, years);
            const futureDebt = debtAmount * Math.pow(1 + debtReturn, years);
            const futureGold = goldAmount * Math.pow(1 + goldReturn, years);
            const totalFuture = futureEquity + futureDebt + futureGold;

            return [
              { label: "Recommended Allocation", value: `${equityPercent}% Equity, ${debtPercent}% Debt, ${goldPercent}% Gold` },
              { label: "Equity (Growth)", value: `₹${Math.round(equityAmount).toLocaleString()} → ₹${Math.round(futureEquity).toLocaleString()}` },
              { label: "Debt (Stability)", value: `₹${Math.round(debtAmount).toLocaleString()} → ₹${Math.round(futureDebt).toLocaleString()}` },
              { label: "Gold (Hedge)", value: `₹${Math.round(goldAmount).toLocaleString()} → ₹${Math.round(futureGold).toLocaleString()}` },
              { label: "Total Projected Value", value: `₹${Math.round(totalFuture).toLocaleString()}` },
              { label: "Profile", value: age < 35 ? "Aggressive (Long horizon)" : age < 50 ? "Moderate (Medium horizon)" : "Conservative (Near retirement)" }
            ];
          }
        },
        quiz: [
          {
            question: "What is the most important decision in portfolio construction?",
            options: [
              "Picking the best individual stocks",
              "Asset allocation—how you divide money across different asset classes",
              "Timing the market perfectly",
              "Choosing the fund with the highest past returns"
            ],
            correctAnswer: 1,
            explanation: "Asset allocation—how you divide your portfolio across stocks, bonds, gold, etc.—determines 80-90% of your returns and risk. It's far more important than individual security selection or market timing."
          },
          {
            question: "What is the main advantage of index funds?",
            options: [
              "They guarantee profits",
              "They beat the market every year",
              "Low fees and guaranteed market returns with maximum diversification",
              "They never lose money"
            ],
            correctAnswer: 2,
            explanation: "Index funds offer very low fees (0.1-0.5%), guarantee you'll get market returns (not beat or underperform), and provide maximum diversification. They won't beat the market, but they won't underperform either—and their low costs compound to big savings over decades."
          },
          {
            question: "What percentage of actively managed funds fail to beat their benchmark index over the long term?",
            options: [
              "About 20%",
              "About 40%",
              "About 60%",
              "About 80%"
            ],
            correctAnswer: 3,
            explanation: "Studies consistently show that about 80% of actively managed funds fail to beat their benchmark index over 10-15 year periods after accounting for fees. This is why low-cost index funds are recommended for most investors."
          },
          {
            question: "What is rebalancing?",
            options: [
              "Checking your account balance",
              "Returning your portfolio to your target asset allocation after market movements",
              "Moving all money to the best-performing asset",
              "Balancing your checkbook"
            ],
            correctAnswer: 1,
            explanation: "Rebalancing means returning your portfolio to your target asset allocation after different assets grow at different rates. For example, if you started with 70% stocks and 30% bonds but stocks outperformed and now you're 85% stocks, you'd sell some stocks and buy bonds to get back to 70/30."
          },
          {
            question: "How is an ETF different from a regular mutual fund?",
            options: [
              "ETFs are riskier",
              "ETFs trade on stock exchanges during market hours like stocks, while mutual funds process once daily",
              "ETFs are only available to wealthy investors",
              "ETFs cannot track indices"
            ],
            correctAnswer: 1,
            explanation: "ETFs trade on stock exchanges throughout market hours at current prices, like stocks. Regular mutual funds process buy/sell orders once daily at the closing NAV (Net Asset Value). Both can track indices or be actively managed."
          },
          {
            question: "A 30-year-old investor with a long time horizon should typically have what kind of asset allocation?",
            options: [
              "100% cash and bonds (very conservative)",
              "Majority in equity (70-80%) with some bonds and gold",
              "100% gold",
              "50% stocks, 50% real estate"
            ],
            correctAnswer: 1,
            explanation: "A 30-year-old with decades before retirement can afford more risk for higher returns. A typical allocation would be 70-80% equity, 15-20% debt/bonds, and 5-10% gold. Using the '100 minus age' rule: 100-30 = 70% equity."
          },
          {
            question: "When should you rebalance your portfolio?",
            options: [
              "Every day",
              "Never—let winners run",
              "Annually or when allocation drifts 5-10% from target",
              "Only during market crashes"
            ],
            correctAnswer: 2,
            explanation: "Rebalance annually or when your asset allocation drifts 5-10% from your target. This maintains your desired risk level and systematically enforces 'buy low, sell high' by selling outperformers and buying underperformers."
          },
          {
            question: "What should form the core of most investors' portfolios?",
            options: [
              "Individual stocks in hot sectors",
              "Low-cost index funds providing broad market exposure",
              "Cryptocurrencies",
              "Individual bonds"
            ],
            correctAnswer: 1,
            explanation: "For most investors, low-cost index funds should form the core (70-80%+) of the portfolio. They provide broad diversification, market returns, and very low fees. You can add active funds or individual stocks as a smaller 'satellite' portion if desired."
          }
        ],
        simulation: {
          title: "Portfolio Builder",
          description: "Construct a diversified portfolio and see how rebalancing affects long-term returns",
          type: "investment"
        },
        dailyTip: "Review your portfolio allocation today. If you haven't rebalanced in over a year, check if any asset class has drifted >10% from your target and rebalance accordingly.",
        cheatSheet: {
          title: "Portfolio Construction Essentials",
          points: [
            "Asset allocation = most important decision (80-90% of returns/risk)",
            "Rule of thumb: Equity % ≈ 100 - age (flexible guideline)",
            "Example: Age 25 → 80% equity, 15% debt, 5% gold",
            "Index funds: Low fees (0.1-0.5%), market returns, max diversification—best core",
            "80% of active funds fail to beat index long-term—index wins for most people",
            "ETFs = index funds that trade like stocks (flexible, low-cost)",
            "Rebalance: Annually or when drift >5-10% from target",
            "Core strategy: 70-80% low-cost index funds, 20-30% satellite if interested"
          ]
        }
      }
    ]
  },
  {
    id: 8,
    title: "Taxes & Legal Planning",
    description: "Tax basics, legal saving instruments, filing returns, retirement planning",
    icon: "Scale",
    color: "bg-orange-500",
    lessons: [
      {
        title: "Tax Basics & Legal Tax-Saving Strategies",
        duration: "15 min",
        content: {
          intro: "Taxes are a legal obligation and essential for funding public services. Understanding how taxes work, where they apply, and legal ways to minimize your tax burden is crucial for maximizing your wealth while staying compliant. This lesson covers lawful tax planning only—tax evasion is illegal and carries serious penalties.",
          sections: [
            {
              title: "Understanding Income Tax in India",
              content: "Income tax is charged on your total income above a basic exemption limit. Tax is progressive—higher income = higher tax rate on upper portions. For FY 2023-24 under new tax regime: ₹0-₹3L = 0%, ₹3-6L = 5%, ₹6-9L = 10%, ₹9-12L = 15%, ₹12-15L = 20%, Above ₹15L = 30%. Old regime offers deductions (80C, 80D, etc.) but higher rates. New regime has lower rates but fewer deductions. Calculate both to see which saves more. Tax is deducted at source (TDS) from salary, interest, freelance income. If excess TDS, you get refund when filing returns. File by July 31st annually (for individuals). Penalties for late filing: ₹5,000 if filed by December 31st, ₹10,000 after. Interest charged on unpaid tax. Always file even if zero tax—creates financial record, helps with loans, visas.",
              keyPoints: [
                "Income tax = progressive (higher income = higher rate on upper slices)",
                "New regime FY2023-24: 0% up to ₹3L, 5% on ₹3-6L, then 10/15/20/30%",
                "Old regime: Higher rates but deductions (80C, 80D, etc.)",
                "TDS = tax deducted at source from salary, interest, freelance income",
                "File by July 31st. Late = ₹5k penalty (by Dec 31) or ₹10k (after)",
                "Always file even if zero tax—creates financial record"
              ]
            },
            {
              title: "Legal Tax-Saving Instruments (Section 80C & Others)",
              content: "Section 80C: ₹1.5 lakh deduction (old regime only). Eligible investments: PPF (Public Provident Fund—15 year lock, 7-8% interest, tax-free returns), ELSS (Equity-Linked Savings Scheme—3 year lock mutual funds, market returns), EPF (Employee Provident Fund—automatic for salaried, ~8% interest), NSC (National Savings Certificate—5 year, ~7% interest), Life insurance premiums, tuition fees, home loan principal. Other deductions: 80D (health insurance premiums—₹25k for self, ₹25k for parents, ₹50k if parents are senior citizens), 80CCD(1B) (₹50k additional for NPS—National Pension System), 80TTA (₹10k interest on savings account), 80G (donations to specified charities). Strategy: Max out 80C with ELSS/PPF for wealth building, use 80D for health insurance (essential anyway), consider NPS for extra ₹50k deduction.",
              keyPoints: [
                "Section 80C: ₹1.5L deduction (old regime). Options: PPF, ELSS, EPF, NSC, insurance, tuition",
                "PPF: 15yr lock, 7-8% interest, tax-free returns (safe)",
                "ELSS: 3yr lock, equity mutual fund, market returns (growth potential)",
                "Section 80D: Health insurance—₹25k self, ₹25k parents (₹50k if senior)",
                "80CCD(1B): Additional ₹50k for NPS (retirement savings)",
                "80TTA: ₹10k savings interest exempt, 80G: Charity donations",
                "Strategy: Max 80C with ELSS/PPF, use 80D (essential insurance)"
              ]
            },
            {
              title: "Capital Gains Tax & Investment Taxation",
              content: "Capital gains = profit from selling investments. Short-term capital gains (STCG): Assets held <1 year (equity) or <3 years (debt/real estate). Tax: Equity STCG = 15% flat. Debt/Real estate STCG = added to income, taxed at slab rate. Long-term capital gains (LTCG): Assets held >1 year (equity) or >3 years (debt/real estate). Tax: Equity LTCG = 10% on gains >₹1 lakh (first ₹1L exempt annually). Debt/Real estate LTCG = 20% with indexation benefit (adjusts for inflation). Dividends: Added to income, taxed at slab rate (10% TDS if >₹5,000). Interest income: Added to income, taxed at slab. TDS if >₹10,000 from bank, >₹5,000 from post office. Strategy: Hold equity >1 year for lower tax, consider tax-efficient investments like equity funds over FDs in high tax brackets.",
              keyPoints: [
                "STCG (short-term): Equity <1yr = 15% flat. Debt <3yr = slab rate",
                "LTCG (long-term): Equity >1yr = 10% on gains >₹1L. Debt >3yr = 20% with indexation",
                "First ₹1 lakh equity LTCG exempt annually",
                "Dividends & interest: Added to income, taxed at your slab rate",
                "TDS on interest if >₹10k (bank) or >₹5k (post office)",
                "Strategy: Hold equity >1 year, prefer equity over FDs in high tax brackets"
              ]
            },
            {
              title: "Filing Returns: Process & Requirements",
              content: "Who must file: Income >₹2.5L (₹3L for senior citizens), TDS deducted, claiming refund, foreign assets/income. Process: (1) Collect documents—Form 16 (salary TDS), bank interest certificates, investment proofs, Form 26AS (consolidated tax statement). (2) Choose regime—old (with deductions) or new (lower rates). (3) File on income tax e-filing portal or through CA. (4) Verify e-return within 30 days (Aadhaar OTP, EVC, or send signed ITR-V). (5) If refund due, processed in 2-4 weeks. Forms: ITR-1 (salary + one house), ITR-2 (multiple houses, capital gains), ITR-3 (business), ITR-4 (presumptive). Get help if complex: CA fees typically ₹500-₹5,000 depending on complexity. Maintain records for 7 years—rent receipts, investment proofs, medical bills, donation receipts.",
              keyPoints: [
                "Must file if: Income >₹2.5L, TDS deducted, claiming refund, foreign assets",
                "Process: Collect docs (Form 16, 26AS) → Choose regime → File online → Verify within 30 days",
                "Forms: ITR-1 (salary), ITR-2 (multiple houses/gains), ITR-3/4 (business)",
                "Verify via Aadhaar OTP, EVC, or signed ITR-V",
                "Complex returns: Hire CA (₹500-₹5k). Worth it for peace of mind",
                "Maintain records 7 years: Rent, investments, medical, donations"
              ]
            }
          ],
          summary: "Income tax in India is progressive with two regimes—old (deductions, higher rates) vs new (lower rates, fewer deductions). Legal tax-saving through 80C (₹1.5L—PPF, ELSS, EPF), 80D (health insurance), 80CCD(1B) (₹50k NPS). Capital gains taxed based on holding period—equity held >1 year gets favorable 10% LTCG (>₹1L). File returns by July 31st even if zero tax. Consult tax professionals for complex situations. IMPORTANT: This is general education—tax evasion is illegal; only use legal deductions and consult professionals for personalized advice."
        },
        infographic: "Visual: Tax slab chart showing progressive rates. Then: Section 80C options (PPF, ELSS, EPF) with lock-in periods. Finally: Filing process flowchart from document collection to verification.",
        realLifeExample: {
          scenario: "Calculate tax liability under both old and new regime to see which saves more",
          inputs: [
            { label: "Annual Gross Income", defaultValue: 800000, min: 0, max: 50000000, step: 10000, unit: "₹" },
            { label: "Section 80C Investments", defaultValue: 150000, min: 0, max: 150000, step: 10000, unit: "₹" },
            { label: "Health Insurance Premium (80D)", defaultValue: 25000, min: 0, max: 100000, step: 5000, unit: "₹" },
            { label: "NPS Investment (80CCD1B)", defaultValue: 50000, min: 0, max: 50000, step: 10000, unit: "₹" }
          ],
          calculate: (inputs) => {
            const grossIncome = inputs[0];
            const s80c = Math.min(inputs[1], 150000);
            const s80d = Math.min(inputs[2], 100000);
            const nps = Math.min(inputs[3], 50000);

            // Old regime calculation
            const taxableOld = Math.max(0, grossIncome - s80c - s80d - nps - 50000); // 50k standard deduction
            let taxOld = 0;
            
            if (taxableOld > 250000) taxOld += (Math.min(taxableOld, 500000) - 250000) * 0.05;
            if (taxableOld > 500000) taxOld += (Math.min(taxableOld, 1000000) - 500000) * 0.20;
            if (taxableOld > 1000000) taxOld += (taxableOld - 1000000) * 0.30;

            // New regime calculation (simplified FY23-24)
            let taxNew = 0;
            if (grossIncome > 300000) taxNew += (Math.min(grossIncome, 600000) - 300000) * 0.05;
            if (grossIncome > 600000) taxNew += (Math.min(grossIncome, 900000) - 600000) * 0.10;
            if (grossIncome > 900000) taxNew += (Math.min(grossIncome, 1200000) - 900000) * 0.15;
            if (grossIncome > 1200000) taxNew += (Math.min(grossIncome, 1500000) - 1200000) * 0.20;
            if (grossIncome > 1500000) taxNew += (grossIncome - 1500000) * 0.30;

            const savings = taxOld - taxNew;

            return [
              { label: "Gross Income", value: `₹${grossIncome.toLocaleString()}` },
              { label: "Old Regime Tax", value: `₹${Math.round(taxOld).toLocaleString()}` },
              { label: "New Regime Tax", value: `₹${Math.round(taxNew).toLocaleString()}` },
              { label: "Better Option", value: taxOld < taxNew ? "Old Regime (with deductions)" : "New Regime" },
              { label: "You Save", value: `₹${Math.abs(Math.round(savings)).toLocaleString()} with better option` },
              { label: "Recommendation", value: savings > 10000 ? "💡 Old regime worth the deduction effort" : savings < -10000 ? "✅ New regime simpler, saves more" : "Similar—choose based on simplicity preference" }
            ];
          }
        },
        quiz: [
          {
            question: "What is the maximum deduction available under Section 80C?",
            options: [
              "₹50,000",
              "₹1,00,000",
              "₹1,50,000",
              "₹2,00,000"
            ],
            correctAnswer: 2,
            explanation: "Section 80C allows a maximum deduction of ₹1,50,000 (₹1.5 lakh) for eligible investments like PPF, ELSS, EPF, life insurance premiums, tuition fees, and home loan principal repayment. This applies to the old tax regime."
          },
          {
            question: "What is ELSS and why is it popular for tax saving?",
            options: [
              "A type of savings account",
              "Equity-Linked Savings Scheme—a mutual fund with 3-year lock-in that qualifies for 80C deduction",
              "A government bond",
              "An insurance policy"
            ],
            correctAnswer: 1,
            explanation: "ELSS (Equity-Linked Savings Scheme) is a type of equity mutual fund that invests in stocks and qualifies for Section 80C tax deduction. It has the shortest lock-in period (3 years) among 80C options and offers potential for higher returns through equity exposure."
          },
          {
            question: "How are long-term capital gains (LTCG) from equity mutual funds taxed?",
            options: [
              "0% tax",
              "10% on gains exceeding ₹1 lakh per year",
              "15% flat on all gains",
              "Added to income and taxed at slab rate"
            ],
            correctAnswer: 1,
            explanation: "Long-term capital gains (holding >1 year) from equity mutual funds and stocks are taxed at 10% on gains exceeding ₹1 lakh per financial year. The first ₹1 lakh of LTCG is tax-exempt annually."
          },
          {
            question: "By what date must individual taxpayers file their income tax returns?",
            options: [
              "March 31st",
              "April 15th",
              "July 31st",
              "December 31st"
            ],
            correctAnswer: 2,
            explanation: "For individuals (non-audit cases), the deadline to file income tax returns is July 31st of the assessment year. Late filing attracts penalties—₹5,000 if filed by Dec 31st, ₹10,000 if filed after, plus interest on unpaid tax."
          },
          {
            question: "What is the main difference between the old and new tax regimes in India?",
            options: [
              "New regime has higher rates but offers deductions; old has lower rates without deductions",
              "Old regime has higher rates but offers deductions; new has lower rates with fewer deductions",
              "They are exactly the same",
              "Old regime is for businesses only"
            ],
            correctAnswer: 1,
            explanation: "The old tax regime has higher rates but allows numerous deductions (80C, 80D, etc.). The new regime offers lower tax rates but eliminates most deductions. Taxpayers can choose which regime to use based on their deduction eligibility."
          },
          {
            question: "Which investment offers tax-free returns on maturity?",
            options: [
              "Fixed Deposit",
              "Public Provident Fund (PPF)",
              "Regular mutual funds",
              "Savings account"
            ],
            correctAnswer: 1,
            explanation: "PPF (Public Provident Fund) offers triple tax benefits—EEE (Exempt-Exempt-Exempt): investment qualifies for 80C deduction, interest earned is tax-free, and maturity proceeds are completely tax-free. The lock-in period is 15 years."
          },
          {
            question: "What is Section 80D used for?",
            options: [
              "Claiming deduction on home loan interest",
              "Claiming deduction on health insurance premiums",
              "Claiming deduction on education expenses",
              "Claiming deduction on charity donations"
            ],
            correctAnswer: 1,
            explanation: "Section 80D allows deduction for health insurance premiums—up to ₹25,000 for self/family, additional ₹25,000 for parents (₹50,000 if parents are senior citizens). This incentivizes essential health coverage while providing tax benefits."
          },
          {
            question: "Which statement about tax planning is TRUE?",
            options: [
              "Tax evasion and tax avoidance are both legal",
              "You should use illegal methods to minimize tax since everyone does it",
              "Legal tax planning using deductions and exemptions is encouraged; tax evasion is illegal and punishable",
              "Filing tax returns is optional if you earn below ₹10 lakhs"
            ],
            correctAnswer: 2,
            explanation: "Legal tax planning—using lawful deductions, exemptions, and tax-saving instruments—is encouraged and smart. Tax evasion (illegally hiding income or providing false information) is a serious crime with penalties including fines and imprisonment. Always stay compliant and consult professionals when unsure."
          }
        ],
        simulation: {
          title: "Tax Calculator & Scenario Planner",
          description: "Input your income and investments to compare old vs new regime and optimize tax savings",
          type: "compound"
        },
        dailyTip: "Start maintaining a folder (physical or digital) for tax documents—Form 16, investment proofs, rent receipts, medical bills. Come filing season, you'll thank yourself.",
        cheatSheet: {
          title: "Tax Essentials Cheat Sheet",
          points: [
            "Income tax = progressive. New regime: 0% to ₹3L, then 5/10/15/20/30%. Old: Higher rates but deductions",
            "Section 80C: ₹1.5L deduction. Best options: ELSS (3yr lock, equity returns), PPF (15yr lock, tax-free)",
            "Section 80D: Health insurance—₹25k self, ₹25k parents (₹50k if senior)",
            "80CCD(1B): Extra ₹50k deduction for NPS (retirement)",
            "Equity LTCG (>1yr): 10% on gains >₹1L. Equity STCG (<1yr): 15% flat",
            "File by July 31st. Penalties: ₹5k (by Dec 31) or ₹10k (after)",
            "IMPORTANT: Use legal deductions only. Tax evasion = serious crime",
            "Complex taxes: Hire CA (₹500-5k). Worth it for accuracy & peace of mind"
          ]
        }
      }
    ]
  }
];
