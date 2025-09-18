"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type MetricItem = {
  key: string;
  label: string;
  value: number;
  type: "int" | "float";
  suffix?: string;
};

const BUCKET_MS = 5000;

export function LiveMetricsTicker() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [bucket, setBucket] = useState(getBucket(Date.now(), BUCKET_MS));
  useEffect(() => {
    const id = scheduleNextBucket(setBucket, BUCKET_MS);
    return () => clearTimeout(id);
  }, []);

  const metrics = useMemo(() => computeDeterministicMetrics(bucket), [bucket]);

  const a11yText = useMemo(() => {
    const by = indexByKey(metrics);
    const uptime = safeToFixed(by("uptime")?.value, 2);
    const deployments = safeInt(by("deployments")?.value);
    const onprem = safeInt(by("onprem")?.value);
    const cloud = safeInt(by("cloud")?.value);
    const invoices = safeInt(by("invoices")?.value);
    const latency = safeInt(by("latency")?.value);
    return `Status: ${deployments} active deployments with ${onprem} on‑prem and ${cloud} cloud, ${invoices} invoices processed today, average response ${latency} milliseconds, SLA uptime ${uptime} percent.`;
  }, [metrics]);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const SPEED_PX_PER_SEC = 42;

  useEffect(() => {
    if (prefersReducedMotion) return;
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      if (!paused) {
        setOffset((o) => {
          const next = o - SPEED_PX_PER_SEC * dt;
          const el = trackRef.current;
          const half = (el?.scrollWidth || 1) / 2;
          return next <= -half ? 0 : next;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paused, prefersReducedMotion]);

  const doubled = useMemo(() => [...metrics, ...metrics], [metrics]);

  return (
    <div className="w-full">
      <span className="sr-only" role="status" aria-live="polite">
        {mounted ? a11yText : "Status: live metrics updating."}
      </span>

      <div className="mb-2 flex items-center gap-2 text-xs text-foreground/70">
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="font-medium">Live Service Snapshot (IST)</span>
      </div>

      <div
        className={[
          "relative w-full overflow-hidden rounded-xl",
          "border border-foreground/10 ring-1 ring-foreground/10",
          "bg-gradient-to-r from-foreground/[0.04] via-foreground/[0.02] to-transparent",
          "dark:border-white/10 dark:ring-white/[0.06]",
          "dark:from-white/[0.04] dark:via-white/[0.02]",
          "backdrop-blur-sm",
        ].join(" ")}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />

        {prefersReducedMotion && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 p-3">
            {metrics.map((m) => (
              <MetricPill key={m.key} item={m} />
            ))}
          </div>
        )}

        {!prefersReducedMotion && (
          <div className="md:hidden">
            <div className="flex snap-x snap-mandatory overflow-x-auto p-3 gap-3 [-webkit-overflow-scrolling:touch] scrollbar-none">
              {metrics.map((m) => (
                <div className="snap-start" key={m.key}>
                  <MetricPill item={m} />
                </div>
              ))}
            </div>
          </div>
        )}

        {!prefersReducedMotion && (
          <div className="hidden md:block p-0.5">
            <div
              ref={trackRef}
              className="flex gap-3 whitespace-nowrap will-change-transform px-3 py-3"
              style={{ transform: `translateX(${offset}px)` }}
            >
              {doubled.map((m, i) => (
                <MetricPill key={`${m.key}-${i}`} item={m} ariaHidden={i >= metrics.length} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }

        @media (prefers-reduced-motion: reduce) {
          .will-change-transform { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

function MetricPill({ item, ariaHidden }: { item: MetricItem; ariaHidden?: boolean }) {
  const display = useAnimatedNumber(item.value);
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className={[
        "flex items-center gap-2 rounded-lg px-3 py-2",
        "border border-foreground/10 bg-foreground/[0.03]",
        "dark:border-white/10 dark:bg-white/[0.03]",
        "shadow-[inset_0_1px_0_0_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
      ].join(" ")}
    >
      <MetricIcon type={item.key} />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] sm:text-xs uppercase tracking-wide text-foreground/60">
          {item.label}
        </span>
        <span className="text-base sm:text-lg font-semibold tabular-nums">
          {formatValue(display, item)} {" "}
          <span className="text-foreground/50">{item.suffix ?? ""}</span>
        </span>
      </div>
    </div>
  );
}

function MetricIcon({ type }: { type: string }) {
  const common = "w-5 h-5 text-cyan-400 shrink-0";
  switch (type) {
    case "deployments":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h14M4 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "onprem":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 11h18v7H3z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 11V6h10v5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "cloud":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17h9a4 4 0 0 0 0-8 6 6 0 0 0-11-1 4 4 0 0 0 2 9z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "invoices":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "modules":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h7v7H4zM13 7h7v7h-7zM8.5 14.5h7v7h-7z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "latency":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 12h6l3-8 3 16 3-8h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "uptime":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 12a8 8 0 1 0 16 0A8 8 0 0 0 4 12Zm8-5v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

// ---------- Deterministic generation and helpers ----------

function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
  const t = (a + b) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

function rngFromSeed(seedStr: string) {
  const seed = xmur3(seedStr);
  return sfc32(seed(), seed(), seed(), seed());
}

function getBucket(nowMs: number, bucketMs: number) {
  return Math.floor(nowMs / bucketMs) * bucketMs;
}

function scheduleNextBucket(setBucket: (b: number) => void, bucketMs: number) {
  const now = Date.now();
  const next = getBucket(now, bucketMs) + bucketMs;
  const t = next - now;
  return window.setTimeout(function tick() {
    setBucket(getBucket(Date.now(), bucketMs));
    scheduleNextBucket(setBucket, bucketMs);
  }, t);
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
function istNowDate(ms: number) {
  return new Date(ms + IST_OFFSET_MS);
}
function istDayKey(ms: number) {
  const d = istNowDate(ms);
  const y = d.getUTCFullYear();
  const m = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  const dd = d.getUTCDate().toString().padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
function istMonthKey(ms: number) {
  const d = istNowDate(ms);
  const y = d.getUTCFullYear();
  const m = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  return `${y}-${m}`;
}
function istFractionOfDay(ms: number) {
  const d = istNowDate(ms);
  const h = d.getUTCHours();
  const min = d.getUTCMinutes();
  const sec = d.getUTCSeconds();
  return (h * 3600 + min * 60 + sec) / 86400;
}

const PI = Math.PI;
const TAU = Math.PI * 2;
function easeInOutSine(t: number) {
  return 0.5 - 0.5 * Math.cos(PI * clamp01(t));
}
function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function computeDeterministicMetrics(bucketMs: number): MetricItem[] {
  const utcBucketKey = `pivotr|bucket|${bucketMs}`;
  const dayKey = `pivotr|day|${istDayKey(bucketMs)}`;
  const monthKey = `pivotr|month|${istMonthKey(bucketMs)}`;

  const rngBucket = rngFromSeed(utcBucketKey);
  const rngDay = rngFromSeed(dayKey);
  const rngMonth = rngFromSeed(monthKey);

  const onpremBase = 30 + Math.floor(rngMonth() * 40);
  const cloudBase = 15 + Math.floor(rngMonth() * 30);
  const deployments = onpremBase + cloudBase;

  const modules = deployments * (2 + Math.floor(rngMonth() * 6));

  const slaDaily = 99.93 + rngDay() * 0.06;
  const sla = clamp(slaDaily + (rngBucket() - 0.5) * 0.01, 99.9, 99.995);

  const f = istFractionOfDay(bucketMs);
  const workBand = clamp01((f - 0.25) / 0.5);
  const wave = easeInOutSine(workBand);
  const usersMax = 2200 + Math.floor(rngDay() * 800);
  const usersMin = 200 + Math.floor(rngDay() * 200);
  void Math.round(usersMin + (usersMax - usersMin) * wave + (rngBucket() - 0.5) * 40);

  const targetTotal = 18000 + Math.floor(rngDay() * 12000);
  const progress = easeInOutSine(Math.min(1, Math.max(0, (f - 0.17) / 0.7)));
  const invoices = Math.max(0, Math.floor(targetTotal * progress));

  const baseLatency = 170 + Math.sin(TAU * f) * 15;
  const latency = Math.round(clamp(baseLatency + (rngBucket() - 0.5) * 20, 140, 240));

  return [
    { key: "deployments", label: "Active Deployments", value: deployments, type: "int" },
    { key: "onprem", label: "On‑prem Instances", value: onpremBase, type: "int" },
    { key: "cloud", label: "Cloud Instances", value: cloudBase, type: "int" },
    { key: "invoices", label: "Invoices Processed (Today)", value: invoices, type: "int" },
    { key: "modules", label: "Modules Enabled", value: modules, type: "int" },
    { key: "latency", label: "Avg Response (India)", value: latency, type: "int", suffix: "ms" },
    { key: "uptime", label: "SLA Uptime (90d)", value: sla, type: "float", suffix: "%" },
  ];
}

function useAnimatedNumber(target: number) {
  const [display, setDisplay] = useState(target);
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    let raf = 0;
    const animate = () => {
      setDisplay((current) => {
        const delta = targetRef.current - current;
        const step = delta * 0.15;
        if (Math.abs(delta) < 0.5) return targetRef.current;
        return current + step;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);
  return display;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function indexByKey(items: MetricItem[]) {
  const map = new Map(items.map((m) => [m.key, m]));
  return (k: string) => map.get(k);
}

function safeToFixed(n: unknown, digits: number) {
  return typeof n === "number" && Number.isFinite(n) ? n.toFixed(digits) : "—";
}
function safeInt(n: unknown) {
  return typeof n === "number" && Number.isFinite(n) ? Math.round(n).toLocaleString() : "—";
}
function formatValue(n: number, item: MetricItem) {
  if (item.type === "int") return Math.round(n).toLocaleString();
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
