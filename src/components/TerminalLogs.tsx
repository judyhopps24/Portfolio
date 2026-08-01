import React, { useEffect, useRef } from "react";
import { Terminal, Shield, RefreshCw } from "lucide-react";

interface TerminalLogsProps {
  logs: string[];
  onClear: () => void;
}

export const TerminalLogs: React.FC<TerminalLogsProps> = ({ logs, onClear }) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Clean raw ANSI colors or brackets to beautiful spans
  const formatLogItem = (log: string) => {
    // Process color tokens or special brackets to render nicely
    // E.g., GET is light-blue, POST is green, 200 is emerald, 404 is amber
    const parts = log.split(" ");
    return parts.map((part, index) => {
      let className = "text-gh-text";
      
      if (part === "GET") className = "text-[#58a6ff] font-semibold";
      else if (part === "POST") className = "text-[#d29922] font-semibold";
      else if (part === "[INFO]") className = "text-[#7ee787] font-semibold";
      else if (part === "[WARN]") className = "text-[#d29922] font-semibold";
      else if (part === "[ERROR]") className = "text-rose-400 font-semibold";
      else if (part === "[DEBUG]") className = "text-[#d2a8ff]";
      else if (part === "200" || part === "201") className = "text-[#7ee787] font-mono";
      else if (part === "404" || part === "400") className = "text-rose-400 font-mono";
      else if (part.startsWith("[worker-")) className = "text-[#d2a8ff] text-[10px]";
      else if (part.includes("ms")) className = "text-[#58a6ff]";
      else if (part.includes("192.168.")) className = "text-gh-mute";
      else if (part.startsWith("/") || part.startsWith("/projects")) className = "text-[#f78166] font-mono font-medium";

      return (
        <span key={index} className={`${className} mr-1.5`}>
          {part}
        </span>
      );
    });
  };

  return (
    <div className="bg-[#0b0f19] border border-gh-border rounded-lg overflow-hidden font-mono shadow-inner animate-fadeIn">
      {/* Logger Toolbar */}
      <div className="bg-gh-panel border-b border-gh-border px-4 py-2.5 flex justify-between items-center text-xs text-gh-mute">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#7ee787] animate-pulse" />
          <span className="font-semibold text-gh-text">Sristi-Node-Engine / stdout</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-[#7ee787] bg-[#7ee787]/10 border border-[#7ee787]/20 px-2 py-0.5 rounded">
            <Shield size={10} />
            SSL ACTIVE
          </div>
          <button 
            id="btn-clear-logs"
            onClick={onClear}
            className="hover:text-white text-gh-mute text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
            title="Clean standard out logs"
          >
            <RefreshCw size={11} /> Clear stdout
          </button>
        </div>
      </div>

      {/* Terminal Rows */}
      <div className="p-4 h-48 overflow-y-auto text-xs leading-relaxed space-y-1 bg-[#0d1117]">
        {logs.map((log, i) => (
          <div key={i} className="font-mono text-[11px] whitespace-pre-wrap select-all selection:bg-gh-active-bg">
            <span className="text-gh-mute mr-2 select-none">[{i + 1}]</span>
            {formatLogItem(log)}
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-gh-mute italic text-center py-6 select-none leading-5">
            stdout buffer flushed empty.<br/>
            Click any collection route on the sidebar or hit "Send" to trigger incoming HTTP telemetry logs.
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
