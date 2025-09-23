"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IndianRupee, TrendingUp, Clock, Gauge, Sparkles, Users } from "lucide-react";

// ================== Formatting helpers ==================
const formatINR = (value: number, maxFrac: number = 2) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: maxFrac,
  }).format(value);

const formatINRCompact = (value: number) => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return formatINR(value);
  }
};

const formatNumberCompact = (value: number, maxFrac: number = 2) =>
  new Intl.NumberFormat("en-IN", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: maxFrac,
  }).format(value);

const clampNumber = (n: number, min = 0, max = Number.POSITIVE_INFINITY) =>
  Number.isFinite(n) ? Math.min(Math.max(n, min), max) : NaN;

// ================== Reusable Stepper Input ==================
type StepperInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onValueChange: (v: string) => void;
};

/**
 * A reusable stepper input component for number inputs.
 *
 * This component provides a number input with increment and decrement buttons,
 * as well as keyboard support for stepping up and down.
 *
 * @param {StepperInputProps} props The props for the component.
 * @returns {JSX.Element} The rendered stepper input.
 */
export const StepperInput: React.FC<StepperInputProps> = ({
  value,
  onValueChange,
  className,
  ...rest
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const syncAndEmit = () => {
    if (!ref.current) return;
    onValueChange(ref.current.value);
  };

  const handleStep = (dir: 1 | -1) => {
    if (!ref.current) return;
    if (dir === 1) ref.current.stepUp();
    else ref.current.stepDown();
    syncAndEmit();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!ref.current) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      ref.current.stepUp();
      syncAndEmit();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      ref.current.stepDown();
      syncAndEmit();
    } else if (e.key === "PageUp") {
      e.preventDefault();
      for (let i = 0; i < 5; i++) ref.current.stepUp();
      syncAndEmit();
    } else if (e.key === "PageDown") {
      e.preventDefault();
      for (let i = 0; i < 5; i++) ref.current.stepDown();
      syncAndEmit();
    }
  };

  const numericValue = Number(value);
  const minNum = rest.min !== undefined ? Number(rest.min) : undefined;
  const maxNum = rest.max !== undefined ? Number(rest.max) : undefined;
  const minusDisabled =
    Number.isFinite(numericValue) && Number.isFinite(minNum)
      ? numericValue <= (minNum as number)
      : false;
  const plusDisabled =
    Number.isFinite(numericValue) && Number.isFinite(maxNum)
      ? numericValue >= (maxNum as number)
      : false;

  return (
    <div className="inline-flex w-full items-stretch overflow-hidden rounded-md border bg-background text-foreground shadow-sm focus-within:ring-2 focus-within:ring-ring">
      <button
        type="button"
        aria-label="Decrease value"
        onClick={() => handleStep(-1)}
        disabled={minusDisabled}
        className="h-11 w-11 shrink-0 inline-flex items-center justify-center border-r text-foreground/80 hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <input
        ref={ref}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={onKeyDown}
        {...rest}
        className={[
          // critical: allow shrink so the + button is never clipped
          "flex-1 min-w-0 h-11 px-3 bg-transparent border-0 outline-none",
          "[appearance:textfield] [-moz-appearance:textfield]",
          "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          className ?? "",
        ].join(" ")}
      />

      <div className="w-px bg-border" aria-hidden="true" />

      <button
        type="button"
        aria-label="Increase value"
        onClick={() => handleStep(1)}
        disabled={plusDisabled}
        className="h-11 w-11 shrink-0 inline-flex items-center justify-center bg-emerald-600 text-emerald-50 hover:bg-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-600/60 disabled:bg-emerald-600/40 disabled:text-emerald-50/70 disabled:pointer-events-none"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round" />
          <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

// ================== Animation hook (count-up, respects reduced motion) ==================
/**
 * A custom hook for animating a number count-up effect.
 *
 * This hook takes a target value and animates the display of the number from 0
 * to the target value over a specified duration. It also respects the user's
 * preference for reduced motion.
 *
 * @param {number | null} value The target value to animate to.
 * @param {boolean} run Whether the animation should run.
 * @param {number} [duration=800] The duration of the animation in milliseconds.
 * @returns {number} The current display value of the animation.
 */
function useCountUp(value: number | null, run: boolean, duration = 800) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!run || value === null || !Number.isFinite(value)) return;

    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    if (raf.current) cancelAnimationFrame(raf.current);
    const start = performance.now();
    const from = 0;
    const to = value;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value, run, duration]);

  return display;
}

// ================== Main Component ==================
/**
 * An interactive calculator for estimating Return on Investment (ROI).
 *
 * This component allows users to input data about their company to calculate
 * potential savings. It features real-time calculations and animated results.
 *
 * @returns {JSX.Element} The rendered ROI calculator.
 */
