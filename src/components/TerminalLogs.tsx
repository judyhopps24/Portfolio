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
      let className = "text-slate-300";
      
      if (part === "GET") className = "text-sky-400 font-semibold";
      else if (part === "POST") className = "text-amber-400 font-semibold";
      else if (part === "[INFO]") className = "text-emerald-400 font-semibold";
      else if (part === "[WARN]") className = "text-amber-400 font-semibold";
      else if (part === "[ERROR]") className = "text-rose-400 font-semibold";
      else if (part === "[DEBUG]") className = "text-purple-400";
      else if (part === "200" || part === "201") className = "text-emerald-400 font-mono";
      else if (part === "404" || part === "400") className = "text-rose-400 font-mono";
      else if (part.startsWith("[worker-")) className = "text-purple-400/80 text-[10px]";
      else if (part.includes("ms")) className = "text-sky-400";
      else if (part.includes("192.168.")) className = "text-gh-mute";
      else if (part.startsWith("/") || part.startsWith("/projects")) className = "text-indigo-400 font-mono font-medium";

      return (
        <span key={index} className={`${className} mr-1.5`}>
          {part}
        </span>
      );
    });
  };

  return (
    <div className="bg-[#07090d] border border-gh-border rounded-lg overflow-hidden font-mono shadow-inner animate-fadeIn flex flex-col h-full">
      {/* Logger Toolbar */}
      <div className="bg-gh-panel border-b border-gh-border px-4 py-2.5 flex justify-between items-center text-xs text-gh-mute">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-emerald-400 animate-pulse" />
          <span className="font-semibold text-white/90">Sristi-Node-Engine / stdout</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 bg-emerald-400/5 border border-emerald-500/15 px-2.5 py-0.5 rounded-full font-mono font-bold tracking-wider">
            <Shield size={10} />
            SSL ACTIVE
          </div>
          <button 
            id="btn-clear-logs"
            onClick={onClear}
            className="hover:text-white text-gh-mute text-[10px] font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Clean standard out logs"
          >
            <RefreshCw size={11} /> Clear stdout
          </button>
        </div>
      </div>

      {/* Terminal Rows */}
      <div className="p-4 flex-grow overflow-y-auto text-xs leading-relaxed space-y-1 bg-[#090b10] min-h-[80px]">
        {logs.map((log, i) => (
          <div key={i} className="font-mono text-[11px] whitespace-pre-wrap select-all selection:bg-gh-active-bg">
            <span className="text-indigo-400/60 font-semibold mr-2.5 select-none">[{i + 1}]</span>
            {formatLogItem(log)}
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-gh-mute italic text-center py-6 select-none leading-5 font-sans">
            stdout buffer flushed empty.<br/>
            Click any collection route on the sidebar or hit "Send" to trigger incoming HTTP telemetry logs.
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
