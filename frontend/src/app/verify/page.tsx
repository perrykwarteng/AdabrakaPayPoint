"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Success from "../../../public/vid/success.gif";
import Failed from "../../../public/vid/failed.gif";
import Image from "next/image";

export default function Verify() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get("reference");

  const [status, setStatus] = useState("Verifying...");
  const [message, setMessage] = useState(
    "Please wait while we confirm your payment."
  );
  const [dataInfo, setDataInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!ref) return;

      try {
        const response = await axios.get(
          `http://localhost:1800/api/payments/verify/${ref}`
        );
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
  }, [ref]);

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
  const success = dataInfo?.status;
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
                <span className="font-mono">{ref || "N/A"}</span>
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
