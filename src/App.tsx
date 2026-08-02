import React, { useState, useEffect } from "react";
import { Server, Terminal as TerminalIcon, Play, Code2, ShieldAlert, Cpu } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { RequestPanel } from "./components/RequestPanel";
import { ResponsePanel } from "./components/ResponsePanel";
import { TerminalLogs } from "./components/TerminalLogs";
import { 
  developerAbout, 
  developerSkills, 
  developerProjects, 
  getProjectsList,
  developerExperience,
  getExperienceList,
  developerEducation,
  developerContact, 
  apiEndpoints 
} from "./data";
import { QueryParamRow, HeaderRow, ContactMessage, ProjectItem } from "./types";
import { generateRandomLog } from "./utils";

export default function App() {
  // Resize states
  const [sidebarWidth, setSidebarWidth] = useState<number>(280);
  const [requestHeight, setRequestHeight] = useState<number>(240);
  const [logsHeight, setLogsHeight] = useState<number>(180);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startResizingSidebar = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    const startWidth = sidebarWidth;
    const startX = mouseDownEvent.clientX;

    const doDrag = (mouseMoveEvent: MouseEvent) => {
      const deltaX = mouseMoveEvent.clientX - startX;
      const newWidth = startWidth + deltaX;
      if (newWidth >= 200 && newWidth <= 600) {
        setSidebarWidth(newWidth);
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
    document.body.style.cursor = "col-resize";
  };

  const startResizingRequest = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    const startHeight = requestHeight;
    const startY = mouseDownEvent.clientY;

    const doDrag = (mouseMoveEvent: MouseEvent) => {
      const deltaY = mouseMoveEvent.clientY - startY;
      const newHeight = startHeight + deltaY;
      if (newHeight >= 120 && newHeight <= 600) {
        setRequestHeight(newHeight);
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
    document.body.style.cursor = "row-resize";
  };

  const startResizingLogs = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    const startHeight = logsHeight;
    const startY = mouseDownEvent.clientY;

    const doDrag = (mouseMoveEvent: MouseEvent) => {
      const deltaY = mouseMoveEvent.clientY - startY;
      const newHeight = startHeight - deltaY;
      if (newHeight >= 100 && newHeight <= 500) {
        setLogsHeight(newHeight);
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
    document.body.style.cursor = "row-resize";
  };

  const [activePath, setActivePath] = useState<string>("/");
  const [authToken, setAuthToken] = useState<string>("recruiter_bearer_sristi_dev");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiHits, setApiHits] = useState<number>(0);
  
  // Custom headers state
  const [headers, setHeaders] = useState<HeaderRow[]>([
    { key: "Content-Type", value: "application/json", enabled: true, description: "Content body formatting specification" },
    { key: "Accept", value: "application/json", enabled: true, description: "Expected response body formatting" },
    { key: "Authorization", value: "Bearer recruiter_bearer_sristi_dev", enabled: true, description: "Gateway authentication token" }
  ]);

  // Query parameters state
  const [queryParams, setQueryParams] = useState<QueryParamRow[]>([
    { key: "version", value: "v1", enabled: true, description: "API minor spec version flag" }
  ]);

  // Post forms drafting state
  const [bodyJson, setBodyJson] = useState<string>(
    JSON.stringify({ name: "", email: "", message: "" }, null, 2)
  );

  // Dynamic state database for message submission persists across page life
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);

  // Console log stream (pre-populated with beautiful startup telemetry)
  const [logs, setLogs] = useState<string[]>([
    `${new Date().toISOString()} [system] Sristi-Node-Engine service starting up on host: 0.0.0.0:3000...`,
    `${new Date().toISOString()} [system] OpenSSL 3.0.8 initialized with default TLS templates`,
    `${new Date().toISOString()} [database] Connection pool to PostgreSQL cluster resolved (healthy) - 4ms pool startup`,
    `${new Date().toISOString()} [system] API collections load-out completed: 10 endpoint paths compiled successfully`,
    `${new Date().toISOString()} [gateway] Reverse proxy ingress online. Server status is fully marked as: ONLINE ●`
  ]);

  // Current calculated Response Panel state
  const [responseState, setResponseState] = useState<{
    path: string;
    statusCode: number;
    statusText: string;
    latencyMs: number;
    sizeBytes: number;
    payload: any;
  }>({
    path: "/",
    statusCode: 200,
    statusText: "OK",
    latencyMs: 14,
    sizeBytes: 420,
    payload: {
      service: "Sristi API Engine",
      owner: "Sristi",
      status: "operational",
      version: "v1.2.0-beta",
      timestamp: new Date().toISOString(),
      welcome_documentation: "Click on any sub-route on the left API tree or hit the SEND button above to inspect live JSON response attributes.",
      root_endpoints: {
        "/about": "Get biography and backend engineering stack choices",
        "/skills": "Get grouped languages and tools index",
        "/projects": "Get system project lists. Filter via ?search=<query> or ?limit=<n>",
        "/contact": "Submit message payloads asynchronously via POST request"
      }
    }
  });

  // Sync authorization terminal edits to header arrays automatically
  useEffect(() => {
    setHeaders(prev => 
      prev.map(h => h.key === "Authorization" ? { ...h, value: `Bearer ${authToken}` } : h)
    );
  }, [authToken]);

  // Sync route selection changes to default URL parameters
  const handleSelectEndpoint = (path: string) => {
    setActivePath(path);
    
    // Clear and set sensible defaults for queries
    if (path === "/projects") {
      setQueryParams([
        { key: "limit", value: "10", enabled: true, description: "Crop output record size" },
        { key: "search", value: "", enabled: false, description: "Subset matches on query keys" }
      ]);
    } else if (path.startsWith("/projects/")) {
      setQueryParams([]);
    } else {
      setQueryParams([
        { key: "version", value: "v1", enabled: true, description: "API minor spec version flag" }
      ]);
    }

    // Set sample draft body inside JSON console for contact route
    if (path === "/contact") {
      setBodyJson(JSON.stringify({
        name: "Acme Corp",
        email: "hiring@acme.io",
        message: "Hi Sristi, I visited your interactive API portfolio and would love to connect to discuss backend engineering opportunities."
      }, null, 2));
    }
  };

  // Submit contact message in visualizer form
  const handleVisualizerPostMessage = (message: { name: string; email: string; message: string }) => {
    const freshMessage: ContactMessage = {
      id: `tx_${Math.random().toString(36).substring(2, 9)}`,
      name: message.name,
      email: message.email,
      message: message.message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessagesList(prev => [freshMessage, ...prev]);
    
    // Auto sync content into active JSON response
    setResponseState(prev => {
      if (prev.path === "/messages") {
        const updatedList = [freshMessage, ...messagesList];
        return {
          ...prev,
          sizeBytes: JSON.stringify(updatedList).length,
          payload: updatedList
        };
      }
      return prev;
    });

    // Write audit events to standard log terminal
    setLogs(prev => [
      ...prev,
      `${new Date().toISOString()} \x1b[35m[worker-3]\x1b[0m \x1b[32m[INFO]\x1b[0m db_write - Synchronously sharded feedback payload into 'user_contact_handshakes' block under TX: ${freshMessage.id}`
    ]);
  };

  // Main HTTP Influx client sender handler
  const handleSendAPI = (params: QueryParamRow[], customHeaders: HeaderRow[], bodyContent: string) => {
    setIsLoading(true);
    setApiHits(prev => prev + 1);

    // Simulate flight latency (approx. range 200ms - 500ms)
    const mockDelay = Math.floor(Math.random() * 250) + 150;

    setTimeout(() => {
      let code = 200;
      let text = "OK";
      let resPayload: any = {};

      // Analyze active queries for GET filters
      const activeQueries = params.filter(p => p.enabled && p.key);
      const limitVal = activeQueries.find(p => p.key === "limit")?.value;
      const searchVal = activeQueries.find(p => p.key === "search")?.value;
      const authHeaderObj = customHeaders.find(h => h.enabled && h.key === "Authorization");

      // Verify authentications warning logger
      let authValidated = true;
      if (!authHeaderObj || !authHeaderObj.value.startsWith("Bearer recruiter")) {
        authValidated = false;
      }

      // Root Ingress Route dispatcher
      if (activePath === "/") {
        resPayload = {
          service: "Sristi API Engine",
          owner: "Sristi",
          status: "operational",
          hits_processed: apiHits + 1,
          authorization: authValidated ? "VALID" : "UNAUTHENTICATED_GUEST",
          version: "v1.2.0-beta",
          timestamp: new Date().toISOString(),
          welcome_documentation: "Click on any sub-route on the left API tree or hit the SEND button above to inspect live JSON response attributes.",
          root_endpoints: {
            "/about": "Get biography and backend engineering stack choices",
            "/experience": "Get work experience timeline and education background",
            "/skills": "Get grouped languages and tools index",
            "/projects": "Get system project lists. Filter via ?search=<query> or ?limit=<n>",
            "/contact": "Submit message payloads asynchronously via POST request",
            "/stats": "Query system metrics load factors dynamically"
          }
        };
      } 
      // Biography profile route
      else if (activePath === "/about") {
        resPayload = { ...developerAbout };
      } 
      // Work Experience timeline route
      else if (activePath === "/experience") {
        let list = getExperienceList();

        if (searchVal) {
          const match = searchVal.toLowerCase();
          list = list.filter(e => 
            e.company.toLowerCase().includes(match) || 
            e.role.toLowerCase().includes(match) ||
            e.technologies.some(t => t.toLowerCase().includes(match)) ||
            e.highlights.some(h => h.toLowerCase().includes(match))
          );
        }

        resPayload = {
          total_experiences: list.length,
          years_of_experience: developerAbout.experienceYears,
          work_history: list,
          education: developerEducation,
          filtered: !!searchVal
        };
      }
      // Targeted experience route
      else if (activePath.startsWith("/experience/")) {
        const id = activePath.split("/").pop() || "";
        const expItem = getExperienceList().find(e => e.id === id || e.id.includes(id));

        if (expItem) {
          resPayload = { ...expItem };
        } else {
          code = 404;
          text = "Not Found";
          resPayload = {
            error: {
              code: 404,
              message: "Experience Record Not Found",
              details: `No experience records matching key: '${id}'`
            }
          };
        }
      }
      // Skills stack matrices
      else if (activePath === "/skills") {
        resPayload = { ...developerSkills };
      } 
      // Projects sharded engine queries (WITH FULL REAL FILTER IMPLEMENTATION)
      else if (activePath === "/projects") {
        let list = getProjectsList();

        // Search match parameter implementation
        if (searchVal) {
          const match = searchVal.toLowerCase();
          list = list.filter(p => 
            p.name.toLowerCase().includes(match) || 
            p.description.toLowerCase().includes(match) ||
            p.technologies_used.some(t => t.toLowerCase().includes(match))
          );
        }

        // Limit range parameters implementation
        if (limitVal) {
          const lim = parseInt(limitVal, 10);
          if (!isNaN(lim)) {
            list = list.slice(0, lim);
          }
        }

        resPayload = {
          total_results: list.length,
          projects_dataset: list,
          filtered_active: !!(searchVal || limitVal),
          offset: 0
        };
      } 
      // Targeted project specs router
      else if (activePath.startsWith("/projects/")) {
        const id = activePath.split("/").pop() || "";
        const matchProj = getProjectsList().find(p => p.id === id);
        
        if (matchProj) {
          resPayload = { ...matchProj };
        } else {
          code = 404;
          text = "Not Found";
          resPayload = {
            error: {
              code: 404,
              message: "Project Specs Endpoint Out Of Scope",
              details: `No projects detected matching routing ID key: '${id}'`
            }
          };
        }
      } 
      // Messages query board
      else if (activePath === "/messages") {
        resPayload = messagesList;
      } 
      // Live Metrics Stats
      else if (activePath === "/stats") {
        resPayload = {
          cluster_uptime_sec: Math.floor(performance.now() / 1000) + 124000,
          gateway_load_balancing: "round_robin [4 nodes]",
          gc_alloc_heaps: {
            heap_total_mb: 84.4,
            heap_used_mb: 42.8,
            external_v8_memory: 12.3
          },
          networking_sockets: {
            active_websockets: 14204,
            http_keep_alive_pools: 2045
          },
          average_processing_latency_p95: "14.2ms"
        };
      } 
      // POST Contact Inbound Handler
      else if (activePath === "/contact") {
        try {
          const parsed = JSON.parse(bodyContent);
          if (!parsed.name || !parsed.email || !parsed.message) {
            code = 400;
            text = "Bad Request";
            resPayload = {
              error: {
                status: 400,
                message: "Payload Schema Validation Deficit",
                details: "Post variables require fully declared fields: 'name', 'email', 'message'. Check schema documentation on Specs tab."
              }
            };
          } else {
            code = 201;
            text = "Created";
            
            // Build fresh contact instance
            const freshMsg: ContactMessage = {
              id: `tx_${Math.random().toString(36).substring(2, 9)}`,
              name: parsed.name,
              email: parsed.email,
              message: parsed.message,
              timestamp: new Date().toLocaleTimeString()
            };

            setMessagesList(prev => [freshMsg, ...prev]);

            resPayload = {
              status: "success",
              code: 201,
              message: "Message payload bound dynamically to transient state list storage context.",
              sharded_transaction_id: freshMsg.id,
              record_location_endpoint: "/messages"
            };
          }
        } catch (err: any) {
          code = 400;
          text = "Bad Request";
          resPayload = {
            error: {
              status: 400,
              message: "JSON Syntax Parser Error",
              details: err.message
            }
          };
        }
      }

      // Sync computed changes to visual respond structures
      setResponseState({
        path: activePath,
        statusCode: code,
        statusText: text,
        latencyMs: mockDelay,
        sizeBytes: JSON.stringify(resPayload).length,
        payload: resPayload
      });

      // Spawn nice standard formatted stdout log in the bottom CLI panel
      const newLogVal = generateRandomLog(activePath, activePath === "/contact" ? "POST" : "GET", code);
      setLogs(prev => [...prev, newLogVal]);

      // If they send a valid contact message, add an extra log explaining the DB write event
      if (activePath === "/contact" && code === 201) {
        setLogs(prev => [
          ...prev,
          `${new Date().toISOString()} \x1b[35m[db_agent]\x1b[0m \x1b[32m[INFO]\x1b[0m SQL: INSERT INTO user_contact_handshakes (name, email, message) VALUES ($1,$2,$3) RETURNING id`
        ]);
      }

      setIsLoading(false);
    }, mockDelay);
  };

  // Periodic simulated server background metrics scraping to keep stdout CLI hyperrealistic
  useEffect(() => {
    const scrapeInterval = setInterval(() => {
      const routineChecks = [
        `${new Date().toISOString()} [healthcheck] worker-1: GET /healthz 200 OK - 2ms`,
        `${new Date().toISOString()} [scheduler] worker-0: Cron job sharded clean backup checkpoints inside backup storage block`,
        `${new Date().toISOString()} [cache_daemon] CPU allocation relaxed. Redis active memory compaction autonomously triggered`
      ];
      setLogs(prev => [...prev, routineChecks[Math.floor(Math.random() * routineChecks.length)]]);
    }, 24000);

    return () => clearInterval(scrapeInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gh-bg text-gh-text font-sans flex flex-col antialiased selection:bg-gh-active-bg selection:text-white">
      
      {/* Visual Header / Micro-nav */}
      <header className="bg-gh-panel border-b border-gh-border px-6 py-3 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <Server size={14} className="text-[#7ee787] animate-pulse" />
          <span className="font-mono font-semibold tracking-wide text-gh-text">HTTP REST SERVICE STACK</span>
        </div>
        <div className="flex items-center gap-4 text-gh-mute font-mono">
          <div>
            Gateway IP: <span className="text-gh-text font-bold">104.244.42.1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7ee787] animate-ping" />
            <span className="text-white text-[11px] font-bold font-mono">RUNNING API SERVER</span>
          </div>
        </div>
      </header>

      {/* Main Core API Ingress Dual Panel */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden lg:h-[calc(100vh-42px)]">
        
        {/* Left Sidebar block */}
        <div 
          style={{ width: isLargeScreen ? `${sidebarWidth}px` : "100%" }}
          className="border-b lg:border-b-0 lg:border-r border-gh-border flex-shrink-0 flex flex-col overflow-hidden"
        >
          <Sidebar 
            endpoints={apiEndpoints}
            activePath={activePath}
            onSelectEndpoint={handleSelectEndpoint}
            authToken={authToken}
            onAuthTokenChange={setAuthToken}
            apiHits={apiHits}
          />
        </div>

        {/* Sidebar Vertical Resizer */}
        {isLargeScreen && (
          <div
            onMouseDown={startResizingSidebar}
            className="w-2 flex-shrink-0 cursor-col-resize relative group flex items-center justify-center h-full"
          >
            <div className="h-full w-[2px] bg-gh-border group-hover:bg-[#1f6feb]/70 group-active:bg-[#1f6feb] transition-colors" />
            <div className="absolute inset-y-0 -left-1 -right-1 cursor-col-resize z-50" />
          </div>
        )}

        {/* Right workspace panel */}
        <div className="flex-grow p-4 flex flex-col overflow-hidden h-full min-w-0">
          
          {/* Postman-like URL Request panel */}
          <div 
            style={{ height: isLargeScreen ? `${requestHeight}px` : "auto" }} 
            className="flex-shrink-0 overflow-hidden mb-4 lg:mb-0"
          >
            <RequestPanel 
              method={activePath === "/contact" ? "POST" : "GET"}
              path={activePath}
              onSend={handleSendAPI}
              isLoading={isLoading}
              onPathChange={setActivePath}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              headers={headers}
              setHeaders={setHeaders}
              bodyJson={bodyJson}
              setBodyJson={setBodyJson}
            />
          </div>

          {/* Request-to-Response Horizontal Resizer */}
          {isLargeScreen && (
            <div
              onMouseDown={startResizingRequest}
              className="h-2 flex-shrink-0 cursor-row-resize relative group flex items-center justify-center"
            >
              <div className="w-full h-[2px] bg-[#30363d] group-hover:bg-[#1f6feb]/70 group-active:bg-[#1f6feb] transition-colors" />
              <div className="absolute inset-x-0 -top-1 -bottom-1 cursor-row-resize z-50" />
            </div>
          )}

          {/* Response Payload dashboard panel */}
          <div className="flex-grow overflow-hidden flex flex-col min-h-0 mb-4 lg:mb-0">
            <ResponsePanel 
              path={responseState.path}
              statusCode={responseState.statusCode}
              statusText={responseState.statusText}
              latencyMs={responseState.latencyMs}
              sizeBytes={responseState.sizeBytes}
              responsePayload={responseState.payload}
              onNavigate={handleSelectEndpoint}
              onPostMessage={handleVisualizerPostMessage}
              messagesList={messagesList}
            />
          </div>

          {/* Response-to-Logs Horizontal Resizer */}
          {isLargeScreen && (
            <div
              onMouseDown={startResizingLogs}
              className="h-2 flex-shrink-0 cursor-row-resize relative group flex items-center justify-center mt-2"
            >
              <div className="w-full h-[2px] bg-[#30363d] group-hover:bg-[#1f6feb]/70 group-active:bg-[#1f6feb] transition-colors" />
              <div className="absolute inset-x-0 -top-1 -bottom-1 cursor-row-resize z-50" />
            </div>
          )}

          {/* Running stdout container trace terminal logged to bottom */}
          <div 
            style={{ height: isLargeScreen ? `${logsHeight}px` : "auto" }}
            className="flex-shrink-0 overflow-hidden"
          >
            <TerminalLogs 
              logs={logs}
              onClear={() => setLogs([])}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
