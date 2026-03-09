import React, { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface GeneratorFormProps {
  onGenerate: (resume: File, jobDesc: string) => void;
  loading: boolean;
  isPremium?: boolean;
  canGenerate: boolean;
  usageCount?: number;
}

export default function GeneratorForm({
  onGenerate,
  loading,
  isPremium,
  canGenerate,
  usageCount,
}: GeneratorFormProps) {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResume(file);
  };

  const handleGenerate = () => {
    if (!resume || !jobDesc.trim()) {
      toast.error("Please upload your resume and paste the job description.");
      return;
    }

    if (!isPremium && !canGenerate) {
      toast.error(
        "You've reached your free limit for today. Upgrade to Premium!",
      );
      return;
    }

    onGenerate(resume, jobDesc);
  };

  return (
    <div className="bg-white border rounded-2xl shadow-md p-8 mb-8 transition hover:shadow-lg">
      <div className="flex flex-col gap-6">
        <div>
          <label className="block font-semibold mb-2 text-gray-800">
            Upload Resume
          </label>
          <label className="flex items-center justify-center gap-2 p-5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
            <Upload className="text-green-600" />
            <span className="text-gray-600">
              {resume ? resume.name : "Click to upload (.txt only)"}
            </span>
            <input
              type="file"
              accept=".txt"
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
  );
}
