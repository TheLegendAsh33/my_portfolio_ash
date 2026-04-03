import React, { useEffect, useEffectEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CommandDeck } from './components/CommandDeck';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { InfrastructurePage } from './components/InfrastructurePage';
import { ReportsPage } from './components/ReportsPage';
import { briefingPacket, type RouteKey } from './data/portfolio';
import { useHashRoute } from './hooks/useHashRoute';
import { copyText, downloadDataFile } from './utils/siteActions';

const pageTransition = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

const App: React.FC = () => {
  const { route, navigate } = useHashRoute('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCommandDeckOpen, setIsCommandDeckOpen] = useState(false);
  const [systemNotice, setSystemNotice] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!systemNotice) {
      return;
    }

    const timer = window.setTimeout(() => setSystemNotice(null), 2600);
    return () => window.clearTimeout(timer);
  }, [systemNotice]);

  const handleKeyboardShortcuts = useEffectEvent((event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      setIsCommandDeckOpen((current) => !current);
    }

    if (event.key === 'Escape') {
      setIsCommandDeckOpen(false);
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
  }, [handleKeyboardShortcuts]);

  const handleNavigate = (nextRoute: RouteKey) => {
    navigate(nextRoute);
    setIsCommandDeckOpen(false);
  };

  const handleDownloadBrief = () => {
    downloadDataFile('vuln-scanner-ops-brief.json', JSON.stringify(briefingPacket, null, 2), 'application/json');
    setSystemNotice('Ops brief downloaded to your workstation.');
  };

  const handleCopyValue = async (value: string, label: string) => {
    const copied = await copyText(value);
    setSystemNotice(copied ? `${label} copied to clipboard.` : `${label} is ready to copy manually.`);
  };

  let pageContent: React.ReactNode;

  switch (route) {
    case 'infrastructure':
      pageContent = <InfrastructurePage onNavigate={handleNavigate} />;
      break;
    case 'reports':
      pageContent = <ReportsPage onNavigate={handleNavigate} />;
      break;
    case 'contact':
      pageContent = <ContactPage onNavigate={handleNavigate} onCopyValue={(value, label) => void handleCopyValue(value, label)} />;
      break;
    case 'home':
    default:
      pageContent = (
        <HomePage
          onNavigate={handleNavigate}
          onOpenCommandDeck={() => setIsCommandDeckOpen(true)}
          onCopySignal={() =>
            void handleCopyValue('92A1 6E0F 5D55 13B3 7C2A  9F10 8A76 55D0 44C9 1F71', 'PGP fingerprint')
          }
        />
      );
      break;
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip security-grid">
      <AnimatePresence>
        {!isLoaded ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background-dark"
          >
            <div className="flex flex-col items-center gap-5">
              <div className="h-1.5 w-52 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="h-full bg-primary shadow-[0_0_18px_#00c2cc]"
                />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-primary animate-pulse">
                INITIALIZING_ASH_SECURE_KERNEL...
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Header
        activeRoute={route}
        onNavigate={handleNavigate}
        onDownloadBrief={handleDownloadBrief}
        onToggleCommandDeck={() => setIsCommandDeckOpen(true)}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {pageContent}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer
        activeRoute={route}
        onNavigate={handleNavigate}
        onCopyEmail={() => void handleCopyValue('secure@vulnscanner.dev', 'Secure email')}
        onDownloadBrief={handleDownloadBrief}
      />

      <CommandDeck
        isOpen={isCommandDeckOpen}
        activeRoute={route}
        onClose={() => setIsCommandDeckOpen(false)}
        onNavigate={handleNavigate}
        onDownloadBrief={handleDownloadBrief}
        onCopyEmail={() => void handleCopyValue('secure@vulnscanner.dev', 'Secure email')}
      />

      <AnimatePresence>
        {systemNotice ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-5 right-5 z-[95] max-w-sm rounded-2xl border border-primary/20 bg-panel-dark/95 px-4 py-3 text-sm text-slate-100 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            {systemNotice}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default App;
