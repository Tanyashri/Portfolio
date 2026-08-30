import { Project, SkillCategory, ExperienceItem, OpenSourceProgram, CommunityImpact, PersonalityFact } from '../types';

export const PERSONAL_INFO = {
  name: 'Tanyashri M',
  shortTitle: 'Computer Science Engineer & AI/ML Builder',
  tagline: 'I build intelligent systems, useful products, and things that started as a questionable idea.',
  supportingBio: 'Computer Science engineer exploring AI, machine learning, backend systems, data, and software engineering.',
  status: 'OPEN TO INTERNSHIP OPPORTUNITIES',
  email: 'tanyashrim2005@gmail.com',
  github: 'https://github.com/Tanyashri',
  linkedin: 'https://www.linkedin.com/in/tanyashri-m-94a74a234',
  leetcode: 'https://leetcode.com/u/tanyashrim2005/',
  discord: 'https://discord.gg/zECBkKXJB',
  resumeUrl: 'https://drive.google.com/file/d/1SvhoFJsGLnCmhIhB1QJW7HoemXbg8HYi/view?usp=drivesdk',
  education: {
    degree: 'B.E. in Computer Science & Engineering',
    institution: 'Maharaja Institute of Technology, Mysore',
    gpa: '8.5 / 10',
    expectedYear: '2027',
  },
  certifications: [
    {
      title: 'Python Programming: Basic to Advanced',
      issuer: 'Udemy',
      year: 'Verified Credential',
      skills: 'Python Core, Advanced OOP, Data Structures'
    },
    {
      title: 'Machine Learning Specialization',
      issuer: 'University of Washington — Coursera',
      year: 'Specialization Track',
      skills: 'Algorithms, Regression, Classification, Model Evaluation'
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'aura',
    number: '01',
    title: 'AURA',
    subtitle: 'AI Model Monitoring Platform',
    category: 'AI / ML SYSTEMS',
    tags: ['ML SYSTEMS', 'MODEL MONITORING', 'DATA ANALYSIS', 'PYTHON'],
    summary: 'A robust ML monitoring platform featuring a Shadow-Champion architecture running production and challenger models in parallel for safe evaluation and data drift analysis.',
    problem: 'Deploying updated ML models directly into production creates regulatory and operational risks if edge-case behavior or data drift goes undetected during live decision-making.',
    approach: 'Engineered a dual-pipeline Shadow-Champion architecture where incoming production streams are asynchronously evaluated against challenger models without impacting live latency, calculating drift signals and divergence thresholds.',
    architecture: {
      title: 'Shadow-Champion Telemetry Architecture',
      description: 'Incoming data streams bifurcate into primary production inference and an asynchronous challenger runner, feeding into a drift scoring engine and causal impact tracker.',
      diagramType: 'aura-pipeline',
      points: [
        'Parallel inference execution: Production model serves requests while Challenger model runs in shadow mode',
        'Continuous data drift scoring via statistical distribution checks across features',
        'Prediction disagreement & divergence metric tracking in real time',
        'Causal impact analysis for regulatory validation against RBI / SEBI compliance benchmarks'
      ]
    },
    interestingDetail: 'Integrates regulatory compliance data analysis patterns (RBI/SEBI standards) to guarantee verifiable audit trails for algorithmic lending and financial risk predictions.',
    result: 'Enabled zero-downtime challenger validation, continuous distribution drift detection, and deterministic auditing across all model inference queries.',
    verifiedMetrics: [
      { label: 'Evaluation Pipeline', value: 'Shadow-Champion' },
      { label: 'Safety Mode', value: 'Zero-Risk Challenger' },
      { label: 'Compliance Focus', value: 'RBI/SEBI Aligned' }
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Statistical Drift Engine', 'REST APIs'],
    githubUrl: 'https://github.com/Tanyashri/AURA',
    accentColor: '#00f59b'
  },
  {
    id: 'graphdb',
    number: '02',
    title: 'GraphDB Task Tracker',
    subtitle: 'Graph-Native Task & Dependency Management System',
    category: 'GRAPH SYSTEMS & BACKEND',
    tags: ['GRAPH DATABASE', 'BACKEND', 'ALGORITHMS', 'SYSTEM DESIGN'],
    summary: 'High-performance dependency engine using Neo4j, Cypher, and NetworkX for graph-native task chaining, cycle detection, blast-radius analysis, and topological scheduling.',
    problem: 'Relational databases struggle with deep multi-level recursive task dependencies, leading to exponential JOIN complexity, slow traversals, and difficult circular dependency detection.',
    approach: 'Modeled task relationships natively as directed acyclic graphs in Neo4j with Cypher graph traversals, backed by an in-memory graph cache and NetworkX topological analysis.',
    architecture: {
      title: 'Graph-Native Chaining & Traversal Engine',
      description: 'High-throughput FastAPI microservice communicating with Neo4j using optimized Cypher queries and synchronized in-memory NetworkX graphs for sub-10ms lookup.',
      diagramType: 'graph-nodes',
      points: [
        'Graph-native dependency modeling with bidirectional relationship traversal',
        'Real-time Cycle Detection preventing circular blocking states',
        'Blast Radius computation calculating downstream impact of task delays or failures',
        'Critical Path analysis and topological sorting for optimized job scheduling',
        'In-memory graph cache to eliminate redundant database disk roundtrips'
      ]
    },
    interestingDetail: 'Leveraged Cypher variable-length relationship patterns (`-[DEPENDS_ON*1..10]->`) to compute deep transitive closures in a single query hop.',
    result: 'Achieved ~40% query performance improvement over traditional relational approaches with sub-10ms dependency lookup latency.',
    verifiedMetrics: [
      { label: 'Query Performance', value: '~40% Boost' },
      { label: 'Lookup Latency', value: '< 10ms' },
      { label: 'Traversal Engine', value: 'Neo4j + NetworkX' }
    ],
    stack: ['Neo4j', 'FastAPI', 'Cypher', 'NetworkX', 'Python', 'Graph Algorithms'],
    githubUrl: 'https://github.com/Tanyashri/GraphDB-Task-Tracker',
    accentColor: '#38bdf8'
  },
  {
    id: 'skillhive',
    number: '03',
    title: 'SkillHive',
    subtitle: 'AI Skill Exchange Platform',
    category: 'AI / RECOMMENDATION',
    tags: ['AI', 'RECOMMENDATION SYSTEMS', 'DATA', 'FULL STACK'],
    summary: 'Intelligent peer skill-matching platform powered by ML recommendation pipelines, interaction telemetry, automated scheduling, and resilient backend services.',
    problem: 'Traditional learning portals lack contextual matching between complementary skill seekers and mentors, resulting in low completion rates and manual scheduling friction.',
    approach: 'Constructed an end-to-end data pipeline that models user competencies, reciprocal learning interests, and interaction telemetry into a recommendation matrix for real-time peer matching.',
    architecture: {
      title: 'Reciprocal Matching & Interaction Pipeline',
      description: 'User telemetry and skill vectors pass through an ML matching engine and analytics service, integrated with dynamic calendar scheduling and resilient fault-tolerant recovery.',
      diagramType: 'skill-matching',
      points: [
        'ML-driven recommendation engine scoring mutual utility and skill-exchange compatibility',
        'User interaction data pipeline aggregating session velocity, feedback, and skill progression',
        'Automated peer matching with built-in scheduling and progress checkpoints',
        'Fault-tolerant service architecture supporting graceful restarts and telemetry preservation'
      ]
    },
    interestingDetail: 'Balances asymmetric barter exchanges (User A teaches Python, User B teaches UI Design) by evaluating multi-hop interest clusters rather than just 1:1 direct pairs.',
    result: 'Delivered an automated skill-matching ecosystem with real-time analytics APIs, robust session tracking, and seamless peer collaboration.',
    verifiedMetrics: [
      { label: 'Engine Core', value: 'Reciprocal ML Matching' },
      { label: 'Service Reliability', value: 'Graceful Failover' },
      { label: 'Data Architecture', value: 'Telemetry Pipelines' }
    ],
    stack: ['Python', 'Node.js', 'Machine Learning', 'Data Pipelines', 'Analytics APIs', 'PostgreSQL / Mongo'],
    githubUrl: 'https://github.com/Tanyashri/SkillHive',
    accentColor: '#f59e0b'
  },
  {
    id: 'awaaz',
    number: '04',
    title: 'AWAAZ',
    subtitle: 'Anonymous AI Grievance Platform',
    category: 'NLP & VOICE AI',
    tags: ['NLP', 'VOICE AI', 'SECURITY', 'SOCIAL IMPACT'],
    summary: 'A voice-first, no-login anonymous grievance platform utilizing speech-to-text, NLP intent extraction, salted SHA-256 identity protection, and a blockchain-lite audit system.',
    problem: 'Vulnerable citizens and workers hesitate to report serious grievances due to fear of retaliation, complicated digital login barriers, and lack of transparency in complaint handling.',
    approach: 'Engineered a barrier-free voice reporting interface that transcribes spoken complaints, extracts core intents and severity categories via NLP, and generates a tamper-evident cryptographic hash record without storing personally identifiable information.',
    architecture: {
      title: 'Voice-to-Audit Immutable Pipeline',
      description: 'Spoken audio undergoes direct STT conversion, NLP entity & intent classification, followed by one-way salted SHA-256 pseudonymization and a chained ledger entry.',
      diagramType: 'voice-pipeline',
      points: [
        'Voice-first reporting with zero login or identity barrier required',
        'Speech-to-text transcription paired with NLP intent and category classification',
        'Salted SHA-256 cryptographic hashing to ensure strict identity anonymity',
        'Blockchain-lite audit chain guaranteeing grievance record integrity and tamper resistance'
      ]
    },
    interestingDetail: 'The blockchain-lite chain allows users to verify that their complaint exists and has not been altered by administrators, while ensuring zero identity data ever hits disk.',
    result: 'Created an accessible, trustless grievance mechanism bridging voice AI accessibility with verifiable cryptographic integrity.',
    verifiedMetrics: [
      { label: 'Security Layer', value: 'Salted SHA-256' },
      { label: 'Integrity System', value: 'Blockchain-Lite Audit' },
      { label: 'Accessibility', value: 'Voice-First / No-Login' }
    ],
    stack: ['Speech-to-Text', 'NLP', 'Python', 'Salted SHA-256', 'Blockchain-Lite', 'Web APIs'],
    githubUrl: 'https://github.com/Tanyashri/Awaaz-1',
    accentColor: '#ec4899'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'LANGUAGES',
    skills: [
      { name: 'Python', relatedProjects: ['aura', 'graphdb', 'skillhive', 'awaaz'], highlightReason: 'Primary language for ML systems, backend services & algorithms' },
      { name: 'C++', relatedProjects: ['graphdb'], highlightReason: 'Low-level performance, algorithmic problem solving & data structures' },
      { name: 'Java', relatedProjects: ['graphdb', 'skillhive'], highlightReason: 'Object-oriented architecture & enterprise software paradigms' },
      { name: 'JavaScript', relatedProjects: ['skillhive', 'awaaz'], highlightReason: 'Full-stack integration, asynchronous event loops & RESTful APIs' }
    ]
  },
  {
    name: 'CORE COMPUTER SCIENCE',
    skills: [
      { name: 'Data Structures & Algorithms', relatedProjects: ['graphdb', 'aura'], highlightReason: 'Graph traversals, DAG topological sorting, binary search & trees' },
      { name: 'Object-Oriented Programming', relatedProjects: ['aura', 'skillhive'], highlightReason: 'Modular design patterns, encapsulation & clean system boundaries' },
      { name: 'Operating Systems', relatedProjects: ['graphdb', 'skillhive'], highlightReason: 'Concurrency, process management, memory paging & IPC' },
      { name: 'Database Management Systems', relatedProjects: ['graphdb', 'skillhive', 'aura'], highlightReason: 'ACID transactions, indexing, relational normalization & Cypher' },
      { name: 'Computer Networks', relatedProjects: ['aura', 'awaaz'], highlightReason: 'TCP/IP, HTTP/REST protocols, socket telemetry & payload security' }
    ]
  },
  {
    name: 'BACKEND & APIS',
    skills: [
      { name: 'FastAPI', relatedProjects: ['graphdb', 'aura'], highlightReason: 'Asynchronous Python microservices, Pydantic validation & OpenAPI specs' },
      { name: 'Node.js', relatedProjects: ['skillhive'], highlightReason: 'Event-driven server runtimes & backend pipeline orchestration' },
      { name: 'Express.js', relatedProjects: ['skillhive'], highlightReason: 'RESTful API routing, middleware chains & error handlers' },
      { name: 'REST APIs', relatedProjects: ['aura', 'graphdb', 'skillhive', 'awaaz'], highlightReason: 'Contract-first API design, JSON serialization & state management' }
    ]
  },
  {
    name: 'DATABASES & STORAGE',
    skills: [
      { name: 'Neo4j', relatedProjects: ['graphdb'], highlightReason: 'Native graph property database, Cypher pattern queries & deep traversals' },
      { name: 'PostgreSQL', relatedProjects: ['skillhive', 'aura'], highlightReason: 'Relational data modeling, structured indexing & ACID compliance' },
      { name: 'MySQL', relatedProjects: ['skillhive'], highlightReason: 'Relational querying & relational schema design' },
      { name: 'MongoDB', relatedProjects: ['skillhive'], highlightReason: 'Document store for user telemetry & flexible schemaless logging' },
      { name: 'Firebase', relatedProjects: ['skillhive', 'awaaz'], highlightReason: 'Real-time synchronization & serverless backend hooks' }
    ]
  },
  {
    name: 'AI, ML & DATA SCIENCE',
    skills: [
      { name: 'Machine Learning', relatedProjects: ['aura', 'skillhive'], highlightReason: 'Supervised classification, model evaluation, validation & tuning' },
      { name: 'Natural Language Processing', relatedProjects: ['awaaz'], highlightReason: 'Intent extraction, text classification & entity parsing' },
      { name: 'Recommendation Systems', relatedProjects: ['skillhive'], highlightReason: 'Vector similarity, reciprocal matching & user affinity matrices' },
      { name: 'NumPy & Pandas', relatedProjects: ['aura', 'skillhive'], highlightReason: 'Vectorized data transformations, statistical drift & matrix math' },
      { name: 'Excel', relatedProjects: ['aura'], highlightReason: 'Quantitative data analysis, tabular modeling & baseline validation' }
    ]
  },
  {
    name: 'CLOUD, DEVOPS & TOOLS',
    skills: [
      { name: 'Git & GitHub', relatedProjects: ['aura', 'graphdb', 'skillhive', 'awaaz'], highlightReason: 'Branching strategies, PR reviews, CI hooks & open source governance' },
      { name: 'Docker', relatedProjects: ['aura', 'graphdb'], highlightReason: 'Containerized microservices, reproducible runtime environments' },
      { name: 'Jenkins', relatedProjects: ['aura'], highlightReason: 'CI/CD pipeline automation & automated testing gates' },
      { name: 'CI/CD', relatedProjects: ['aura', 'graphdb'], highlightReason: 'Automated linting, unit test execution & continuous deployment' },
      { name: 'Azure', relatedProjects: ['skillhive', 'awaaz'], highlightReason: 'Cloud services, cloud compute & deployment infrastructure' }
    ]
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'stack-forge',
    role: 'Technical & Management Lead',
    organization: 'Stack Forge Club',
    period: '2024 – Present',
    badge: 'LEADERSHIP & ENGINEERING',
    highlights: [
      'Led teams contributing to open-source repositories with strict code reviews, issue tracking, and comprehensive technical documentation.',
      'Mentored 200+ students across hands-on workshops focused on Git version control, production software engineering workflows, backend development, and open-source collaboration.',
      'Organized and coordinated HackVerse — an institution-scale hackathon bringing together 300+ participants, orchestrating logistics, sponsor partnerships, speakers, and live judging execution.'
    ],
    metrics: [
      { value: '200+', label: 'Students Mentored' },
      { value: '300+', label: 'HackVerse Participants' },
      { value: '100%', label: 'Open-Source Focus' }
    ]
  }
];

export const OPEN_SOURCE_PROGRAMS: OpenSourceProgram[] = [
  {
    name: 'GSSoC',
    fullName: 'GirlScript Summer of Code',
    role: 'Open-Source Contributor',
    description: 'Active contributor across production repositories adhering to strict PR workflows and maintainer reviews.',
    contributions: [
      'Resolved full-stack issues & authored modular, test-backed PRs',
      'Collaborated with maintainers on issue triage and API docs'
    ],
    badge: 'CONTRIBUTOR'
  },
  {
    name: 'SWoC',
    fullName: 'Social Winter of Code',
    role: 'Open-Source Contributor',
    description: 'Engaged in collaborative open-source development focusing on bug fixes, feature sets, and SDLC best practices.',
    contributions: [
      'Implemented production-ready features following repository guidelines',
      'Conducted peer code reviews and verified test suites'
    ],
    badge: 'CONTRIBUTOR'
  },
  {
    name: 'Hacktoberfest',
    fullName: 'Global Open Source Initiative',
    role: 'Open-Source Contributor',
    description: 'Contributed quality pull requests to global open-source projects, focusing on maintainability and backend stability.',
    contributions: [
      'Delivered verified pull requests meeting strict quality criteria',
      'Optimized backend utility scripts and developer docs'
    ],
    badge: 'VERIFIED'
  }
];

export const COMMUNITY_IMPACT: CommunityImpact[] = [
  {
    organization: 'Viral Fission',
    role: 'Campus Ambassador',
    focus: 'Technology & Innovation Initiatives',
    highlights: [
      'Drove campus-wide technology and innovation initiatives, hackathon promotions, and youth innovation challenges.',
      'Spearheaded student engagement campaigns through interactive QR initiatives and social media awareness drives.'
    ]
  },
  {
    organization: 'U&I NGO',
    role: 'Volunteer Educator',
    focus: 'Education & Mentorship for Underprivileged Students',
    highlights: [
      'Mentored underprivileged children using interactive storytelling, educational quizzes, and activity-based learning.',
      'Conducted weekend educational activities, fostering fundamental literacy, critical thinking, and social awareness.'
    ]
  }
];

export const PERSONALITY_FACTS: PersonalityFact[] = [
  {
    title: 'District-Level Basketball Player',
    category: 'ATHLETICS & DISCIPLINE',
    description: 'Trained and competed in competitive district tournaments. Basketball taught me that systems only work when every player executes fast transitions with zero ego.',
    lesson: 'Split-second tactical reads, high-tempo execution under pressure, and ruthless spatial awareness.',
    tag: 'DISTRICT ATHLETICS'
  },
  {
    title: 'State-Level Spell Bee Participant',
    category: 'PRECISION & ETYMOLOGY',
    description: 'Competed at the state level by breaking down language into roots, phonetics, and language origins rather than relying on rote memorization.',
    lesson: 'Obsession with root mechanics, syntax precision, and recognizing deep structural patterns.',
    tag: 'STATE ACADEMICS'
  }
];

export const CURRENTLY_SECTION = {
  building: [
    'Shadow-Champion ML evaluation telemetry engines',
    'High-throughput graph traversal backend services',
    'Intelligent data pipelines & recommendation systems'
  ],
  exploring: [
    'Graph-native algorithmic optimization & Cypher indexing',
    'Causal impact analysis & model drift telemetry',
    'Distributed systems architecture & concurrency patterns'
  ],
  lookingFor: {
    title: 'Software Engineering / AI/ML Internship',
    availability: 'Open for 2025–2026 Opportunities',
    location: 'Open to Remote / On-Site / Hybrid',
    focus: 'Backend Systems, Machine Learning Systems, Graph Engineering, and Intelligent Software.'
  }
};
