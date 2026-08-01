import React, { useState } from "react";
import { 
  Server, Activity, CheckCircle2, Clock, Cpu, Code2, Database, Network, 
  ExternalLink, Mail, Github, Linkedin, Terminal, Check, MessageSquare, Layers, FolderGit, Compass, Shield, HelpCircle, ChevronRight,
  Briefcase, GraduationCap, MapPin, Calendar, TrendingUp, Sparkles, Copy
} from "lucide-react";
import { AboutInfo, SkillGroup, ProjectItem, ContactDetails, ContactMessage, ExperienceItem, EducationItem } from "../types";
import { developerContact, developerEducation } from "../data";

interface VisualizerTabProps {
  path: string;
  data: any;
  onNavigate: (path: string) => void;
  onPostMessage?: (message: { name: string; email: string; message: string }) => void;
  messagesList?: ContactMessage[];
}

export const VisualizerTab: React.FC<VisualizerTabProps> = ({ 
  path, 
  data, 
  onNavigate, 
  onPostMessage,
  messagesList = [] 
}) => {
  // Local state for interactive form in visualizer
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setFormError("All payload fields are required.");
      return;
    }
    if (!contactForm.email.includes("@")) {
      setFormError("Please provide a valid email structure.");
      return;
    }
    setFormError("");
    setIsSending(true);

    // 1. Post to local live state session store (/messages)
    if (onPostMessage) {
      onPostMessage({ ...contactForm });
    }

    // 2. Dispatch email asynchronously via FormSubmit backend API (sends directly to emailsristi@gmail.com without opening email client)
    try {
      await fetch("https://formsubmit.co/ajax/emailsristi@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          _subject: `New Portfolio Inquiry from ${contactForm.name}`
        })
      });
    } catch (err) {
      console.log("Async email submission completed:", err);
    }

    setIsSending(false);
    setIsSubmitted(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  // 1. Root Route Visualizer: Welcome Dashboard
  if (path === "/" || path === "") {
    return (
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text">
        <div className="p-6 rounded-lg bg-gh-panel border border-gh-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-gh-mute">
            <Server size={180} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#7ee787]/10 border border-[#7ee787]/20 text-[11px] font-mono font-medium text-[#7ee787] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#7ee787] animate-pulse" />
              STATUS: API_OPERATIONAL_200
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-mono">
              Sristi's RESTful API Service
            </h1>
            <p className="text-gh-mute max-w-xl text-sm mb-4">
              This service serves information about my skills, experience, and projects. You can query this service to by clicking on the API you want to hit from the left nav bar and it would automatically
              get populated in the search bar on the top of this page. Just click "SEND" to execute the query!
              Happy Querying!

            </p>
            <div className="flex flex-wrap gap-3">
              <button
                id="btn-vis-about"
                onClick={() => onNavigate("/about")}
                className="px-4 py-2 rounded bg-gh-green hover:bg-gh-green-hover text-white font-medium text-xs font-sans transition duration-200 cursor-pointer"
              >
                GET /about me
              </button>
              <button
                id="btn-vis-projects"
                onClick={() => onNavigate("/projects")}
                className="px-4 py-2 rounded bg-[#21262d] hover:bg-[#30363d] border border-gh-border font-medium text-xs font-mono text-white transition duration-200 cursor-pointer"
              >
                GET /projects
              </button>
            </div>
          </div>
        </div>

        {/* Quick System Diagnostics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gh-panel border border-gh-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gh-mute uppercase font-mono font-semibold tracking-wider">Heap Memory</span>
              <Cpu className="text-[#58a6ff]" size={16} />
            </div>
            <div className="text-2xl font-bold font-mono text-white">42.8 MB</div>
            <div className="text-[10px] text-gh-mute font-mono mt-1">Slower allocations, GC run 3m ago</div>
          </div>

          <div className="p-4 rounded-lg bg-gh-panel border border-gh-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gh-mute uppercase font-mono font-semibold tracking-wider">Avg Latency</span>
              <Clock className="text-[#d29922]" size={16} />
            </div>
            <div className="text-2xl font-bold font-mono text-white">14.2 ms</div>
            <div className="text-[10px] text-gh-mute font-mono mt-1">p99 threshold at 32ms</div>
          </div>

          <div className="p-4 rounded-lg bg-gh-panel border border-gh-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gh-mute uppercase font-mono font-semibold tracking-wider">Gateway Nodes</span>
              <Network className="text-[#7ee787]" size={16} />
            </div>
            <div className="text-2xl font-bold font-mono text-white">4 / 4 Active</div>
            <div className="text-[10px] text-gh-mute font-mono mt-1">Health checked 10s ago via Consul</div>
          </div>
        </div>
      </div>
    );
  }

  // 2. About Route Visualizer
  if (path === "/about") {
    const info = data as AboutInfo;
    const base = import.meta.env.BASE_URL;
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const rawAvatar = info.avatarUrl || "/sristi.svg";
    const avatarPath = rawAvatar.startsWith('/') ? `${cleanBase}${rawAvatar}` : `${cleanBase}/${rawAvatar}`;

    return (
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text">
        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-lg bg-gh-panel border border-gh-border">
          <div className="flex-shrink-0 flex flex-col items-center">
            {/* Hardcoded Avatar with relative path */}
            <div className="relative group overflow-hidden rounded-xl border-2 border-gh-blue/60 shadow-lg">
              <img 
                src={avatarPath} 
                alt={info.name} 
                className="w-36 h-48 sm:w-40 sm:h-52 object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `${cleanBase}/sristi.svg`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono text-white font-bold bg-black/70 backdrop-blur px-2 py-0.5 rounded border border-white/10">
                Sristi Sharma
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 mt-3">
              <span className="px-2.5 py-1 rounded bg-gh-active-bg border border-gh-blue/30 text-[#58a6ff] font-mono text-[10px] uppercase tracking-wider font-bold">
                Experience: {info.experienceYears} Years
              </span>
            </div>
          </div>

          <div className="space-y-3 flex-grow">
            <div>
              <h2 className="text-2xl font-bold text-white font-mono">{info.name}</h2>
              <p className="text-[#7ee787] font-mono text-xs font-bold mt-0.5">{info.title}</p>
            </div>
            <p className="text-gh-text text-sm leading-relaxed">{info.bio}</p>
            
            <div className="pt-3 border-t border-gh-border grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono text-gh-mute">
              <div>📍 Location: <span className="text-gh-text font-semibold">{info.location}</span></div>
              <div>🛠️ Philosophy: <span className="text-gh-text">{info.philosophy}</span></div>
            </div>
          </div>
        </div>

        {/* Interests & Topics of Domain */}
        <div className="p-5 rounded-lg bg-gh-panel border border-gh-border">
          <h3 className="text-xs uppercase font-mono tracking-wider text-[#58a6ff] font-black mb-3">Core Technical Obsessions</h3>
          <div className="flex flex-wrap gap-2">
            {info.interests && info.interests.map((interest, i) => (
              <span key={i} className="px-3 py-1.5 rounded bg-[#21262d] border border-gh-border text-gh-text font-mono text-xs hover:border-gh-blue transition duration-150">
                ⚡ {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2.5. Experience Route Visualizer
  if (path === "/experience") {
    const experiences: ExperienceItem[] = Array.isArray(data)
      ? data
      : (data?.work_history || []);
    const education: EducationItem = data?.education || developerEducation;

    return (
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text">
        {/* Header Stats / Overview */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-lg bg-gh-panel border border-gh-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-[#d29922]/15 text-[#d29922] border border-[#d29922]/30">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-mono">Work Experience & Impact</h2>
              <p className="text-xs text-gh-mute font-mono">4 Years SDE | Large-Scale Distributed Systems, LLM Orchestration & Backend Infrastructure</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-[#0d1117] border border-gh-border text-[#7ee787]">
              {experiences.length} Career Roles
            </span>
            <span className="px-2.5 py-1 rounded bg-[#0d1117] border border-gh-border text-[#58a6ff]">
              Bengaluru, India
            </span>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-5">
          {experiences.map((exp, i) => (
            <div key={exp.id || i} className="p-5 rounded-lg bg-gh-panel border border-gh-border hover:border-[#58a6ff]/40 transition duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gh-border">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-white font-mono">{exp.role}</h3>
                    <span className="text-xs font-mono font-bold text-[#58a6ff]">@ {exp.company}</span>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 rounded bg-[#7ee787]/15 border border-[#7ee787]/30 text-[#7ee787] text-[10px] font-mono font-bold">
                        CURRENT ROLE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gh-mute font-mono mt-1">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {exp.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {exp.period}</span>
                  </div>
                </div>

                <button 
                  id={`btn-exp-${exp.id}`}
                  onClick={() => onNavigate(`/experience/${exp.id}`)}
                  className="px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] border border-gh-border text-white text-xs font-mono transition duration-200 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  GET /experience/{exp.id} <ChevronRight size={12} />
                </button>
              </div>

              {/* Impact Metrics Pills */}
              {exp.metrics && exp.metrics.length > 0 && (
                <div className="flex flex-wrap gap-2 my-3">
                  {exp.metrics.map((metric, mIdx) => (
                    <span key={mIdx} className="px-2.5 py-1 rounded bg-[#0d1117] border border-gh-blue/30 text-[#58a6ff] text-[11px] font-mono flex items-center gap-1">
                      <TrendingUp size={11} className="text-[#7ee787]" /> {metric}
                    </span>
                  ))}
                </div>
              )}

              {/* Highlights Bullet List */}
              <div className="mt-3 space-y-2">
                <h4 className="text-[11px] font-mono uppercase tracking-wider font-bold text-gh-mute">Key Contributions & Engineering Accomplishments:</h4>
                <ul className="space-y-2 text-xs text-gh-text leading-relaxed">
                  {exp.highlights && exp.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex gap-2.5 items-start">
                      <CheckCircle2 size={13} className="text-[#7ee787] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gh-border/60 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-gh-mute uppercase font-bold mr-1">Stack:</span>
                  {exp.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-[#21262d] border border-gh-border text-gh-mute font-mono text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Education Section */}
        {education && (
          <div className="p-5 rounded-lg bg-gh-panel border border-gh-border">
            <h3 className="text-xs uppercase font-mono tracking-wider font-bold text-[#d2a8ff] mb-3 flex items-center gap-2">
              <GraduationCap size={16} /> Education
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded bg-[#0d1117] border border-gh-border">
              <div>
                <h4 className="text-sm font-bold text-white font-mono">{education.institution}</h4>
                <p className="text-xs text-[#7ee787] font-mono mt-0.5">{education.degree}</p>
                <p className="text-xs text-gh-mute font-mono mt-1">📍 {education.location} • {education.graduationDate}</p>
              </div>
              <div className="px-3 py-1.5 rounded bg-gh-active-bg border border-gh-blue/30 text-[#58a6ff] text-xs font-mono font-bold self-start sm:self-auto">
                CGPA: {education.cgpa}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Targeted Experience Detail
  if (path.startsWith("/experience/")) {
    const exp = data as ExperienceItem;
    if (!exp || !exp.company) {
      return (
        <div className="p-6 text-center text-gh-mute font-mono">
          Experience record unavailable. Query a valid endpoint (e.g. /experience/amazon-alexa, /experience/amazon-music).
        </div>
      );
    }

    return (
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text">
        <div className="p-6 rounded-lg bg-gh-panel border border-gh-border space-y-4">
          <div className="flex flex-wrap justify-between items-start gap-3 border-b border-gh-border pb-4">
            <div>
              <span className="text-[10px] font-mono text-gh-mute uppercase tracking-widest bg-[#0d1117] border border-gh-border px-2 py-0.5 rounded">
                Endpoint /experience/{exp.id}
              </span>
              <h2 className="text-2xl font-bold text-white font-mono mt-1.5">{exp.role}</h2>
              <p className="text-base font-bold text-[#58a6ff] font-mono">@ {exp.company}</p>
            </div>
            <div className="text-right font-mono text-xs text-gh-mute space-y-1">
              <div>📍 {exp.location}</div>
              <div className="text-[#7ee787] font-bold">📅 {exp.period}</div>
            </div>
          </div>

          {/* Key Metrics grid */}
          {exp.metrics && exp.metrics.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-[#7ee787] mb-2.5">Key Performance Metrics & Impact</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {exp.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded bg-[#0d1117] border border-gh-border flex items-center gap-2 text-xs font-mono text-white">
                    <Sparkles size={14} className="text-[#d29922] flex-shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Contributions */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-[#58a6ff] mb-2.5">Architectural Details & Project Contributions</h4>
            <div className="space-y-2.5 p-4 rounded bg-[#0d1117] border border-gh-border">
              {exp.highlights && exp.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-gh-text">
                  <span className="font-mono text-[#7ee787] font-bold">[{idx + 1}]</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          {exp.technologies && (
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-gh-mute mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#21262d] border border-gh-border text-xs font-mono text-gh-text">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Skills Route Visualizer
  if (path === "/skills") {
    const group = data as SkillGroup;
    return (
      <div className="space-y-6 pt-1 animate-fadeIn">
        {/* Core Languages and Frameworks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg bg-gh-panel border border-gh-border">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#7ee787] font-bold mb-4 flex items-center gap-1.5">
              <Code2 size={14} /> Languages
            </h3>
            <div className="space-y-3">
              {group.languages && group.languages.map((item, i) => {
                const widthMap: Record<string, string> = {
                  "Expert": "w-[95%]",
                  "Advanced": "w-[80%]",
                  "Intermediate": "w-[60%]",
                  "Learning": "w-[30%]"
                };
                const colorMap: Record<string, string> = {
                  "Expert": "bg-[#7ee787]",
                  "Advanced": "bg-[#58a6ff]",
                  "Intermediate": "bg-[#d29922]",
                  "Learning": "bg-[#8b949e]"
                };
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-gh-text font-semibold">{item.name} {item.version && `(${item.version})`}</span>
                      <span className="text-gh-mute text-[10px]">{item.proficiency}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#0d1117] rounded-full overflow-hidden">
                      <div className={`h-full ${widthMap[item.proficiency] || "w-[50%]"} ${colorMap[item.proficiency] || "bg-[#7ee787]"}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-lg bg-gh-panel border border-gh-border">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#d2a8ff] font-bold mb-4 flex items-center gap-1.5">
              <Layers size={14} className="text-[#d2a8ff]" /> Frameworks & Interfaces
            </h3>
            <div className="space-y-3">
              {group.frameworks && group.frameworks.map((item, i) => {
                const widthMap: Record<string, string> = {
                  "Expert": "w-[95%]",
                  "Advanced": "w-[80%]",
                  "Intermediate": "w-[60%]",
                  "Learning": "w-[30%]"
                };
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-gh-text font-semibold">{item.name}</span>
                      <span className="text-gh-mute text-[10px]">{item.proficiency}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#0d1117] rounded-full overflow-hidden">
                      <div className={`h-full ${widthMap[item.proficiency] || "w-[50%]"} bg-[#d2a8ff]`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Database & Infrastructure Chips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gh-panel border border-gh-border">
            <h4 className="text-[11px] uppercase font-mono tracking-wider text-[#58a6ff] font-bold mb-2.5 flex items-center gap-1">
              <Database size={12} /> Storage Engines
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.databases && group.databases.map((db, i) => (
                <span key={i} className="px-2 py-1 rounded bg-[#0d1117] border border-gh-border text-[10px] font-mono text-gh-text">
                  {db}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gh-panel border border-gh-border">
            <h4 className="text-[11px] uppercase font-mono tracking-wider text-[#f78166] font-bold mb-2.5 flex items-center gap-1">
              <Network size={12} /> Cloud & Orchestrations
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.cloud_platforms && group.cloud_platforms.map((platform, i) => (
                <span key={i} className="px-2 py-1 rounded bg-[#0d1117] border border-gh-border text-[10px] font-mono text-gh-text">
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gh-panel border border-gh-border">
            <h4 className="text-[11px] uppercase font-mono tracking-wider text-gh-mute font-bold mb-2.5 flex items-center gap-1">
              <Terminal size={12} /> Systems & Pipelines
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.tools && group.tools.map((tool, i) => (
                <span key={i} className="px-2 py-1 rounded bg-[#0d1117] border border-gh-border text-[10px] font-mono text-gh-text">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Projects Route Visualizer (Directory of list of projects)
  if (path === "/projects") {
    const projects: ProjectItem[] = Array.isArray(data) 
      ? data 
      : (data?.projects_dataset || data?.projects || []);
    return (
      <div className="space-y-4 pt-1 animate-fadeIn">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-mono text-gh-mute">Total Systems Deployed: {projects.length}</span>
          <span className="text-[10px] font-mono text-[#7ee787]">Namespace: Production</span>
        </div>

        <div className="space-y-4">
          {projects.map((proj, i) => (
            <div key={i} className="p-5 rounded-lg bg-gh-panel border border-gh-border hover:border-[#58a6ff]/40 transition duration-200 flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="space-y-2 flex-grow">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-white font-mono">{proj.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                    proj.status === "completed" 
                      ? "bg-[#7ee787]/15 border border-[#7ee787]/30 text-[#7ee787]" 
                      : "bg-[#d29922]/15 border border-[#d29922]/30 text-[#d29922]"
                  }`}>
                    {proj.status}
                  </span>
                  {proj.metric && (
                    <span className="px-2 py-0.5 rounded bg-gh-active-bg border border-gh-blue/30 text-[#58a6ff] font-mono text-[10px]">
                      {proj.metric}
                    </span>
                  )}
                </div>
                <p className="text-gh-text text-sm">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies_used && proj.technologies_used.map((tech, j) => (
                    <span key={j} className="px-2 py-0.5 rounded bg-[#21262d] border border-gh-border text-gh-mute text-[10px] font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <button 
                  id={`btn-proj-${proj.id}`}
                  onClick={() => onNavigate(`/projects/${proj.id}`)}
                  className="w-full md:w-auto px-3.5 py-2 rounded bg-[#21262d] hover:bg-[#30363d] border border-gh-border text-white font-mono text-xs transition duration-200 flex items-center justify-center gap-1 cursor-pointer"
                >
                  Inspect API Endpoint <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. Individual Project Target Visualizer
  if (path.startsWith("/projects/")) {
    const proj = data as ProjectItem;
    if (!proj || !proj.name) {
      return (
        <div className="p-6 text-center text-gh-mute font-mono">
          Project records unavailable. Query correct project endpoint (e.g. /projects/youtube-comment-manager-mcp).
        </div>
      );
    }
    return (
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text">
        <div className="p-6 rounded-lg bg-gh-panel border border-gh-border">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
            <div>
              <span className="text-[10px] font-mono text-gh-mute uppercase tracking-widest bg-[#0d1117] border border-gh-border px-2 py-0.5 rounded">Endpoint /projects/{proj.id}</span>
              <h2 className="text-2xl font-bold text-white font-mono mt-1">{proj.name}</h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-gh-active-bg border border-gh-blue/30 text-[#58a6ff] font-mono text-xs capitalize">
              Role: {proj.your_role}
            </span>
          </div>

          <p className="text-sm text-gh-text leading-relaxed mb-4">{proj.overview}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-[#7ee787] mb-2">System Architecture Notes</h4>
              <p className="text-xs text-gh-mute font-mono bg-[#0d1117] p-3 rounded border border-gh-border">
                {proj.architecture_notes}
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-[#58a6ff] mb-2">Technologies Deployed</h4>
              <div className="flex flex-wrap gap-1.5 p-3 rounded bg-[#0d1117] border border-gh-border">
                {proj.technologies_used && proj.technologies_used.map((tech, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-[#21262d] border border-gh-border text-gh-text text-xs font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features & Key Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg bg-gh-panel border border-gh-border">
            <h3 className="text-xs uppercase font-mono tracking-wider text-gh-mute font-black mb-3">Key Solutions & Implementations</h3>
            <ul className="space-y-2.5 text-xs text-gh-text">
              {proj.key_features && proj.key_features.map((feat, i) => (
                <li key={i} className="flex gap-2 items-start font-sans">
                  <CheckCircle2 size={14} className="text-[#7ee787] mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-lg bg-gh-panel border border-gh-border">
            <h3 className="text-xs uppercase font-mono tracking-wider text-gh-mute font-black mb-3">Post-Mortem Challenge Solved</h3>
            <ul className="space-y-2.5 text-xs text-gh-text">
              {proj.challenges_solved && proj.challenges_solved.map((chal, i) => (
                <li key={i} className="flex gap-2 items-start font-sans">
                  <span className="font-mono text-[#58a6ff] text-xs mt-0.5 flex-shrink-0 font-bold">[{i+1}]</span>
                  <span>{chal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Repo Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <a 
            href={proj.github_repo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-[#21262d] hover:bg-[#30363d] text-white font-mono text-xs border border-gh-border transition duration-200 flex items-center gap-1.5"
          >
            <Github size={13} /> View Codebase
          </a>
        </div>
      </div>
    );
  }

  // 6. Contact POST Route Visualizer
  if (path === "/contact") {
    const details = (data && typeof data === "object" && "email" in data && "github" in data)
      ? (data as ContactDetails)
      : developerContact;
    return (
      <div className="space-y-6 pt-1 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email Card */}
          <div className="p-4 rounded-lg bg-gh-panel border border-gh-border hover:border-[#7ee787]/40 transition duration-200 flex items-center gap-3.5">
            <div className="p-2.5 rounded bg-[#7ee787]/10 text-[#7ee787]">
              <Mail size={18} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-gh-mute uppercase">Interactive Mailbox</span>
              <a href={`mailto:${details.email}`} className="block text-xs font-mono text-gh-text hover:text-[#7ee787] transition mt-0.5">
                {details.email}
              </a>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="p-4 rounded-lg bg-gh-panel border border-gh-border hover:border-[#d2a8ff]/40 transition duration-200 flex items-center gap-3.5">
            <div className="p-2.5 rounded bg-[#d2a8ff]/10 text-[#d2a8ff]">
              <Github size={18} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-gh-mute uppercase">GitHub Node</span>
              <a href={details.github} target="_blank" rel="noopener noreferrer" className="block text-xs font-mono text-gh-text hover:text-[#d2a8ff] transition mt-0.5">
                {details.github.replace("https://", "")}
              </a>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="p-4 rounded-lg bg-gh-panel border border-gh-border hover:border-[#58a6ff]/40 transition duration-200 flex items-center gap-3.5">
            <div className="p-2.5 rounded bg-[#58a6ff]/10 text-[#58a6ff]">
              <Linkedin size={18} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-gh-mute uppercase">Professional Network</span>
              <a href={details.linkedin} target="_blank" rel="noopener noreferrer" className="block text-xs font-mono text-gh-text hover:text-[#58a6ff] transition mt-0.5">
                {details.linkedin.replace("https://", "")}
              </a>
            </div>
          </div>
        </div>

        {/* Live Form Submission Handshake */}
        <div className="p-6 rounded-lg bg-gh-panel border border-gh-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
              <Terminal size={16} className="text-[#7ee787]" />
              Direct Message & Email Dispatch to emailsristi@gmail.com
            </h3>
            <span className="px-2.5 py-1 rounded bg-[#7ee787]/10 text-[#7ee787] text-[10px] font-mono font-bold border border-[#7ee787]/20 self-start sm:self-auto">
              Direct Mail Enabled
            </span>
          </div>
          <p className="text-xs text-gh-mute mb-4 font-sans leading-relaxed">
            Submitting this form dispatches the message directly to <strong className="text-white">emailsristi@gmail.com</strong> AND logs the transaction to the live <span className="font-mono text-[#58a6ff]">/messages</span> record table right inside the app.
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4 font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gh-mute tracking-wider">payload_name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Recruiter Name" 
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs text-gh-text bg-[#0d1117] rounded border border-gh-border outline-none focus:border-[#58a6ff] transition font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gh-mute tracking-wider">payload_email *</label>
                <input 
                  type="text" 
                  placeholder="e.g. name@company.com" 
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs text-gh-text bg-[#0d1117] rounded border border-gh-border outline-none focus:border-[#58a6ff] transition font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gh-mute tracking-wider">message_string *</label>
              <textarea 
                rows={3}
                placeholder="Write message details... E.g. 'Hey Sristi, we want to interview you for a senior backend position!'" 
                value={contactForm.message}
                onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-3 py-2 text-xs text-gh-text bg-[#0d1117] rounded border border-gh-border outline-none focus:border-[#58a6ff] transition font-mono"
              />
            </div>

            {formError && (
              <div className="text-rose-400 text-xs font-mono">
                ⚠️ Error: {formError}
              </div>
            )}

            {isSubmitted ? (
              <div className="p-3 bg-[#7ee787]/10 border border-[#7ee787]/20 rounded flex items-center gap-2 text-[#7ee787] text-xs">
                <Check size={14} /> Message sent directly to Sristi! HTTP 201 Created. Check /messages log to view transaction.
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  type="submit"
                  id="btn-vis-post-contact"
                  disabled={isSending}
                  className="px-4 py-2 rounded bg-gh-green hover:bg-gh-green-hover disabled:opacity-50 text-white font-bold text-xs transition duration-200 flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <Mail size={14} />
                  {isSending ? "Sending Email..." : "Send Message"}
                </button>

                <button 
                  type="button"
                  id="btn-copy-sristi-email"
                  onClick={() => {
                    navigator.clipboard.writeText("emailsristi@gmail.com");
                    setCopiedEmail(true);
                    setTimeout(() => setCopiedEmail(false), 2500);
                  }}
                  className="px-4 py-2 rounded bg-[#21262d] hover:bg-[#30363d] text-gh-text text-xs font-mono border border-gh-border transition duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-[#7ee787]" />
                      <span className="text-[#7ee787]">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Email (emailsristi@gmail.com)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  // 7. Dynamic Posted Messages logger (/messages)
  if (path === "/messages") {
    return (
      <div className="space-y-4 pt-1 animate-fadeIn">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-mono text-gh-mute">Database Record Logs: {messagesList.length}</span>
          <span className="text-[10px] font-mono text-[#58a6ff]">Table: user_contact_handshakes</span>
        </div>

        {messagesList.length === 0 ? (
          <div className="p-12 text-center rounded-lg bg-gh-panel border border-gh-border">
            <MessageSquare className="mx-auto text-gh-mute mb-3" size={32} />
            <h4 className="text-sm font-mono text-gh-text font-bold mb-1">Database Table Empty</h4>
            <p className="text-xs text-gh-mute max-w-sm mx-auto">
              Please route to POST /contact to send Sristi a quick message, writing details into this active session's log cache.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messagesList.map((msg, i) => (
              <div key={i} className="p-4 rounded-lg bg-gh-panel border border-gh-border font-mono text-xs">
                <div className="flex justify-between items-center border-b border-gh-border pb-2 mb-2">
                  <span className="text-[#7ee787] font-bold">UID: {msg.id}</span>
                  <span className="text-gh-mute text-[10px]">{msg.timestamp}</span>
                </div>
                <div className="space-y-1 text-gh-text">
                  <div><span className="text-gh-mute">Name:</span> <span className="text-white font-semibold">{msg.name}</span></div>
                  <div><span className="text-gh-mute">Email:</span> <span className="text-white">{msg.email}</span></div>
                  <div className="pt-1.5 border-t border-gh-border/40 mt-1.5 text-white font-sans italic text-[13px]">
                    "{msg.message}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 8. Stats metrics Route
  if (path === "/stats") {
    return (
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text">
        <div className="p-5 rounded-lg bg-gh-panel border border-gh-border">
          <h3 className="text-sm font-mono font-bold text-white mb-3">Live Server Performance Console</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3.5 rounded bg-[#0d1117] border border-gh-border">
              <div className="text-[10px] font-mono text-gh-mute uppercase">Uptime</div>
              <div className="text-lg font-bold font-mono text-white mt-0.5">99.998%</div>
            </div>
            <div className="p-3.5 rounded bg-[#0d1117] border border-gh-border">
              <div className="text-[10px] font-mono text-gh-mute uppercase">Socket Pools</div>
              <div className="text-lg font-bold font-mono text-white mt-0.5">14,204 active</div>
            </div>
            <div className="p-3.5 rounded bg-[#0d1117] border border-gh-border">
              <div className="text-[10px] font-mono text-gh-mute uppercase">CPU Usage</div>
              <div className="text-lg font-bold font-mono text-[#7ee787] mt-0.5">1.4% avg</div>
            </div>
            <div className="p-3.5 rounded bg-[#0d1117] border border-gh-border">
              <div className="text-[10px] font-mono text-gh-mute uppercase">Daily Request Peak</div>
              <div className="text-lg font-bold font-mono text-[#58a6ff] mt-0.5">4.2M GETs</div>
            </div>
          </div>
        </div>

        {/* Real-time Graph simulation */}
        <div className="p-5 rounded-lg bg-gh-panel border border-gh-border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xs font-mono uppercase text-[#58a6ff] font-bold">API latency distribution history (p95)</h4>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#7ee787]">
              <span className="w-2 h-2 rounded-full bg-[#7ee787] animate-pulse" /> Live Telemetry Link
            </span>
          </div>
          <div className="h-28 flex items-end gap-1.5 pt-4">
            {[12, 14, 18, 11, 15, 14, 25, 42, 12, 13, 20, 15, 18, 14, 11, 12, 38, 15, 13, 14, 12, 11, 15, 14].map((height, index) => (
              <div key={index} className="flex-grow group relative flex flex-col justify-end h-full">
                <div 
                  style={{ height: `${height * 2}%` }} 
                  className={`w-full rounded-t-sm transition-all duration-300 group-hover:bg-[#58a6ff] ${
                    height > 30 ? "bg-[#d29922]/80" : "bg-[#7ee787]/80"
                  }`} 
                />
                <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0d1117] border border-gh-border text-[9px] font-mono text-gh-text px-1 py-0.5 rounded shadow whitespace-nowrap transition duration-150 z-20">
                  {height}ms
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-mono text-gh-mute pt-2 border-t border-gh-border">
            <span>24h ago</span>
            <span>12h ago</span>
            <span>Current Execution</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gh-mute font-mono text-sm p-4 text-center">
      Visualizer layout not configured for this endpoint. Switch to {"{ } JSON"} tab to read raw API response logs.
    </div>
  );
};
