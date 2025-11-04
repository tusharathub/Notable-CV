import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Land your next job faster with {""}
          <span className="text-green-800">AI-Powered Cover Letters</span>
        </h1>
         <p className="text-lg text-gray-600 max-w-xl mb-8">
          Upload your resume, paste any job description, and let AI craft a
          personalized cover letter with resume improvement tips — in seconds.
        </p>
        <div className="flex gap-4">
          <Link
          href="/sign-in"
          className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-medium"
          >
            Get started for free
          </Link>
            <Link
            href="/#pricing"
            className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-medium"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
