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
      ? "text-[#7ee787] bg-[#7ee787]/10 border-[#7ee787]/20"
      : "text-[#d29922] bg-[#d29922]/10 border-[#d29922]/20";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "System": return <Server size={14} className="text-[#f78166]" />;
      case "Profile": return <Compass size={14} className="text-[#58a6ff]" />;
      case "Experience": return <Briefcase size={14} className="text-[#d29922]" />;
      case "Stack": return <Database size={14} className="text-[#d2a8ff]" />;
      case "Projects": return <FolderGit size={14} className="text-[#7ee787]" />;
      default: return <Shield size={14} className="text-[#d2a8ff]" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gh-panel border-r border-gh-border text-xs text-gh-text select-none animate-fadeIn">
      {/* Brand Workspace */}
      <div className="p-4 border-b border-gh-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gh-blue flex items-center justify-center text-[10px] font-bold text-white font-mono">
            S
          </div>
          <div>
            <h1 className="font-bold text-gh-text tracking-wide font-mono text-[13px]">Sristi's API Workspace</h1>
            <p className="text-[10px] text-gh-mute font-mono">v1.2.0-beta</p>
          </div>
        </div>
        <div className="text-[10px] bg-[#0d1117] text-gh-mute font-mono px-1.5 py-0.5 rounded border border-gh-border">
          Hits: {apiHits}
        </div>
      </div>

      {/* Environment Config */}
      <div className="p-3.5 border-b border-gh-border bg-[#0d1117]/55">
        <div className="flex items-center gap-1.5 text-[10px] text-gh-mute uppercase font-bold tracking-wider mb-2">
          <Shield size={12} className="text-[#7ee787]" />
          Environment variables
        </div>
        <div className="space-y-2">
          <div>
            <div className="text-[9px] text-gh-mute font-mono">BASE_URL</div>
            <div className="font-mono text-gh-text text-[10.5px]">https://api.sristi.dev/v1</div>
          </div>
          <div>
            <div className="text-[9px] text-gh-mute font-mono">AUTH_BEARER_TOKEN</div>
            <input 
              type="text" 
              value={authToken} 
              onChange={(e) => onAuthTokenChange(e.target.value)}
              placeholder="Authorization Token"
              className="w-full text-[10px] px-2 py-1 text-gh-text bg-[#0d1117] rounded border border-gh-border outline-none focus:border-[#58a6ff] font-mono mt-0.5"
            />
          </div>
        </div>
      </div>

      {/* Collections / Endpoints tree */}
      <div className="flex-grow overflow-y-auto p-3 space-y-4">
        <span className="text-[10.5px] font-bold text-gh-mute uppercase tracking-wider pl-1.5 block">
          Collections ({endpoints.length})
        </span>

        <div className="space-y-4">
          {categories.map((category) => {
            const list = endpoints.filter((e) => e.category === category);
            if (list.length === 0) return null;

            return (
              <div key={category} className="space-y-1">
                {/* Category Header */}
                <div className="flex items-center gap-2 px-2 py-1 text-gh-mute font-semibold text-[10.5px]">
                  {getCategoryIcon(category)}
                  <span className="font-mono tracking-wide">{category}</span>
                </div>

                {/* Categories routes */}
                <div className="space-y-[2px] pl-2 border-l border-gh-border/40 ml-3">
                  {list.map((endpoint) => {
                    const isActive = activePath === endpoint.path;
                    return (
                      <button
                        key={endpoint.path}
                        id={`endpoint-btn-${endpoint.path.replace(/\//g, "-")}`}
                        onClick={() => onSelectEndpoint(endpoint.path)}
                        className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between text-gh-text hover:bg-[#21262d] transition duration-150 ${
                          isActive ? "bg-gh-active-bg text-white font-medium border-l-2 border-[#1f6feb]" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-1">
                          <ChevronRight size={10} className={`text-gh-mute transition-transform ${isActive ? "rotate-90 text-[#58a6ff]" : ""}`} />
                          <span className="font-mono truncate select-all">{endpoint.path}</span>
                        </div>
                        <span className={`flex-shrink-0 text-[8px] font-mono font-black scale-90 border rounded px-1 text-center leading-none py-0.5 ${getBadgeColor(endpoint.method)}`}>
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
      <div className="p-3 bg-[#161b22] border-t border-gh-border text-[10px] text-gh-mute font-mono space-y-1">
        <div className="flex items-center gap-1.5">
          <HelpCircle size={12} className="text-[#58a6ff]" />
          <span>Interactive Playbook</span>
        </div>
        <p className="text-[9.5px] leading-relaxed text-gh-mute/90">
          Send POST payloads or modify variables to test schema response codes in the browser shell.
        </p>
      </div>
    </div>
  );
};
