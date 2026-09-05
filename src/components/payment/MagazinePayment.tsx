"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

interface MagazinePaymentProps {
  magazineId: "latest";
  price: number;
}

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayPaymentFailedResponse {
  error?: {
    description?: string;
  };
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
  theme?: {
    color?: string;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    callback: (response: RazorpayPaymentFailedResponse) => void
  ) => void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

export default function MagazinePayment({
  magazineId,
  price,
}: MagazinePaymentProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      // 1. Create Razorpay order on the server
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          magazineId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to create payment order"
        );
      }

      const order = data.order;

      // 2. Make sure Razorpay script is loaded
      if (!window.Razorpay) {
        throw new Error(
          "Razorpay is still loading. Please try again."
        );
      }

      // 3. Open Razorpay Checkout
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,

        name: "തട്ടുംദളം",
        description: "Digital Magazine",
        order_id: order.razorpayOrderId,

        handler: async function (paymentResponse: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            setLoading(true);

            // 4. Verify payment on our server
            const verifyResponse = await fetch(
              "/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id:
                    paymentResponse.razorpay_order_id,

                  razorpay_payment_id:
                    paymentResponse.razorpay_payment_id,

                  razorpay_signature:
                    paymentResponse.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(
                verifyData.message ||
                  "Payment verification failed"
              );
            }

            // 5. Payment is verified and stored in MongoDB
            // Reload the page. The server will now detect
            // that this user has paid and show the magazine.
            router.refresh();
          } catch (err) {
            console.error("Payment verification error:", err);

            setError(
              err instanceof Error
                ? err.message
                : "Payment verification failed"
            );

            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#111827",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on(
  "payment.failed",
  function (response: RazorpayPaymentFailedResponse) {
          console.error(
            "Razorpay payment failed:",
            response
          );

          setError(
            response?.error?.description ||
              "Payment failed. Please try again."
          );

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );

      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <main className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              തട്ടുംദളം
            </h1>

            <p className="mt-2 text-gray-500">
              ഡിജിറ്റൽ മാഗസിൻ
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">
              Read the Magazine
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Get access to the complete digital magazine
              after completing the one-time payment.
            </p>

            <div className="my-7">
              <span className="text-4xl font-bold">
                ₹{price}
              </span>

              <span className="ml-2 text-sm text-gray-500">
                one-time payment
              </span>
            </div>

            {error && (
              <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="w-full rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Processing..."
                : `Pay ₹${price} & Read`}
            </button>

            <p className="mt-4 text-xs text-gray-400">
              Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      </main>
    </>
  );
}