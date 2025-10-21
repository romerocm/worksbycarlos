import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

interface TerminalPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalPopup({ isOpen, onClose }: TerminalPopupProps) {
  const [content] = useState({
    command: "curl https://worksbycarlos.com/api/stack | jq",
    output: `# 🚀 My DevOps Favorites (scroll down for REAL curl commands!)
    tools:
      - name: Kubernetes
        type: Container Orchestration
        love_level: "Over 9000 (Scaling clusters and my ambitions)"
      - name: Terraform
        type: Infrastructure as Code
        love_level: "Maximum (State files: neat. Cloud infra: a work of art.)"
      - name: Docker
        type: Containerization
        love_level: "Infinite (My containers work, your environment doesn't.)"
      - name: GitHub Actions
        type: CI/CD
        love_level: "Legendary (PR merged = 🚀 Auto-deploy)"
      - name: Python
        type: Automation
        love_level: "Snake Charmer (One-liners that do way too much)"
      - name: Ansible
        type: Configuration Management
        love_level: "Playbook Master (Automation > repetitive tasks)"
      - name: Nginx
        type: Web Server
        love_level: "Proxy King (Handling more requests than I do emails)"
      - name: AWS
        type: Cloud Provider
        love_level: "Cloud Native (Still trying to make sense of the bill...)"
    
    # 🛠️ Dev Setup & Preferences
    settings:
      tabs_vs_spaces: "Tabs (Indenting like a pro)"
      git_strategy: "Trunk-based (Merged? Deleted. No zombie branches.)"
      coding_time: "🌙 Night Owl Mode (Best ideas happen after midnight)"
      editor_of_choice: "Vim (Because real DevOps engineers use terminal)"
      vim_exit_attempts: "0 (I know what I'm doing)"
      docker_containers_running: "Yes (There’s always a test environment somewhere)"
      kubernetes_pods: "Balanced (or at least I tell myself that)"
      terraform_state: "Remote (Where it belongs)"
      git_branches: "Clean (A PR should have an expiration date)"
    
    # 🛠️ My VS Code & Vim Setup
    extensions:
      - name: Indent Rainbow
        type: Indentation Highlighting
        love_level: "Because tabs should shine in color"
      - name: Material Icon Theme
        type: UI Icons
        love_level: "Easier file recognition = less clicking"
      - name: Poimandres Theme
        type: Dark Mode
        love_level: "Dark themes = 10% more productivity"
      - name: GitLens
        type: Git Enhancements
        love_level: "Git history that actually makes sense"
      - name: Live Share
        type: Pair Programming
        love_level: "Real-time collab when things go south"
      - name: Vim
        type: Editor Inside VS Code
        love_level: "Because muscle memory never dies"
    
    # 📊 System Status
    status:
      production: "🟢 Running (for now)"
      coding_environment: "🔥 Vim inside VS Code (the best of both worlds)"
      keyboard: "⌨️ Clacking (commands flying at terminal speed)"
      music: "🎵 Synthwave / Lofi (mood-dependent debugging)"
      focus: "🎯 Locked in (until someone asks for a meeting)"
      bugs: "🐛 Squashing (but new ones keep evolving)"
      deployment: "🚀 Continuous (as long as tests agree)"
      monitoring: "👀 24/7 (and yet something always breaks)"
    
    # 📝 DevOps Survival Notes:
    # - Tabs > Spaces. Forever.
    # - Trunk-based dev = no messy branches.
    # - Real DevOps happens in Vim.
    # - Kubernetes will break at the worst possible moment.
    # - Deploying at night is an extreme sport.
    
    ################################################################################
    #                                                                              #
    #                        🥚 REAL EASTER EGG ALERT!! 🥚                          #
    #                                                                              #
    #              These APIs actually work! Try them in YOUR terminal:            #
    #                                                                              #
    ################################################################################
    
    # 🚀 Get my actual tech stack (this really works!)
    curl https://worksbycarlos.com/api/stack | jq '.tech_stack'
    
    # 👨‍💻 Learn more about me  
    curl https://worksbycarlos.com/api/whoami | jq '.fun_facts'
    
    # 😂 Get a random DevOps joke
    curl https://worksbycarlos.com/api/jokes | jq '.daily_joke'
    
    # 🔧 See detailed tool descriptions
    curl https://worksbycarlos.com/api/tools | jq '.essential_weapons'
    
    ################################################################################
    # 💡 Pro tip: The APIs detect curl and give you special messages! 😉           #
    ################################################################################
    
    # Done! Now go build something awesome. 🚀
    `,
  });

