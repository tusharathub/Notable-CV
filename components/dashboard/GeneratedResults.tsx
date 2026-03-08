import React from "react";
import { FileText } from "lucide-react";

interface GeneratedResultsProps {
  result: {
    coverLetter: string;
    suggestions: string[];
    keyPoints: string[];
  };
}

export default function GeneratedResults({ result }: GeneratedResultsProps) {
  return (
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
  );
}
