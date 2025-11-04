"use client";

import React, { useState } from "react";
import { Upload, FileText, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    coverLetter: string;
    matched: string[];
  } | null>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResume(file);
  }

  const handleGenerate = async () => {
    if (!resume || !jobDesc.trim()) {
      alert("Please upload your resume and paste the job description.");
      return;
    }
    setLoading(true);
    setResult(null);
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="text-green-600" /> AI Cover Letter Builder
        </h1>

        <div className="bg-white border rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-semibold mb-2">Upload Resume</label>
              <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                <Upload className="text-gray-600" />
                <span>{resume ? resume.name : "Click to upload (.pdf or .docx)"}</span>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleResumeUpload}
                />
              </label>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Paste Job Description
              </label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                rows={6}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="Paste the job description here..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-3 bg-green-800 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Cover Letter"}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-8">
            <div className="bg-white border rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="text-green-800" /> Generated Cover Letter
              </h2>
              <pre className="whitespace-pre-wrap text-gray-700">
                {result.coverLetter}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(result.coverLetter)}
                className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm"
              >
                Copy to Clipboard
              </button>
            </div>

            <div className="bg-white border rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3 text-green-700">
                Matched Bullet Points
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {result.matched.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
