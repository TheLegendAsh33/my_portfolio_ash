import { startTransition, useEffect, useEffectEvent, useState } from 'react';
import type { RouteKey } from '../data/portfolio';
import { normalizeRoute, toRouteHash } from '../utils/siteActions';

export const useHashRoute = (fallback: RouteKey = 'home') => {
  const [route, setRoute] = useState<RouteKey>(() => {
    if (typeof window === 'undefined') {
      return fallback;
    }

    return normalizeRoute(window.location.hash || fallback);
  });

  const syncRoute = useEffectEvent(() => {
    const nextRoute = normalizeRoute(window.location.hash || fallback);
    startTransition(() => setRoute(nextRoute));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = toRouteHash(fallback);
    }

    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, [fallback, syncRoute]);

  const navigate = (nextRoute: RouteKey) => {
    const nextHash = toRouteHash(nextRoute);

    if (window.location.hash === nextHash) {
      startTransition(() => setRoute(nextRoute));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.location.hash = nextHash;
  };

  return { route, navigate };
};
