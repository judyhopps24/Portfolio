import { AboutInfo, SkillGroup, ProjectItem, ContactDetails, ApiEndpoint, ExperienceItem, EducationItem } from "./types";

export const developerAbout: AboutInfo = {
  name: "Sristi Sharma",
  title: "Software Development Engineer | Distributed Systems & Backend Architect",
  tagline: "Architecting high-performance distributed systems, low-latency microservices, and AI infrastructure.",
  bio: "Software Development Engineer with 4 years of experience building large-scale distributed systems and backend services for millions. Deep expertise in microservices architecture, event-driven systems, observability, and databases. Proficient in AWS infrastructure and CI/CD pipelines, optimizing API latency, LLM orchestration, and full-stack development.",
  avatarUrl: "/Sristi-profile.png",
  experienceYears: 4,
  location: "Bengaluru, India",
  philosophy: "I prioritize fault tolerance, low latency, robust observability, and architecting scalable systems that gracefully handle extreme concurrency.",
  interests: ["Microservices Architecture", "Distributed Systems & Caching", "LLM Orchestration & RAG Pipelines", "AWS Infrastructure & CI/CD Pipelines"]
};

export const developerSkills: SkillGroup = {
  languages: [
    { name: "Java", proficiency: "Expert" },
    { name: "Kotlin", proficiency: "Expert" },
    { name: "TypeScript / Node.js", proficiency: "Expert", version: "20.x" },
    { name: "Python", proficiency: "Advanced", version: "3.11" },
    { name: "C++", proficiency: "Intermediate" }
  ],
  frameworks: [
    { name: "REST & GraphQL APIs", proficiency: "Expert" },
    { name: "Microservices", proficiency: "Expert" },
    { name: "SpringBoot", proficiency: "Advanced" },
    { name: "WebSocket & Pub/Sub", proficiency: "Expert" },
    { name: "LangChain (LLM / RAG)", proficiency: "Advanced" }
  ],
  databases: ["Redis", "DynamoDB", "PostgreSQL", "MemoryDB"],
  cloud_platforms: ["AWS (Lambda, Fargate, Step Functions, S3, CloudFront, SageMaker, Athena, SNS, SQS, CloudWatch)", "Azure (Synapse Analytics)"],
  tools: ["CI/CD Pipelines", "Monitoring & Observability (Logging, Metrics, Alerts)", "Docker / Containers", "Git", "React", "Android"]
};

