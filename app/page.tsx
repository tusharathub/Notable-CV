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
            href="/dashboard"
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

      <section id="features" className="py-30 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Professionals choose this Platform
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "✨ AI-Powered Cover Letters",
                desc: "Paste any job description and get a tailor-made cover letter written for you.",
              },
              {
                title: "📑 Resume Compatibility Tips",
                desc: "Get bullet-point suggestions to make your resume align better with the job.",
              },
              {
                title: "⚡ Instant & Personalized",
                desc: "No more templates — everything is written in your tone and experience context.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <h3> {f.title} </h3>
                <p> {f.desc} </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-white border-t">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold mb-4">Free</h3>
              <p className="text-gray-600 mb-6">
                3 AI-generated cover letters per day. Try before you upgrade.
              </p>
              <p className="text-4xl font-bold mb-6">$0</p>
              <Link
                href="/sign-in"
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Get Started Free
              </Link>
            </div>

            <div className="p-8 border-2 border-green-600 rounded-2xl shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-600 mb-6">
                Unlimited cover letters, resume optimization, and saved history.
              </p>
              <p className="text-4xl font-bold mb-6">
                $0.00<span className="text-lg">/month</span>
              </p>
              <Link
                href="/upgrade"
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-500 text-sm border-t mt-10">
        <p>© {new Date().getFullYear()} CoverCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
