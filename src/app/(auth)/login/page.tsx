"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { normalizeIndianPhone } from "@/lib/phone";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    /*
     * Normalize the phone number only when submitting.
     *
     * Examples:
     * 9876543210       -> +919876543210
     * +91 9876543210   -> +919876543210
     * 919876543210     -> +919876543210
     * +919876543210    -> +919876543210
     */
    const normalizedPhone = normalizeIndianPhone(phone);

    if (!normalizedPhone) {
      setError("ദയവായി സാധുവായ ഫോൺ നമ്പർ നൽകുക.");
      return;
    }

    if (!password) {
      setError("പാസ്‌വേഡ് നൽകുക.");
      return;
    }

    if (password.length > 128) {
      setError("പാസ്‌വേഡ് വളരെ നീളമുള്ളതാണ്.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: normalizedPhone,
          password,
        }),
      });

      /*
       * Handle unexpected/non-JSON responses safely.
       */
      let data: {
        message?: string;
      } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setError(
          data.message ||
            "ഫോൺ നമ്പർ അല്ലെങ്കിൽ പാസ്‌വേഡ് തെറ്റാണ്."
        );
        return;
      }

      /*
       * Login successful.
       *
       * The server should already have created
       * the secure session cookie.
       */
      router.push("/magazine/latest");
      router.refresh();
    } catch {
      setError(
        "സെർവറുമായി ബന്ധപ്പെടാൻ കഴിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കുക."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F6F5F4] text-[#20150A]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12">

        {/* Logo */}
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="inline-block"
          >
            <img
              src="/images/logo.jpeg"
              alt="തട്ടുംദളം"
              className="mx-auto h-16 w-auto object-contain"
            />
          </Link>

          <h1 className="mt-6 text-3xl font-bold">
            തിരികെ വരൂ
          </h1>

          <p className="mt-2 text-sm text-[#661B0B]/70">
            മാഗസിൻ വായിക്കാൻ നിങ്ങളുടെ അക്കൗണ്ടിലേക്ക്
            പ്രവേശിക്കുക
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#661B0B]/10 bg-white p-6 shadow-sm sm:p-8">

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium"
              >
                ഫോൺ നമ്പർ
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                required
                maxLength={20}
                disabled={loading}
                className="w-full rounded-xl border border-[#661B0B]/20 bg-[#F6F5F4] px-4 py-3 text-sm outline-none transition focus:border-[#D11001] focus:ring-2 focus:ring-[#D11001]/10 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <p className="mt-1.5 text-xs text-[#20150A]/50">
                ഉദാ: 9876543210 അല്ലെങ്കിൽ +919876543210
              </p>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                പാസ്‌വേഡ്
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  maxLength={128}
                  disabled={loading}
                  className="w-full rounded-xl border border-[#661B0B]/20 bg-[#F6F5F4] px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#D11001] focus:ring-2 focus:ring-[#D11001]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#661B0B]/60 transition hover:text-[#D11001] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff
                      size={19}
                      strokeWidth={1.8}
                    />
                  ) : (
                    <Eye
                      size={19}
                      strokeWidth={1.8}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#D11001] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#661B0B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "പ്രവേശിക്കുന്നു..."
                : "ലോഗിൻ ചെയ്യുക"}
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 border-t border-[#661B0B]/10 pt-6 text-center">
            <p className="text-sm text-[#20150A]/60">
              അക്കൗണ്ട് ഇല്ലേ?
            </p>

            <Link
              href="/register"
              className="mt-1 inline-block text-sm font-semibold text-[#D11001] hover:underline"
            >
              പുതിയ അക്കൗണ്ട് സൃഷ്ടിക്കുക
            </Link>
          </div>
        </div>

        {/* Back */}
        <Link
          href="/"
          className="mt-6 text-center text-sm text-[#661B0B]/60 transition hover:text-[#D11001]"
        >
          ← ഹോം പേജിലേക്ക് മടങ്ങുക
        </Link>
      </div>
    </main>
  );
}