export const developerExperience: ExperienceItem[] = [
  {
    id: "amazon-alexa",
    role: "Software Development Engineer",
    company: "Amazon Alexa",
    location: "Bengaluru, India",
    period: "May 2025 - Present",
    startDate: "2025-05",
    endDate: "Present",
    isCurrent: true,
    highlights: [
      "Designed and delivered end-to-end Video Skill Kit (VSK) enabling video playback on 12M+ third-party smart TVs for Alexa's LLM-based conversational AI.",
      "Architected app injection layer to compensate for missing installed-app context on 3P devices, enabling foreground app detection and content routing.",
      "Solved playback state reporting gap by designing deterministic rules that route transport controls directly to video activities, eliminating 15% failure rates.",
      "Instrumented device-type telemetry exposing 3P regressions previously masked by Fire TV aggregation, revealing 2.3s P99 latency gap.",
      "Owned gradual rollout and change management. Strategised targeted fixes to high-failure capabilities driving a 17% reduction in customer perceived defect rate post-launch."
    ],
    technologies: ["Java", "Kotlin", "LLM Orchestration", "Video Skill Kit", "Device Telemetry", "AWS", "Conversational AI"],
    metrics: ["12M+ 3P Smart TVs enabled", "15% failure rate eliminated", "2.3s P99 latency gap revealed", "17% defect rate reduction"]
  },
  {
    id: "amazon-music",
    role: "Software Development Engineer",
    company: "Amazon Music",
    location: "Bengaluru, India",
    period: "July 2022 - April 2025",
    startDate: "2022-07",
    endDate: "2025-04",
    isCurrent: false,
    highlights: [
      "Redesigned a monolithic 1.8TB media feed validator into a distributed, parallel-processing pipeline using AWS Fargate workers, SQS/SNS for notifications and MemoryDB for sub-millisecond lookup, cutting validation runtime from 2 days to 2 hours unblocking a Google Knowledge Panel launch that drove 1.1B incremental impressions within 60 days.",
      "Designed and launched Track Detail Page backend as a new Lambda micro-service currently handling 10K TPM to enable web discovery, architecting URL routing, GraphQL-based parallel data aggregation, stress testing, and SEO metadata generation while leading interns, projected to drive 319K annual paid subscriptions.",
      "Pioneered the design of automated LLM-powered meta-description engine using LangChain router chains with an AI agent for real-time data retrieval. Architected S3 & CloudFront edge-caching infrastructure, improving page discoverability by 29%.",
      "Led automation of SEO experimentation workflows across AWS Athena and SageMaker using AWS Step Functions, reducing manual developer effort from 4 days to 1 day per experiment through phased implementation of simulation and analysis job orchestration."
    ],
    technologies: ["AWS Fargate", "AWS Lambda", "MemoryDB", "GraphQL", "LangChain", "SageMaker", "AWS Step Functions", "SQS/SNS", "S3", "CloudFront"],
    metrics: ["Validation runtime: 2 days → 2 hours", "1.1B incremental impressions", "10K TPM microservice", "29% discoverability gain", "319K annual subscriptions projected"]
  },
  {
    id: "amazon-music-intern",
    role: "Software Development Intern",
    company: "Amazon Music - IX",
    location: "Bengaluru, India",
    period: "Jan 2022 - July 2022",
    startDate: "2022-01",
    endDate: "2022-07",
    isCurrent: false,
    highlights: [
      "Implemented dynamic RTL layout support for Webplayer & Android clients by introducing bidirectional layout resolution at the component level rather than per-screen overrides, enabling Amazon Music expansion to 5 new territories with a projected 28.7MM TAM.",
      "Designed a locale-gating mechanism using a custom feature flag template that decoupled string publishing from locale launch state, allowing localized strings for unreleased markets to ship to mainline without activating in production, eliminating 5 hours of developer effort per release."
    ],
    technologies: ["Webplayer", "Android", "TypeScript", "Kotlin", "Feature Flags", "RTL Localization"],
    metrics: ["Expanded to 5 new territories", "28.7MM TAM projected", "Saved 5 hours developer effort/release"]
  },
  {
    id: "microsoft-intern",
    role: "Software Engineering Intern",
    company: "Microsoft",
    location: "Hyderabad, India",
    period: "May 2021 - July 2021",
    startDate: "2021-05",
    endDate: "2021-07",
    isCurrent: false,
    highlights: [
      "Built a data ingestion and transformation pipeline on Azure Synapse Analytics using Python and Spark, repartitioning data by processing date, cutting monthly ingestion runtime from 8 hours to 2 hours."
    ],
    technologies: ["Azure Synapse Analytics", "Python", "PySpark", "Big Data Pipelines"],
    metrics: ["Ingestion runtime: 8 hours → 2 hours"]
  }
];

export const developerEducation: EducationItem = {
  institution: "Birla Institute of Technology and Science Pilani (BITS), Hyderabad Campus",
  degree: "Bachelor of Engineering in Computer Science",
  location: "Hyderabad, India",
  graduationDate: "Graduated August 2022",
  cgpa: "8.7 / 10.0"
};

export const getExperienceList = (): ExperienceItem[] => {
  return developerExperience;
};

