import { useEffect, useRef } from "react";
import { useWaitlistModal } from "@/context/WaitlistModalContext";
import WaitlistForm from "@/components/WaitlistForm";

export default function WaitlistModal() {
  const { isOpen, closeWaitlist } = useWaitlistModal();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeWaitlist();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeWaitlist]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeWaitlist();
      }}
    >
      <div className="absolute inset-0 bg-[#1a1918]/60 backdrop-blur-sm" />
      <div
        ref={dialogRef}
        className="relative w-full max-w-[440px] rounded-[24px] bg-[#faf6ea] p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={closeWaitlist}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#1a1918]/50 transition-colors hover:bg-[#1a1918]/5 hover:text-[#1a1918]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <p className="font-['DM_Sans'] text-[11px] font-semibold uppercase tracking-[2px] text-[#f53c28]">
          The IP Sprint Retreat
        </p>
        <h2
          id="waitlist-modal-title"
          className="mt-2 font-['Instrument_Serif'] text-[34px] leading-[1.1] text-[#134624]"
        >
          Join the waitlist to secure your spot.
        </h2>
        <p className="mt-3 font-['Manrope'] text-[14px] leading-[1.5] text-[#1a1918]/70">
          Spots are limited to keep the group small and the build time real. Invitations open
          September 1 on a first-come, first-serve basis.
        </p>

        <div className="mt-6">
          <WaitlistForm variant="onLight" helperText="Invitations open September 1." />
        </div>
      </div>
    </div>
  );
}
