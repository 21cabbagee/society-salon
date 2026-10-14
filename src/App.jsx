import React, { useState, useId } from 'react';
import { 
  Scissors, 
  Sparkles, 
  Building2, 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Star, 
  MapPin, 
  Car, 
  TrendingUp,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ParticlesCanvas from './components/ParticlesCanvas';
import OutcomeChart from './components/OutcomeChart';

const TOWERS = [
  { id: 'lumina', name: 'The Lumina Towers (Tower A & B)', units: 656, clusterDay: 'Every Tuesday & Thursday', bookedToday: 7, address: '201 Folsom St, SF' },
  { id: 'rincon', name: 'One Rincon Hill Residences', units: 376, clusterDay: 'Every Wednesday', bookedToday: 5, address: '425 1st St, SF' },
  { id: 'infinity', name: 'The Infinity Towers', units: 650, clusterDay: 'Every Friday & Saturday', bookedToday: 9, address: '300 Spear St, SF' },
  { id: 'millennium', name: 'Millennium Tower Penthouse Collection', units: 419, clusterDay: 'Every Monday', bookedToday: 4, address: '301 Mission St, SF' }
];

const SERVICES = [
  { id: 'blowout', title: 'Penthouse Blowout & Keratin Glaze', duration: '45 mins', retailPrice: 120, collectivePrice: 85, desc: 'Luxury hair wash, organic botanical mask, and precision red-carpet blowout.' },
  { id: 'mastercut', title: 'Master Precision Cut & Scalp Detox', duration: '50 mins', retailPrice: 110, collectivePrice: 75, desc: 'Tailored dry/wet cut with invigorating rosemary mint scalp detox therapy.' },
  { id: 'barber', title: 'Executive Beard Sculpt & Hot Towel Facial', duration: '40 mins', retailPrice: 80, collectivePrice: 55, desc: 'Straight-razor line work, ozone steam, aromatic sandalwood hot towels.' },
  { id: 'nails', title: 'Waterless Botanical Gel Manicure & Pedi', duration: '60 mins', retailPrice: 135, collectivePrice: 95, desc: 'Medical-grade zero-downtime nail grooming with non-toxic cruelty-free polish.' }
];

export default function App() {
  const selectedTowerId = useId();
  const unitNumberId = useId();
  const residentNameId = useId();
  const selectedServiceId = useId();
  const timeSlotId = useId();

  // Selected Tower
  const [selectedTower, setSelectedTower] = useState(TOWERS[0]);
  const [bookingCart, setBookingCart] = useState({
    unit: 'Penthouse 34B',
    resident: 'Claire Kensington',
    service: SERVICES[0],
    time: '14:00'
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // CAB Modal
  const [isCabModalOpen, setIsCabModalOpen] = useState(false);
  const [cabSubmitted, setCabSubmitted] = useState(false);
  const [cabForm, setCabForm] = useState({
    towerName: '',
    boardMemberName: '',
    email: '',
    unitCount: '250-500 Units'
  });

  const discountTier = selectedTower.bookedToday >= 8 ? 25 : (selectedTower.bookedToday >= 5 ? 20 : 15);

  const handleBook = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCabSubmit = (e) => {
    e.preventDefault();
    setCabSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Banner: CAB Announcement */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 border-b border-amber-500/30 px-4 py-2.5 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-amber-200">Customer Advisory Board (CAB) For Luxury HOAs:</span>
            <span className="text-slate-300">Join 10 high-rise residential boards launching SocietySalon with zero amenity setup fee ($99/mo value).</span>
          </div>
          <button 
            onClick={() => setIsCabModalOpen(true)}
            className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-full transition-all shadow-sm hover:scale-105"
          >
            Claim HOA Board Spot →
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl">
              ✂️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">SocietySalon</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">Tower Collective</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">Hyper-Local High-Rise Grooming Collective</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#cluster-schedule" className="hover:text-amber-300 transition-colors">Tower Booking</a>
            <a href="#services" className="hover:text-amber-300 transition-colors">Atelier Menu</a>
            <a href="#density-math" className="hover:text-amber-300 transition-colors">Density Economics</a>
            <a href="#pricing" className="hover:text-amber-300 transition-colors">HOA Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCabModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md shadow-amber-400/20 flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Join CAB</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <ParticlesCanvas color="244, 114, 182" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(244,114,182,0.12),transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-pink-500/30 text-xs text-pink-300 font-mono shadow-lg shadow-pink-950/40">
            <Building2 className="w-4 h-4 text-pink-400" />
            <span>Zero Commute Overhead • Master Atelier Stylists Clustered by Tower • 45% Resident Savings</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Hyper-Local Apartment Tower <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">Salon & Grooming Collective</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Master hair stylists lose 40% of their billable week sitting in city traffic. SocietySalon batches appointments by residential high-rise. Top-tier stylists spend all of Tuesday in your tower, delivering 5-star cuts and blowouts right to your door with zero salon markups.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="#cluster-schedule" 
              className="px-6 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-pink-500/30 flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>Book Tower Resident Slot</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#density-math" 
              className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-pink-500/30 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 hover:border-pink-400/60"
            >
              <TrendingUp className="w-4 h-4 text-pink-400" />
              <span>View Stylist Density Arbitrage</span>
            </a>
          </div>

          {/* Market TAM & Density Metrics */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-slate-900/80 border border-pink-500/20 rounded-xl p-4 backdrop-blur-md">
              <div className="text-2xl font-black text-pink-400">$625M</div>
              <div className="text-xs text-slate-400 font-medium">Residential Tower Salon TAM</div>
            </div>
            <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              <div className="text-2xl font-black text-white">2,500</div>
              <div className="text-xs text-slate-400 font-medium">Target Luxury Towers</div>
            </div>
            <div className="bg-slate-900/80 border border-pink-500/20 rounded-xl p-4 backdrop-blur-md">
              <div className="text-2xl font-black text-pink-400">0 Mins</div>
              <div className="text-xs text-slate-400 font-medium">Resident Travel Time</div>
            </div>
            <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              <div className="text-2xl font-black text-white">45%</div>
              <div className="text-xs text-slate-400 font-medium">Collective Density Discount</div>
            </div>
          </div>
        </div>
      </section>

      {/* Julien Bek $1:$6 Sequoia Framework + Bklit UI Outcome Engine */}
      <section className="px-4 sm:px-6 lg:px-8">
        <OutcomeChart onCtaClick={() => setIsCabModalOpen(true)} />
      </section>

      {/* Feature 1: Cluster Booking Engine */}
      <section id="cluster-schedule" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Elevator-Only Logistics</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Tower Cluster Booking Schedule
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {TOWERS.map((tower) => (
                <button
                  key={tower.id}
                  onClick={() => setSelectedTower(tower)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedTower.id === tower.id
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {tower.name.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Booking Form */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedTower.name}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{selectedTower.address} ({selectedTower.units} Private Residences)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Assigned Tower Days:</span>
                  <span className="text-xs font-bold text-amber-300">{selectedTower.clusterDay}</span>
                </div>
              </div>

              {/* Group Discount Progress Bar */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Tower Collective Volume:</span>
                  <span className="text-amber-400 font-bold">{selectedTower.bookedToday} Residents Booked Today ({discountTier}% Off)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-400 to-rose-500 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (selectedTower.bookedToday / 10) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1 Booked (10% off)</span>
                  <span>5 Booked (20% off)</span>
                  <span className="text-emerald-400 font-bold">10+ Booked (Max 25% off)</span>
                </div>
              </div>

              <form onSubmit={handleBook} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={residentNameId} className="block text-xs font-semibold text-slate-300 mb-1">
                      Resident Full Name
                    </label>
                    <input 
                      id={residentNameId}
                      type="text" 
                      value={bookingCart.resident}
                      onChange={(e) => setBookingCart({ ...bookingCart, resident: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={unitNumberId} className="block text-xs font-semibold text-slate-300 mb-1">
                      Apartment / Penthouse Unit #
                    </label>
                    <input 
                      id={unitNumberId}
                      type="text" 
                      value={bookingCart.unit}
                      onChange={(e) => setBookingCart({ ...bookingCart, unit: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={selectedServiceId} className="block text-xs font-semibold text-slate-300 mb-1">
                      Desired Atelier Service
                    </label>
                    <select 
                      id={selectedServiceId}
                      value={bookingCart.service.id}
                      onChange={(e) => {
                        const s = SERVICES.find(x => x.id === e.target.value);
                        if (s) setBookingCart({ ...bookingCart, service: s });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      {SERVICES.map((serv) => (
                        <option key={serv.id} value={serv.id}>
                          {serv.title} (${serv.collectivePrice})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={timeSlotId} className="block text-xs font-semibold text-slate-300 mb-1">
                      Preferred Time Slot (Tower Day)
                    </label>
                    <select 
                      id={timeSlotId}
                      value={bookingCart.time}
                      onChange={(e) => setBookingCart({ ...bookingCart, time: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="10:00">10:00 AM (Morning Slot)</option>
                      <option value="12:00">12:00 PM (Lunch Refresh)</option>
                      <option value="14:00">02:00 PM (Afternoon Glow)</option>
                      <option value="16:00">04:00 PM (Pre-Dinner Styling)</option>
                      <option value="18:00">06:00 PM (Evening Atelier)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 mt-2"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Confirm Collective Reservation (${bookingCart.service.collectivePrice})</span>
                </button>
              </form>
            </div>

            {/* Right: Confirmation or Summary Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-400/30 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Atelier Confirmation</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  Zero Travel Surcharge
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-sm font-bold text-white">{bookingCart.service.title}</div>
                  <p className="text-xs text-slate-400">{bookingCart.service.desc}</p>
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-400">Traditional Salon Price:</span>
                    <span className="line-through text-slate-500">${bookingCart.service.retailPrice}.00</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs font-bold">
                    <span className="text-amber-400">Tower Collective Price:</span>
                    <span className="text-xl text-white">${bookingCart.service.collectivePrice}.00</span>
                  </div>
                </div>

                <div className="text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Resident:</span>
                    <span className="font-medium text-white">{bookingCart.resident} ({bookingCart.unit})</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Building:</span>
                    <span className="font-medium text-white">{selectedTower.name.split(' (')[0]}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Scheduled Arrival:</span>
                    <span className="font-medium text-amber-300">{selectedTower.clusterDay.split(' ')[1]} at {bookingCart.time}</span>
                  </div>
                </div>

                {bookingConfirmed && (
                  <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-3.5 text-xs text-emerald-300 text-center animate-fadeIn">
                    ✓ Stylist arrival confirmed for {bookingCart.unit}. Your building concierge will grant keycard elevator access.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Stylist Density Arbitrage Economics */}
      <section id="density-math" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Unit Economics</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              The Stylist Density Arbitrage
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Why high-end stylists gladly give 25% discounts when all appointments are inside a single residential elevator bank.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Commuter */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Car className="w-5 h-5" />
                <span>Traditional House-Call Stylist (Traffic Hell)</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Daily appointments:</span>
                  <span className="font-bold text-white">3 to 4 clients</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Hours spent driving & parking:</span>
                  <span className="font-bold text-rose-400">3.5 hours unpaid</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Fuel, parking & toll overhead:</span>
                  <span className="font-bold text-rose-400">-$45/day</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-bold">
                  <span>Net Stylist Daily Take-Home:</span>
                  <span className="text-rose-400">$320.00</span>
                </div>
              </div>
            </div>

            {/* SocietySalon Model */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400/50 rounded-2xl p-6 space-y-4 shadow-lg shadow-amber-400/10">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>SocietySalon Tower Density (Elevator Only)</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Daily appointments:</span>
                  <span className="font-bold text-white">8 to 9 clients (Back-to-back)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Hours spent driving:</span>
                  <span className="font-bold text-emerald-400">0 minutes (Park once in garage)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Travel overhead:</span>
                  <span className="font-bold text-emerald-400">$0/day</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-bold">
                  <span>Net Stylist Daily Take-Home:</span>
                  <span className="text-emerald-400">$740.00 (+131% increase)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">HOA & Community Tiers</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Elevate Your Building's Resident Amenities
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Transform unused clubhouse space or residents' apartments into luxury private salons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Resident Tier */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-base font-bold text-white">Resident Collective</div>
                <div className="text-xs text-slate-400 mt-1">For single apartment owners & tenants</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">$0</span>
                  <span className="text-xs text-slate-400">subscription (Pay per service)</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Access to dedicated weekly tower days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>25% collective volume discount</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Vetted master atelier stylists</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Join Building Waitlist
              </button>
            </div>

            {/* HOA Amenity Tier (Highlighted) */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400/50 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl shadow-amber-400/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-full">
                Most Popular
              </div>
              <div>
                <div className="text-base font-bold text-white">Tower Amenity Suite</div>
                <div className="text-xs text-slate-400 mt-1">For luxury HOA boards & property managers</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-amber-400">$199</span>
                  <span className="text-xs text-slate-400">/month per building</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Dedicated weekly clubhouse salon chair kit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Guaranteed premier stylist priority booking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Custom resident app branding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Concierge check-in keycard integration</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-400/20"
              >
                Join CAB for HOA Board ($0 Setup)
              </button>
            </div>

            {/* Portfolio Enterprise */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-base font-bold text-white">Portfolio Asset Management</div>
                <div className="text-xs text-slate-400 mt-1">For Greystar, Related & Avalon communities</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">$599</span>
                  <span className="text-xs text-slate-400">/month (10+ towers)</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Portfolio-wide stylist fleet dispatch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>HOA amenity revenue-share option</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Dedicated community event coordinator</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Contact Portfolio Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">SocietySalon</span>
            <span>• Hyper-Local Apartment Tower Salon & Grooming Collective</span>
          </div>
          <div>
            Density arbitrage eliminating traffic for stylists and residents alike.
          </div>
        </div>
      </footer>

      {/* CAB 10-Member Modal */}
      {isCabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-amber-400/40 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setIsCabModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {!cabSubmitted ? (
              <form onSubmit={handleCabSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Award className="w-5 h-5" />
                  <span>SocietySalon Customer Advisory Board (CAB)</span>
                </div>
                <h3 className="text-xl font-black text-white">Join 10 Founding Residential Towers</h3>
                <p className="text-xs text-slate-400">
                  Pilot SocietySalon in your residential community with zero setup fees and exclusive priority concierge access for your residents.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label htmlFor="tower-community" className="block text-xs font-semibold text-slate-300 mb-1">Tower / Community Name</label>
                    <input 
                      id="tower-community"
                      type="text" 
                      placeholder="e.g. Lumina Tower B"
                      value={cabForm.towerName}
                      onChange={(e) => setCabForm({ ...cabForm, towerName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="board-rep" className="block text-xs font-semibold text-slate-300 mb-1">Board / Property Manager Name</label>
                    <input 
                      id="board-rep"
                      type="text" 
                      placeholder="e.g. Victoria Chase"
                      value={cabForm.boardMemberName}
                      onChange={(e) => setCabForm({ ...cabForm, boardMemberName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="work-email" className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
                    <input 
                      id="work-email"
                      type="email" 
                      placeholder="victoria@luminahoa.org"
                      value={cabForm.email}
                      onChange={(e) => setCabForm({ ...cabForm, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-400/25"
                >
                  Reserve CAB Spot for Community
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-black text-white">Community Pilot Confirmed</h3>
                <p className="text-xs text-slate-300">
                  Welcome to SocietySalon, <strong className="text-white">{cabForm.boardMemberName}</strong>. We will coordinate concierge setup for <span className="text-amber-400">{cabForm.towerName}</span>.
                </p>
                <button 
                  onClick={() => { setIsCabModalOpen(false); setCabSubmitted(false); }}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  Return to Atelier
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
