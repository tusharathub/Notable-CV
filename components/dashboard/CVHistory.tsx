import React from "react";

interface CVHistoryProps {
  history: any[];
  isPremium?: boolean;
}

export default function CVHistory({ history, isPremium }: CVHistoryProps) {
  if (!history || history.length === 0) return null;

  return (
    <div className="mt-12 bg-white border rounded-2xl shadow-md p-8">
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        {isPremium
          ? `Your last ${history.length} Generated CVs`
          : `You last generated CVs`}
      </h2>
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
    </div>
  );
}
