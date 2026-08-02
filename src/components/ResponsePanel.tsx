import React, { useState } from "react";
import { Eye, Code2, BookOpen, Clock, Layers, Activity } from "lucide-react";
import { syntaxHighlightJson } from "../utils";
import { VisualizerTab } from "./VisualizerTab";
import { ContactMessage } from "../types";

interface ResponsePanelProps {
  path: string;
  statusCode: number;
  statusText: string;
  latencyMs: number;
  sizeBytes: number;
  responsePayload: any;
  onNavigate: (path: string) => void;
  onPostMessage?: (message: { name: string; email: string; message: string }) => void;
  messagesList?: ContactMessage[];
}

export const ResponsePanel: React.FC<ResponsePanelProps> = ({
  path,
  statusCode,
  statusText,
  latencyMs,
  sizeBytes,
  responsePayload,
  onNavigate,
  onPostMessage,
  messagesList = []
}) => {
  const [activeTab, setActiveTab] = useState<"visualizer" | "json" | "docs">("visualizer");

  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return "text-emerald-400 bg-emerald-400/5 border-emerald-500/15";
    if (code >= 300 && code < 400) return "text-indigo-400 bg-indigo-400/5 border-indigo-500/15";
    return "text-rose-400 bg-rose-450/5 border-rose-500/15";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  // Define OpenAPI-like documentation for each active path
  const renderDocsTab = () => {
    const specs: Record<string, { desc: string; queryParams?: any[]; headers?: any[]; responses: any }> = {
      "/": {
        desc: "Initialize REST service. Returns general software details, API index collections, and diagnostic logs.",
        responses: {
          "200 OK": "Returns Sristi's general introductory details, social schemas, and endpoint bindings."
        }
      },
      "/about": {
        desc: "Retrieve biography, professional philosophy profiles, operational locations, and systems engineering interests.",
        responses: {
          "200 OK": "Returns Sristi's bio schema, years of active practice, and conceptual alignment paradigms."
        }
      },
      "/experience": {
        desc: "Retrieve work experience history at Amazon (Alexa & Music), Microsoft, and BITS Pilani education.",
        queryParams: [
          { name: "search", type: "string", desc: "Filter work experience records matching role, company or tech stack." }
        ],
        responses: {
          "200 OK": "Returns work history timeline, metrics, highlights and education background."
        }
      },
      "/skills": {
        desc: "Inspect the primary stack array, grouped by Languages, Modules, Libraries, Clouds, and analytical tooling.",
        responses: {
          "200 OK": "Returns the complete proficiency index."
        }
      },
      "/projects": {
        desc: "Query deployed architectural databases and pipeline networks.",
        queryParams: [
          { name: "limit", type: "integer", desc: "Limit the number of records returned (default 10)." },
          { name: "search", type: "string", desc: "Filter projects matching name characteristics." },
          { name: "tag", type: "string", desc: "Filter projects deploying a specific technology stack (e.g. go, rust, websocket)." }
        ],
        responses: {
          "200 OK": "Returns a matching array of project schemas containing Git repositories and metrics."
        }
      },
      "/contact": {
        desc: "Submit incoming feedback, handshake notifications, or schedule standard interviews.",
        headers: [
          { name: "Content-Type", value: "application/json", required: true },
          { name: "Authorization", value: "Bearer <token>", required: false }
        ],
        responses: {
          "201 Created": "Returned when name, email, and message payloads validate successfully.",
          "400 Bad Request": "Returned on missing, empty fields, or syntax failures."
        }
      },
      "/messages": {
        desc: "Query active user submissions cached inside this session. Excellent workspace verification tool.",
        responses: {
          "200 OK": "Array of contact forms received synchronously."
        }
      },
      "/stats": {
        desc: "Expose real-time virtual machine benchmarks including GC timing metrics, load-factors, and memory heaps.",
        responses: {
          "200 OK": "JSON representation of cluster indicators."
        }
      }
    };

    // Generic match check for sharded specifications
    let key = path;
    if (path.startsWith("/projects/")) {
      key = "/projects";
    } else if (path.startsWith("/experience/")) {
      key = "/experience";
    }

    const currentSpec = specs[key] || {
      desc: "Custom project specification lookup route. Returns detailed challenge answers.",
      responses: { "200 OK": "Detailed system challenge report payload." }
    };

    return (
      <div className="space-y-4 font-sans text-xs text-gh-text animate-fadeIn">
        <div className="p-4 rounded-lg bg-[#11141a] border border-gh-border shadow-inner">
          <h4 className="font-bold text-emerald-400 mb-1 font-mono text-[11px] uppercase tracking-wide">Route Specifications</h4>
          <p className="text-slate-400 leading-relaxed text-xs">{currentSpec.desc}</p>
        </div>

        {currentSpec.queryParams && (
          <div className="space-y-2">
            <h4 className="font-bold text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-mono">
              Query Parameters (?key=value)
            </h4>
            <div className="border border-gh-border rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-left font-sans bg-gh-panel">
                <thead>
                  <tr className="bg-[#090b10] text-gh-mute border-b border-gh-border text-[9.5px] uppercase font-bold tracking-wider">
                    <th className="p-3">Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Details / Filter behavior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gh-border/40 font-mono text-[11px]">
                  {currentSpec.queryParams.map((p, i) => (
                    <tr key={i} className="text-gh-text hover:bg-white/[0.01] transition-colors">
                      <td className="p-3 text-indigo-400 font-bold">{p.name}</td>
                      <td className="p-3 text-amber-500 font-semibold">{p.type}</td>
                      <td className="p-3 text-slate-400 font-sans leading-relaxed">{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentSpec.headers && (
          <div className="space-y-2">
            <h4 className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-mono">
              Required Payload Headers
            </h4>
            <div className="border border-gh-border rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-left font-sans bg-gh-panel">
                <thead>
                  <tr className="bg-[#090b10] text-gh-mute border-b border-gh-border text-[9.5px] uppercase font-bold tracking-wider">
                    <th className="p-3">Header Name</th>
                    <th className="p-3">Value Mapping</th>
                    <th className="p-3">Constraint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gh-border/40 font-mono text-[11px]">
                  {currentSpec.headers.map((h, i) => (
                    <tr key={i} className="text-gh-text hover:bg-white/[0.01] transition-colors">
                      <td className="p-3 text-amber-450 font-bold">{h.name}</td>
                      <td className="p-3 text-slate-200">{h.value}</td>
                      <td className="p-3 truncate text-slate-400 font-sans">{h.required ? "REQUIRED" : "OPTIONAL"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-mono">
            Expected Responses
          </h4>
          <div className="space-y-2">
            {Object.entries(currentSpec.responses).map(([code, desc]: [string, any], i) => (
              <div key={i} className="p-3 rounded-lg bg-[#11141a] border border-gh-border flex items-center gap-3 shadow-inner">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400/5 border border-emerald-500/15 text-emerald-400 font-mono">
                  {code}
                </span>
                <span className="text-slate-300 text-xs font-sans leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gh-panel border border-gh-border rounded-lg overflow-hidden shadow-sm animate-fadeIn flex flex-col flex-grow min-h-[120px]">
      
      {/* Response Status Card */}
      <div className="p-4 border-b border-gh-border bg-gh-panel flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">Response Payload</span>
          {/* Real-time pulse indicator */}
          <Activity size={13} className="text-emerald-400 animate-pulse" />
        </div>

        {/* Dynamic Meta Badges */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
          <div className={`px-2.5 py-1 rounded-md border font-semibold flex items-center gap-1 ${getStatusColor(statusCode)}`}>
            Status: {statusCode} {statusText}
          </div>
          <div className="px-2.5 py-1 rounded-md border border-gh-border bg-[#090b10] text-slate-300 flex items-center gap-1.5">
            <Clock size={11} className="text-indigo-400" />
            Time: <span className="font-bold text-indigo-400">{latencyMs} ms</span>
          </div>
          <div className="px-2.5 py-1 rounded-md border border-gh-border bg-[#090b10] text-slate-300 flex items-center gap-1.5">
            <Layers size={11} className="text-purple-400" />
            Size: <span className="font-bold text-purple-400">{formatSize(sizeBytes)}</span>
          </div>
        </div>
      </div>

      {/* Response Pane Tabs */}
      <div className="border-b border-gh-border bg-gh-panel px-4 flex gap-4 text-[11px] text-gh-mute font-sans select-none">
        
        {/* Visualizer Tab Button */}
        <button 
          id="res-tab-visualizer"
          onClick={() => setActiveTab("visualizer")}
          className={`py-2.5 px-1 relative flex items-center gap-1.5 hover:text-white transition cursor-pointer ${
            activeTab === "visualizer" ? "text-white font-semibold" : ""
          }`}
        >
          <Eye size={12} className={activeTab === "visualizer" ? "text-emerald-400" : ""} />
          Visualizer (UI)
          {activeTab === "visualizer" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500" />}
        </button>

        {/* Raw JSON Tab Button */}
        <button 
          id="res-tab-json"
          onClick={() => setActiveTab("json")}
          className={`py-2.5 px-1 relative flex items-center gap-1.5 hover:text-white transition cursor-pointer ${
            activeTab === "json" ? "text-white font-semibold" : ""
          }`}
        >
          <Code2 size={12} className={activeTab === "json" ? "text-indigo-400" : ""} />
          {"{ } JSON"}
          {activeTab === "json" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500" />}
        </button>

        {/* Documentation Tab Button */}
        <button 
          id="res-tab-docs"
          onClick={() => setActiveTab("docs")}
          className={`py-2.5 px-1 relative flex items-center gap-1.5 hover:text-white transition cursor-pointer ${
            activeTab === "docs" ? "text-white font-semibold" : ""
          }`}
        >
          <BookOpen size={12} className={activeTab === "docs" ? "text-amber-400" : ""} />
          API Docs
          {activeTab === "docs" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500" />}
        </button>
      </div>

      {/* Response Pane Body Workspace */}
      <div className="p-5 bg-[#0d1117] flex-grow overflow-y-auto">
        
        {/* VISUALIZER UI VIEW */}
        {activeTab === "visualizer" && (
          <VisualizerTab 
            path={path} 
            data={responsePayload} 
            onNavigate={onNavigate}
            onPostMessage={onPostMessage}
            messagesList={messagesList}
          />
        )}

        {/* RAW HIGH-LIGHTED JSON VIEW */}
        {activeTab === "json" && (
          <div className="font-mono text-xs leading-relaxed overflow-x-auto selection:bg-[#21262d] select-all animate-fadeIn whitespace-pre">
            <pre 
              className="font-mono text-gh-text"
              dangerouslySetInnerHTML={{ __html: syntaxHighlightJson(responsePayload) }} 
            />
          </div>
        )}

        {/* SPECS/DOCS VIEW */}
        {activeTab === "docs" && renderDocsTab()}

      </div>
    </div>
  );
};
