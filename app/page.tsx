import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import Particles from "../components/Particles";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-white text-gray-900">
      
      {/* HERO SECTION WITH PARTICLES */}
      <section className="relative flex flex-col items-center justify-center text-center h-screen px-4 overflow-hidden">
        {/* PARTICLES BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={["#000000", "#000000"]}
            particleCount={400}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false} className={undefined}          />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Land Your Dream Job with{" "}
            <span className="text-green-700">AI-Crafted Cover Letters</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Transform your resume into tailored cover letters instantly.
            Powered by AI that understands your experience, goals, and tone — not just templates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-green-700 text-white font-medium rounded-xl hover:bg-green-800 transition flex items-center gap-2"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#pricing"
              className="px-8 py-4 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-medium"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Floating sparkles */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-green-300 animate-pulse z-10">
          <Sparkles className="w-12 h-12 opacity-70" />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-28 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Professionals Choose{" "}
            <span className="text-green-700">CoverCraft AI</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "AI-Powered Cover Letters",
                desc: "Paste any job description and get a tailor-made letter written specifically for that role.",
              },
              {
                title: "Smart Resume Insights",
                desc: "Get instant tips on improving your resume for better job compatibility and ATS performance.",
              },
              {
                title: "Instant, Personalized & Polished",
                desc: "No templates, no fluff — just powerful AI that adapts to your tone, voice, and experience.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition bg-gray-50 hover:bg-white"
              >
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">
            How It <span className="text-green-700">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-12 text-left">
            {[
              {
                step: "1",
                title: "Upload Your Resume",
                desc: "Our AI reads your resume to understand your experience, achievements, and tone.",
              },
              {
                step: "2",
                title: "Paste Job Description",
                desc: "Provide a job listing and watch the AI tailor your cover letter perfectly for that role.",
              },
              {
                step: "3",
                title: "Download & Apply",
                desc: "Get your ready-to-send, professional cover letter instantly — personalized and formatted.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="p-8 bg-white border rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-green-700 font-bold text-2xl">{s.step}.</div>
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                </div>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-28 bg-white border-t">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Simple, Transparent Pricing</h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold mb-4">Free Plan</h3>
              <p className="text-gray-600 mb-6">
                Generate up to 3 AI cover letters per day — perfect to test the magic.
              </p>
              <p className="text-5xl font-bold mb-6">$0</p>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition"
              >
                Start for Free
              </Link>
            </div>

            <div className="p-8 border-2 border-green-700 rounded-2xl shadow-md bg-green-50">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-700 mb-6">
                Unlimited letters, smart resume tips, and access to your last 20 CVs.
              </p>
              <p className="text-5xl font-bold mb-6">
                $4.49 <span className="text-lg text-gray-600">/month</span>
              </p>
              <ul className="text-left text-gray-700 mb-8 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-700 w-5 h-5" />
                  Unlimited Cover Letters
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-700 w-5 h-5" />
                  Saved History (20 CVs)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-700 w-5 h-5" />
                  Resume Optimization
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t mt-10">
        <p>© {new Date().getFullYear()} CoverCraft AI. All rights reserved.</p>
        <a
          href="https://x.com/tushar_nerd"
          target="_blank"
          rel="noopener noreferrer"
        >
          Queries?
        </a>
      </footer>
    </main>
  );
}
