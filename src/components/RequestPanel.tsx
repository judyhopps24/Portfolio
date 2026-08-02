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
    <div className="bg-gh-panel border border-gh-border rounded-lg overflow-hidden font-mono shadow-sm animate-fadeIn flex flex-col h-full">
      {/* URL Ingress Bar */}
      <div className="p-4 border-b border-gh-border bg-gh-panel flex items-center gap-3">
        {/* Method Badge Indicator */}
        <span className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold font-mono border tracking-wider ${
          method === "GET" 
            ? "text-emerald-400 bg-emerald-400/5 border-emerald-500/15" 
            : "text-amber-400 bg-amber-400/5 border-amber-500/15"
        }`}>
          {method}
        </span>

        {/* Live URL text read-only block */}
        <div className="flex-grow bg-[#090b10] border border-gh-border rounded-md px-3 py-2 text-xs text-white/90 font-mono transition-shadow focus-within:border-indigo-500/60 focus-within:shadow-[0_0_8px_rgba(99,102,241,0.12)] select-all truncate">
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
          className={`flex items-center gap-1.5 px-4 py-2 rounded-md font-sans font-bold text-xs transition duration-200 select-none cursor-pointer ${
            method === "GET"
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.2)]"
              : method === "POST" && jsonError
                ? "bg-[#161a22] text-gh-mute border border-gh-border cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.2)]"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              SENDING...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Send size={11} />
              SEND
            </span>
          )}
        </button>
      </div>

      {/* Variables Workspace Headers tabs */}
      <div className="border-b border-gh-border bg-gh-panel px-4 flex gap-4 text-[11px] text-gh-mute font-sans select-none">
        <button 
          id="req-tab-params"
          onClick={() => setActiveTab("params")}
          className={`py-2.5 px-1 relative flex items-center gap-1.5 hover:text-white transition cursor-pointer ${
            activeTab === "params" ? "text-white font-semibold" : ""
          }`}
        >
          <Sliders size={12} className={activeTab === "params" ? "text-emerald-400" : ""} />
          Params
          {queryParams.filter(p => p.enabled && p.key).length > 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          )}
          {activeTab === "params" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500" />}
        </button>

        <button 
          id="req-tab-headers"
          onClick={() => setActiveTab("headers")}
          className={`py-2.5 px-1 relative flex items-center gap-1.5 hover:text-white transition cursor-pointer ${
            activeTab === "headers" ? "text-white font-semibold" : ""
          }`}
        >
          <Settings2 size={12} className={activeTab === "headers" ? "text-indigo-400" : ""} />
          Headers
          {activeTab === "headers" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500" />}
        </button>

        <button 
          id="req-tab-body"
          onClick={() => setActiveTab("body")}
          disabled={method === "GET"}
          className={`py-2.5 px-1 relative flex items-center gap-1.5 transition ${
            method === "GET" 
              ? "opacity-30 cursor-not-allowed" 
              : "hover:text-white cursor-pointer"
          } ${activeTab === "body" && method !== "GET" ? "text-white font-semibold" : ""}`}
        >
          <FileText size={12} className={activeTab === "body" ? "text-amber-400" : ""} />
          Body
          {activeTab === "body" && method !== "GET" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500" />}
        </button>
      </div>

      {/* Variables Workspace Content Pane */}
      <div className="p-4 bg-[#090b10] flex-grow overflow-y-auto min-h-[120px]">
        
        {/* PARAMS WORKSPACE */}
        {activeTab === "params" && (
          <div className="space-y-3.5 animate-fadeIn text-[11px]">
            <div className="grid grid-cols-12 gap-2 text-[9.5px] text-gh-mute uppercase font-bold tracking-wider pb-2 border-b border-gh-border/60">
              <div className="col-span-1 text-center truncate select-none">Active</div>
              <div className="col-span-4 truncate" title="Parameter Key">Parameter Key</div>
              <div className="col-span-6 truncate" title="Value Mapping / Filters">Value Mapping / Filters</div>
              <div className="col-span-1 text-center truncate select-none">Clear</div>
            </div>

            <div className="space-y-2">
              {queryParams.map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1 text-center">
                    <input 
                      type="checkbox" 
                      checked={row.enabled}
                      onChange={e => updateParamRow(i, "enabled", e.target.checked)}
                      className="accent-indigo-500 cursor-pointer"
                    />
                  </div>
                  <div className="col-span-4">
                    <input 
                      type="text" 
                      placeholder="e.g. limit" 
                      value={row.key}
                      onChange={e => updateParamRow(i, "key", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-white bg-[#11141a] rounded-md border border-gh-border outline-none focus:border-indigo-500/60 focus:shadow-[0_0_8px_rgba(99,102,241,0.1)] transition font-mono shadow-inner"
                    />
                  </div>
                  <div className="col-span-6">
                    <input 
                      type="text" 
                      placeholder="e.g. 5, backend, kafka" 
                      value={row.value}
                      onChange={e => updateParamRow(i, "value", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-white bg-[#11141a] rounded-md border border-gh-border outline-none focus:border-indigo-500/60 focus:shadow-[0_0_8px_rgba(99,102,241,0.1)] transition font-mono shadow-inner"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    <button 
                      id={`btn-del-param-${i}`}
                      onClick={() => removeParamRow(i)}
                      className="text-gh-mute hover:text-rose-400 p-1.5 rounded-md hover:bg-rose-500/10 transition duration-150 cursor-pointer"
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
              className="mt-1 px-2.5 py-1.5 text-[10px] text-emerald-400 bg-emerald-400/5 hover:bg-emerald-400/10 border border-emerald-500/15 rounded-md font-sans font-semibold flex items-center gap-1 cursor-pointer transition duration-150"
            >
              <Plus size={11} /> Add Parameter Row
            </button>
          </div>
        )}

        {/* HEADERS WORKSPACE */}
        {activeTab === "headers" && (
          <div className="space-y-3.5 animate-fadeIn text-[11px]">
            <div className="grid grid-cols-12 gap-2 text-[9.5px] text-gh-mute uppercase font-bold tracking-wider pb-2 border-b border-gh-border/60">
              <div className="col-span-1 text-center truncate select-none">Active</div>
              <div className="col-span-4 truncate" title="HTTP Header Name">HTTP Header Name</div>
              <div className="col-span-6 truncate" title="Header Value">Header Value</div>
              <div className="col-span-1 text-center truncate select-none">Clear</div>
            </div>

            <div className="space-y-2">
              {headers.map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1 text-center">
                    <input 
                      type="checkbox" 
                      checked={row.enabled}
                      onChange={e => updateHeaderRow(i, "enabled", e.target.checked)}
                      className="accent-indigo-500 cursor-pointer"
                    />
                  </div>
                  <div className="col-span-4">
                    <input 
                      type="text" 
                      value={row.key}
                      onChange={e => updateHeaderRow(i, "key", e.target.value)}
                      placeholder="e.g. Content-Type"
                      className="w-full px-2.5 py-1.5 text-white bg-[#11141a] rounded-md border border-gh-border outline-none focus:border-indigo-500/60 focus:shadow-[0_0_8px_rgba(99,102,241,0.1)] transition font-mono shadow-inner"
                    />
                  </div>
                  <div className="col-span-6">
                    <input 
                      type="text" 
                      value={row.value}
                      onChange={e => updateHeaderRow(i, "value", e.target.value)}
                      placeholder="e.g. application/json"
                      className="w-full px-2.5 py-1.5 text-white bg-[#11141a] rounded-md border border-gh-border outline-none focus:border-indigo-500/60 focus:shadow-[0_0_8px_rgba(99,102,241,0.1)] transition font-mono shadow-inner"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    <button 
                      id={`btn-del-header-${i}`}
                      onClick={() => removeHeaderRow(i)}
                      className="text-gh-mute hover:text-rose-400 p-1.5 rounded-md hover:bg-rose-500/10 transition duration-150 cursor-pointer"
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
              className="mt-1 px-2.5 py-1.5 text-[10px] text-indigo-400 bg-indigo-400/5 hover:bg-indigo-400/10 border border-indigo-500/15 rounded-md font-sans font-semibold flex items-center gap-1 cursor-pointer transition duration-150"
            >
              <Plus size={11} /> Add Header Row
            </button>
          </div>
        )}

        {/* BODY JSON TEXTAREA */}
        {activeTab === "body" && method !== "GET" && (
          <div className="space-y-2 animate-fadeIn h-full flex flex-col">
            <textarea
              className="w-full flex-grow px-3 py-2 text-xs text-white bg-[#11141a] rounded-md border border-gh-border outline-none focus:border-indigo-500/60 focus:shadow-[0_0_8px_rgba(99,102,241,0.1)] font-mono resize-none leading-relaxed h-28 shadow-inner"
              value={bodyJson}
              onChange={(e) => setBodyJson(e.target.value)}
              placeholder="e.g. { 'name': 'Recruiter', 'message': 'Match made' }"
            />
            {jsonError ? (
              <div className="text-rose-400 font-mono text-[10px] animate-pulse">
                ❌ {jsonError}
              </div>
            ) : (
              <div className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                ✓ Valid Client JSON Format
              </div>
            )}
          </div>
        )}

        {/* BODY TAB EMPTY STATE FOR GET REQUESTS */}
        {activeTab === "body" && method === "GET" && (
          <div className="text-gh-mute text-center py-6 italic text-[11px] font-sans animate-fadeIn select-none leading-relaxed">
            GET calls cannot encapsulate an HTTP Entity-Body.<br/>
            Select POST /contact endpoint to edit and transmit raw payloads.
          </div>
        )}
      </div>
    </div>
  );
};
