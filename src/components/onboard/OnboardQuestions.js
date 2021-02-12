export const income = {
  type: "DollarInput",
  question: "How much money did you make in 2020",
  placeholder: "",
  description: "A ballpark estimate is fine. The closer the better!",
  options: {},
  stateName: "estimatedIncome",
};

export const dependence = {
  type: "SingleSelect",
  question: "Can you be claimed as a dependent in 2020?",
  description:
    "Did your parents pay for most of your expenses (i.e. rent, food)?",
  options: { Yes: "Yes", No: "No", "I'm not sure": "idk" },
  stateName: "dependent",
};

export const educationCredits = {
  type: "SingleSelect",
  question: "Have you ever claimed educational tax credits before?",
  description: "Most people haven't! That's why we made Standard.",
  options: { Yes: "Yes", No: "No", "Not Sure": "idk" },
  stateName: "taxCredits",
};

export const covidCredits = {
  type: "DollarInput",
  question: "How much have you received in government COVID stimulus checks?",
  description:
    "If you received less than $1,800, you may qualify to get the difference in your refund.",
  options: {},
  stateName: "covidCredits",
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
    "How much of your own money did you spend on education-related expenses in 2020?",
  description: "This includes tuition, electronics, chargers, supplies, etc.",
  options: {},
  stateName: "educationExpenses",
};

export const studentLoans = {
  type: "DollarInput",
  question: "How much of your student loans did you pay off in 2020?",
  description: "Most students don't begin loan repayment until graduation.",
  options: {},
  stateName: "loanPayments",
};
export const job = {
  type: "JobInput",
  question: "Who was your primary employer?",
  description:
    "List the company from which you made the majority of your income.",
  options: {},
  stateName: "job",
};
export const state = {
  type: "Dropdown",
  question: "Where did you make most of your money?",
  description:
    "We want to know where you lived when you worked, which could be different than where your employer is based",
  options: {
    Alabama: "AL",
    Alaska: "AK",
    "American Samoa": "AS",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    "District of Columbia": "DC",
    Florida: "FL",
    Georgia: "GA",
    Guam: "GU",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Northern Mariana Islands": "MP",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Puerto Rico": "PR",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    "Virgin Islands": "VI",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
    "N/A": "N/A",
    Internationally: "IX",
  },
  stateName: "state",
};
export const studentStatus = {
  type: "SingleSelect",
  question: "Were you a student at least part-time last year?",
  description: "",
  options: { Yes: "Yes", No: "No" },
  stateName: "student",
};
export const citizenStatus = {
  type: "SingleSelect",
  question: "Are you a U.S. citizen?",
  description: "You're eligible for a refund regardless.",
  options: { Yes: "Yes", No: "No" },
  stateName: "citizen",
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
  question: "Where do/did you go to school?",
  description: "",
  options: {},
  stateName: "school",
};
export const intlStudent = {
  type: "SingleSelect",
  question: "Are you an international student?",
  description: "",
  options: { Yes: "Yes", No: "No", None: "HEy" },
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
