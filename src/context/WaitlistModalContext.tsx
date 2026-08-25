import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface WaitlistModalContextValue {
  isOpen: boolean;
  openWaitlist: () => void;
  closeWaitlist: () => void;
}

const WaitlistModalContext = createContext<WaitlistModalContextValue | null>(null);

export function WaitlistModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openWaitlist = useCallback(() => setIsOpen(true), []);
  const closeWaitlist = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openWaitlist, closeWaitlist }),
    [isOpen, openWaitlist, closeWaitlist],
  );

  return <WaitlistModalContext.Provider value={value}>{children}</WaitlistModalContext.Provider>;
}

export function useWaitlistModal() {
  const ctx = useContext(WaitlistModalContext);
  if (!ctx) {
    throw new Error("useWaitlistModal must be used within a WaitlistModalProvider");
  }
  return ctx;
}