export const developerProjects: ProjectItem[] = {
  length: 3,
  0: {
    id: "youtube-comment-manager-mcp",
    name: "YouTube Comment Manager MCP Server",
    description: "A Model Context Protocol (MCP) server enabling AI agents to search, analyze, auto-reply, and moderate YouTube video comments via YouTube Data API v3.",
    status: "completed",
    overview: "An event-driven Model Context Protocol (MCP) tool integration layer that enables AI models (Gemini/Claude) and autonomous agents to interface directly with YouTube's Data API v3. Handles OAuth2 authentication, rate-limited comment fetching, sentiment-aware comment filtering, and agentic comment replies.",
    your_role: "Creator & Backend Systems Developer",
    technologies_used: ["TypeScript", "Node.js", "@modelcontextprotocol/sdk", "YouTube Data API v3", "Google OAuth2", "LLM Orchestration"],
    key_features: [
      "Standardized Model Context Protocol (MCP) tool definitions for comment querying, posting replies, and thread retrieval",
      "Seamless OAuth2 token refresh and YouTube Data API v3 integration with exponential backoff handling",
      "Automated comment sentiment classification and spam detection pipelines for community moderation",
      "Structured JSON schema tool interfaces enabling zero-shot execution by Gemini and Claude AI agents"
    ],
    architecture_notes: "Built using the official TypeScript @modelcontextprotocol/sdk. Implements stdio and HTTP transport mechanisms, mapping YouTube API response structures into sanitized MCP tool resources and dynamic prompts.",
    challenges_solved: [
      "Handled strict YouTube API quota limitations by implementing intelligent local caching of comment threads and pagination tokens.",
      "Designed robust schema validations and error recovery strategies for agentic tool calls to prevent AI hallucination during comment posting."
    ],
    github_repo: "https://github.com/judyhopps24/youtube-comment-manager-mcp",
    live_demo_api: "https://api.sristi.dev/v1/projects/youtube-comment-manager-mcp/specs",
    detailed_documentation: "https://docs.sristi.dev/architecture/youtube-comment-mcp",
    metric: "5x faster comment triage via AI agent protocol"
  },
  1: {
    id: "realtime-chat-service",
    name: "Distributed Real-time Chat Microservice",
    description: "A WebSocket cluster with horizontal auto-scaling and event broadcasting backed by Redis Pub/Sub.",
    status: "completed",
    overview: "A highly available WebSocket server built to stream message groups, user presence events, and notifications with full backpressure controls. Scaled horizontally behind a Kubernetes cluster with direct state synchronization.",
    your_role: "Backend Infrastructure Engineer",
    technologies_used: ["TypeScript", "Node.js (Express)", "Socket.io", "Redis Pub/Sub", "Kubernetes", "Prometheus"],
    key_features: [
      "Handles up to 100,000 persistent active WebSocket connections with zero disconnect drops",
      "Integrated Redis adapter to sync broadcasts perfectly across multiple server pods",
      "Persistent state fallback into PostgreSQL using bulk buffer writes avoiding disk write throttling",
      "Real-time rate-limiting on message emits to defend against DDoS flooding"
    ],
    architecture_notes: "Uses a stateful WebSocket pool. Connected clients are tracked in Redis memory using cluster hash sets. Metrics are pulled constantly via Prometheus scrape pods for alert configurations.",
    challenges_solved: [
      "Mitigated server crashes during spike events by designing client-side backpressure feedback streams in the WebSocket transmission cycle.",
      "Engineered clean reconnection protocols preserving backlogs of missed events when switching IP terminals during mobile network swaps."
    ],
    github_repo: "https://github.com/judyhopps24/distributed-chat-service",
    live_demo_api: "https://api.sristi.dev/v1/projects/realtime-chat-service/ws",
    detailed_documentation: "https://docs.sristi.dev/architecture/chat-microservice",
    metric: "100k+ Active Conns, 99.99% connection uptime"
  },
  2: {
    id: "telemetry-analytics",
    name: "Telemetry Pipeline & Timeserious Processor",
    description: "An ingestion pipeline designed to ingest, validate, parse, and partition metrics and logs from distributed IoT and container runtimes.",
    status: "in-progress",
    overview: "A low-level processor designed to handle compressed gzipped JSON logs, streaming them into timeseries aggregates. Focuses on minimal garbage-collection footprint and safe memory pooling.",
    your_role: "Core Systems Engineer",
    technologies_used: ["Rust", "Actix Web", "ClickHouse", "RabbitMQ", "Grafana", "Docker"],
    key_features: [
      "Ingests up to 800MB/min of structured logs with zero frame loss rate",
      "Custom Rust parser with zero-copy deserialization routines for extreme speed",
      "Automated hot-to-cold database storage migrations between high-speed SSDs and budget object stores",
      "Grafana-integrated dashboard templates showing instant telemetry visualizations"
    ],
    architecture_notes: "Implemented in Rust to achieve high compute density and reliable memory layouts without GC-induced pauses. Utilizes Apache ClickHouse's columnar engine for instantaneous aggregations of telemetry datasets.",
    challenges_solved: [
      "Overcame severe CPU caching issues during deserialization by leveraging thread-local parsing pools and avoiding excessive heap allocations.",
      "Solved data stream ordering issues by implementing a reliable sequence-buffered window algorithm."
    ],
    github_repo: "https://github.com/judyhopps24/telemetry-rust-engine",
    live_demo_api: "https://api.sristi.dev/v1/projects/telemetry-analytics/metrics",
    detailed_documentation: "https://docs.sristi.dev/architecture/telemetry-rust",
    metric: "Parsed 1.2M rows/sec on single-core host"
  }
} as unknown as ProjectItem[]; // Cast since we defined fields but want list access.

