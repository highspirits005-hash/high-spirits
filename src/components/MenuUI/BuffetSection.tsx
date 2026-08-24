import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Leaf, UtensilsCrossed, Clock, Search } from 'lucide-react';

export interface BuffetItem {
  id: number;
  documentId?: string;
  name: string;
  description?: string | null;
  isVeg?: boolean | null;
  isSpicy?: boolean | null;
  order?: number;
}

export interface BuffetCategory {
  id: number;
  documentId?: string;
  title: string;
  order?: number;
  price?: number | null;
  buffet_items?: BuffetItem[];
}

const BuffetSection: React.FC<{
  categories: BuffetCategory[];
  loading?: boolean;
  query?: string;
}> = ({ categories, loading = false, query = '' }) => {
  const [activeCourse, setActiveCourse] = useState<number | 'all'>('all');

  // Search narrows the items inside each category; categories left with nothing drop out.
  const searched = useMemo(() => {
    const kw = query.trim().toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        buffet_items: (category.buffet_items || []).filter((item) => {
          if (!kw) return true;
          const name = (item.name || '').toLowerCase();
          const desc = (item.description || '').toLowerCase();
          return name.includes(kw) || desc.includes(kw);
        }),
      }))
      .filter((category) => (category.buffet_items || []).length > 0);
  }, [categories, query]);

  const visible = useMemo(() => {
    if (activeCourse === 'all') return searched;
    const picked = searched.filter((c) => c.id === activeCourse);
    // A search can filter the selected course away — fall back to everything
    // rather than showing an empty section.
    return picked.length ? picked : searched;
  }, [searched, activeCourse]);

  // Every category usually carries the same buffet price — show it once up top
  // instead of repeating it on each heading.
  const sharedPrice = useMemo(() => {
    const prices = Array.from(
      new Set(categories.map((c) => c.price).filter((p): p is number => typeof p === 'number'))
    );
    return prices.length === 1 ? prices[0] : null;
  }, [categories]);

  const totalDishes = useMemo(
    () => searched.reduce((sum, c) => sum + (c.buffet_items || []).length, 0),
    [searched]
  );

  if (loading) {
    return (
      <div className="rounded-2xl sm:rounded-3xl border border-accent/20 bg-card/30 p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-28 bg-secondary/40 rounded" />
          <div className="h-8 w-48 bg-secondary/40 rounded" />
          <div className="h-3 w-full max-w-md bg-secondary/30 rounded" />
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="animate-pulse space-y-3">
            <div className="h-5 w-36 bg-secondary/40 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="h-20 sm:h-24 bg-secondary/25 rounded-xl sm:rounded-2xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!categories.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-accent/25 bg-card/40 shadow-lg"
    >
      {/* soft gold wash, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-7">
        {/* ---------- Header ---------- */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-border/70 pb-4 sm:pb-6">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-accent font-inter tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-2">
              <UtensilsCrossed className="w-3.5 h-3.5 shrink-0" />
              All You Can Eat
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-luxury leading-tight">
              The Buffet
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              A rotating spread of freshly prepared dishes &mdash; starters, signature curries and
              desserts, refilled all evening.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                From 5:00 P.M.
              </span>
              {/* separator only once both facts sit on one line */}
              <span className="hidden sm:inline text-border" aria-hidden>
                &bull;
              </span>
              <span>
                {totalDishes} {totalDishes === 1 ? 'dish' : 'dishes'} across {searched.length}{' '}
                {searched.length === 1 ? 'course' : 'courses'}
              </span>
            </div>
          </div>

          {sharedPrice !== null && (
            <div className="flex items-center justify-between gap-4 rounded-xl sm:rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 shrink-0 sm:flex-col sm:items-end sm:gap-0 sm:text-right">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground sm:order-2 sm:mt-1">
                per person
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent leading-none sm:order-1">
                ${sharedPrice.toFixed(2)}
              </span>
            </div>
          )}
        </header>

        {/* ---------- Course filter chips ---------- */}
        {searched.length > 1 && (
          <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap">
              <button
                onClick={() => setActiveCourse('all')}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                  activeCourse === 'all'
                    ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                    : 'bg-secondary/20 text-muted-foreground border-border hover:border-accent/40'
                }`}
              >
                All Courses
              </button>
              {searched.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCourse(category.id)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                    activeCourse === category.id
                      ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                      : 'bg-secondary/20 text-muted-foreground border-border hover:border-accent/40'
                  }`}
                >
                  {category.title}
                  <span className="ml-1.5 opacity-70">{(category.buffet_items || []).length}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Courses ---------- */}
        {visible.length === 0 ? (
          <div className="flex flex-col items-center text-center py-8 sm:py-12 gap-2">
            <Search className="w-6 h-6 text-muted-foreground" />
            <p className="text-sm sm:text-base text-muted-foreground">
              No buffet dishes match{query.trim() ? ` "${query.trim()}"` : ''}.
            </p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {visible.map((category) => (
              <div key={category.id} className="space-y-3 sm:space-y-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="flex items-baseline gap-2 min-w-0 text-lg sm:text-xl lg:text-2xl font-playfair font-semibold text-foreground">
                    <span className="truncate">{category.title}</span>
                    <span className="shrink-0 text-xs sm:text-sm font-inter font-normal text-muted-foreground">
                      {(category.buffet_items || []).length}
                    </span>
                  </h3>
                  {sharedPrice === null && typeof category.price === 'number' && (
                    <span className="shrink-0 text-sm font-semibold text-accent whitespace-nowrap">
                      ${category.price.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {(category.buffet_items || []).map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
                      className="group flex h-full flex-col rounded-xl sm:rounded-2xl border border-border bg-card p-3.5 sm:p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm sm:text-base font-semibold text-foreground leading-snug break-words">
                          {item.name}
                        </h4>
                        <div className="flex shrink-0 items-center gap-1 pt-0.5">
                          {item.isVeg === true && (
                            <span
                              title="Vegetarian"
                              aria-label="Vegetarian"
                              className="grid place-items-center w-5 h-5 rounded-md bg-green-500/15 text-green-500"
                            >
                              <Leaf className="w-3 h-3" />
                            </span>
                          )}
                          {item.isSpicy === true && (
                            <span
                              title="Spicy"
                              aria-label="Spicy"
                              className="grid place-items-center w-5 h-5 rounded-md bg-red-500/15 text-red-400"
                            >
                              <Flame className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                      {item.description && (
                        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                          {item.description}
                        </p>
                      )}
                    </motion.article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---------- Legend ---------- */}
        <footer className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="grid place-items-center w-5 h-5 rounded-md bg-green-500/15 text-green-500">
              <Leaf className="w-3 h-3" />
            </span>
            Vegetarian
          </span>
          <span className="flex items-center gap-1.5">
            <span className="grid place-items-center w-5 h-5 rounded-md bg-red-500/15 text-red-400">
              <Flame className="w-3 h-3" />
            </span>
            Spicy
          </span>
          <span className="w-full sm:ml-auto sm:w-auto">Buffet selection changes daily.</span>
        </footer>
      </div>
    </motion.section>
  );
};

export default BuffetSection;
