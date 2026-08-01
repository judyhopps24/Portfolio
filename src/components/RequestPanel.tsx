import React, { useState, useEffect } from "react";
import { Sliders, FileText, Settings2, Plus, Trash2, Send } from "lucide-react";
import { QueryParamRow, HeaderRow } from "../types";

interface RequestPanelProps {
  method: "GET" | "POST";
  path: string;
  onSend: (params: QueryParamRow[], headers: HeaderRow[], body: string) => void;
  isLoading: boolean;
  onPathChange: (path: string) => void;
  
  // Handlers & Synced States for Params
  queryParams: QueryParamRow[];
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamRow[]>>;
  
  // Custom Headers set
  headers: HeaderRow[];
  setHeaders: React.Dispatch<React.SetStateAction<HeaderRow[]>>;
  
  // JSON Body Editor
  bodyJson: string;
  setBodyJson: (body: string) => void;
}

export const RequestPanel: React.FC<RequestPanelProps> = ({
  method,
  path,
  onSend,
  isLoading,
  onPathChange,
  queryParams,
  setQueryParams,
  headers,
  setHeaders,
  bodyJson,
  setBodyJson
}) => {
  const [activeTab, setActiveTab] = useState<"params" | "headers" | "body">("params");
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Validate JSON string body in real time
  useEffect(() => {
    if (method === "POST") {
      try {
        JSON.parse(bodyJson);
        setJsonError(null);
      } catch (err: any) {
        setJsonError(`JSON Syntax Validation Error: ${err.message}`);
      }
    } else {
      setJsonError(null);
    }
  }, [bodyJson, method]);

  // Sync URL and queries
  const getFullUrl = () => {
    const enabledParams = queryParams.filter(p => p.enabled && p.key);
    if (enabledParams.length === 0) {
      return `https://api.sristi.dev/v1${path}`;
    }
    const queryStr = enabledParams
      .map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
      .join("&");
    return `https://api.sristi.dev/v1${path}?${queryStr}`;
  };

  const addParamRow = () => {
    setQueryParams([...queryParams, { key: "", value: "", enabled: true }]);
  };

  const removeParamRow = (index: number) => {
    const updated = [...queryParams];
    updated.splice(index, 1);
    setQueryParams(updated);
  };

  const updateParamRow = (index: number, key: "key" | "value" | "enabled", val: any) => {
    const updated = [...queryParams];
    updated[index] = { ...updated[index], [key]: val };
    setQueryParams(updated);
  };

  const addHeaderRow = () => {
    setHeaders([...headers, { key: "", value: "", enabled: true }]);
  };

  const removeHeaderRow = (index: number) => {
    const updated = [...headers];
    updated.splice(index, 1);
    setHeaders(updated);
  };

  const updateHeaderRow = (index: number, key: "key" | "value" | "enabled", val: any) => {
    const updated = [...headers];
    updated[index] = { ...updated[index], [key]: val };
    setHeaders(updated);
  };

  return (
    <div className="bg-gh-panel border border-gh-border rounded-lg overflow-hidden font-mono shadow-sm animate-fadeIn">
      {/* URL Ingress Bar */}
      <div className="p-4 border-b border-gh-border bg-gh-panel flex items-center gap-2">
        {/* Method Badge Indicator */}
        <span className={`px-3 py-1.5 rounded text-xs font-black font-mono border ${
          method === "GET" 
            ? "text-[#7ee787] bg-[#7ee787]/10 border-[#7ee787]/20" 
            : "text-[#d29922] bg-[#d29922]/10 border-[#d29922]/20"
        }`}>
          {method}
        </span>

        {/* Live URL text read-only block */}
        <div className="flex-grow bg-[#0d1117] border border-gh-border rounded px-3 py-2 text-xs text-gh-text font-mono transition-shadow focus-within:shadow-[0_0_0_1px_rgba(31,111,235,0.4)] select-all truncate">
          {getFullUrl()}
        </div>

        {/* Send Flight Call Button */}
        <button
          id="btn-send-api-request"
          onClick={() => {
            if (!jsonError || method === "GET") {
              onSend(queryParams, headers, bodyJson);
            }
          }}
          disabled={isLoading || (method === "POST" && jsonError !== null)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded font-mono font-bold text-xs transition duration-200 select-none cursor-pointer ${
            method === "GET"
              ? "bg-gh-green hover:bg-gh-green-hover text-white border border-[#2ea043]"
              : method === "POST" && jsonError
                ? "bg-[#21262d] text-gh-mute border border-gh-border cursor-not-allowed"
                : "bg-gh-green hover:bg-gh-green-hover text-white border border-[#2ea043]"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              SENDING...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Send size={12} />
              SEND
            </span>
          )}
        </button>
      </div>

      {/* Variables Workspace Headers tabs */}
      <div className="border-b border-gh-border bg-gh-panel px-4 flex gap-4 text-xs text-gh-mute font-mono select-none">
        <button 
          id="req-tab-params"
          onClick={() => setActiveTab("params")}
          className={`py-2 px-1 relative flex items-center gap-1.5 hover:text-white transition cursor-pointer ${
            activeTab === "params" ? "text-white font-semibold" : ""
          }`}
        >
          <Sliders size={12} className={activeTab === "params" ? "text-[#7ee787]" : ""} />
          Params
          {queryParams.filter(p => p.enabled && p.key).length > 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7ee787]" />
          )}
          {activeTab === "params" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#58a6ff]" />}
        </button>

        <button 
          id="req-tab-headers"
          onClick={() => setActiveTab("headers")}
          className={`py-2 px-1 relative flex items-center gap-1.5 hover:text-white transition cursor-pointer ${
            activeTab === "headers" ? "text-white font-semibold" : ""
          }`}
        >
          <Settings2 size={12} className={activeTab === "headers" ? "text-[#58a6ff]" : ""} />
          Headers
          {activeTab === "headers" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#58a6ff]" />}
        </button>

        <button 
          id="req-tab-body"
          onClick={() => setActiveTab("body")}
          disabled={method === "GET"}
          className={`py-2 px-1 relative flex items-center gap-1.5 transition ${
            method === "GET" 
              ? "opacity-30 cursor-not-allowed" 
              : "hover:text-white cursor-pointer"
          } ${activeTab === "body" && method !== "GET" ? "text-white font-semibold" : ""}`}
        >
          <FileText size={12} className={activeTab === "body" ? "text-[#d29922]" : ""} />
          Body
          {activeTab === "body" && method !== "GET" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#58a6ff]" />}
        </button>
      </div>

      {/* Variables Workspace Content Pane */}
      <div className="p-4 bg-[#0d1117] h-44 overflow-y-auto">
        
        {/* PARAMS WORKSPACE */}
        {activeTab === "params" && (
          <div className="space-y-2 animate-fadeIn text-[11px]">
            <div className="grid grid-cols-12 gap-2 text-[10px] text-gh-mute uppercase font-black tracking-wider pb-1.5 border-b border-gh-border">
              <div className="col-span-1 text-center truncate select-none">Active</div>
              <div className="col-span-4 truncate" title="Parameter Key">Parameter Key</div>
              <div className="col-span-6 truncate" title="Value Mapping / Filters">Value Mapping / Filters</div>
              <div className="col-span-1 text-center truncate select-none">Clear</div>
            </div>

            <div className="space-y-1.5">
              {queryParams.map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1 text-center">
                    <input 
                      type="checkbox" 
                      checked={row.enabled}
                      onChange={e => updateParamRow(i, "enabled", e.target.checked)}
                      className="accent-[#58a6ff] cursor-pointer"
                    />
                  </div>
                  <div className="col-span-4">
                    <input 
                      type="text" 
                      placeholder="e.g. limit" 
                      value={row.key}
                      onChange={e => updateParamRow(i, "key", e.target.value)}
                      className="w-full px-2 py-1 text-gh-text bg-[#161b22] rounded border border-gh-border outline-none focus:border-[#58a6ff]"
                    />
                  </div>
                  <div className="col-span-6">
                    <input 
                      type="text" 
                      placeholder="e.g. 5, backend, kafka" 
                      value={row.value}
                      onChange={e => updateParamRow(i, "value", e.target.value)}
                      className="w-full px-2 py-1 text-gh-text bg-[#161b22] rounded border border-gh-border outline-none focus:border-[#58a6ff]"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    <button 
                      id={`btn-del-param-${i}`}
                      onClick={() => removeParamRow(i)}
                      className="text-gh-mute hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition duration-150 cursor-pointer"
                      title="Clear param row"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              id="btn-add-param-row"
              onClick={addParamRow}
              className="mt-2.5 px-2 py-1 text-[10px] text-[#7ee787] bg-[#7ee787]/5 hover:bg-[#7ee787]/10 border border-[#7ee787]/20 rounded font-mono font-medium flex items-center gap-1 cursor-pointer"
            >
              <Plus size={11} /> Add Parameter Row
            </button>
          </div>
        )}

        {/* HEADERS WORKSPACE */}
        {activeTab === "headers" && (
          <div className="space-y-2 animate-fadeIn text-[11px]">
            <div className="grid grid-cols-12 gap-2 text-[10px] text-gh-mute uppercase font-black tracking-wider pb-1.5 border-b border-gh-border">
              <div className="col-span-1 text-center truncate select-none">Active</div>
              <div className="col-span-4 truncate" title="HTTP Header Name">HTTP Header Name</div>
              <div className="col-span-6 truncate" title="Header Value">Header Value</div>
              <div className="col-span-1 text-center truncate select-none">Clear</div>
            </div>

            <div className="space-y-1.5">
              {headers.map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1 text-center">
                    <input 
                      type="checkbox" 
                      checked={row.enabled}
                      onChange={e => updateHeaderRow(i, "enabled", e.target.checked)}
                      className="accent-[#58a6ff] cursor-pointer"
                    />
                  </div>
                  <div className="col-span-4">
                    <input 
                      type="text" 
                      value={row.key}
                      onChange={e => updateHeaderRow(i, "key", e.target.value)}
                      placeholder="e.g. Content-Type"
                      className="w-full px-2 py-1 text-gh-text bg-[#161b22] rounded border border-gh-border outline-none focus:border-[#58a6ff]"
                    />
                  </div>
                  <div className="col-span-6">
                    <input 
                      type="text" 
                      value={row.value}
                      onChange={e => updateHeaderRow(i, "value", e.target.value)}
                      placeholder="e.g. application/json"
                      className="w-full px-2 py-1 text-gh-text bg-[#161b22] rounded border border-gh-border outline-none focus:border-[#58a6ff]"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    <button 
                      id={`btn-del-header-${i}`}
                      onClick={() => removeHeaderRow(i)}
                      className="text-gh-mute hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition duration-150 cursor-pointer"
                      title="Clear header row"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              id="btn-add-header-row"
              onClick={addHeaderRow}
              className="mt-2.5 px-2 py-1 text-[10px] text-[#58a6ff] bg-[#58a6ff]/5 hover:bg-[#58a6ff]/10 border border-[#58a6ff]/20 rounded font-mono font-medium flex items-center gap-1 cursor-pointer"
            >
              <Plus size={11} /> Add Header Row
            </button>
          </div>
        )}

        {/* BODY JSON TEXTAREA */}
        {activeTab === "body" && method !== "GET" && (
          <div className="space-y-1.5 animate-fadeIn h-full flex flex-col">
            <textarea
              className="w-full flex-grow px-3 py-2 text-xs text-[#a5f3fc] bg-[#161b22] rounded border border-gh-border outline-none focus:border-[#d29922] font-mono resize-none leading-relaxed h-24"
              value={bodyJson}
              onChange={(e) => setBodyJson(e.target.value)}
              placeholder="e.g. { 'name': 'Recruiter', 'message': 'Match made' }"
            />
            {jsonError ? (
              <div className="text-rose-400 font-mono text-[10px] animate-pulse">
                ❌ {jsonError}
              </div>
            ) : (
              <div className="text-[#7ee787] font-mono text-[10px]">
                ✓ Valid Client JSON Format
              </div>
            )}
          </div>
        )}

        {/* BODY TAB EMPTY STATE FOR GET REQUESTS */}
        {activeTab === "body" && method === "GET" && (
          <div className="text-gh-mute text-center py-6 italic text-[11px] animate-fadeIn select-none leading-relaxed">
            GET calls cannot encapsulate an HTTP Entity-Body.<br/>
            Select POST /contact endpoint to edit and transmit raw payloads.
          </div>
        )}
      </div>
    </div>
  );
};
