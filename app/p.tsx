'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, FileText, CheckCircle, Clock, Shield, MagnetIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [isBefore, setIsBefore] = useState(true);

  return (
    <section className="relative overflow-hidden px-6 py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -80, 80, 0],
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text + CTA */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join 25,000+ job seekers who landed interviews this month</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <TypeWriterText
                texts={[
                  "Stop Writing Cover Letters",
                  "Let AI Write Them For You",
                  "Land Interviews 10× Faster",
                ]}
              />
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700">
                in Under 30 Seconds
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-xl">
              Upload your resume. Paste any job post. Get a 
              <span className="font-bold text-green-700"> perfectly personalized</span> cover letter 
              + ATS-beating resume tips. Instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
              <Link
                href="/dashboard"
                className="group relative px-8 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transition-all hover:scale-105 overflow-hidden"
                onMouseEnter={() => document.getElementById('confetti')?.classList.add('active')}
                onMouseLeave={() => document.getElementById('confetti')?.classList.remove('active')}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Free Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </span>
                <ConfettiEffect />
              </Link>

              <button
                onClick={() => setIsBefore(!isBefore)}
                className="px-8 py-5 border-2 border-gray-300 rounded-2xl font-medium text-lg hover:border-green-600 hover:bg-green-50 transition flex items-center gap-3 justify-center"
              >
                <MagnetIcon className="w-5 h-5" />
                {isBefore ? "See Magic After" : "See Boring Before"}
              </button>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                No credit card
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Takes 30 seconds
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                100% private
              </div>
            </div>
          </div>

          {/* Right: Interactive Before/After Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm font-medium text-gray-500">cover-letter-{isBefore ? "before" : "after"}.docx</span>
              </div>

              <div className="font-mono text-sm leading-relaxed">
                {isBefore ? (
                  <motion.div
                    key="before"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400"
                  >
                    Dear Hiring Manager,<br /><br />
                    I am writing to apply for the position.<br />
                    I have experience in the field.<br />
                    I think I would be a good fit.<br /><br />
                    Thank you for your time.<br />
                    Best regards,
                  </motion.div>
                ) : (
                  <motion.div
                    key="after"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-800"
                  >
                    <span className="text-green-600">Dear Ms. Johnson,</span><br /><br />
                    When I saw your posting for the Senior Frontend Engineer role at Vercel, 
                    I immediately thought: "This is where my 6 years of building pixel-perfect 
                    React apps at scale belongs." Last quarter, I led the migration of 
                    <span className="font-semibold">Acme Corp's dashboard</span> from legacy Angular 
                    to Next.js 14 — reducing load time by <span className="text-green-600">68%</span> 
                    and boosting user satisfaction scores to <span className="text-green-600">4.9/5</span>.<br /><br />
                    
                    I'm particularly excited about your work on Edge Functions — I've already 
                    deployed three production apps using them and would love to bring that 
                    expertise to your team.<br /><br />
                    
                    I'd love to hop on a quick call. Are you free for coffee next week?<br /><br />
                    
                    Best regards,<br />
                    <span className="text-green-600 font-semibold">Alex Rivera</span>
                  </motion.div>
                )}
              </div>

              {/* Floating Elements */}
              {!isBefore && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg rotate-12"
                  >
                    ATS Score: 98%
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2"
                  >
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                </>
              )}
            </div>

            {/* Floating Resume Icon */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -left-10 top-20 bg-blue-100 p-4 rounded-2xl shadow-xl"
            >
              <FileText className="w-12 h-12 text-blue-600" />
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <ArrowRight className="w-16 h-16 text-green-600" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Typewriter Component
function TypeWriterText({ texts }: { texts: string[] }) {
  const [text, setText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      setText(currentText.substring(0, isDeleting ? text.length - 1 : text.length + 1));
      
      if (!isDeleting && text === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, textIndex, texts]);

  return (
    <span className="inline-block">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-1 h-1 bg-green-600 ml-1 align-middle"
      />
    </span>
  );
}

// Confetti on hover
function ConfettiEffect() {
  return (
    <div id="confetti" className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -10, x: Math.random() * 200 - 100, opacity: 1 }}
          animate={{
            y: [null, 100],
            x: [null, Math.random() * 100 - 50],
            opacity: [1, 0],
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.5, delay: i * 0.05 }}
          className="absolute top-0 left-1/2 w-2 h-2"
          style={{
            backgroundColor: ["#10b981", "#34d399", "#6ee7b7", "#86efac"][i % 4],
          }}
        />
      ))}
    </div>
  );
}