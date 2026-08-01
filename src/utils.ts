export function syntaxHighlightJson(jsonObj: any): string {
  if (typeof jsonObj !== "string") {
    jsonObj = JSON.stringify(jsonObj, null, 2);
  }

  // Escape HTML characters to protect against XSS
  let jsonStr = jsonObj
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Syntax highlighting regex
  return jsonStr.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match: string) => {
      let cls = "text-amber-400"; // default key
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-[#8cb4f5]"; // JSON Key: sky/light-blue
        } else {
          cls = "text-[#b5f5be]"; // JSON String: light-green
        }
      } else if (/true|false/.test(match)) {
        cls = "text-[#f39563]"; // Boolean: orange
      } else if (/null/.test(match)) {
        cls = "text-[#df8cf5]"; // Null: pink / magenta
      } else {
        cls = "text-[#f5cb73]"; // Numbers: yellow / gold
      }

      // Format standard JSON keys vs values elegantly
      if (/:$/.test(match)) {
        return `<span class="${cls}">${match.slice(0, -1)}</span>:`;
      } else {
        return `<span class="${cls}">${match}</span>`;
      }
    }
  );
}

// Generates simulated random backend traffic log entries
export function generateRandomLog(path: string, method: "GET" | "POST", status: number): string {
  const dateStr = new Date().toISOString();
  const latency = Math.floor(Math.random() * 85) + 5;
  const ip = `192.168.1.${Math.floor(Math.random() * 253) + 2}`;
  const logPrefixes = ["INFO", "INFO", "INFO", "WARN", "DEBUG"];
  const prefix = status >= 400 ? "ERROR" : logPrefixes[Math.floor(Math.random() * logPrefixes.length)];
  
  const threadId = `[worker-${Math.floor(Math.random() * 4) + 1}]`;
  return `${dateStr} \x1b[35m${threadId}\x1b[0m \x1b[32m[${prefix}]\x1b[0m ${ip} - \x1b[36m${method}\x1b[0m \x1b[33m${path}\x1b[0m - \x1b[34m${status}\x1b[0m - ${latency}ms`;
}
