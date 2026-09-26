// ============================================================================
// GAME 2: Tech & AI Quiz — 5 Complete Sets of 15 Questions (75 Questions)
// GritinAI Connect 2.0 — AI & Tech Quiz
// Deep coverage of GritinAI products, Connect 2.0, Africa's tech ecosystem,
// Nigerian startups, global computing history, AI foundations and cybersecurity
// ============================================================================

// ----------------------------------------------------------------------------
// SET 1 (ROUND 1)
// ----------------------------------------------------------------------------
const SET1 = [
  {
    type: 'quiz',
    label: 'GritinAI\'s product "Ubá" is best described as what?',
    subtitle: 'One of GritinAI\'s own products.',
    options: [
      'A smart inventory management tool',
      'An AI prototyping tool',
      'A live mentoring platform',
      'A government policy dashboard'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "GPT" stand for in ChatGPT?',
    subtitle: 'Powers ChatGPT.',
    options: [
      'General Purpose Training',
      'Generative Pre-trained Transformer',
      'Global Processing Terminal',
      'Generative Programming Tool'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Paystack, the Nigerian fintech acquired by Stripe in 2020, was founded in what year?',
    subtitle: 'Acquired by Stripe in 2020.',
    options: ['2013', '2019', '2015', '2017'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Keynote speaker Mrs Olamide Efosa\'s talk, "The Catalyst Effect," focuses on what?',
    subtitle: 'Her keynote talk title.',
    options: [
      'Building government AI policy frameworks',
      'AI ethics and responsible data use',
      'AI applications in healthcare diagnostics',
      'Harnessing AI for African economic growth and entrepreneurship'
    ],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "LLM" stand for in AI?',
    subtitle: 'Powers tools like ChatGPT.',
    options: [
      'Large Language Model',
      'Layered Learning Method',
      'Linked Logic Model',
      'Long Learning Machine'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'A googol is a number followed by how many zeros?',
    subtitle: 'Inspired a search engine\'s name.',
    options: ['10 zeros', '100 zeros', '1,000 zeros', '10,000 zeros'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Where is GritinAI Connect 2.0 taking place?',
    subtitle: 'Same as Connect 1.0.',
    options: [
      'Glass House, Airport Road',
      'Benin Mall',
      'Victor Uwaifo Creative Hub',
      'Rema Dome'
    ],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Nvidia is best known for making which kind of chip, now central to training AI models?',
    subtitle: 'Key AI hardware maker.',
    options: ['CPU', 'RAM', 'SSD', 'GPU'],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Flutterwave, one of Africa\'s most valuable startups, was founded in what year?',
    subtitle: 'Major African payments startup.',
    options: ['2016', '2014', '2015', '2018'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Peter Nnachor leads which workshop track at GritinAI Connect 2.0?',
    subtitle: 'A hands-on session track.',
    options: [
      'Build with Ubá',
      'Build with Rapid',
      'Build with Omnili',
      'MSME Clinic'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'AlphaGo, the program that beat a world champion Go player, was developed by which AI lab?',
    subtitle: 'Beat a Go champion.',
    options: ['OpenAI', 'Anthropic', 'DeepMind', 'Meta AI'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'IBM\'s Deep Blue famously defeated which world chess champion in 1997?',
    subtitle: '1997 chess match, man vs machine.',
    options: [
      'Anatoly Karpov',
      'Magnus Carlsen',
      'Bobby Fischer',
      'Garry Kasparov'
    ],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Mrs Ysika moderates which panel session at GritinAI Connect 2.0?',
    subtitle: 'A panel discussion topic.',
    options: [
      'Catalysing Africa\'s Digital Economy',
      'AI for Governance Transformation',
      'Workforce Readiness & Skills',
      'Sustainable AI Integration'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Andela, the Nigerian-founded tech company, is best known for what?',
    subtitle: 'Connects African talent globally.',
    options: [
      'Running an e-commerce logistics network',
      'Training and placing software developers with global companies',
      'Offering student loans for tech bootcamps',
      'Manufacturing computer hardware locally'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Nigeria\'s 3MTT programme aims to train how many million tech talents?',
    subtitle: 'A federal training initiative.',
    options: ['1 million', '5 million', '3 million', '2 million'],
    correct: 2,
    timer: 12
  }
];

// ----------------------------------------------------------------------------
// SET 2 (ROUND 2)
// ----------------------------------------------------------------------------
const SET2 = [
  {
    type: 'quiz',
    label: 'What is the name of GritinAI\'s live mentoring platform?',
    subtitle: 'GritinAI\'s mentoring platform.',
    options: ['Ubá', 'Rapid', 'Omnili', 'Omnify'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "API" stand for?',
    subtitle: 'Lets two apps talk.',
    options: [
      'Automated Program Input',
      'Application Programming Interface',
      'Application Process Integration',
      'Advanced Programming Index'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Kuda, the Nigerian digital bank, is best known for offering what kind of service?',
    subtitle: 'Nicknamed "the money app."',
    options: [
      'Digital-only micro-insurance',
      'Peer-to-peer crypto trading',
      'Mobile airtime reselling',
      'Fully digital, branchless banking'
    ],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "IoT" stand for?',
    subtitle: 'Smart fridges and watches.',
    options: [
      'Internet of Things',
      'Internet of Technology',
      'Interface of Transfer',
      'Integrated Online Tools'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Favour Chima leads which session at GritinAI Connect 2.0?',
    subtitle: 'A founder-focused session.',
    options: [
      'MSME Clinic',
      'Build with Rapid',
      'Startup Pitch / Community Forum',
      'AI for Governance Transformation'
    ],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is "machine learning" in AI?',
    subtitle: 'Behind Netflix recommendations.',
    options: [
      'Systems programmed with fixed, hardcoded rules only',
      'A method for encrypting sensitive data',
      'A type of computer processor',
      'Systems that improve at tasks by learning from data'
    ],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "CBN" stand for, the body that regulates Nigerian fintechs?',
    subtitle: 'Regulates the Naira.',
    options: [
      'Central Bank of Nigeria',
      'Commercial Bank of Nigeria',
      'Corporate Banking Network',
      'Central Business Nigeria'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "SaaS" stand for?',
    subtitle: 'How apps like Netflix are sold.',
    options: [
      'Service as a Software',
      'Software as a Service',
      'System as a Solution',
      'Storage as a Service'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'GritinAI Connect 2.0\'s "MSME Clinic" session offers attendees what?',
    subtitle: 'A Connect 2.0 business session.',
    options: [
      'Free legal consultation for businesses',
      'Free accounting software trial',
      'Free AI consultation for businesses',
      'Free co-working space access'
    ],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which AI model architecture, introduced in a landmark 2017 paper, powers most modern chatbots?',
    subtitle: 'From a 2017 research paper.',
    options: ['Perceptron', 'Recurrent Network', 'Decision Tree', 'Transformer'],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Jumia, often called "Africa\'s Amazon," primarily operates in what space?',
    subtitle: 'Called "Africa\'s Amazon."',
    options: ['E-commerce', 'Ride-hailing', 'Food delivery only', 'Digital banking'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "UX" stand for in tech and design?',
    subtitle: 'About ease of use.',
    options: [
      'User Exchange',
      'User Experience',
      'Unified Experience',
      'User Extension'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'When does standard registration close for GritinAI Connect 2.0?',
    subtitle: 'Later than early bird.',
    options: [
      'September 20, 2026',
      'September 1, 2026',
      'August 1, 2026',
      'October 1, 2026'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "CPU" stand for?',
    subtitle: 'The computer\'s "brain."',
    options: [
      'Core Processing Utility',
      'Central Program Unit',
      'Central Processing Unit',
      'Computer Processing Utility'
    ],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'How many sessions does GritinAI Connect 2.0 run across its single day?',
    subtitle: 'Check the day\'s schedule.',
    options: ['12', '18', '20', '15'],
    correct: 3,
    timer: 12
  }
];

// ----------------------------------------------------------------------------
// SET 3 (ROUND 3)
// ----------------------------------------------------------------------------
const SET3 = [
  {
    type: 'quiz',
    label: 'What does "AR" stand for, as used in filters and try-on apps?',
    subtitle: 'Used in Instagram filters.',
    options: [
      'Automated Rendering',
      'Augmented Reality',
      'Artificial Response',
      'Advanced Recognition'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'PiggyVest, one of Nigeria\'s earliest savings and investment apps, was founded in what year?',
    subtitle: 'Started as "Piggybank.ng."',
    options: ['2014', '2018', '2012', '2016'],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'GritinAI describes itself as building products for local businesses, government, and which other sector?',
    subtitle: 'Listed beside "Government."',
    options: ['Entertainment', 'Education', 'Agriculture', 'Real estate'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "NLP" stand for in AI?',
    subtitle: 'Lets machines read language.',
    options: [
      'Natural Language Processing',
      'Neural Learning Process',
      'Network Language Protocol',
      'Natural Logic Programming'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Interswitch, one of Nigeria\'s earliest fintech infrastructure companies, was founded in what year?',
    subtitle: 'Powers card/ATM transactions.',
    options: ['2006', '1998', '2002', '2010'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What insect is credited with giving us the computing term "bug," found in a 1947 computer relay?',
    subtitle: 'A 1947 computing legend.',
    options: ['Moth', 'Beetle', 'Ant', 'Cockroach'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is a "chatbot" in simple terms?',
    subtitle: 'Used for website support.',
    options: [
      'A device that charges your phone wirelessly',
      'A tool that blocks spam emails',
      'A robot that physically moves around an office',
      'A program designed to simulate conversation with users'
    ],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Who is widely regarded as the world\'s first computer programmer, for her 1800s work with Charles Babbage?',
    subtitle: 'Worked with Charles Babbage.',
    options: ['Grace Hopper', 'Katherine Johnson', 'Ada Lovelace', 'Marie Curie'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "OS" stand for, as in the software that runs a phone or computer?',
    subtitle: 'Runs on every phone.',
    options: ['Online Software', 'Operating System', 'Open Source', 'Output Sequence'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'GritinAI Connect 2.0\'s early bird registration closes when?',
    subtitle: 'Ends before the standard one.',
    options: ['July 15, 2026', 'June 1, 2026', 'August 20, 2026', 'August 1, 2026'],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is "cloud computing"?',
    subtitle: 'Why Google Drive works anywhere.',
    options: [
      'A method of predicting weather using AI',
      'Storing and running data/services over the internet instead of locally',
      'A way of cooling down computer hardware',
      'A type of wireless charging technology'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'OPay, one of Nigeria\'s most-downloaded mobile money apps, launched in the Nigerian market in what year?',
    subtitle: 'Backed by a browser maker.',
    options: ['2016', '2020', '2018', '2014'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'GritinAI Connect 1.0 (2025) was held in which month?',
    subtitle: 'Same month as 2026\'s edition.',
    options: ['June', 'November', 'September', 'March'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "VPN" stand for?',
    subtitle: 'For private browsing.',
    options: [
      'Verified Public Node',
      'Virtual Protected Node',
      'Variable Privacy Network',
      'Virtual Private Network'
    ],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'ENIAC, one of the world\'s first electronic general-purpose computers, stands for what?',
    subtitle: 'One of the earliest computers.',
    options: [
      'Electronic Numerical Integrator and Calculator',
      'Electronic Numerical Integrator and Computer',
      'Electric Network Integrated Automatic Computer',
      'Enhanced Numeric Integrated Analog Computer'
    ],
    correct: 1,
    timer: 12
  }
];

// ----------------------------------------------------------------------------
// SET 4 (ROUND 4)
// ----------------------------------------------------------------------------
const SET4 = [
  {
    type: 'quiz',
    label: 'What is a "blockchain"?',
    subtitle: 'Behind Bitcoin.',
    options: [
      'A decentralized digital ledger that records transactions across many computers',
      'A physical hard drive used for extra storage',
      'A type of firewall software',
      'A programming language for building apps'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which Nigerian telecom operator began commercial GSM service first, edging out MTN by about a day in August 2001?',
    subtitle: 'Beat MTN by a day.',
    options: ['MTN', 'Econet Wireless', '9mobile', 'Globacom'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'According to GritinAI\'s own numbers, how many Nigerian states has the company served so far?',
    subtitle: 'On GritinAI\'s "Vision" page.',
    options: ['20+', '10+', '3+', '36 (all states)'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "encryption" do to data?',
    subtitle: 'Keeps messages private.',
    options: [
      'Compresses it to save storage space',
      'Deletes it permanently',
      'Backs it up automatically to the cloud',
      'Converts it into a coded form to prevent unauthorized access'
    ],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'NITDA, the Nigerian agency responsible for IT policy, stands for what?',
    subtitle: 'Handles IT policy.',
    options: [
      'National Information Technology Development Agency',
      'National IT & Digital Affairs',
      'Nigeria Information Technology Directorate',
      'Nigerian Internet & Telecoms Development Authority'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "Wi-Fi" actually stand for?',
    subtitle: 'Not quite what people assume.',
    options: [
      'Wireless Fidelity',
      'Just a brand name, not an acronym',
      'Wide Internet',
      'Wireless Frequency'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'In AI, what is a "neural network" loosely modeled after?',
    subtitle: 'Modeled after the brain.',
    options: [
      'A computer\'s hard drive',
      'An internet router',
      'The human brain\'s neurons',
      'A city\'s road network'
    ],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Globacom, Nigeria\'s first indigenous GSM operator, introduced which first-of-its-kind billing system in 2003?',
    subtitle: 'Ended the "full minute" charge.',
    options: [
      'Prepaid-only billing',
      'Data-only billing',
      'Flat-rate billing',
      'Per-second billing'
    ],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Besides leading "Build with Rapid," what other Connect 2.0 session does Peter Nnachor lead?',
    subtitle: 'His other Connect 2.0 session.',
    options: [
      'MSME Clinic',
      'Startup Pitch',
      'Workforce Readiness & Skills',
      'AI for Governance Transformation'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "big data" refer to?',
    subtitle: 'Too much for old tools to handle.',
    options: [
      'A large physical hard drive',
      'Extremely large, complex datasets that traditional tools struggle to process',
      'A type of computer virus',
      'A programming language for spreadsheets'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which of these is a real GritinAI partner organisation?',
    subtitle: 'A real GritinAI partner.',
    options: [
      'Facebook Developer Circle Lagos',
      'AWS User Group Abuja',
      'GDG Benin',
      'Microsoft Reactor Nigeria'
    ],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does the NCC, Nigeria\'s telecom regulator, stand for?',
    subtitle: 'Regulates MTN, Airtel, etc.',
    options: [
      'National Cybersecurity Council',
      'Nigeria Cloud Computing Corporation',
      'National Connectivity Commission',
      'Nigerian Communications Commission'
    ],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What time does Mrs Olamide Efosa\'s keynote begin at Connect 2.0?',
    subtitle: 'Her keynote\'s start time.',
    options: ['10:45 AM', '9:00 AM', '11:30 AM', '1:15 PM'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'The "Turing Test," named after Alan Turing, checks whether a machine can do what?',
    subtitle: 'About fooling a human.',
    options: [
      'Solve complex math equations faster than a human',
      'Convincingly imitate human conversation',
      'Beat a human at chess',
      'Predict the weather accurately'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Moniepoint, one of Nigeria\'s newest fintech "unicorns," started out under what name?',
    subtitle: 'Started as a POS platform.',
    options: ['Cellulant', 'Interswitch', 'TeamApt', 'Quickteller'],
    correct: 2,
    timer: 12
  }
];

// ----------------------------------------------------------------------------
// SET 5 (ROUND 5)
// ----------------------------------------------------------------------------
const SET5 = [
  {
    type: 'quiz',
    label: 'GritinAI\'s "Rapid" product is designed to help users do what?',
    subtitle: 'GritinAI\'s prototyping tool.',
    options: [
      'Quickly prototype AI-powered ideas',
      'Track business inventory',
      'Provide live mentorship sessions',
      'Process loan applications'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'In what year was Apple Inc. founded?',
    subtitle: 'Started in a garage.',
    options: ['1974', '1976', '1980', '1969'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which Lagos district is popularly nicknamed "Yabacon Valley" for its cluster of tech startups?',
    subtitle: 'Nigeria\'s answer to Silicon Valley.',
    options: ['Ikeja', 'Lekki', 'Yaba', 'Surulere'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is "open source" software?',
    subtitle: 'Think Linux.',
    options: [
      'Software that only works offline',
      'Software available for free trial only',
      'Software exclusively for government use',
      'Software whose source code is publicly available to view, use, and modify'
    ],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "NBC," Nigeria\'s broadcasting regulator, stand for?',
    subtitle: 'Regulates TV and radio.',
    options: [
      'National Broadcasting Commission',
      'Nigerian Business Council',
      'National Bandwidth Commission',
      'Nigeria Broadcast Corporation'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Can people who can\'t travel to Benin City still take part in Connect 2.0?',
    subtitle: 'For those who can\'t travel.',
    options: [
      'No, in-person only, no exceptions',
      'Yes, via a virtual pass with livestream access',
      'Yes, but only a written recap is shared after',
      'Yes, but only for sponsors'
    ],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is a "firewall" in computing?',
    subtitle: 'Named after a real barrier.',
    options: [
      'A tool that speeds up your internet connection',
      'A backup power supply for servers',
      'A system that monitors and blocks unauthorized network access',
      'A type of computer virus'
    ],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Cowrywise, a Nigerian savings and investment app, was founded in what year?',
    subtitle: 'Rivals PiggyVest.',
    options: ['2019', '2013', '2015', '2017'],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'GritinAI\'s "Vision" page states the company has reached how many students so far?',
    subtitle: 'On GritinAI\'s "Vision" page.',
    options: ['10k+', '5k+', '1k+', '50k+'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'In what year was Amazon founded?',
    subtitle: 'Started as a bookstore.',
    options: ['1998', '1994', '1990', '2001'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "HTML" stand for?',
    subtitle: 'Structures every web page.',
    options: [
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyper Text Markup Language',
      'Hyperlink Text Manage Language'
    ],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which Nigerian regulator oversees capital markets and crypto exchanges, alongside the CBN?',
    subtitle: 'Also watches crypto exchanges.',
    options: ['NCC', 'NITDA', 'NAFDAC', 'SEC (Securities and Exchange Commission)'],
    correct: 3,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What happens if you cancel your Connect 2.0 ticket within 7 days of the event?',
    subtitle: 'Closer to the event, less flexible.',
    options: [
      'Non-refundable but transferable',
      '50% refund or credit',
      'Full refund',
      'No cancellation allowed at all'
    ],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'The world\'s first-ever text message, sent in 1992, is said to have simply read what?',
    subtitle: 'Sent in 1992.',
    options: ['"Hello World"', '"Merry Christmas"', '"Happy Birthday"', '"Good Morning"'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is "phishing" in cybersecurity?',
    subtitle: 'A play on "fishing."',
    options: [
      'A method of speeding up file downloads',
      'A type of computer cooling system',
      'A scam that tricks people into revealing sensitive information',
      'A technique for compressing videos'
    ],
    correct: 2,
    timer: 12
  }
];

module.exports = {
  set1: SET1,
  set2: SET2,
  set3: SET3,
  set4: SET4,
  set5: SET5
};