// Corrected index list to prevent TypeScript array issue
export const getProjectsList = (): ProjectItem[] => {
  return [
    {
      id: "youtube-comment-manager-mcp",
      name: "YouTube Comment Manager MCP Server",
      description: "A Model Context Protocol (MCP) server enabling AI agents to search, analyze, auto-reply, and moderate YouTube video comments via YouTube Data API v3.",
      status: "completed",
      overview: "An event-driven Model Context Protocol (MCP) tool integration layer that enables AI models (Gemini/Claude) and autonomous agents to interface directly with YouTube's Data API v3. Handles OAuth2 authentication, rate-limited comment fetching, sentiment-aware comment filtering, and agentic comment replies.",
      your_role: "Creator & Backend Systems Developer",
      technologies_used: ["TypeScript", "Node.js", "@modelcontextprotocol/sdk", "YouTube Data API v3", "Google OAuth2", "LLM Orchestration"],
      key_features: [
        "Standardized Model Context Protocol (MCP) tool definitions for comment querying, posting replies, and thread retrieval",
        "Seamless OAuth2 token refresh and YouTube Data API v3 integration with exponential backoff handling",
        "Automated comment sentiment classification and spam detection pipelines for community moderation",
        "Structured JSON schema tool interfaces enabling zero-shot execution by Gemini and Claude AI agents"
      ],
      architecture_notes: "Built using the official TypeScript @modelcontextprotocol/sdk. Implements stdio and HTTP transport mechanisms, mapping YouTube API response structures into sanitized MCP tool resources and dynamic prompts.",
      challenges_solved: [
        "Handled strict YouTube API quota limitations by implementing intelligent local caching of comment threads and pagination tokens.",
        "Designed robust schema validations and error recovery strategies for agentic tool calls to prevent AI hallucination during comment posting."
      ],
      github_repo: "https://github.com/judyhopps24/youtube-comment-manager-mcp",
      live_demo_api: "https://api.sristi.dev/v1/projects/youtube-comment-manager-mcp/specs",
      detailed_documentation: "https://docs.sristi.dev/architecture/youtube-comment-mcp",
      metric: "5x faster comment triage via AI agent protocol"
    },
    // {
    //   id: "realtime-chat-service",
    //   name: "Distributed Real-time Chat Microservice",
    //   description: "A WebSocket cluster with horizontal auto-scaling and event broadcasting backed by Redis Pub/Sub.",
    //   status: "completed",
    //   overview: "A highly available WebSocket server built to stream message groups, user presence events, and notifications with full backpressure controls. Scaled horizontally behind a Kubernetes cluster with direct state synchronization.",
    //   your_role: "Backend Infrastructure Engineer",
    //   technologies_used: ["TypeScript", "Node.js (Express)", "Socket.io", "Redis Pub/Sub", "Kubernetes", "Prometheus"],
    //   key_features: [
    //     "Handles up to 100,000 persistent active WebSocket connections with zero disconnect drops",
    //     "Integrated Redis adapter to sync broadcasts perfectly across multiple server pods",
    //     "Persistent state fallback into PostgreSQL using bulk buffer writes avoiding disk write throttling",
    //     "Real-time rate-limiting on message emits to defend against DDoS flooding"
    //   ],
    //   architecture_notes: "Uses a stateful WebSocket pool. Connected clients are tracked in Redis memory using cluster hash sets. Metrics are pulled constantly via Prometheus scrape pods for alert configurations.",
    //   challenges_solved: [
    //     "Mitigated server crashes during spike events by designing client-side backpressure feedback streams in the WebSocket transmission cycle.",
    //     "Engineered clean reconnection protocols preserving backlogs of missed events when switching IP terminals during mobile network swaps."
    //   ],
    //   github_repo: "https://github.com/judyhopps24/distributed-chat-service",
    //   live_demo_api: "https://api.sristi.dev/v1/projects/realtime-chat-service/ws",
    //   detailed_documentation: "https://docs.sristi.dev/architecture/chat-microservice",
    //   metric: "100k+ Active Conns, 99.99% connection uptime"
    // },
    // {
    //   id: "telemetry-analytics",
    //   name: "Telemetry Pipeline & Timeseries Processor",
    //   description: "An ingestion pipeline designed to ingest, validate, parse, and partition metrics and logs from distributed IoT and container runtimes.",
    //   status: "in-progress",
    //   overview: "A low-level processor designed to handle compressed gzipped JSON logs, streaming them into timeseries aggregates. Focuses on minimal garbage-collection footprint and safe memory pooling.",
    //   your_role: "Core Systems Engineer",
    //   technologies_used: ["Rust", "Actix Web", "ClickHouse", "RabbitMQ", "Grafana", "Docker"],
    //   key_features: [
    //     "Ingests up to 800MB/min of structured logs with zero frame loss rate",
    //     "Custom Rust parser with zero-copy deserialization routines for extreme speed",
    //     "Automated hot-to-cold database storage migrations between high-speed SSDs and budget object stores",
    //     "Grafana-integrated dashboard templates showing instant telemetry visualizations"
    //   ],
    //   architecture_notes: "Implemented in Rust to achieve high compute density and reliable memory layouts without GC-induced pauses. Utilizes Apache ClickHouse's columnar engine for instantaneous aggregations of telemetry datasets.",
    //   challenges_solved: [
    //     "Overcame severe CPU caching issues during deserialization by leveraging thread-local parsing pools and avoiding excessive heap allocations.",
    //     "Solved data stream ordering issues by implementing a reliable sequence-buffered window algorithm."
    //   ],
    //   github_repo: "https://github.com/judyhopps24/telemetry-rust-engine",
    //   live_demo_api: "https://api.sristi.dev/v1/projects/telemetry-analytics/metrics",
    //   detailed_documentation: "https://docs.sristi.dev/architecture/telemetry-rust",
    //   metric: "Parsed 1.2M rows/sec on single-core host"
    // }
  ];
};

