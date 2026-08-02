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

  // Local state for image loading checks
  const [imageError, setImageError] = useState(false);

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
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text font-sans">
        <div className="p-6 rounded-xl bg-gradient-to-br from-[#11141a] to-[#161a24] border border-gh-border shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-400">
            <Server size={180} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-400/5 border border-emerald-500/15 text-[10px] font-mono font-bold text-emerald-400 mb-4 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: API_OPERATIONAL_200
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 font-sans">
              Sristi's RESTful API Service
            </h1>
            <p className="text-slate-400 max-w-xl text-xs sm:text-sm leading-relaxed mb-5 font-sans">
              Welcome to the interactive REST API Workspace. This playground exposes endpoints to query technical stack data, work experience history, and system highlights. Click on any route path in the left collections tree to draft query parameters and hit the SEND button to execute calls.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                id="btn-vis-about"
                onClick={() => onNavigate("/about")}
                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition duration-200 cursor-pointer shadow-md hover:shadow-[0_0_12px_rgba(99,102,241,0.25)]"
              >
                GET /about
              </button>
              <button
                id="btn-vis-projects"
                onClick={() => onNavigate("/projects")}
                className="px-4 py-2 rounded-md bg-[#161a22] hover:bg-[#202530] border border-gh-border font-semibold text-xs text-white transition duration-200 cursor-pointer"
              >
                GET /projects
              </button>
            </div>
          </div>
        </div>

        {/* Quick System Diagnostics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#11141a]/60 border border-gh-border/80 shadow-inner hover:border-indigo-500/35 transition-colors duration-200 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gh-mute uppercase font-bold tracking-wider font-sans">Heap Memory</span>
              <Cpu className="text-indigo-400 group-hover:text-indigo-350 transition-colors" size={15} />
            </div>
            <div className="text-2xl font-bold font-mono text-white">42.8 <span className="text-xs font-semibold text-gh-mute font-sans">MB</span></div>
            <div className="text-[10px] text-gh-mute font-mono mt-1">Slower allocations, GC run 3m ago</div>
          </div>

          <div className="p-4 rounded-xl bg-[#11141a]/60 border border-gh-border/80 shadow-inner hover:border-amber-500/35 transition-colors duration-200 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gh-mute uppercase font-bold tracking-wider font-sans">Avg Latency</span>
              <Clock className="text-amber-400 group-hover:text-amber-350 transition-colors" size={15} />
            </div>
            <div className="text-2xl font-bold font-mono text-white">14.2 <span className="text-xs font-semibold text-gh-mute font-sans">ms</span></div>
            <div className="text-[10px] text-gh-mute font-mono mt-1">p99 latency threshold at 32ms</div>
          </div>

          <div className="p-4 rounded-xl bg-[#11141a]/60 border border-gh-border/80 shadow-inner hover:border-emerald-500/35 transition-colors duration-200 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gh-mute uppercase font-bold tracking-wider font-sans">Gateway Nodes</span>
              <Network className="text-emerald-400 group-hover:text-emerald-350 transition-colors" size={15} />
            </div>
            <div className="text-2xl font-bold font-mono text-white">4 / 4 <span className="text-xs font-semibold text-emerald-400 font-sans">Active</span></div>
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
    const rawAvatar = info.avatarUrl || "/Sristi-profile.png";
    const avatarPath = rawAvatar.startsWith('/') ? `${cleanBase}${rawAvatar}` : `${cleanBase}/${rawAvatar}`;

    return (
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text font-sans">
        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border shadow-sm">
          <div className="flex-shrink-0 flex flex-col items-center">
            {/* Avatar Container */}
            <div className="relative group overflow-hidden rounded-xl border border-indigo-500/20 shadow-md w-36 h-48 sm:w-40 sm:h-52 bg-[#090b10] flex items-center justify-center">
              {!imageError ? (
                <img 
                  src={avatarPath} 
                  alt={info.name} 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    setImageError(true);
                  }}
                />
              ) : (
                /* Elegant Professional Silhouette Vector Fallback */
                <svg className="w-16 h-16 text-indigo-400/40" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12c0 2.822 1.2 5.362 3.097 7.12a.75.75 0 01.072-1.045c.983-.872 2.458-1.575 4.331-1.575h4.5c1.873 0 3.348.703 4.331 1.575a.75.75 0 01.072 1.045zM15 9.75a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono text-white/90 font-bold bg-[#090b10]/80 backdrop-blur-sm px-2 py-0.5 rounded border border-white/5 pointer-events-none">
                Sristi Sharma
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 mt-3.5">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[10px] uppercase tracking-wider font-semibold">
                Experience: {info.experienceYears} Years
              </span>
            </div>
          </div>

          <div className="space-y-4 flex-grow">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{info.name}</h2>
              <p className="text-emerald-400 font-mono text-xs font-semibold mt-1">{info.title}</p>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{info.bio}</p>
            
            <div className="pt-4 border-t border-gh-border/50 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-indigo-400 flex-shrink-0" />
                <span>Location: <span className="text-white font-medium">{info.location}</span></span>
              </div>
              <div className="flex items-start gap-2">
                <Cpu size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>Philosophy: <span className="text-white font-medium">{info.philosophy}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Interests & Topics of Domain */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border shadow-sm">
          <h3 className="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-400 mb-3.5">Core Technical Obsessions</h3>
          <div className="flex flex-wrap gap-2">
            {info.interests && info.interests.map((interest, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-[#090b10] border border-gh-border text-slate-300 font-sans text-xs hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:text-white transition duration-200">
                {interest}
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
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text font-sans">
        {/* Header Stats / Overview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4.5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Briefcase size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Work Experience & Impact</h2>
              <p className="text-xs text-slate-400 font-sans mt-0.5">Large-Scale Distributed Systems, LLM Orchestration & Backend Infrastructure</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded-full bg-emerald-400/5 border border-emerald-500/15 text-emerald-400 font-bold">
              {experiences.length} Career Roles
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/5 border border-indigo-500/15 text-indigo-400 font-bold">
              Bengaluru, India
            </span>
          </div>
        </div>

        {/* Vertical Timeline Stepper */}
        <div className="relative pl-5 sm:pl-7 border-l border-gh-border/60 ml-4 space-y-8 py-2">
          {experiences.map((exp, i) => (
            <div key={exp.id || i} className="relative group">
              {/* Stepper Dot */}
              <div className="absolute -left-[29px] sm:-left-[33px] top-2.5 w-3.5 h-3.5 rounded-full bg-[#090b10] border-2 border-indigo-500 flex items-center justify-center z-10 shadow-[0_0_8px_rgba(99,102,241,0.3)]">
                <div className="w-1 h-1 rounded-full bg-indigo-400" />
              </div>

              {/* Card Container */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border hover:border-indigo-500/25 transition duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gh-border/50">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-white">{exp.role}</h3>
                      <span className="text-xs font-semibold text-indigo-400">@ {exp.company}</span>
                      {exp.isCurrent && (
                        <span className="px-2 py-0.5 rounded bg-emerald-400/5 border border-emerald-500/15 text-emerald-400 text-[9px] font-mono font-bold tracking-wider">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gh-mute mt-1.5">
                      <span className="flex items-center gap-1.5"><MapPin size={11} className="text-indigo-400" /> {exp.location}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={11} className="text-indigo-400" /> {exp.period}</span>
                    </div>
                  </div>

                  <button 
                    id={`btn-exp-${exp.id}`}
                    onClick={() => onNavigate(`/experience/${exp.id}`)}
                    className="px-2.5 py-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.06] border border-gh-border text-white text-[10px] font-mono transition duration-200 flex items-center gap-1 self-start sm:self-auto cursor-pointer hover:border-indigo-500/30"
                  >
                    GET /experience/{exp.id} <ChevronRight size={11} />
                  </button>
                </div>

                {/* Impact Metrics Pills */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2 my-3.5">
                    {exp.metrics.map((metric, mIdx) => (
                      <span key={mIdx} className="px-2 py-1 rounded-md bg-indigo-500/5 border border-indigo-500/15 text-indigo-400 text-[10.5px] font-mono flex items-center gap-1">
                        <TrendingUp size={11} className="text-emerald-400" /> {metric}
                      </span>
                    ))}
                  </div>
                )}

                {/* Highlights Bullet List */}
                <div className="mt-3.5 space-y-2">
                  <h4 className="text-[9.5px] font-mono uppercase tracking-wider font-bold text-gh-mute">Key Contributions & Engineering Accomplishments</h4>
                  <ul className="space-y-2 text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans">
                    {exp.highlights && exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex gap-2.5 items-start">
                        <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t border-gh-border/50 flex flex-wrap items-center gap-1.5">
                    <span className="text-[9px] font-mono text-gh-mute uppercase font-bold mr-1">Stack:</span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-[#090b10] border border-gh-border text-slate-400 font-mono text-[10px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        {education && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border shadow-sm">
            <h3 className="text-[10px] uppercase font-mono tracking-wider font-bold text-purple-400 mb-3.5 flex items-center gap-2">
              <GraduationCap size={15} /> Education
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#090b10]/60 border border-gh-border/80 shadow-inner">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{education.institution}</h4>
                <p className="text-xs text-indigo-400 font-semibold">{education.degree}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 pt-0.5 font-sans">
                  <span className="flex items-center gap-1"><MapPin size={11} /> {education.location}</span>
                  <span>• {education.graduationDate}</span>
                </div>
              </div>
              <div className="px-3.5 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold self-start sm:self-auto shadow-sm">
                CGPA: <span className="text-white font-black">{education.cgpa}</span>
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
        <div className="p-6 text-center text-gh-mute font-mono text-xs leading-relaxed">
          Experience record unavailable. Query a valid endpoint (e.g. /experience/amazon-alexa, /experience/amazon-music).
        </div>
      );
    }

    return (
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text font-sans">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border space-y-5">
          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-gh-border/50 pb-4">
            <div>
              <span className="text-[9px] font-mono text-gh-mute uppercase tracking-widest bg-[#090b10] border border-gh-border px-2.5 py-0.5 rounded-full">
                Endpoint /experience/{exp.id}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">{exp.role}</h2>
              <p className="text-sm sm:text-base font-semibold text-indigo-400 mt-0.5">@ {exp.company}</p>
            </div>
            <div className="font-sans text-xs text-slate-450 space-y-1 sm:text-right">
              <div className="flex items-center sm:justify-end gap-1.5"><MapPin size={12} className="text-indigo-400" /> {exp.location}</div>
              <div className="flex items-center sm:justify-end gap-1.5 font-semibold text-emerald-400"><Calendar size={12} /> {exp.period}</div>
            </div>
          </div>

          {/* Key Metrics grid */}
          {exp.metrics && exp.metrics.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-emerald-400">Key Performance Metrics & Impact</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {exp.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#090b10]/60 border border-gh-border/80 flex items-center gap-2 text-xs font-mono text-white shadow-inner">
                    <Sparkles size={13} className="text-indigo-400 flex-shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Contributions */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-400">Architectural Details & Project Contributions</h4>
            <div className="space-y-3 p-4 rounded-xl bg-[#090b10]/60 border border-gh-border/80 shadow-inner leading-relaxed">
              {exp.highlights && exp.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300">
                  <span className="font-mono text-emerald-400 font-bold flex-shrink-0">[{idx + 1}]</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          {exp.technologies && (
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-gh-mute">Technologies Used</h4>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#090b10] border border-gh-border text-xs font-mono text-slate-300">
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
      <div className="space-y-6 pt-1 font-sans">
        {/* Core Languages and Frameworks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border">
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-4 flex items-center gap-1.5">
              <Code2 size={13} /> Languages
            </h3>
            <div className="space-y-3.5">
              {group.languages && group.languages.map((item, i) => {
                const widthMap: Record<string, string> = {
                  "Expert": "w-[95%]",
                  "Advanced": "w-[80%]",
                  "Intermediate": "w-[60%]",
                  "Learning": "w-[30%]"
                };
                const colorMap: Record<string, string> = {
                  "Expert": "bg-gradient-to-r from-emerald-500 to-teal-400",
                  "Advanced": "bg-gradient-to-r from-indigo-500 to-indigo-400",
                  "Intermediate": "bg-gradient-to-r from-amber-500 to-orange-400",
                  "Learning": "bg-[#64748b]"
                };
                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white font-medium">{item.name} {item.version && `(${item.version})`}</span>
                      <span className="text-gh-mute text-[10px] font-sans">{item.proficiency}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#090b10] rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full rounded-full ${widthMap[item.proficiency] || "w-[50%]"} ${colorMap[item.proficiency] || "bg-emerald-400"}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border">
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-4 flex items-center gap-1.5">
              <Layers size={13} className="text-purple-400" /> Frameworks & Interfaces
            </h3>
            <div className="space-y-3.5">
              {group.frameworks && group.frameworks.map((item, i) => {
                const widthMap: Record<string, string> = {
                  "Expert": "w-[95%]",
                  "Advanced": "w-[80%]",
                  "Intermediate": "w-[60%]",
                  "Learning": "w-[30%]"
                };
                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white font-medium">{item.name}</span>
                      <span className="text-gh-mute text-[10px] font-sans">{item.proficiency}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#090b10] rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full rounded-full ${widthMap[item.proficiency] || "w-[50%]"} bg-gradient-to-r from-purple-500 to-indigo-400`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Database & Infrastructure Chips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border shadow-sm">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-sky-400 font-bold mb-3 flex items-center gap-1.5">
              <Database size={12} /> Storage Engines
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.databases && group.databases.map((db, i) => (
                <span key={i} className="px-2.5 py-1.5 rounded-lg bg-[#090b10] border border-gh-border text-[10px] font-mono text-slate-350 hover:border-sky-500/30 hover:text-white transition duration-150">
                  {db}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border shadow-sm">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-bold mb-3 flex items-center gap-1.5">
              <Network size={12} /> Cloud & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.cloud_platforms && group.cloud_platforms.map((platform, i) => (
                <span key={i} className="px-2.5 py-1.5 rounded-lg bg-[#090b10] border border-gh-border text-[10px] font-mono text-slate-350 hover:border-rose-500/30 hover:text-white transition duration-150">
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border shadow-sm">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-gh-mute font-bold mb-3 flex items-center gap-1.5">
              <Terminal size={12} /> Systems & Pipelines
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.tools && group.tools.map((tool, i) => (
                <span key={i} className="px-2.5 py-1.5 rounded-lg bg-[#090b10] border border-gh-border text-[10px] font-mono text-slate-350 hover:border-indigo-500/30 hover:text-white transition duration-150">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }  // 4. Projects Route Visualizer (Directory of list of projects)
  if (path === "/projects") {
    const projects: ProjectItem[] = Array.isArray(data) 
      ? data 
      : (data?.projects_dataset || data?.projects || []);
    return (
      <div className="space-y-4 pt-1 font-sans">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-mono text-gh-mute uppercase font-bold tracking-wider">Total Systems Deployed: {projects.length}</span>
          <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-400/5 border border-emerald-500/15 px-2.5 py-0.5 rounded-full font-bold tracking-wider">Namespace: Production</span>
        </div>

        <div className="space-y-4">
          {projects.map((proj, i) => (
            <div key={i} className="p-5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border hover:border-indigo-500/25 transition duration-250 flex flex-col md:flex-row justify-between items-start gap-4 hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(99,102,241,0.03)]">
              <div className="space-y-2.5 flex-grow">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">{proj.name}</h3>
                  <span className={`px-2 py-0.5 rounded-md text-[9.5px] font-mono font-bold uppercase tracking-wider border ${
                    proj.status === "completed" 
                      ? "bg-emerald-400/5 border-emerald-500/15 text-emerald-400" 
                      : "bg-amber-400/5 border-amber-500/15 text-amber-400"
                  }`}>
                    {proj.status}
                  </span>
                  {proj.metric && (
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/5 border border-indigo-500/15 text-indigo-400 font-mono text-[9.5px] font-semibold">
                      {proj.metric}
                    </span>
                  )}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {proj.technologies_used && proj.technologies_used.map((tech, j) => (
                    <span key={j} className="px-2 py-0.5 rounded bg-[#090b10] border border-gh-border text-slate-400 text-[10px] font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <button 
                  id={`btn-proj-${proj.id}`}
                  onClick={() => onNavigate(`/projects/${proj.id}`)}
                  className="w-full md:w-auto px-4 py-2 rounded-md bg-white/[0.03] hover:bg-white/[0.06] border border-gh-border text-white font-sans font-semibold text-xs transition duration-200 flex items-center justify-center gap-1 cursor-pointer hover:border-indigo-500/30"
                >
                  Inspect API Endpoint <ExternalLink size={11} />
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
        <div className="p-6 text-center text-gh-mute font-mono text-xs">
          Project records unavailable. Query correct project endpoint (e.g. /projects/youtube-comment-manager-mcp).
        </div>
      );
    }
    return (
      <div className="space-y-6 pt-1 animate-fadeIn text-gh-text font-sans">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gh-border/50 pb-4">
            <div>
              <span className="text-[9px] font-mono text-gh-mute uppercase tracking-widest bg-[#090b10] border border-gh-border px-2.5 py-0.5 rounded-full">
                Endpoint /projects/{proj.id}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">{proj.name}</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[10px] uppercase font-bold tracking-wider">
              Role: {proj.your_role}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{proj.overview}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-emerald-400">System Architecture Notes</h4>
              <p className="text-xs text-slate-300 font-mono bg-[#090b10]/60 p-3 rounded-xl border border-gh-border shadow-inner leading-relaxed">
                {proj.architecture_notes}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-400">Technologies Deployed</h4>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-[#090b10]/60 border border-gh-border shadow-inner">
                {proj.technologies_used && proj.technologies_used.map((tech, i) => (
                  <span key={i} className="px-2.5 py-1.5 rounded-lg bg-[#11141a] border border-gh-border text-slate-300 text-xs font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features & Key Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border">
            <h3 className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold mb-3.5">Key Solutions & Implementations</h3>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              {proj.key_features && proj.key_features.map((feat, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border">
            <h3 className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold mb-3.5">Post-Mortem Challenge Solved</h3>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              {proj.challenges_solved && proj.challenges_solved.map((chal, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="font-mono text-indigo-400 text-xs mt-0.5 flex-shrink-0 font-bold">[{i+1}]</span>
                  <span>{chal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Repo Actions */}
        <div className="flex flex-wrap gap-3 pt-1">
          <a 
            href={proj.github_repo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-white/[0.03] hover:bg-white/[0.06] text-white font-mono text-xs border border-gh-border transition duration-200 flex items-center gap-1.5 hover:border-indigo-500/35 cursor-pointer font-sans font-semibold"
          >
            <Github size={13} className="text-indigo-400" /> View Codebase
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
      <div className="space-y-6 pt-1 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email Card */}
          <div className="p-4.5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border hover:border-emerald-500/25 transition duration-200 flex items-center gap-3.5 shadow-sm">
            <div className="p-2.5 rounded-lg bg-emerald-450/5 text-emerald-450 border border-emerald-500/15">
              <Mail size={16} />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gh-mute uppercase font-bold tracking-wider">Interactive Mailbox</span>
              <a href={`mailto:${details.email}`} className="block text-xs font-mono text-white hover:text-emerald-450 transition mt-0.5 font-semibold">
                {details.email}
              </a>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="p-4.5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border hover:border-purple-500/25 transition duration-200 flex items-center gap-3.5 shadow-sm">
            <div className="p-2.5 rounded-lg bg-purple-450/5 text-purple-450 border border-purple-500/15">
              <Github size={16} />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gh-mute uppercase font-bold tracking-wider">GitHub Node</span>
              <a href={details.github} target="_blank" rel="noopener noreferrer" className="block text-xs font-mono text-white hover:text-purple-450 transition mt-0.5 font-semibold">
                {details.github.replace("https://", "")}
              </a>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="p-4.5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border hover:border-sky-500/25 transition duration-200 flex items-center gap-3.5 shadow-sm">
            <div className="p-2.5 rounded-lg bg-sky-450/5 text-sky-450 border border-sky-500/15">
              <Linkedin size={16} />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gh-mute uppercase font-bold tracking-wider">Professional Network</span>
              <a href={details.linkedin} target="_blank" rel="noopener noreferrer" className="block text-xs font-mono text-white hover:text-sky-450 transition mt-0.5 font-semibold">
                {details.linkedin.replace("https://", "")}
              </a>
            </div>
          </div>
        </div>

        {/* Live Form Submission Handshake */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-xs sm:text-sm font-sans font-bold text-white flex items-center gap-2">
              <Terminal size={15} className="text-indigo-400" />
              Direct Message API Form
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-emerald-400/5 text-emerald-400 text-[9.5px] font-mono font-bold border border-emerald-500/15 self-start sm:self-auto tracking-wider">
              Direct Mail Ingress Enabled
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4 font-sans leading-relaxed">
            Submitting this payload dispatches the message directly to <strong className="text-white">emailsristi@gmail.com</strong> and appends it to the transient dashboard <span className="font-mono text-indigo-400 font-bold hover:underline cursor-pointer" onClick={() => onNavigate("/messages")}>/messages</span> records.
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4 font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-gh-mute tracking-wider block">payload_name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Recruiter Name" 
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs text-white bg-[#090b10] rounded-md border border-gh-border outline-none focus:border-indigo-500/60 focus:shadow-[0_0_8px_rgba(99,102,241,0.1)] transition font-mono shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-gh-mute tracking-wider block">payload_email *</label>
                <input 
                  type="text" 
                  placeholder="e.g. name@company.com" 
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs text-white bg-[#090b10] rounded-md border border-gh-border outline-none focus:border-indigo-500/60 focus:shadow-[0_0_8px_rgba(99,102,241,0.1)] transition font-mono shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase font-bold text-gh-mute tracking-wider block">message_string *</label>
              <textarea 
                rows={3}
                placeholder="Write message details... E.g. 'Hey Sristi, we want to interview you for a senior backend position!'" 
                value={contactForm.message}
                onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-3 py-2 text-xs text-white bg-[#090b10] rounded-md border border-gh-border outline-none focus:border-indigo-500/60 focus:shadow-[0_0_8px_rgba(99,102,241,0.1)] transition font-mono resize-none leading-relaxed shadow-inner"
              />
            </div>

            {formError && (
              <div className="text-rose-400 text-xs font-mono flex items-center gap-1">
                ⚠️ Error: {formError}
              </div>
            )}

            {isSubmitted ? (
              <div className="p-3.5 bg-emerald-400/5 border border-emerald-500/15 rounded-md flex items-center gap-2 text-emerald-400 text-xs font-sans shadow-sm leading-relaxed">
                <Check size={14} className="flex-shrink-0" /> Message dispatched directly to Sristi! (HTTP 201 Created). Select GET /messages to inspect.
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  type="submit"
                  id="btn-vis-post-contact"
                  disabled={isSending}
                  className="px-4 py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs transition duration-200 flex items-center gap-1.5 cursor-pointer font-sans shadow-md hover:shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                >
                  <Mail size={13} />
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
                  className="px-4 py-2.5 rounded-md bg-white/[0.03] hover:bg-white/[0.06] text-slate-350 text-xs font-mono border border-gh-border transition duration-200 flex items-center gap-1.5 cursor-pointer hover:border-indigo-500/30"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
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
      <div className="space-y-4 pt-1 font-sans">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-mono text-gh-mute uppercase font-bold tracking-wider">Database Record Logs: {messagesList.length}</span>
          <span className="text-[9.5px] font-mono text-indigo-400 bg-indigo-500/5 border border-indigo-500/15 px-2.5 py-0.5 rounded-full font-bold tracking-wider">Table: user_contact_handshakes</span>
        </div>

        {messagesList.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border shadow-sm">
            <MessageSquare className="mx-auto text-gh-mute mb-3.5 opacity-60 animate-bounce" size={28} />
            <h4 className="text-sm font-sans text-white font-bold mb-1">Database Table Empty</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Please route to POST /contact to send Sristi a direct handshake payload, writing details into this active session database.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messagesList.map((msg, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#11141a]/60 border border-gh-border/80 shadow-inner font-mono text-xs hover:border-indigo-500/15 transition duration-150">
                <div className="flex justify-between items-center border-b border-gh-border/50 pb-2.5 mb-2.5">
                  <span className="text-emerald-400 font-bold">UID: {msg.id}</span>
                  <span className="text-gh-mute text-[10px] font-sans">{msg.timestamp}</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div><span className="text-gh-mute font-sans">Name:</span> <span className="text-white font-semibold">{msg.name}</span></div>
                  <div><span className="text-gh-mute font-sans">Email:</span> <span className="text-white font-medium">{msg.email}</span></div>
                  <div className="pt-2 border-t border-gh-border/40 mt-2 text-white font-sans italic text-[12.5px] leading-relaxed">
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
      <div className="space-y-6 pt-1 text-gh-text font-sans">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border shadow-sm">
          <h3 className="text-xs uppercase font-mono tracking-wider font-bold text-indigo-400 mb-3.5">Live Server Performance Console</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-[#090b10]/60 border border-gh-border/80 shadow-inner hover:border-indigo-500/20 transition duration-150 group">
              <div className="text-[9px] font-mono text-gh-mute uppercase font-bold tracking-wider">Uptime</div>
              <div className="text-lg font-bold font-mono text-white mt-1 group-hover:text-indigo-400 transition-colors">99.998%</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#090b10]/60 border border-gh-border/80 shadow-inner hover:border-purple-500/20 transition duration-150 group">
              <div className="text-[9px] font-mono text-gh-mute uppercase font-bold tracking-wider">Socket Pools</div>
              <div className="text-lg font-bold font-mono text-white mt-1 group-hover:text-purple-400 transition-colors">14,204 <span className="text-[10px] font-sans text-gh-mute font-normal">active</span></div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#090b10]/60 border border-gh-border/80 shadow-inner hover:border-emerald-500/20 transition duration-150 group">
              <div className="text-[9px] font-mono text-gh-mute uppercase font-bold tracking-wider">CPU Usage</div>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-1">1.4% <span className="text-[10px] font-sans text-gh-mute font-normal">avg</span></div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#090b10]/60 border border-gh-border/80 shadow-inner hover:border-sky-500/20 transition duration-150 group">
              <div className="text-[9px] font-mono text-gh-mute uppercase font-bold tracking-wider">Daily Requests</div>
              <div className="text-lg font-bold font-mono text-sky-400 mt-1">4.2M <span className="text-[10px] font-sans text-gh-mute font-normal">GETs</span></div>
            </div>
          </div>
        </div>

        {/* Real-time Graph simulation */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#11141a] to-[#141822] border border-gh-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">API latency distribution history (p95)</h4>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-400/5 border border-emerald-500/15 px-2 py-0.5 rounded-full font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry Ingress
            </span>
          </div>
          <div className="h-28 flex items-end gap-1.5 pt-4">
            {[12, 14, 18, 11, 15, 14, 25, 42, 12, 13, 20, 15, 18, 14, 11, 12, 38, 15, 13, 14, 12, 11, 15, 14].map((height, index) => (
              <div key={index} className="flex-grow group relative flex flex-col justify-end h-full">
                <div 
                  style={{ height: `${height * 2}%` }} 
                  className={`w-full rounded-t-md transition-all duration-300 group-hover:opacity-100 ${
                    height > 30 
                      ? "bg-gradient-to-t from-amber-500 to-orange-400" 
                      : "bg-gradient-to-t from-indigo-600 to-indigo-400 opacity-80"
                  }`} 
                />
                <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#090b10]/95 backdrop-blur-sm border border-gh-border text-[9px] font-mono text-white px-1.5 py-0.5 rounded-md shadow-md whitespace-nowrap transition-all duration-150 z-20 pointer-events-none">
                  {height}ms
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-mono text-gh-mute pt-2.5 border-t border-gh-border/50 mt-2">
            <span>24h ago</span>
            <span>12h ago</span>
            <span>Current Execution</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gh-mute font-mono text-xs p-8 text-center bg-[#11141a]/30 border border-gh-border/40 rounded-xl leading-relaxed">
      Visualizer layout not configured for this endpoint. Switch to {"{ } JSON"} tab to read raw API response logs.
    </div>
  );
};
