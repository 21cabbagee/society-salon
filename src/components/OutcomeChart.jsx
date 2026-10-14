import React, { useState } from 'react';
import { TrendingUp, Scissors, Building2, Sparkles, DollarSign, Clock, Users, ShieldCheck } from 'lucide-react';

/**
 * OutcomeChart for SocietySalon (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares $165 salon booth rents + $50 travel fees ($6 legacy services layer)
 * with High-Rise Collective Routing Autopilot ($1 software layer).
 */
export default function OutcomeChart({
  serviceName = "High-Rise Tower Collective Grooming Engine",
  defaultMonthlyAppointments = 24, // tower appointments per month
  onCtaClick
}) {
  const [appointments, setAppointments] = useState(defaultMonthlyAppointments);

  // Legacy retail salon & individual mobile travel:
  // Retail salon markups + parking + $50 travel surcharges + receptionist fees = ~$165/appointment
  const legacyServicesCost = appointments * 165;
  // SocietySalon collective batching: $85 per resident appointment
  const collectiveCost = appointments * 85;
  const netResidentSavings = legacyServicesCost - collectiveCost;
  const savingsPercent = Math.round(((legacyServicesCost - collectiveCost) / legacyServicesCost) * 100);

  const maxCost = Math.max(legacyServicesCost, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((collectiveCost / maxCost) * 100), 12);

  return (
    <div className="relative rounded-2xl border border-pink-500/30 bg-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-900 border-pink-500/40 text-pink-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs Salon Real Estate Overhead ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            High-Rise Collective Economics: <span className="text-pink-400">{savingsPercent}% Travel & Rent Slashed</span>
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Retail salons waste 45% of customer spend on commercial leases, receptionists, and empty chairs. SocietySalon routes vetted master stylists into your high-rise amenity suite on dedicated cluster days.
          </p>
        </div>

        <div className="text-right bg-slate-900/80 border border-pink-500/30 rounded-xl p-3 px-4 min-w-[200px]">
          <span className="text-[11px] text-slate-400 block font-medium">Monthly Building Value Saved</span>
          <span className="text-2xl md:text-3xl font-black text-pink-400">
            ${netResidentSavings.toLocaleString()}
          </span>
          <span className="text-[10px] text-pink-300/80 flex items-center justify-end gap-1 font-semibold font-mono">
            <TrendingUp className="w-3 h-3" /> Zero Transit Friction
          </span>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="py-6 border-b border-white/10">
        <div className="flex items-center justify-between text-sm mb-3">
          <label className="text-slate-300 font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-pink-400" />
            Monthly Resident Salon Bookings in Tower:
          </label>
          <span className="text-base font-bold text-white bg-slate-900 px-3 py-1 rounded-lg border border-pink-500/30 font-mono">
            {appointments} Bookings / mo (${(legacyServicesCost * 12).toLocaleString()}/yr Retail Spend)
          </span>
        </div>
        <input 
          type="range" 
          min={6} 
          max={100} 
          step={6}
          value={appointments}
          onChange={(e) => setAppointments(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-400"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
          <span>6 Appointments (1 Cluster Day)</span>
          <span>24 Appointments (Weekly Cluster Schedule)</span>
          <span>100+ Appointments (Multi-Tower Luxury Portfolio)</span>
        </div>
      </div>

      {/* Bklit UI Visual Comparison Chart & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* SVG Visual Bars */}
        <div className="md:col-span-5 bg-slate-900 rounded-xl p-5 border border-white/10">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between font-mono">
            <span>Spend Efficiency Comparison</span>
            <span className="text-[10px] text-slate-500">Live Yield Calculator</span>
          </div>

          <div className="space-y-4">
            {/* Legacy Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Retail Salons & Uber Travel ($6 Layer)
                </span>
                <span className="font-mono font-bold text-rose-300">${legacyServicesCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-950 rounded-lg overflow-hidden border border-rose-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 to-pink-600 transition-all duration-300 rounded-lg"
                  style={{ width: `${legacyBarHeight}%` }}
                />
              </div>
            </div>

            {/* Autonomous Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-pink-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                  SocietySalon Cluster Autopilot ($1 Layer)
                </span>
                <span className="font-mono font-bold text-pink-300">${collectiveCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-950 rounded-lg overflow-hidden border border-pink-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 rounded-lg shadow-lg shadow-pink-500/30"
                  style={{ width: `${autoBarHeight}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Annual Net Resident Savings:</span>
            <span className="text-sm font-bold text-pink-400">+${(netResidentSavings * 12).toLocaleString()}</span>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Elevator-Distance Amenity Suite Service</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Residents take an elevator downstairs to their building's private wellness lounge or receive in-unit service. Zero traffic, zero parking hassle.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Eliminates 3 Hours of Daily Stylist Transit</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Stylists arrive once, unpack once, and serve 6 clients in sequence. Guaranteed full day of income with 100% attendance and zero no-shows.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Vetted Top 5% Master Artisans</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Only background-checked, insured master stylists with 5+ years luxury salon tenure. Curated organic and hypoallergenic product lines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
