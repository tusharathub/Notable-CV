"use client";

import React, { useState } from "react";
import { Sparkles, Crown } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import GeneratorForm from "@/components/dashboard/GeneratorForm";
import GeneratedResults from "@/components/dashboard/GeneratedResults";
import CVHistory from "@/components/dashboard/CVHistory";

export default function DashboardPage() {
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
  const history = useQuery(
    api.cvHistory.getCVHistory,
    userId ? { userId } : "skip",
  );

  const canGenerate = isPremium
    ? true
    : usageCount === undefined
      ? true
      : usageCount < 3;

  const handleGenerate = async (resume: File, jobDesc: string) => {
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

      const parsedResult = data.result;

      if (userId && !isPremium) {
        await incrementUsage({ userId, date: today });
      }

      if (userId && isPremium) {
        const title = `Cover Letter - ${new Date().toLocaleDateString()}`;
        await saveGeneratedCv({
          userId,
          title,
          content: parsedResult.coverLetter,
        });
      }

      setResult({
        coverLetter: parsedResult?.coverLetter || "No cover letter found.",
        keyPoints: parsedResult?.keyPoints || [],
        suggestions: parsedResult?.suggestions || [],
      });
    } catch (error: any) {
      console.error("Error generating CV:", error);
      toast.error(error.message || "Failed to generate cover letter");
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
      toast.error("Failed to redirect to checkout.");
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
              <span className="font-medium text-yellow-800">
                Premium Member
              </span>
            </div>
          )}
        </div>

        <GeneratorForm
          onGenerate={handleGenerate}
          loading={loading}
          isPremium={isPremium}
          canGenerate={canGenerate}
          usageCount={usageCount}
        />

        {result && <GeneratedResults result={result} />}

        <CVHistory history={history || []} isPremium={isPremium} />

        {/* Premium CTA */}
        {!isPremium && (
          <div className="mt-10 text-center bg-gradient-to-r from-green-50 via-green-100 to-green-200 text-gray-800 rounded-2xl py-8 shadow-md">
            <h3 className="text-2xl font-bold mb-2">
              Unlock Unlimited Access!!!
            </h3>
            <p className="text-sm mb-4 opacity-90">
              Upgrade to Premium for unlimited cover letters and faster
              processing.
            </p>
            <button
              onClick={handleUpgrade}
              className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-green-50 transition"
            >
              Go Premium Now
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
