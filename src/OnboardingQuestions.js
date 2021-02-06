export const income = {
  type: "Dropdown",
  question: "How much money did you make last year?",
  description: "An estimate is fine.",
  options: {"$0-$5,000": 5000, "$5,000-$10,000": 10000, "$10,000-$20,000": 20000, "$20,000-$30,000": 30000, "$30,000-$40,000": 40000, "$40,000+": 50000},
  stateName: "estimatedIncome"
};

export const dependence = {
  type: "SingleSelect",
  question: "Can you be claimed as a dependent for 2020?",
  description:
    "Did your parents pay for most of your expenses (i.e. rent, food)",
  options: {"Yes": "Yes", "No": "No", "I'm not sure": "idk"},
  stateName: "dependent"
};

export const educationCredits = {
  type: "SingleSelect",
  question: "Have you ever claimed educational tax credits before?",
  description: "Most people haven't! That's why we made Alan.",
  options: {"Yes": "Yes", "No": "No", "Not Sure": "idk"},
  stateName: "taxCredits"
};

export const taxMethod = {
  type: "Dropdown",
  question: "How did you file your taxes last year?",
  description: "",
  options: {
    "I didn't file taxes.": "I didn't file taxes.",
    "My parents (or their tax person) filed for me.": "My parents (or their tax person) filed for me.",
    "I used TurboTax or another tax software.": "I used TurboTax or another tax software.",
    "I paid someone to file for me.": "I paid someone to file for me.",
    "I filed manually.": "I filed manually.",
    "I don't know.": "I don't know.",
  },
  stateName: "howFiled"
};
export const refundSize = {
  type: "DollarInput",
  question: "Estimate the size of the tax refund you received last year.",
  description: "",
  options: [],
  stateName: "estimatedRefund"
};

export const educationExpenses = {
  type: "DollarInput",
  question:
    "How much of your own money did you spend on educational expenses last year?",
  description:
    "This includes money spent on tuition, electronics, chargers, textbooks, and other supplies",
  options: [],
  stateName: "educationExpenses"
};

export const studentLoans = {
  type: "DollarInput",
  question: "How much of your student loans did you pay off in 2020?",
  description:
    "Most students usually don't begin loan repayment until graduation.",
  options: [],
  stateName: "loanPayments"
};
export const studentStatus = {
  type: "SingleSelect",
  question: "Were you a student for at least 5 months last year?",
  description: "",
  options: {"Yes": "Yes", "No": "No", "Not Sure": "idk"},
  stateName: "student"
};
