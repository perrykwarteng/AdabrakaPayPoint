"use client";

import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";

// Inner component
function Verification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("Verifying...");
  const [message, setMessage] = useState(
    "Please wait while we confirm your payment."
  );
  const [dataInfo, setDataInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) return;

      try {
        // PRO
        const response = await axios.get(
          `${process.env.PRODUCTION_URI}/api/payments/verify/${reference}`
        );

        // DEV
        // const response = await axios.get(
        //   `${process.env.LOCAL_URI}/api/payments/verify/${reference}`
        // );

        if (response.data.status === "success") {
          setDataInfo(response.data);
          setStatus("✅ Payment Successful");
          setMessage("Thank you! Your payment was verified.");
        } else {
          setStatus("❌ Payment Failed");
          setMessage("There was a problem verifying your payment.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("⚠️ Error verifying payment");
        setMessage("Unable to verify payment at the moment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [reference]);

  const customFields = dataInfo?.data?.metadata?.custom_fields || [];

  const name = customFields.find((f: any) => f.display_name === "Name")?.value;
  const email = customFields.find(
    (f: any) => f.display_name === "email"
  )?.value;
  const number = customFields.find(
    (f: any) => f.display_name === "Phone"
  )?.value;
  const type = customFields.find((f: any) => f.display_name === "Type")?.value;
  const receipt = dataInfo?.data?.receipt_number;
  const amount = dataInfo?.data?.amount;
  const formattedAmount = amount ? `GHS ${(amount / 100).toFixed(2)}` : "N/A";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 rounded-xl shadow-xl space-y-6">
        <CardTitle className="text-xl font-semibold text-center">
          {status}
        </CardTitle>
        <p className="text-sm opacity-80 text-center">{message}</p>

        <hr className="border-gray-300" />

        <CardContent className="text-sm text-left space-y-4">
          {loading ? (
            <>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </>
          ) : (
            <>
              <p className="flex justify-between">
                <span className="opacity-70">Reference:</span>
                <span className="font-mono">{reference || "N/A"}</span>
              </p>
              <p className="flex justify-between">
                <span className="opacity-70">Name:</span>
                <span className="font-mono">{name || "N/A"}</span>
              </p>
              <p className="flex justify-between">
                <span className="opacity-70">Email:</span>
                <span className="font-mono">{email || "N/A"}</span>
              </p>
              <p className="flex justify-between">
                <span className="opacity-70">Phone Number:</span>
                <span className="font-mono">{number || "N/A"}</span>
              </p>
              <p className="flex justify-between">
                <span className="opacity-70">Receipt #:</span>
                <span className="font-mono">{receipt || "N/A"}</span>
              </p>
              <p className="flex justify-between">
                <span className="opacity-70">Amount:</span>
                <span className="font-mono">{formattedAmount}</span>
              </p>
              <p className="flex justify-between">
                <span className="opacity-70">Type:</span>
                <span className="font-mono">{type || "N/A"}</span>
              </p>
            </>
          )}
        </CardContent>

        <Button className="w-full" onClick={() => router.push("/payments")}>
          Return to Home
        </Button>
      </Card>
    </div>
  );
}

// Outer component wrapped with Suspense
export default function Verify() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <Verification />
    </Suspense>
  );
}
