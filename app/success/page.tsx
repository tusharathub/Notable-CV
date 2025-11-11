"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Page() {
  return (
    <Suspense
    fallback={
      <div className="p-10 text-center"> Verifying Payment..</div>
    }
    >
      <SuccessPage/>
    </Suspense>
  )
}


function SuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const updatePremium = useMutation(api.users.updatePremiumStatus);

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) return;

      try {
        const { data } = await axios.post("/api/verify-session", { sessionId });

        if (data?.userId) {
          await updatePremium({ userId: data.userId, isPremium: true });
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        setStatus("error");
      }
    }

    verifyPayment();
  }, [sessionId, updatePremium]);

  if (status === "loading") return <div className="p-10 text-center">Verifying payment...</div>;

  if (status === "error")
    return (
      <div className="p-10 text-center text-red-500">
        Something went wrong verifying your payment.
      </div>
    );

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      <p className="text-gray-700">Your Premium plan is now active. Enjoy unlimited CV generations!</p>
      <a
        href="/dashboard"
        className="inline-block mt-6 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
      >
        Go to Dashboard
      </a>
    </div>
  );
}
