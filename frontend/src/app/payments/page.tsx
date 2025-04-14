"use client";
import axios from "axios";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Payments() {
  const [paymentData, setPaymentData] = useState({
    name: "",
    titheNumber: "000000000000",
    phone: "",
    email: "Okay@gmail.com",
    amount: "",
    type: "Offering",
    note: "",
    method: "MoMo",
  });
  const paymentTypes = ["Offering", "Tithe", "Donation", "Welfare"];
  const paymentMethods = ["MoMo", "Card"];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setPaymentData((prev) => ({ ...prev, type: value }));
  };

  const handleMethodChange = (value: string) => {
    setPaymentData((prev) => ({ ...prev, method: value }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Payment:", paymentData);

    try {
      const respones = await axios.post(
        "http://localhost:1800/api/payments/initiate-payment",
        paymentData
      );

      const authorizationUrl = respones.data.data.data.authorization_url;
      console.log("Redirecting to:", authorizationUrl);
      router.push(authorizationUrl); // Redirect to Paystack
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Adabraka Pay Point
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Full Name (optional)"
                name="name"
                value={paymentData.name}
                onChange={handleChange}
              />

              <Input
                placeholder="Phone Number"
                name="phone"
                value={paymentData.phone}
                onChange={handleChange}
                required
              />
              <Input
                placeholder="Amount (GHS)"
                name="amount"
                value={paymentData.amount}
                onChange={handleChange}
                required
                type="number"
              />

              <Select value={paymentData.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Payment Type" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                className={paymentData.type === "Tithe" ? "block" : "hidden"}
                placeholder="Tithe Number"
                name="titheNumber"
                value={paymentData.titheNumber}
                required
                onChange={handleChange}
              />

              <Select
                value={paymentData.method}
                onValueChange={handleMethodChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Note / Prayer Request (optional)"
                name="note"
                value={paymentData.note}
                onChange={handleChange}
              />
              <Button type="submit" className="w-full">
                {paymentData.method === "Card"
                  ? "Pay with Card"
                  : "Pay with MoMo"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
