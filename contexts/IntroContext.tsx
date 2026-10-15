'use client';

import { createContext, useContext, useState } from 'react';

interface IntroContextType {
  /** True once the preloader has cleared and above-the-fold entrances may play. */
  ready: boolean;
  setReady: (ready: boolean) => void;
}

const IntroContext = createContext<IntroContextType>({ ready: true, setReady: () => {} });

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  return <IntroContext.Provider value={{ ready, setReady }}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
