export type FeatureCard = {
  title: string;
  body: string;
  icon: string;
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  content: string[];
};

export const homeHighlights = [
  '10+ years building web platforms and distributed systems',
  'Leadership across architecture, delivery, and mentoring',
  'Strong product judgment with a bias for clarity and reliability',
];

export const homeCards: FeatureCard[] = [
  {
    icon: 'stack',
    title: 'Systems that scale',
    body: 'Architecture decisions grounded in performance, resilience, and maintainability.',
  },
  {
    icon: 'team',
    title: 'Teams that ship well',
    body: 'Cross-functional leadership that improves execution, communication, and code quality.',
  },
  {
    icon: 'briefcase',
    title: 'Outcomes that matter',
    body: 'Delivery focused on customer value, operational simplicity, and long-term leverage.',
  },
];

export const aboutMetrics = [
  { value: '10+', label: 'years building software for product and platform teams' },
  { value: '0-1', label: 'to scale across greenfield initiatives and existing systems' },
  { value: 'Staff', label: 'level scope across architecture, execution, and mentoring' },
];

export const aboutStrengths: FeatureCard[] = [
  {
    icon: 'code',
    title: 'Technical Excellence',
    body: 'Deep expertise in modern web technologies, distributed systems, and cloud infrastructure.',
  },
  {
    icon: 'team',
    title: 'Team Leadership',
    body: 'Experienced in leading cross-functional teams and mentoring engineers at all levels.',
  },
  {
    icon: 'rocket',
    title: 'Product Focus',
    body: 'Strong track record of delivering high-impact features that drive business value.',
  },
  {
    icon: 'badge',
    title: 'Best Practices',
    body: 'Advocate for clean code, comprehensive testing, and robust CI/CD pipelines.',
  },
];

export const aboutSkills = {
  Core: ['React', 'TypeScript', 'Node.js', 'Python', 'Go'],
  Platform: ['PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'],
  Leadership: ['System Design', 'API Design', 'Microservices', 'CI/CD'],
};

