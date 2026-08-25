import { useState, type FormEvent } from "react";
import { WAITLIST_FORM_URL, isValidEmail } from "@/lib/waitlist";

type Variant = "onDark" | "onLight";

interface WaitlistFormProps {
  variant?: Variant;
  helperText?: string;
}

export default function WaitlistForm({ variant = "onLight", helperText }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isDark = variant === "onDark";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitted(true);
    window.open(WAITLIST_FORM_URL, "_blank", "noopener,noreferrer");
  }

  if (submitted) {
    return (
      <div
        className={`rounded-2xl border px-5 py-4 text-sm ${
          isDark
            ? "border-white/30 bg-white/10 text-white"
            : "border-[rgba(26,25,24,0.12)] bg-[#f3f3ee] text-[#1a1918]"
        }`}
      >
        <p className="font-['Manrope'] font-semibold">You're almost in.</p>
        <p className={`mt-1 font-['Manrope'] ${isDark ? "text-white/80" : "text-[#1a1918]/70"}`}>
          We opened the waitlist form in a new tab — confirm your email there to lock in your
          spot.{" "}
          <a
            href={WAITLIST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Didn't open? Click here.
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-start gap-3" noValidate>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        className={`h-[46px] w-full rounded-full border px-5 font-['Manrope'] text-sm outline-none transition-colors ${
          isDark
            ? "border-white/30 bg-white/15 text-white placeholder:text-white/50 focus:border-white/60"
            : "border-[rgba(26,25,24,0.15)] bg-white text-[#1a1918] placeholder:text-[#1a1918]/40 focus:border-[#1a1918]/40"
        }`}
      />
      <button
        type="submit"
        className={`flex h-[46px] w-full items-center justify-center rounded-full font-['DM_Sans'] text-[13px] font-medium uppercase tracking-[1.4px] transition-opacity hover:opacity-90 ${
          isDark ? "bg-[#1a1918] text-[#faf6ea]" : "bg-[#4a5322] text-[#faf6ea]"
        }`}
      >
        Join the Waitlist
      </button>
      {error && <p className="font-['Manrope'] text-xs text-[#f53c28]">{error}</p>}
      {helperText && (
        <p
          className={`font-['DM_Sans'] text-xs ${isDark ? "text-white/55" : "text-[#1a1918]/50"}`}
        >
          {helperText}
        </p>
      )}
    </form>
  );
}
