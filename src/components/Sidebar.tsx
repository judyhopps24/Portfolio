import React from "react";
import { FolderGit, Server, Shield, Database, Compass, ChevronRight, HelpCircle, Briefcase } from "lucide-react";
import { ApiEndpoint } from "../types";

interface SidebarProps {
  endpoints: ApiEndpoint[];
  activePath: string;
  onSelectEndpoint: (path: string) => void;
  authToken: string;
  onAuthTokenChange: (token: string) => void;
  apiHits: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  endpoints,
  activePath,
  onSelectEndpoint,
  authToken,
  onAuthTokenChange,
  apiHits
}) => {
  // Group endpoints by category
  const categories = ["System", "Profile", "Experience", "Stack", "Projects", "Contact"] as const;

  const getBadgeColor = (method: "GET" | "POST") => {
    return method === "GET"
      ? "text-emerald-400 bg-emerald-400/5 border-emerald-500/15"
      : "text-amber-400 bg-amber-400/5 border-amber-500/15";
  };

  const getCategoryIcon = (category: string) => {
    const iconClass = "opacity-80 transition-colors";
    switch (category) {
      case "System": return <Server size={13} className={`${iconClass} text-indigo-400`} />;
      case "Profile": return <Compass size={13} className={`${iconClass} text-sky-400`} />;
      case "Experience": return <Briefcase size={13} className={`${iconClass} text-amber-400`} />;
      case "Stack": return <Database size={13} className={`${iconClass} text-purple-400`} />;
      case "Projects": return <FolderGit size={13} className={`${iconClass} text-emerald-400`} />;
      default: return <Shield size={13} className={`${iconClass} text-purple-400`} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gh-panel border-r border-gh-border text-xs text-gh-text select-none animate-fadeIn">
      {/* Brand Workspace */}
      <div className="p-4 border-b border-gh-border flex items-center justify-between bg-gh-panel">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-xs font-black text-white font-mono shadow-[0_0_12px_rgba(99,102,241,0.25)]">
            S
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wide font-sans text-xs">Sristi's API Workspace</h1>
            <p className="text-[10px] text-gh-mute font-mono">v1.2.0-beta</p>
          </div>
        </div>
        <div className="text-[10px] bg-[#0c0f16] text-gh-mute font-mono px-2 py-0.5 rounded-full border border-gh-border font-medium">
          Hits: <span className="text-white font-semibold">{apiHits}</span>
        </div>
      </div>

      {/* Environment Config */}
      <div className="p-4 border-b border-gh-border bg-[#0c0f16]/30">
        <div className="flex items-center gap-1.5 text-[9.5px] text-gh-mute uppercase font-bold tracking-wider mb-2.5">
          <Shield size={11} className="text-indigo-400" />
          Environment variables
        </div>
        <div className="space-y-2.5">
          <div>
            <div className="text-[9px] text-gh-mute font-mono">BASE_URL</div>
            <div className="font-mono text-white text-[10.5px] tracking-wide mt-0.5">https://api.sristi.dev/v1</div>
          </div>
          <div>
            <div className="text-[9px] text-gh-mute font-mono">AUTH_BEARER_TOKEN</div>
            <input 
              type="text" 
              value={authToken} 
              onChange={(e) => onAuthTokenChange(e.target.value)}
              placeholder="Authorization Token"
              className="w-full text-[10px] px-2.5 py-1.5 text-gh-text bg-[#090b10] rounded-md border border-gh-border outline-none focus:border-indigo-500/60 focus:shadow-[0_0_8px_rgba(99,102,241,0.15)] transition duration-200 font-mono mt-1"
            />
          </div>
        </div>
      </div>

      {/* Collections / Endpoints tree */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <span className="text-[9.5px] font-bold text-gh-mute uppercase tracking-wider pl-1 block">
          Collections ({endpoints.length})
        </span>

        <div className="space-y-4">
          {categories.map((category) => {
            const list = endpoints.filter((e) => e.category === category);
            if (list.length === 0) return null;

            return (
              <div key={category} className="space-y-1.5">
                {/* Category Header */}
                <div className="flex items-center gap-2 px-1 text-gh-mute font-bold text-[10px] uppercase tracking-wide">
                  {getCategoryIcon(category)}
                  <span className="font-sans text-gh-mute/80">{category}</span>
                </div>

                {/* Categories routes */}
                <div className="space-y-[3px] pl-1.5 border-l border-gh-border/30 ml-2.5">
                  {list.map((endpoint) => {
                    const isActive = activePath === endpoint.path;
                    return (
                      <button
                        key={endpoint.path}
                        id={`endpoint-btn-${endpoint.path.replace(/\//g, "-")}`}
                        onClick={() => onSelectEndpoint(endpoint.path)}
                        className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between text-gh-text transition duration-150 cursor-pointer ${
                          isActive 
                            ? "bg-gh-active-bg text-white font-semibold border-l-2 border-indigo-500 shadow-sm" 
                            : "hover:bg-white/[0.03] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate pr-1">
                          <ChevronRight size={9} className={`text-gh-mute transition-transform ${isActive ? "rotate-90 text-indigo-400" : ""}`} />
                          <span className="font-mono text-[10.5px] truncate select-all">{endpoint.path}</span>
                        </div>
                        <span className={`flex-shrink-0 text-[8px] font-mono font-bold scale-90 border rounded px-1.5 py-0.5 text-center leading-none ${getBadgeColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Helper info */}
      <div className="p-3 bg-[#0d0f14]/50 border-t border-gh-border text-[9.5px] text-gh-mute font-sans space-y-1 leading-relaxed">
        <div className="flex items-center gap-1.5">
          <HelpCircle size={11} className="text-indigo-400" />
          <span className="font-semibold text-gh-text">Interactive Playbook</span>
        </div>
        <p className="text-gh-mute/80">
          Send POST payloads or modify variables to test schema response codes in the browser shell.
        </p>
      </div>
    </div>
  );
};
