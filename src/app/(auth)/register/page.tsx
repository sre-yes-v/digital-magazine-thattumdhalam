
"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { normalizeIndianPhone } from "@/lib/phone";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl =
    searchParams.get("redirect") || "/";

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);
  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handlePhoneChange(value: string) {
    const normalized =
      normalizeIndianPhone(value);

    if (normalized) {
      setPhone(normalized);
      return;
    }

    const cleaned = value.replace(
      /[^\d+ ]/g,
      ""
    );

    setPhone(cleaned);
  }

  async function handleRegister(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    const normalizedPhone =
      normalizeIndianPhone(phone);

    if (!normalizedPhone) {
      setError(
        "ദയവായി സാധുവായ ഫോൺ നമ്പർ നൽകുക."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "പാസ്‌വേഡ് കുറഞ്ഞത് 8 അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം."
      );
      return;
    }

    if (password.length > 128) {
      setError(
        "പാസ്‌വേഡ് വളരെ നീളമുള്ളതാണ്."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "പാസ്‌വേഡുകൾ തമ്മിൽ പൊരുത്തപ്പെടുന്നില്ല."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: normalizedPhone,
            password,
          }),
        }
      );

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
            "Registration failed. Please try again."
        );
        return;
      }

      /*
       * Registration successful.
       *
       * IMPORTANT:
       * /api/auth/register must create the session
       * cookie before returning success.
       *
       * Then send the user back to the original
       * destination.
       *
       * For a magazine purchase:
       *
       * /magazine/latest
       *       ↓
       * session exists
       *       ↓
       * user hasn't paid
       *       ↓
       * MagazinePayment
       */
      router.push(redirectUrl);
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
            അക്കൗണ്ട് സൃഷ്ടിക്കുക
          </h1>

          <p className="mt-2 text-sm text-[#661B0B]/70">
            തട്ടുംദളം ഡിജിറ്റൽ മാഗസിനിലേക്ക് സ്വാഗതം
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#661B0B]/10 bg-white p-6 shadow-sm sm:p-8">

          <form
            onSubmit={handleRegister}
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
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) =>
                  handlePhoneChange(
                    e.target.value
                  )
                }
                required
                maxLength={15}
                disabled={loading}
                className="w-full rounded-xl border border-[#661B0B]/20 bg-[#F6F5F4] px-4 py-3 text-sm outline-none transition focus:border-[#D11001] focus:ring-2 focus:ring-[#D11001]/10 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <p className="mt-1.5 text-xs text-[#20150A]/50">
                ഉദാ: +919876543210
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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="new-password"
                  placeholder="കുറഞ്ഞത് 8 അക്ഷരങ്ങൾ"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  minLength={8}
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                പാസ്‌വേഡ് വീണ്ടും നൽകുക
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="new-password"
                  placeholder="പാസ്‌വേഡ് വീണ്ടും നൽകുക"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                  minLength={8}
                  maxLength={128}
                  disabled={loading}
                  className="w-full rounded-xl border border-[#661B0B]/20 bg-[#F6F5F4] px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#D11001] focus:ring-2 focus:ring-[#D11001]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#661B0B]/60 transition hover:text-[#D11001] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {showConfirmPassword ? (
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

            {/* Register */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#D11001] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#661B0B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "അക്കൗണ്ട് സൃഷ്ടിക്കുന്നു..."
                : "അക്കൗണ്ട് സൃഷ്ടിക്കുക"}
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 border-t border-[#661B0B]/10 pt-6 text-center">
            <p className="text-sm text-[#20150A]/60">
              ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?
            </p>

            <Link
              href={`/login?redirect=${encodeURIComponent(
                redirectUrl
              )}`}
              className="mt-1 inline-block text-sm font-semibold text-[#D11001] hover:underline"
            >
              ലോഗിൻ ചെയ്യുക
            </Link>
          </div>
        </div>

        {/* Back */}
        <Link
          href="/"
          className="mt-6 text-center text-sm text-[#661B0B]/60 hover:text-[#D11001]"
        >
          ← ഹോം പേജിലേക്ക് മടങ്ങുക
        </Link>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}