export const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      "Built a scalable e-commerce platform handling 1M+ daily users. Implemented microservices architecture with Redis caching and PostgreSQL.",
    outcome: 'Improved reliability and reduced response times during peak traffic.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    links: [
      { label: 'Code', href: 'https://github.com/', external: true },
      { label: 'Demo', href: 'https://example.com/', external: true },
    ],
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description:
      'Developed a real-time analytics dashboard for tracking user behavior and business metrics with sub-second latency.',
    outcome: 'Enabled product teams to monitor live metrics without waiting on batch reports.',
    tags: ['TypeScript', 'Python', 'Apache Kafka', 'ClickHouse'],
    links: [
      { label: 'Code', href: 'https://github.com/', external: true },
      { label: 'Demo', href: 'https://example.com/', external: true },
    ],
  },
  {
    title: 'Developer Tools CLI',
    description:
      'Created a command-line tool to automate common development workflows, improving team productivity by 40%.',
    outcome: 'Shortened onboarding time and standardized recurring engineering tasks.',
    tags: ['Go', 'Docker', 'Kubernetes', 'GitHub Actions'],
    links: [{ label: 'Code', href: 'https://github.com/', external: true }],
  },
  {
    title: 'API Gateway Service',
    description:
      'Designed and implemented a high-performance API gateway with rate limiting, authentication, and request routing.',
    outcome: 'Centralized auth and observability while simplifying downstream service integrations.',
    tags: ['Go', 'gRPC', 'Envoy', 'Prometheus'],
    links: [{ label: 'Code', href: 'https://github.com/', external: true }],
  },
  {
    title: 'Mobile App Backend',
    description:
      'Built a robust backend for a mobile application serving 500K+ users with real-time notifications and offline sync.',
    outcome: 'Supported dependable sync behavior across unreliable network conditions.',
    tags: ['Node.js', 'MongoDB', 'WebSocket', 'Firebase'],
    links: [
      { label: 'Code', href: 'https://github.com/', external: true },
      { label: 'Demo', href: 'https://example.com/', external: true },
    ],
  },
  {
    title: 'CI/CD Pipeline Framework',
    description:
      'Developed a reusable CI/CD framework that reduced deployment times by 60% and improved reliability.',
    outcome: 'Reduced release friction and gave teams more confidence in deployment health.',
    tags: ['GitHub Actions', 'Docker', 'Terraform', 'AWS'],
    links: [{ label: 'Code', href: 'https://github.com/', external: true }],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-scalable-microservices-lessons-learned',
    category: 'Architecture',
    title: 'Building Scalable Microservices: Lessons Learned',
    summary:
      'Patterns that help teams keep service boundaries, latency, and ownership from collapsing under scale.',
    date: 'March 14, 2026',
    readingTime: '8 min read',
    content: [
      'Microservices work best when the team treats boundaries as product decisions rather than purely technical abstractions. The cost of splitting a system only pays off when ownership, release cadence, and operational constraints are also clearer.',
      'The biggest mistakes usually show up in coordination overhead. Shared databases, inconsistent domain language, and unclear contracts can make a distributed architecture feel more coupled than a monolith ever was.',
      'The healthiest systems invest early in observability, pragmatic service contracts, and a disciplined approach to synchronous dependencies. Scale rarely fails because of one slow query alone; it fails because nobody can see where the system is straining until users already feel it.',
    ],
  },
  {
    slug: 'the-art-of-code-review-beyond-finding-bugs',
    category: 'Engineering Culture',
    title: 'The Art of Code Review: Beyond Finding Bugs',
    summary:
      'Code reviews are about more than catching bugs. Learn how to use them as a tool for knowledge sharing, mentorship, and building team culture.',
    date: 'Feb 27, 2026',
    readingTime: '6 min read',
    content: [
      'Healthy code review culture balances rigor with respect. The goal is not to win arguments in comments, but to make the codebase and the team stronger with each iteration.',
    ],
  },
  {
    slug: 'optimizing-database-queries-a-practical-guide',
    category: 'Performance',
    title: 'Optimizing Database Queries: A Practical Guide',
    summary:
      "Database performance can make or break your application. Here's a comprehensive guide to identifying and fixing slow queries in production systems.",
    date: 'Feb 9, 2026',
    readingTime: '10 min read',
    content: [
      'The fastest query is usually the one you never run. Before tuning indexes, make sure the application is asking the database for the right shape and frequency of data.',
    ],
  },
  {
    slug: 'typescript-best-practices-for-large-codebases',
    category: 'TypeScript',
    title: 'TypeScript Best Practices for Large Codebases',
    summary:
      'Working with TypeScript at scale requires discipline and good patterns. Here are the practices that have helped my teams write maintainable code.',
    date: 'Jan 21, 2026',
    readingTime: '7 min read',
    content: [
      'Consistency beats cleverness in large TypeScript systems. Simple module boundaries, meaningful types, and predictable naming conventions compound over time.',
    ],
  },
  {
    slug: 'from-engineer-to-tech-lead-the-transition',
    category: 'Leadership',
    title: 'From Engineer to Tech Lead: The Transition',
    summary:
      "Making the jump to technical leadership is challenging. Here's what I learned about balancing coding with mentorship and strategic thinking.",
    date: 'Jan 4, 2026',
    readingTime: '9 min read',
    content: [
      'Leadership often feels like slowing down at first, because the work shifts from direct output to multiplying the effectiveness of the people around you.',
    ],
  },
  {
    slug: 'designing-apis-that-developers-love',
    category: 'API Design',
    title: 'Designing APIs That Developers Love',
    summary:
      'Great API design is both an art and a science. Learn the principles that make APIs intuitive, flexible, and a joy to work with.',
    date: 'Dec 17, 2025',
    readingTime: '8 min read',
    content: [
      'A good API feels unsurprising in the best way. Naming, error messages, and the shape of resources all teach consumers how to succeed.',
    ],
  },
];
