"use client";

import React, { useState } from "react";
import { Upload, FileText, Sparkles, Crown } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function DashboardPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    coverLetter: string;
    suggestions: string[];
    keyPoints: string[];
  } | null>(null);

  const { userId } = useAuth();

  const userData = useQuery(api.users.getUserById, { userId: userId || "" });
  const isPremium = userData?.isPremium;

  const today = format(new Date(), "yyyy-MM-dd");
  const usageCount = useQuery(api.usage.getUsage, {
    userId: userId || "",
    date: today,
  });
  const incrementUsage = useMutation(api.usage.incrementUsage);
  const saveGeneratedCv = useMutation(api.cvHistory.saveCvHistory);
  const history = useQuery(api.cvHistory.getCVHistory, userId ? {userId} : "skip");

  const canGenerate = isPremium
    ? true
    : usageCount === undefined
    ? true
    : usageCount < 3;

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResume(file);
  };

  const handleGenerate = async () => {
    if (!resume || !jobDesc.trim()) {
      alert("Please upload your resume and paste the job description.");
      return;
    }

    if (!isPremium && !canGenerate) {
      alert("You’ve reached your free limit for today. Upgrade to Premium!");
      return;
    }

    const text = await resume.text();

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: jobDesc,
          resume: text,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      const responseText = data.result as string;

      if (userId && !isPremium) {
        await incrementUsage({ userId, date: today });
      }

      if (userId && isPremium) {
        const title = `Cover Letter - ${new Date().toLocaleDateString()}`;
        await saveGeneratedCv({ userId, title, content: responseText });
      }

      const coverLetterMatch = responseText.match(
        /\*\*Cover Letter:\*\*([\s\S]*?)\*\*Key Fit Points:\*\*/
      );
      const keyPointsMatch = responseText.match(
        /\*\*Key Fit Points:\*\*([\s\S]*?)\*\*Resume Improvement Suggestions:\*\*/
      );
      const suggestionsMatch = responseText.match(
        /\*\*Resume Improvement Suggestions:\*\*([\s\S]*)/
      );

      const coverLetter =
        coverLetterMatch?.[1]?.trim() || "No cover letter found.";
      const keyPoints = keyPointsMatch
        ? keyPointsMatch[1]
            .trim()
            .split("\n")
            .filter((line) => line.trim().startsWith("-"))
        : [];
      const suggestions = suggestionsMatch
        ? suggestionsMatch[1]
            .trim()
            .split("\n")
            .filter((line) => line.trim().startsWith("-"))
        : [];

      setResult({ coverLetter, keyPoints, suggestions });
    } catch (error: any) {
      console.error("Error generating CV:", error);
      alert(error.message || "Failed to generate cover letter");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to redirect to checkout.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold flex items-center gap-2 text-green-800">
            <Sparkles className="text-green-600" />
            AI Cover Letter Builder
          </h1>
          {isPremium && (
            <div className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 px-4 py-2 rounded-full shadow-sm">
              <Crown className="text-yellow-600" />
              <span className="font-medium text-yellow-800">Premium Member</span>
            </div>
          )}
        </div>

        {/* Upload + Job Description */}
        <div className="bg-white border rounded-2xl shadow-md p-8 mb-8 transition hover:shadow-lg">
          <div className="flex flex-col gap-6">
            <div>
              <label className="block font-semibold mb-2 text-gray-800">
                Upload Resume
              </label>
              <label className="flex items-center justify-center gap-2 p-5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <Upload className="text-green-600" />
                <span className="text-gray-600">
                  {resume ? resume.name : "Click to upload (.pdf, .docx, or .txt)"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={handleResumeUpload}
                />
              </label>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-800">
                Paste Job Description
              </label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                rows={6}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Paste the job description here..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || (!isPremium && !canGenerate)}
              className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading
                ? "Generating..."
                : !isPremium && !canGenerate
                ? "Daily limit reached"
                : "Generate Custom Cover Letter"}
            </button>

            {!isPremium && usageCount !== undefined && (
              <p className="text-sm text-gray-600 mt-1">
                {usageCount} of 3 free cover letters used today
              </p>
            )}
          </div>
        </div>

        {/* Generated Results */}
        {result && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white border rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-800">
                <FileText className="text-green-700" />
                Your Generated Cover Letter
              </h2>
              <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {result.coverLetter}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(result.coverLetter)}
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition text-sm"
              >
                Copy to Clipboard
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">
                  Key Fit Points
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {result.keyPoints.length > 0 ? (
                    result.keyPoints.map((point, i) => <li key={i}>{point}</li>)
                  ) : (
                    <li>No points found</li>
                  )}
                </ul>
              </div>

              <div className="bg-white border rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">
                  Resume Improvement Suggestions
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {result.suggestions.length > 0 ? (
                    result.suggestions.map((point, i) => <li key={i}>{point}</li>)
                  ) : (
                    <li>No suggestions found</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {isPremium && history && (
          <div className="mt-12 bg-white border rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 text-green-800">
              Your Last {history.length} Generated CVs
            </h2>
            {history.length === 0 ? (
              <p className="text-gray-600">No history yet. Generate your first one!</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {history.map((cv: any) => (
                  <div
                    key={cv._id}
                    className="border-b pb-3 last:border-0 hover:bg-gray-50 rounded-lg p-3 transition"
                  >
                    <h3 className="font-semibold text-gray-800">{cv.title}</h3>
                    <p className="text-sm text-gray-500">
                      Generated on {new Date(cv.createdAt).toLocaleString()}
                    </p>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-green-700 hover:underline">
                        View Cover Letter
                      </summary>
                      <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 rounded-lg p-3 mt-2">
                        {cv.content}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Premium CTA */}
        {!isPremium && (
          <div className="mt-10 text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-2xl py-8 shadow-md">
            <h3 className="text-2xl font-bold mb-2">Unlock Unlimited Access 🚀</h3>
            <p className="text-sm mb-4 opacity-90">
              Upgrade to Premium for unlimited cover letters and faster processing.
            </p>
            <button
              onClick={handleUpgrade}
              className="px-6 py-3 bg-white text-yellow-700 font-semibold rounded-lg hover:bg-yellow-100 transition"
            >
              Go Premium Now
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
