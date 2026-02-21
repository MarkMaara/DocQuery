"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import Chat from "@/components/Chat";
import { Github, FileSearch } from "lucide-react";

export default function Home() {
    const [isReady, setIsReady] = useState(false);

    return (
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-16">
            {/* Hero Section */}
            <div className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 text-xs font-medium animate-bounce">
                    <Github className="w-3 h-3" />
                    Powered by Llama3 & FastAPI
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-slate-400 bg-clip-text text-transparent">
                    DocQuery <span className="text-blue-500">AI</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    The ultimate interface for your local LLM. Upload documents, generate summaries, and engage in meaningful conversations with Llama3 — all privately on your device.
                </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                {/* Sidebar/Upload */}
                <div className="md:col-span-4 space-y-6">
                    <FileUpload onUploadSuccess={() => setIsReady(true)} />

                    <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                        <h4 className="text-sm font-semibold mb-4 flex items-center gap-2 text-slate-300">
                            <FileSearch className="w-4 h-4 text-blue-400" />
                            How it works
                        </h4>
                        <ul className="space-y-3 text-xs text-slate-500 leading-relaxed">
                            <li className="flex gap-2">
                                <span className="text-blue-500 font-bold">1.</span>
                                <span>Upload a PDF or TXT file to the backend.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-500 font-bold">2.</span>
                                <span>FastAPI extracts the text and sends it to Llama3.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-500 font-bold">3.</span>
                                <span>Ask questions or get a detailed summary instantly.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content/Chat */}
                <div className="md:col-span-8">
                    <Chat />
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-slate-900 text-center text-slate-600 text-sm">
                Built with Antigravity AI • Local Inference • Next.js + Tailwind
            </footer>
        </main>
    );
}
