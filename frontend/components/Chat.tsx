"use client";

import { useState } from "react";
import { Send, Sparkles, Loader2, Bot, User } from "lucide-react";

export default function Chat() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [summaryLoading, setSummaryLoading] = useState(false);

    const getSummary = async () => {
        setSummaryLoading(true);
        try {
            const response = await fetch("http://localhost:8000/summary", { method: "POST" });
            const data = await response.json();
            if (data.summary) {
                setMessages((prev) => [...prev, { role: "ai", content: `**Summary:** ${data.summary}` }]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSummaryLoading(false);
        }
    };

    const handleSend = async () => {
        if (!query.trim()) return;

        const userMsg = query;
        setQuery("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: userMsg }),
            });
            const data = await response.json();
            setMessages((prev) => [...prev, { role: "ai", content: data.answer || "No response." }]);
        } catch (err) {
            setMessages((prev) => [...prev, { role: "ai", content: "Error connecting to AI backend." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/80">
                <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold">AI Document Assistant</span>
                </div>
                <button
                    onClick={getSummary}
                    disabled={summaryLoading}
                    className="text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/20 transition-all flex items-center gap-1.5"
                >
                    {summaryLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    Get Summary
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                        <Bot className="w-12 h-12 opacity-20" />
                        <p className="text-sm">Upload a document to start chatting</p>
                    </div>
                )}
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start animate-in fade-in slide-in-from-left-2"}`}>
                        <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === "user" ? "bg-slate-700" : "bg-blue-600"}`}>
                                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"}`}>
                                {m.content}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start animate-pulse">
                        <div className="flex gap-3 max-w-[85%]">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                            <div className="p-3 rounded-2xl bg-slate-800 text-slate-400 text-sm">
                                AI is thinking...
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/80">
                <div className="relative group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask anything about the document..."
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm py-3 px-4 pr-12 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || !query.trim()}
                        className="absolute right-2 top-2 h-8 w-8 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-lg flex items-center justify-center transition-all"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
