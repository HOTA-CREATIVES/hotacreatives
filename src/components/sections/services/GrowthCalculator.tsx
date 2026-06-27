import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function GrowthCalculator() {
  const [budget, setBudget] = useState(100000); // 1L default
  const [dealValue, setDealValue] = useState(25000); // 25k default
  const [currentConversions, setCurrentConversions] = useState(10); // 10 conversions per month

  // HOTA average conversion increase is 2.5x
  const hotaMultiplier = 2.5;
  const projectConversions = Math.round(currentConversions * hotaMultiplier);
  const additionalConversions = projectConversions - currentConversions;

  const currentRevenue = currentConversions * dealValue;
  const projectedRevenue = projectConversions * dealValue;
  const revenueLift = projectedRevenue - currentRevenue;

  // Format currency in Indian Rupees style
  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="relative overflow-hidden py-20 bg-bg-primary">
      {/* Background glow effects */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-accent/3 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Growth Simulator
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Simulate your
            <span className="text-accent"> brand potential</span>
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            See how applying HOTA's creative velocity and conversion systems can optimize your current marketing performance and scale your pipeline.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-stretch mt-12">
          {/* Inputs Section */}
          <div className="lg:col-span-6 rounded-[2rem] border border-white/5 bg-black/40 p-8 flex flex-col justify-between">
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <i className="fa-solid fa-sliders text-accent"></i>
                Your Brand Metrics
              </h3>

              {/* Slider 1: Monthly Marketing Budget */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary font-medium">Monthly Marketing Budget</span>
                  <span className="text-accent font-bold font-mono">{formatINR(budget)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1500000"
                  step="50000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[10px] text-text-muted">
                  <span>₹50,000</span>
                  <span>₹15,00,000+</span>
                </div>
              </div>

              {/* Slider 2: Average Order Value / Client LTV */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary font-medium">Average Deal / Customer Value</span>
                  <span className="text-accent font-bold font-mono">{formatINR(dealValue)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={dealValue}
                  onChange={(e) => setDealValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[10px] text-text-muted">
                  <span>₹5,000</span>
                  <span>₹5,00,000+</span>
                </div>
              </div>

              {/* Slider 3: Current Monthly Conversions / Deals */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary font-medium">Current Monthly Conversions</span>
                  <span className="text-accent font-bold font-mono">{currentConversions} orders / leads</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={currentConversions}
                  onChange={(e) => setCurrentConversions(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[10px] text-text-muted">
                  <span>2 deals</span>
                  <span>100+ deals</span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-xs text-text-muted leading-relaxed">
              * Calculations are estimates based on HOTA’s historical average campaign optimization lift of 2.5× across luxury event, interior design, and e-commerce segments.
            </p>
          </div>

          {/* Results Showcase Section */}
          <div className="lg:col-span-6 rounded-[2rem] border border-accent/20 bg-accent/5 p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Top design highlight */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-transparent via-accent to-transparent" />
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />

            <div className="space-y-8 relative z-10">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <i className="fa-solid fa-chart-line-up text-accent"></i>
                Projected HOTA Outcomes
              </h3>

              {/* Metric Row 1: Revenue Lift */}
              <div className="rounded-2xl border border-white/5 bg-black/60 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-text-muted">Additional Monthly Revenue</span>
                  <motion.div
                    key={revenueLift}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-black text-accent mt-1 font-mono"
                  >
                    + {formatINR(revenueLift)}
                  </motion.div>
                </div>
                <div className="text-xs text-text-secondary sm:text-right">
                  Projected: <span className="text-white font-bold font-mono">{formatINR(projectedRevenue)}</span>/mo
                  <br />
                  Current: <span className="text-text-muted font-mono">{formatINR(currentRevenue)}</span>/mo
                </div>
              </div>

              {/* Grid for other outputs */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Metric 2: Additional Conversions */}
                <div className="rounded-2xl border border-white/5 bg-black/60 p-5">
                  <span className="text-xs uppercase tracking-wider text-text-muted">Additional Deals</span>
                  <motion.div
                    key={additionalConversions}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl font-black text-white mt-1 font-mono"
                  >
                    +{additionalConversions} / month
                  </motion.div>
                  <p className="text-[11px] text-text-secondary mt-1">
                    Up from {currentConversions} to {projectConversions}
                  </p>
                </div>

                {/* Metric 3: Conversion Lift Multiplier */}
                <div className="rounded-2xl border border-white/5 bg-black/60 p-5">
                  <span className="text-xs uppercase tracking-wider text-text-muted">Conversion Growth</span>
                  <div className="text-2xl font-black text-accent mt-1 font-mono">
                    +{hotaMultiplier * 100 - 100}%
                  </div>
                  <p className="text-[11px] text-text-secondary mt-1">
                    Optimized conversion velocity
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div className="text-sm text-text-secondary text-center sm:text-left">
                Want to see the actual math for your brand?
              </div>
              <Button
                asChild
                className="w-full sm:w-auto rounded-full bg-accent text-black font-bold hover:bg-accent-hover hover:scale-105 transition-transform"
              >
                <Link to="/free-audit" className="inline-flex items-center gap-2">
                  Request Free Brand Audit
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