export const ROICalculator: React.FC = () => {
  // Defaults tailored to Indian MSME context
  const [employees, setEmployees] = useState<string>("20");
  const [salary, setSalary] = useState<string>("20000");
  const [hours, setHours] = useState<string>("5");

  // Assumptions (editable)
  const [timeReductionPct, setTimeReductionPct] = useState<string>("30");
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState<string>("48");
  const [weeksPerMonth, setWeeksPerMonth] = useState<string>("4.33");

  // Results
  const [timeSavings, setTimeSavings] = useState<number | null>(null); // hours/month
  const [monthlySavings, setMonthlySavings] = useState<number | null>(null); // INR
  const [annualSavings, setAnnualSavings] = useState<number | null>(null); // INR

  // Extra insights
  const [fteUnlocked, setFteUnlocked] = useState<number | null>(null); // FTE-month equivalents
  const [hoursPerEmployeePerMonth, setHoursPerEmployeePerMonth] = useState<number | null>(null);
  const [dailySavings, setDailySavings] = useState<number | null>(null); // INR/day
  const [rangeMonthlyMin, setRangeMonthlyMin] = useState<number | null>(null);
  const [rangeMonthlyMax, setRangeMonthlyMax] = useState<number | null>(null);

  const rangeAnnualMin = rangeMonthlyMin !== null ? rangeMonthlyMin * 12 : null;
  const rangeAnnualMax = rangeMonthlyMax !== null ? rangeMonthlyMax * 12 : null;

  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Observe viewport entry for animated reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { root: null, threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const parseNum = (v: string) => parseFloat(v);

  const computeMonthlySavingsForReduction = (
    numEmployees: number,
    avgSalary: number,
    hoursSpent: number,
    weeklyHours: number,
    weeks: number,
    reductionFraction: number,
  ) => {
    const timeSavedPerEmployeePerWeek = hoursSpent * reductionFraction;
    const totalTimeSavedPerMonth = timeSavedPerEmployeePerWeek * numEmployees * weeks;
    const hourlyRate = avgSalary / (weeklyHours * weeks);
    return totalTimeSavedPerMonth * hourlyRate;
  };

  const calculate = useCallback(() => {
    const numEmployees = clampNumber(parseNum(employees));
    const avgSalary = clampNumber(parseNum(salary));
    const hoursSpent = clampNumber(parseNum(hours));
    const reduction = clampNumber(parseNum(timeReductionPct) / 100, 0, 1);
    const weeklyHours = clampNumber(parseNum(workHoursPerWeek), 1);
    const weeks = clampNumber(parseNum(weeksPerMonth), 1);

    if (
      Number.isNaN(numEmployees) ||
      Number.isNaN(avgSalary) ||
      Number.isNaN(hoursSpent) ||
      Number.isNaN(reduction) ||
      Number.isNaN(weeklyHours) ||
      Number.isNaN(weeks)
    ) {
      setTimeSavings(null);
      setMonthlySavings(null);
      setAnnualSavings(null);
      setFteUnlocked(null);
      setHoursPerEmployeePerMonth(null);
      setDailySavings(null);
      setRangeMonthlyMin(null);
      setRangeMonthlyMax(null);
      return;
    }

    // Core savings
    const timeSavedPerEmployeePerWeek = hoursSpent * reduction;
    const totalTimeSavedPerMonth = timeSavedPerEmployeePerWeek * numEmployees * weeks;
    const hourlyRate = avgSalary / (weeklyHours * weeks);
    const grossMonthlySavings = totalTimeSavedPerMonth * hourlyRate;

    // Extra insights
    const fte = totalTimeSavedPerMonth / (weeklyHours * weeks); // FTE-month equivalent
    const perEmpMonthly = timeSavedPerEmployeePerWeek * weeks;
    const daysPerMonth = weeks * 7;
    const perDay = daysPerMonth > 0 ? grossMonthlySavings / daysPerMonth : 0;

    const basePct = clampNumber(parseNum(timeReductionPct), 0, 100);
    const minPct = clampNumber((basePct - 10) / 100, 0, 1);
    const maxPct = clampNumber((basePct + 10) / 100, 0, 1);
    const rangeMin = computeMonthlySavingsForReduction(
      numEmployees,
      avgSalary,
      hoursSpent,
      weeklyHours,
      weeks,
      minPct,
    );
    const rangeMax = computeMonthlySavingsForReduction(
      numEmployees,
      avgSalary,
      hoursSpent,
      weeklyHours,
      weeks,
      maxPct,
    );

    setTimeSavings(totalTimeSavedPerMonth);
    setMonthlySavings(grossMonthlySavings);
    setAnnualSavings(grossMonthlySavings * 12);
    setFteUnlocked(fte);
    setHoursPerEmployeePerMonth(perEmpMonthly);
    setDailySavings(perDay);
    setRangeMonthlyMin(rangeMin);
    setRangeMonthlyMax(rangeMax);
  }, [employees, salary, hours, timeReductionPct, workHoursPerWeek, weeksPerMonth]);

  // Real-time recalculation when inputs change
  useEffect(() => {
    calculate();
  }, [calculate]);

  const hasResults =
    timeSavings !== null &&
    monthlySavings !== null &&
    annualSavings !== null &&
    fteUnlocked !== null;

  // Animated displays (only when inView)
  const animatedTime = useCountUp(timeSavings, inView, 700);
  const animatedMonthly = useCountUp(monthlySavings, inView, 800);
  const animatedAnnual = useCountUp(annualSavings, inView, 900);
  const animatedFTE = useCountUp(fteUnlocked, inView, 700);
  const animatedHrsPerEmp = useCountUp(hoursPerEmployeePerMonth, inView, 700);
  const animatedDaily = useCountUp(dailySavings, inView, 700);

  const reductionPctNum = clampNumber(parseNum(timeReductionPct), 0, 100);

  // New: Equivalent Employees (FTE) derived from timeSavings and standard monthly hours
  const eqEmployees =
    timeSavings !== null
      ? timeSavings / (parseFloat(workHoursPerWeek) * parseFloat(weeksPerMonth))
      : null;
  const animatedEquivalent = useCountUp(eqEmployees, inView, 800);

  return (
    <section ref={sectionRef} id="roi-calculator" className="container py-20 sm:py-28">
      <Card className="bg-card border border-border/60 shadow-md hover:shadow-lg transition-shadow duration-200 mx-auto w-full max-w-[1200px]">
        <CardHeader className="pb-4">
          <CardTitle>ROI Calculator</CardTitle>
          <CardDescription>Enter company data to compute savings in real time.</CardDescription>
        </CardHeader>

        {/* Desktop: 12-col grid to avoid dead space; Mobile: stacked */}
        <CardContent className="grid gap-6 lg:grid-cols-12">
          {/* Left column: Form (7/12) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employees">Number of Employees</Label>
                <StepperInput
                  id="employees"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  placeholder="e.g., 20"
                  value={employees}
                  onValueChange={setEmployees}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Avg Monthly Salary (₹)</Label>
                <StepperInput
                  id="salary"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={5000}
                  placeholder="e.g., 20000"
                  value={salary}
                  onValueChange={setSalary}
                />
                <p className="text-xs text-muted-foreground">Use +/- to adjust in ₹5,000 steps.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Hours/Week on Manual Tasks</Label>
                <StepperInput
                  id="hours"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  placeholder="e.g., 5"
                  value={hours}
                  onValueChange={setHours}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reduction">Time Reduction (%)</Label>
                <StepperInput
                  id="reduction"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={100}
                  step={1}
                  placeholder="e.g., 30"
                  value={timeReductionPct}
                  onValueChange={setTimeReductionPct}
                />
                <div className="mt-2 h-2 rounded-full bg-emerald-500/20 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500/70 transition-all"
                    style={{ width: `${Math.max(0, Math.min(100, reductionPctNum))}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Reduction visualized: {reductionPctNum.toFixed(0)}%
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workHours">Working Hours/Week</Label>
                <StepperInput
                  id="workHours"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  placeholder="e.g., 48"
                  value={workHoursPerWeek}
                  onValueChange={setWorkHoursPerWeek}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeksPerMonth">Weeks per Month (avg)</Label>
                <StepperInput
                  id="weeksPerMonth"
                  type="number"
                  inputMode="decimal"
                  step={0.01}
                  min={1}
                  placeholder="e.g., 4.33"
                  value={weeksPerMonth}
                  onValueChange={setWeeksPerMonth}
                />
                <p className="text-xs text-muted-foreground">Typical average ≈ 4.33.</p>
              </div>
            </div>
          </div>

          {/* Right column: Key metric (5/12) */}
          <aside
            className="lg:col-span-5 space-y-3"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <Card className="border-emerald-300/40 bg-gradient-to-br from-emerald-600/10 to-emerald-400/10 dark:from-emerald-900/30 dark:to-emerald-800/20 ring-1 ring-inset ring-emerald-400/20 shadow-sm">
              <div className="flex items-center gap-2">
                <span
                  className="
                    inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium
                    bg-emerald-50/90 text-emerald-900
                    border border-emerald-500/50 ring-1 ring-inset ring-emerald-600/20
                    dark:bg-emerald-900/70 dark:text-emerald-50
                    dark:border-emerald-400/40 dark:ring-emerald-400/20
                    "
                >
                  <TrendingUp className="h-3.5 w-3.5 mr-1 text-emerald-700 dark:text-emerald-300" />
                  Potential savings
                </span>
              </div>

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div>
                  <CardTitle>Annual Savings</CardTitle>
                  <CardDescription>12 × monthly</CardDescription>
                </div>
                <IndianRupee className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </CardHeader>
              <CardContent className="pt-0">
                <p
                  className="text-4xl font-extrabold tracking-tight text-emerald-700 dark:text-emerald-400"
                  title={annualSavings !== null ? formatINR(annualSavings, 0) : undefined}
                >
                  {annualSavings !== null ? formatINRCompact(animatedAnnual) : "—"}
                </p>
                <p className="text-muted-foreground">INR / year</p>
                {rangeAnnualMin !== null && rangeAnnualMax !== null && (
                  <p className="mt-2 text-xs text-emerald-800/80 dark:text-emerald-300/80">
                    Scenario band (±10% reduction): {formatINRCompact(rangeAnnualMin)} –{" "}
                    {formatINRCompact(rangeAnnualMax)}
                  </p>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Full-width compact KPI grid to fill space on desktop */}
          {hasResults && (
            <div className="lg:col-span-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-12">
              <Card className="bg-card border border-border/60 shadow-md hover:shadow-lg transition-shadow duration-200 xl:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Monthly Savings</CardTitle>
                    <CardDescription>Gross value of time saved</CardDescription>
                  </div>
                  <IndianRupee className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </CardHeader>
                <CardContent className="pt-0">
                  <p
                    className="text-3xl font-bold text-emerald-700 dark:text-emerald-400"
                    title={monthlySavings !== null ? formatINR(monthlySavings) : undefined}
                  >
                    {monthlySavings !== null ? formatINRCompact(animatedMonthly) : "—"}
                  </p>
                  <p className="text-muted-foreground">INR / month</p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border/60 shadow-md hover:shadow-lg transition-shadow duration-200 xl:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Capacity Unlocked</CardTitle>
                    <CardDescription>FTE-months equivalent</CardDescription>
                  </div>
                  <Gauge className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-3xl font-bold">
                    {fteUnlocked !== null ? animatedFTE.toFixed(2) : "—"}
                  </p>
                  <p className="text-muted-foreground">FTE-mo</p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border/60 shadow-md hover:shadow-lg transition-shadow duration-200 xl:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Time Savings</CardTitle>
                    <CardDescription>Total across all employees</CardDescription>
                  </div>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-0">
                  <p
                    className="text-3xl font-bold"
                    title={timeSavings !== null ? `${timeSavings.toLocaleString("en-IN")} hours` : undefined}
                  >
                    {timeSavings !== null ? formatNumberCompact(animatedTime) : "—"}
                  </p>
                  <p className="text-muted-foreground">Hours / month</p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border/60 shadow-md hover:shadow-lg transition-shadow duration-200 xl:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Per-Employee</CardTitle>
                    <CardDescription>Hours saved monthly</CardDescription>
                  </div>
                  <Sparkles className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-3xl font-bold">
                    {hoursPerEmployeePerMonth !== null ? animatedHrsPerEmp.toFixed(1) : "—"}
                  </p>
                  <p className="text-muted-foreground">Hours / employee</p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border/60 shadow-md hover:shadow-lg transition-shadow duration-200 sm:col-span-2 xl:col-span-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Daily Savings (approx.)</CardTitle>
                    <CardDescription>Average per calendar day</CardDescription>
                  </div>
                  <IndianRupee className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </CardHeader>
                <CardContent className="pt-0">
                  <p
                    className="text-2xl font-bold text-emerald-700 dark:text-emerald-400"
                    title={dailySavings !== null ? formatINR(dailySavings) : undefined}
                  >
                    {dailySavings !== null ? formatINRCompact(animatedDaily) : "—"}
                  </p>
                </CardContent>
              </Card>

              {/* New: Equivalent Employees (FTE) */}
              <Card className="bg-card border border-border/60 shadow-md hover:shadow-lg transition-shadow duration-200 sm:col-span-2 xl:col-span-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Equivalent Employees (FTE)</CardTitle>
                    <CardDescription>People‑equivalent capacity unlocked</CardDescription>
                  </div>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-2xl font-bold">
                    {eqEmployees !== null ? animatedEquivalent.toFixed(2) : "—"}
                  </p>
                  <p className="text-muted-foreground">FTE (monthly basis)</p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
