import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Category = any;

type Tab = { key: string; slug: string; label: string };

const CategoryTabs: React.FC<{
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
  showBuffet?: boolean;
}> = ({ categories, active, onChange, showBuffet = false }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const handle = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', handle);
    else mq.addListener(handle as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handle as any);
      else mq.removeListener(handle as any);
    };
  }, []);

  const tabs: Tab[] = React.useMemo(() => {
    const list: Tab[] = [{ key: 'all', slug: 'all', label: 'All' }];

    if (showBuffet) list.push({ key: 'buffet', slug: 'buffet', label: 'Buffet' });

    if (isMobile) {
      list.push({ key: 'entrees-special', slug: 'entrees-special', label: 'Entrees & Special Platters' });
    } else {
      categories
        .filter((cat) => {
          const title = (cat.title || cat.attributes?.title || '').toString().toLowerCase().trim();
          const slug = (cat.slug || cat.attributes?.slug || '').toString().toLowerCase().trim();
          return title !== 'all' && slug !== 'all';
        })
        .forEach((cat) => {
          const slug = cat.slug || cat.attributes?.slug || `category-${cat.id}`;
          list.push({
            key: String(cat.id ?? slug),
            slug,
            label: cat.title || cat.attributes?.title || 'Menu',
          });
        });
    }

    list.push({ key: 'menu-tab', slug: 'menu', label: 'Menu' });
    return list;
  }, [categories, isMobile, showBuffet]);

  const updateArrows = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
  }, []);

  React.useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => ro.disconnect();
  }, [tabs, updateArrows]);

  // Keep the active pill in view when it changes (e.g. selected from elsewhere).
  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const activeEl = el.querySelector<HTMLElement>('[data-active="true"]');
    if (!activeEl) return;
    const left = activeEl.offsetLeft - (el.clientWidth - activeEl.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [active, tabs]);

  const nudge = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(200, el.clientWidth * 0.7), behavior: 'smooth' });
  };

  const fade = [
    canLeft ? 'transparent 0px, #000 40px' : '#000 0px',
    canRight ? '#000 calc(100% - 40px), transparent 100%' : '#000 100%',
  ].join(', ');

  return (
    <div className="sticky top-20 z-50 min-w-0 flex-1 py-2">
      <div className="relative min-w-0 px-4">
        <div className="relative flex items-center gap-1 rounded-full border border-border/60 bg-card/50 p-1.5 backdrop-blur-md shadow-sm">
          {canLeft && (
            <button
              type="button"
              aria-label="Scroll categories left"
              onClick={() => nudge(-1)}
              className="hidden sm:flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary/40 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <div
            ref={scrollerRef}
            onScroll={updateArrows}
            className="no-scrollbar min-w-0 flex-1 overflow-x-auto scroll-smooth"
            style={{
              WebkitMaskImage: `linear-gradient(to right, ${fade})`,
              maskImage: `linear-gradient(to right, ${fade})`,
            }}
          >
            <div className="flex w-max items-center gap-1.5">
              {tabs.map((tab) => {
                const isActive = tab.slug === active;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    data-active={isActive}
                    aria-pressed={isActive}
                    onClick={() => onChange(tab.slug)}
                    className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
                      isActive ? 'text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="category-tab-pill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-accent shadow-md shadow-accent/25"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {canRight && (
            <button
              type="button"
              aria-label="Scroll categories right"
              onClick={() => nudge(1)}
              className="hidden sm:flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary/40 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