  const [typedCommand, setTypedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [copiedCommands, setCopiedCommands] = useState<{[key: string]: boolean}>({});

  // Extract curl commands from the output
  const curlCommands = [
    "curl https://worksbycarlos.com/api/stack | jq '.tech_stack'",
    "curl https://worksbycarlos.com/api/whoami | jq '.fun_facts'", 
    "curl https://worksbycarlos.com/api/jokes | jq '.daily_joke'",
    "curl https://worksbycarlos.com/api/tools | jq '.essential_weapons'"
  ];

  const copyCommand = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommands(prev => ({ ...prev, [command]: true }));
      setTimeout(() => {
        setCopiedCommands(prev => ({ ...prev, [command]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy command:', err);
    }
  };

  const renderOutputWithClickableCommands = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Check if this line contains a curl command
      const curlCommand = curlCommands.find(cmd => line.includes(cmd));
      
      if (curlCommand) {
        return (
          <div key={index} className="flex items-center group hover:bg-gray-800 rounded p-1 transition-colors">
            <span className="flex-1">{line}</span>
            <button
              onClick={() => copyCommand(curlCommand)}
              className="ml-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700 rounded flex items-center gap-1 text-xs"
              title="Click to copy command"
            >
              {copiedCommands[curlCommand] ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        );
      }
      
      return <div key={index}>{line}</div>;
    });
  };

  // Reset animation state when terminal is closed
  useEffect(() => {
    if (!isOpen) {
      setTypedCommand("");
      setShowOutput(false);
      setIsTypingComplete(false);
      setCopiedCommands({});
    }
  }, [isOpen]);

  // Start typing animation when terminal is opened
  useEffect(() => {
    if (isOpen && !isTypingComplete) {
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= content.command.length) {
          setTypedCommand(content.command.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTypingComplete(true);
          setTimeout(() => {
            setShowOutput(true);
          }, 500); // Delay before showing output
        }
      }, 50); // Adjust typing speed here

      return () => clearInterval(typeInterval);
    }
  }, [isOpen, content.command, isTypingComplete]);

  // Lock body scroll when terminal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Add touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent default touch behavior to avoid scrolling
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100]",
        "flex items-center justify-center",
        "touch-none", // Prevent touch events from bubbling
        !isOpen && "pointer-events-none"
      )}
      onTouchStart={handleTouchStart}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.7 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black"
        onClick={onClose}
      />

      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.95,
          y: isOpen ? 0 : 20,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className={cn(
          "relative w-[95vw] h-[90vh]", // Increased size for mobile
          "md:w-[85vw] md:h-[80vh]",
          "lg:w-[80vw] lg:h-[80vh]",
          "max-w-[1000px] max-h-[800px]",
          "bg-gray-900 rounded-lg shadow-xl border border-gray-700",
          "flex flex-col overflow-hidden", // Added overflow-hidden
          "touch-auto" // Enable touch events for the terminal content
        )}
      >
        {/* Terminal Header */}
        <div className="flex items-center p-3 border-b border-gray-700 bg-gray-900 rounded-t-lg">
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-sm text-gray-400">bash</div>
          <div className="w-16" /> {/* Spacer for alignment */}
        </div>

        {/* Terminal Content */}
        <div className="flex-1 overflow-auto p-4 font-mono text-sm md:text-base">
          <div className="flex items-center">
            <span className="text-green-400">➜</span>{" "}
            <span className="text-blue-400">~</span> ${" "}
            <span className="text-white">{typedCommand}</span>
            {!isTypingComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1 inline-block w-2 h-4 bg-white"
              />
            )}
          </div>
          {showOutput && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-green-200 whitespace-pre-wrap break-words leading-relaxed font-mono"
            >
              {renderOutputWithClickableCommands(content.output)}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
