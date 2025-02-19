import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface TerminalPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalPopup({ isOpen, onClose }: TerminalPopupProps) {
  const [content] = useState({
    command: "curl https://api.worksbycarlos.dev/favorites.sh | bash",
    output: `# My DevOps Favorites
tools:
  - name: Kubernetes
    type: Container Orchestration
    love_level: Over 9000
  - name: Terraform
    type: Infrastructure as Code
    love_level: Maximum
  - name: Docker
    type: Containerization
    love_level: Infinite
  - name: GitHub Actions
    type: CI/CD
    love_level: Legendary
  - name: Python
    type: Automation
    love_level: Snake Charmer
  - name: Ansible
    type: Configuration Management
    love_level: Playbook Master
  - name: Nginx
    type: Web Server
    love_level: Proxy King
  - name: AWS
    type: Cloud Provider
    love_level: Cloud Native

# Additional configurations...
settings:
  coffee_level: Critical
  debug_mode: Always
  tabs_vs_spaces: Spaces (fight me)
  vim_exit_attempts: ∞
  docker_containers_running: Yes
  kubernetes_pods: Many
  terraform_state: Remote
  git_branches: Too Many

# System Status
status:
  production: 🟢 Running
  coffee_maker: ☕ Brewing
  keyboard: ⌨️ Clacking
  music: 🎵 Lofi Beats
  focus: 🎯 Maximum
  bugs: 🐛 Squashing
  deployment: 🚀 Continuous
  monitoring: 👀 24/7

# Remember:
# - Always backup your backups
# - Git push --force with caution
# - Keep calm and kubectl apply`
  });

  const [typedCommand, setTypedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Reset animation state when terminal is closed
  useEffect(() => {
    if (!isOpen) {
      setTypedCommand("");
      setShowOutput(false);
      setIsTypingComplete(false);
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
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
          y: isOpen ? 0 : 20
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut"
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
          <div className="flex-1 text-center text-sm text-gray-400">
            bash
          </div>
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
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-green-200 whitespace-pre-wrap break-words leading-relaxed"
            >
              {content.output}
            </motion.pre>
          )}
        </div>
      </motion.div>
    </div>
  );
}