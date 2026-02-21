"use client";

import { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";

export default function FileUpload({ onUploadSuccess }: { onUploadSuccess: (msg: string) => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
            setSuccess(false);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8000/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed. Make sure FastAPI is running.");
            }

            setSuccess(true);
            onUploadSuccess("Document uploaded successfully!");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl transition-all hover:border-blue-500/50 group">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {success ? (
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                    ) : (
                        <Upload className="w-8 h-8 text-blue-400" />
                    )}
                </div>

                <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-100">Upload Document</h3>
                    <p className="text-sm text-slate-400">PDF or TXT files supported</p>
                </div>

                <label className="relative cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-4 rounded-lg border border-slate-700 transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{file ? file.name : "Select File"}</span>
                    <input type="file" className="hidden" accept=".pdf,.txt" onChange={handleFileChange} />
                </label>

                {file && !success && (
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Upload to AI"}
                    </button>
                )}

                {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
            </div>
        </div>
    );
}