export const developerContact: ContactDetails = {
  email: "emailsristi@gmail.com",
  github: "https://github.com/judyhopps24",
  linkedin: "https://linkedin.com/in/sharma-sristi",
  twitter: "https://twitter.com/sristicode"
};

export const apiEndpoints: ApiEndpoint[] = [
  { path: "/", method: "GET", description: "Retrieve service overview and general metadata", category: "System" },
  { path: "/about", method: "GET", description: "Get biography, system philosophy, and interests", category: "Profile" },
  { path: "/experience", method: "GET", description: "Query full work experience history & education details", category: "Experience" },
  { path: "/experience/amazon-alexa", method: "GET", description: "Fetch engineering impact & telemetry work at Amazon Alexa", category: "Experience" },
  { path: "/experience/amazon-music", method: "GET", description: "Fetch pipeline redesign, TDP Lambda & LLM work at Amazon Music", category: "Experience" },
  { path: "/experience/amazon-music-intern", method: "GET", description: "Fetch localization & locale-gating feature flag intern work at Amazon Music", category: "Experience" },
  { path: "/experience/microsoft", method: "GET", description: "Fetch Azure Synapse pipeline work at Microsoft", category: "Experience" },
  { path: "/skills", method: "GET", description: "Inspect grouped languages, frameworks, and databases stack", category: "Stack" },
  { path: "/projects", method: "GET", description: "Query a list of backend and infrastructure projects", category: "Projects" },
  { path: "/projects/youtube-comment-manager-mcp", method: "GET", description: "Get technical specifications for the YouTube Comment Manager MCP Server", category: "Projects" },
  // { path: "/projects/realtime-chat-service", method: "GET", description: "Get architecture details of WebSocket service", category: "Projects" },
  // { path: "/projects/telemetry-analytics", method: "GET", description: "Get processing specs for Rust telemetry pipeline", category: "Projects" },
  { path: "/contact", method: "POST", description: "Initialize socket handshake & post a message to Sristi", category: "Contact" },
  { path: "/messages", method: "GET", description: "Review submitted message data logs (revealed after first message!)", category: "Contact" },
  { path: "/stats", method: "GET", description: "Fetch real-time micro-service node health metrics", category: "System" }
];
