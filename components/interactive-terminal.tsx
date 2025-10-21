"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PinkTerminalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="#FF79C6"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block"
  >
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

interface TerminalLine {
  id: string;
  type: "command" | "output" | "error";
  content: string;
  timestamp: Date;
}

interface InteractiveTerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function InteractiveTerminal({
  isVisible,
  onClose,
}: InteractiveTerminalProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(160); // Default h-40 = 160px
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartHeight, setDragStartHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "welcome",
      type: "output",
      content:
        "🚀 Welcome to Carlos' DevOps Terminal! Type 'help' for commands.",
      timestamp: new Date(),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Handle mobile viewport changes (keyboard show/hide)
  useEffect(() => {
    if (!isMobile) return;

    const handleViewportChange = () => {
      // Force viewport height update when keyboard appears/disappears
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
    };
  }, [isMobile]);

  // Lock body scroll and match background when mobile terminal is open
  useEffect(() => {
    if (isMobile && (isMaximized || isFullscreen)) {
      // Get current scroll position
      const scrollY = window.scrollY;

      // Store original background color
      const originalBg = document.body.style.backgroundColor;

      // Prevent body scroll and match terminal background
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.backgroundColor = "#1D2736"; // gray-700 to match command interface overlay

      return () => {
        // Restore scroll position and original background
        const bodyStyle = document.body.style;
        bodyStyle.position = "";
        bodyStyle.top = "";
        bodyStyle.left = "";
        bodyStyle.right = "";
        bodyStyle.overflow = "";
        bodyStyle.backgroundColor = originalBg;
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobile, isMaximized, isFullscreen]);

  // Focus input when terminal becomes visible or maximized (desktop only)
  useEffect(() => {
    if (
      isVisible &&
      (isMaximized || isFullscreen) &&
      inputRef.current &&
      !isMobile
    ) {
      inputRef.current.focus();
    }
  }, [isVisible, isMaximized, isFullscreen, isMobile]);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Handle dragging for resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = dragStartY - e.clientY; // Inverted because we want up = bigger
      const newHeight = Math.min(
        Math.max(dragStartHeight + deltaY, 120),
        window.innerHeight * 0.8
      ); // Min 120px, max 80% of viewport
      setTerminalHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStartY, dragStartHeight]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (isFullscreen) return; // Don't allow resize in fullscreen

    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragStartHeight(terminalHeight);
    e.preventDefault();
  };

  // Mobile touch handlers for swipe-to-close
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    setTouchStartX(touch.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const deltaY = touch.clientY - touchStartY;
    const deltaX = touch.clientX - touchStartX;

    // Only allow swipe-to-close if:
    // 1. Started near the top (within first 100px of screen)
    // 2. Significant downward swipe (>120px)
    // 3. Primarily vertical (horizontal movement <80px)
    // 4. Not scrolling in terminal content
    const startedAtTop = touchStartY < 100;
    const significantDownwardSwipe = deltaY > 120;
    const mainlyVertical = Math.abs(deltaX) < 80;

    if (startedAtTop && significantDownwardSwipe && mainlyVertical) {
      setIsMaximized(false);
      setIsFullscreen(false);
    }
  };

  // Prevent touch scroll events from bubbling up (but allow terminal scrolling)
  const handleTouchMove = (e: React.TouchEvent) => {
    // Only prevent propagation for the outer container, not the terminal content
    if (e.target === e.currentTarget) {
      e.stopPropagation();
    }
  };

  const addToHistory = (type: TerminalLine["type"], content: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setHistory((prev) => [...prev, newLine]);
  };

  const executeCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add the command to history
    addToHistory("command", command);

    // Add to command history for up/down navigation
    setCommandHistory((prev) => [...prev, command.trim()]);
    setHistoryIndex(-1);
    setIsProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const trimmedCommand = command.trim().toLowerCase();

      // Built-in commands
      if (trimmedCommand === "help") {
        addToHistory(
          "output",
          `Available commands:
  help                    - Show this help message
  clear                   - Clear terminal output
  ls                      - List available API endpoints
  whoami                  - Quick bio info
  exit                    - Close terminal
  pwd                     - Print working directory
  date                    - Show current date/time
  uptime                  - System uptime (fake, but fun!)
  
  API Commands:
  curl https://worksbycarlos.com/api/stack
  curl https://worksbycarlos.com/api/whoami  
  curl https://worksbycarlos.com/api/jokes
  curl https://worksbycarlos.com/api/tools
  
  💡 Tips: 
  - Use ↑↓ arrows for command history
  - Try piping with | jq for pretty JSON!
  - Cmd+L or Ctrl+L to clear terminal
  - Type 'vim' for a surprise 😉`
        );
      } else if (trimmedCommand === "clear") {
        setHistory([
          {
            id: "cleared",
            type: "output",
            content: "Terminal cleared. Type 'help' for commands.",
            timestamp: new Date(),
          },
        ]);
      } else if (trimmedCommand === "ls") {
        addToHistory(
          "output",
          `Available API endpoints:
  /api/stack     - My tech stack and tools
  /api/whoami    - Personal info and bio  
  /api/jokes     - DevOps jokes and wisdom
  /api/tools     - Detailed tool descriptions
  
  Use: curl https://worksbycarlos.com/api/<endpoint>`
        );
      } else if (trimmedCommand === "whoami") {
        // Quick shortcut to whoami API
        await executeCurlCommand("curl https://worksbycarlos.com/api/whoami");
      } else if (trimmedCommand === "exit") {
        addToHistory("output", "Goodbye! 👋");
        setTimeout(() => onClose(), 1000);
      } else if (trimmedCommand === "pwd") {
        addToHistory("output", "/home/carlos/portfolio");
      } else if (trimmedCommand === "date") {
        addToHistory("output", new Date().toString());
      } else if (trimmedCommand === "uptime") {
        const uptime = Math.floor(Math.random() * 30) + 1;
        const load = (Math.random() * 2).toFixed(2);
        addToHistory(
          "output",
          `up ${uptime} days, load average: ${load}, ${load}, ${load}
Users: 1 (carlos)
Processes: 42 (including this terminal!)
Memory: 8GB (coffee-powered)`
        );
      } else if (trimmedCommand === "vim" || trimmedCommand === "vi") {
        addToHistory(
          "output",
          `Starting vim...
~                                                           
~                                                           
~                     VIM - Vi IMproved                      
~                                                           
~                      version 8.2.0                       
~                 by Bram Moolenaar et al.                
~                                                           
~        Vim is open source and freely distributable       
~                                                           
~        Become a registered Vim user!                     
~        type  :help register<Enter>   for information     
~                                                           
~        type  :q<Enter>               to exit             
~        type  :help<Enter>  or  <F1>  for on-line help   
~                                                           
~        type  :help version8<Enter>   for version info    
~                                                           
                                                            
Just kidding! 😄 This isn't real vim (thank goodness).
To exit this fake vim: you're already out! ✨
Pro tip: In real vim, it's ESC then :q! 
(Carlos can exit vim 73% of the time)`
        );
      }
      // Handle curl commands
      else if (command.trim().startsWith("curl")) {
        await executeCurlCommand(command.trim());
      } else {
        addToHistory(
          "error",
          `Command not found: ${command.trim()}
Type 'help' for available commands.`
        );
      }
    } catch (error) {
      addToHistory(
        "error",
        `Error executing command: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsProcessing(false);
      setCurrentInput("");
    }
  };

  const executeCurlCommand = async (command: string) => {
    // Parse curl command to extract URL
    const urlMatch = command.match(/curl\s+([^\s|]+)/);
    if (!urlMatch) {
      addToHistory(
        "error",
        "Invalid curl syntax. Use: curl https://worksbycarlos.com/api/<endpoint>"
      );
      return;
    }

    const url = urlMatch[1];

    // Validate that it's one of our API endpoints
    const validEndpoints = [
      "/api/stack",
      "/api/whoami",
      "/api/jokes",
      "/api/tools",
    ];
    const endpoint = validEndpoints.find((ep) => url.includes(ep));

    if (!endpoint) {
      addToHistory(
        "error",
        `Endpoint not found. Available endpoints:
${validEndpoints.map((ep) => `  https://worksbycarlos.com${ep}`).join("\n")}`
      );
      return;
    }

    try {
      // Make the actual API call
      const response = await fetch(endpoint, {
        headers: {
          "User-Agent": "curl/7.68.0", // Simulate curl user agent to trigger special responses
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Check if command includes | jq for pretty printing
      const isPiped = command.includes("|");

      if (isPiped) {
        addToHistory("output", JSON.stringify(data, null, 2));
      } else {
        addToHistory("output", JSON.stringify(data));
      }
    } catch (error) {
      addToHistory(
        "error",
        `curl: ${error instanceof Error ? error.message : "Request failed"}`
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Cmd+L or Ctrl+L to clear terminal
    if (e.key === "l" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setHistory([
        {
          id: "cleared",
          type: "output",
          content: "Terminal cleared. Type 'help' for commands.",
          timestamp: new Date(),
        },
      ]);
      setCurrentInput("");
      return;
    }

    if (e.key === "Enter" && !isProcessing) {
      executeCommand(currentInput);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        } else {
          setHistoryIndex(-1);
          setCurrentInput("");
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    }
  };

  const handleTabCompletion = () => {
    const input = currentInput.trim().toLowerCase();
    if (!input) return;

    const commands = [
      "help",
      "clear",
      "ls",
      "whoami",
      "exit",
      "pwd",
      "date",
      "uptime",
      "vim",
      "curl https://worksbycarlos.com/api/stack",
      "curl https://worksbycarlos.com/api/whoami",
      "curl https://worksbycarlos.com/api/jokes",
      "curl https://worksbycarlos.com/api/tools",
    ];

    const matches = commands.filter((cmd) => cmd.startsWith(input));

    if (matches.length === 1) {
      setCurrentInput(matches[0]);
    } else if (matches.length > 1) {
      // Show possible completions
      addToHistory(
        "output",
        `Possible completions:
${matches.map((match) => `  ${match}`).join("\n")}`
      );
    }
  };

  // JSON syntax highlighting
  const highlightJSON = (text: string) => {
    try {
      // Check if it's valid JSON
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, 2);

      // Apply syntax highlighting with colors
      const highlighted = formatted
        .replace(
          /("(?:\\.|[^"\\])*")\s*:/g,
          '<span class="text-blue-300">$1</span>:'
        ) // Keys
        .replace(
          /:\s*("(?:\\.|[^"\\])*")/g,
          ': <span class="text-green-300">$1</span>'
        ) // String values
        .replace(
          /:\s*(\d+(?:\.\d+)?)/g,
          ': <span class="text-yellow-300">$1</span>'
        ) // Numbers
        .replace(
          /:\s*(true|false)/g,
          ': <span class="text-purple-300">$1</span>'
        ) // Booleans
        .replace(/:\s*(null)/g, ': <span class="text-gray-500">$1</span>') // Null
        .replace(/([{}[\]])/g, '<span class="text-gray-400">$1</span>'); // Brackets

      return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
    } catch {
      // If not valid JSON, return as plain text
      return text;
    }
  };

  const formatOutput = (line: TerminalLine) => {
    const prefix =
      line.type === "command" ? "$ " : line.type === "error" ? "✗ " : "";

    const colorClass =
      line.type === "command"
        ? "text-green-400"
        : line.type === "error"
        ? "text-red-400"
        : "text-gray-300";

    // Check if content looks like JSON (starts with { or [)
    const isJSON =
      line.type === "output" &&
      (line.content.trim().startsWith("{") ||
        line.content.trim().startsWith("["));

    return (
      <motion.div
        key={line.id}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`font-mono text-sm whitespace-pre-wrap break-words ${colorClass}`}
      >
        {prefix}
        {isJSON ? highlightJSON(line.content) : line.content}
      </motion.div>
    );
  };

  // Mobile fullscreen terminal
  if (isMobile && (isMaximized || isFullscreen)) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-xl backdrop-saturate-150"
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {/* Mobile Terminal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600/30 bg-gray-800/60">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-sm font-mono">
              carlos@mobile:~$
            </span>
          </div>
          <button
            onClick={() => {
              setIsMaximized(false);
              setIsFullscreen(false);
            }}
            className="text-gray-400 hover:text-white text-sm px-3 py-2 hover:bg-gray-700 rounded transition-colors"
          >
            Done
          </button>
        </div>

        {/* Mobile Terminal Content */}
        <div className="flex flex-col h-full">
          {/* Output History - with proper bottom margin */}
          <div
            ref={terminalRef}
            className="flex-1 overflow-y-auto p-4 space-y-2"
            style={{ marginBottom: "180px" }} // Reserve space for fixed command interface
          >
            <AnimatePresence>
              {history.map((line) => formatOutput(line))}
            </AnimatePresence>

            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 font-mono text-sm flex items-center gap-2"
              >
                <div className="flex gap-1">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-1 h-1 bg-green-400 rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-1 h-1 bg-green-400 rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-1 h-1 bg-green-400 rounded-full"
                  />
                </div>
                Processing...
              </motion.div>
            )}

            {/* Bottom spacer to ensure content is never hidden */}
            <div style={{ height: "80px" }}></div>
          </div>

          {/* Mobile Command Interface - Fixed positioning */}
          <div
            className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-xl backdrop-saturate-150 border-t border-gray-600/30 p-4"
            style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
          >
            {/* Quick Commands Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() =>
                  executeCommand(
                    "curl https://worksbycarlos.com/api/stack | jq"
                  )
                }
                className="px-3 py-2 bg-purple-600/80 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors font-mono"
                disabled={isProcessing}
              >
                📊 Stack
              </button>
              <button
                onClick={() =>
                  executeCommand(
                    "curl https://worksbycarlos.com/api/whoami | jq"
                  )
                }
                className="px-3 py-2 bg-blue-600/80 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors font-mono"
                disabled={isProcessing}
              >
                👨‍💻 Who Am I
              </button>
              <button
                onClick={() =>
                  executeCommand(
                    "curl https://worksbycarlos.com/api/jokes | jq"
                  )
                }
                className="px-3 py-2 bg-green-600/80 hover:bg-green-600 text-white text-sm rounded-lg transition-colors font-mono"
                disabled={isProcessing}
              >
                😄 Jokes
              </button>
              <button
                onClick={() => executeCommand("clear")}
                className="px-3 py-2 bg-gray-600/80 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors font-mono"
                disabled={isProcessing}
              >
                🧹 Clear
              </button>
            </div>

            {/* Input Field with mobile-optimized behavior */}
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                type="text"
                inputMode="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={(e) => {
                  // Scroll to bottom when input is focused to keep it visible
                  setTimeout(() => {
                    e.target.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }, 300);
                }}
                disabled={isProcessing}
                placeholder="Type command or use buttons above..."
                className="flex-1 bg-gray-700/50 text-white outline-none placeholder-gray-400 px-3 py-2 rounded-lg disabled:opacity-50 text-base"
                autoComplete="off"
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!isMaximized && !isFullscreen) {
    // Minimized footer state - like original footer
    return (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isVisible ? "0%" : "100%" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.7,
        }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800/50 cursor-pointer"
        onClick={() => {
          setIsMaximized(true);
          setIsFullscreen(false);
          setTerminalHeight(160); // Reset to default small size
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-gray-300 font-mono"
            >
              <PinkTerminalIcon /> Click to open Interactive Terminal Try: curl,
              help, vim...
            </motion.p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Maximized/Fullscreen terminal state
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.7,
      }}
      className={`fixed z-40 bg-gray-900/95 backdrop-blur-xl backdrop-saturate-150 border-t border-gray-600/50 ${
        isFullscreen ? "bottom-0 left-0 right-0" : "bottom-0 left-0 right-0"
      }`}
    >
      {/* Resize Handle - visible when maximized (but not fullscreen) */}
      {isMaximized && !isFullscreen && (
        <div
          className="h-2 bg-gray-600/30 hover:bg-gray-500/50 cursor-row-resize transition-colors flex items-center justify-center group border-b border-gray-600/20"
          onMouseDown={handleDragStart}
        >
          <div className="w-12 h-0.5 bg-gray-400/70 rounded-full group-hover:bg-gray-300 transition-colors"></div>
        </div>
      )}

      {/* Terminal Header - only in maximized or fullscreen state */}
      {(isMaximized || isFullscreen) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-600/30 bg-gray-800/60">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setIsMaximized(false);
                  setIsFullscreen(false);
                }}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                title="Close"
              />
              <button
                onClick={() => {
                  setIsMaximized(false);
                  setIsFullscreen(false);
                }}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                title="Minimize"
              />
              <button
                onClick={() => {
                  setIsFullscreen(!isFullscreen);
                  // Don't reset height - preserve user's custom size
                }}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                title="Fullscreen"
              />
            </div>
            <span className="text-gray-400 text-sm font-mono">
              carlos@devops:~$
            </span>
          </div>
          <button
            onClick={() => {
              setIsMaximized(false);
              setIsFullscreen(false);
            }}
            className="text-gray-400 hover:text-white text-xs px-2 py-1 hover:bg-gray-700 rounded transition-colors"
          >
            minimize
          </button>
        </div>
      )}

      {/* Terminal Content */}
      <div
        className="flex flex-col"
        style={{
          height: isFullscreen
            ? `${Math.max(terminalHeight, 320)}px`
            : `${terminalHeight}px`,
        }}
      >
        {/* Output History */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 space-y-1"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#4B5563 transparent",
          }}
        >
          <AnimatePresence>
            {history.map((line) => formatOutput(line))}
          </AnimatePresence>

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 font-mono text-sm flex items-center gap-2"
            >
              <div className="flex gap-1">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-1 h-1 bg-green-400 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-1 h-1 bg-green-400 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-1 h-1 bg-green-400 rounded-full"
                />
              </div>
              Processing...
            </motion.div>
          )}
        </div>

        {/* Input Line */}
        <div className="border-t border-gray-600/30 p-4 bg-gray-800/20">
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isProcessing}
              placeholder="Type a command... (try 'help')"
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 disabled:opacity-50"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
