"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
};

const seedSuggestions = [
  "What managed services do you offer?",
  "How do AI-driven operations reduce incidents?",
  "Can you help with Observability strategy?",
  "What is a Business Value Assessment?",
];

export default function ServiceChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mounted, setMounted] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const suggestions = useMemo(() => seedSuggestions, []);

  useEffect(() => {
    setMounted(true);
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text:
          "Welcome to Confoline! Ask about our Services, Managed offerings, AI-driven services, or Business Value Assessment.",
        timestamp: Date.now(),
      },
    ]);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  function pushMessage(role: ChatMessage["role"], text: string) {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role, text, timestamp: Date.now() },
    ]);
  }

  function generateAssistantReply(prompt: string): string {
    const lower = prompt.toLowerCase();
    if (lower.includes("managed")) {
      return "Our Managed Services provide outcome-based monitoring, automation, and operations with flexible engagement models tailored to your targets for performance and cost.";
    }
    if (lower.includes("ai")) {
      return "AI-driven managed services combine AIOps with intelligent automation to cut noise, predict incidents, and resolve faster using automated runbooks.";
    }
    if (lower.includes("observability") || lower.includes("monitor")) {
      return "We assess your telemetry strategy and implement end-to-end Observability: logs, metrics, traces, and user experience—with dashboards and SLOs.";
    }
    if (lower.includes("business value") || lower.includes("assessment")) {
      return "A Business Value Assessment quantifies impact, identifies modernization opportunities, and produces a prioritized roadmap aligned to outcomes.";
    }
    return "I can help with Services, Managed Services, AI-driven operations, and Business Value Assessments. What would you like to explore?";
  }

  function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;
    pushMessage("user", content);
    setInput("");
    const reply = generateAssistantReply(content);
    setTimeout(() => pushMessage("assistant", reply), 300);
  }

  if (!mounted) return null;

  if (!isOpen) {
    return (
      <button
        aria-label="Open services chat"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-5 z-[1000] rounded-full bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-500"
      >
        <MessageCircle size={22} className="2xl:size-9" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-5 z-[1000] w-[320px] sm:w-[360px] 2xl:w-[480px]">
      <div className="rounded-xl border border-blue-200 bg-white text-slate-900 shadow-xl">
        <div className="flex items-center justify-between rounded-t-xl bg-blue-800 px-4 py-3 text-white">
          <div>
            <p className="text-sm 2xl:text-xl font-semibold">Welcome to Confoline!</p>
            <p className="text-[11px] 2xl:text-xl text-blue-200">Ask about our services</p>
          </div>
          <button
            aria-label="Close chat"
            onClick={() => setIsOpen(false)}
            className="rounded p-1 hover:bg-blue-700"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((m) => (
            <div key={m.id}>
              <div
                className={
                  m.role === "assistant"
                    ? "inline-block max-w-[85%] rounded-lg bg-slate-100 text-slate-800 px-3 py-2 text-sm 2xl:text-xl"
                    : "inline-block max-w-[85%] rounded-lg bg-blue-500 text-white px-3 py-2 text-sm 2xl:text-xl ml-auto"
                }
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="px-4 pb-2">
          <div className="mb-2 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-[14px] 2xl:text-xl text-slate-700 hover:bg-slate-200"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Type your question about services..."
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <button
              onClick={() => handleSend()}
              className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


