export const income = {
  type: "DollarInput",
  question: "How much money did you make last year?",
  placeholder: "",
  description: "A ball park is fine, round to the nearest $1000",
  options: {},
  stateName: "estimatedIncome",
};

export const dependence = {
  type: "SingleSelect",
  question: "Can you be claimed as a dependent for 2020?",
  description:
    "Did your parents pay for most of your expenses (i.e. rent, food)",
  options: { Yes: "Yes", No: "No", "I'm not sure": "idk" },
  stateName: "dependent",
};

export const educationCredits = {
  type: "SingleSelect",
  question: "Have you ever claimed educational tax credits before?",
  description: "Most people haven't! That's why we made Alan.",
  options: { Yes: "Yes", No: "No", "Not Sure": "idk" },
  stateName: "taxCredits",
};

export const taxMethod = {
  type: "Dropdown",
  question: "How did you file your taxes last year?",
  description: "",
  options: {
    "I didn't file taxes.": "I didn't file taxes.",
    "My parents (or their tax person) filed for me.":
      "My parents (or their tax person) filed for me.",
    "I used TurboTax or another tax software.":
      "I used TurboTax or another tax software.",
    "I paid someone to file for me.": "I paid someone to file for me.",
    "I filed manually.": "I filed manually.",
    "I don't know.": "I don't know.",
  },
  stateName: "howFiled",
};
export const refundSize = {
  type: "DollarInput",
  question: "Estimate the size of the tax refund you received last year.",
  description: "",
  options: {},
  stateName: "estimatedRefund",
};

export const educationExpenses = {
  type: "DollarInput",
  question:
    "How much of your own money did you spend on educational expenses last year?",
  description:
    "This includes money spent on tuition, electronics, chargers, textbooks, and other supplies",
  options: {},
  stateName: "educationExpenses",
};

export const studentLoans = {
  type: "DollarInput",
  question: "How much of your student loans did you pay off in 2020?",
  description:
    "Most students usually don't begin loan repayment until graduation.",
  options: {},
  stateName: "loanPayments",
};
export const job = {
  type: "JobInput",
  question: "Where did you work last year and what'd you do?",
  description:
    "We know you may have worked at many places, just put the one that you made the most money from. If you didn't work anywhere put N/A for both.",
  options: {},
  stateName: "job",
};
export const state = {
  type: "Dropdown",
  question: "Where did you work from most of the time last year?",
  description:
    "Not where your employer was, where ever you physically lived while working. Your parents house, a random apartment with friends, school dorm, etc.",
  options: {Minnesota: "MN", "N/A": "N/A", Internationally: "IX"},
  stateName: "state",
};
export const studentStatus = {
  type: "SingleSelect",
  question: "Were you a student at least part-time last year?",
  description: "",
  options: { Yes: "Yes", No: "No" },
  stateName: "student",
};

export const name = {
  type: "NameInput",
  question: "Name",
  description: "",
  options: {},
  stateName: "name",
};
export const school = {
  type: "SchoolInput",
  question: "",
  description: "",
  options: {},
  stateName: "school",
};
export const intlStudent = {
  type: "SingleSelect",
  question: "Are you an international student?",
  description: "",
  options: { Yes: "Yes", No: "No", None: "HEy"},
  stateName: "international",
};

export const phoneNumber = {
  type: "PhoneNumberInput",
  question: "Phone Number",
  description: "",
  options: {},
  stateName: "phone",
};

export const refund = {
  type: "Refund",
  question: "",
  description: "",
  options: {},
  stateName: "refund",
};
