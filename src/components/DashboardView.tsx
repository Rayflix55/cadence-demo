import { useState, useMemo } from "react";
import { useStore } from "../store";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  TrendingUp, 
  Download, 
  Calendar, 
  Mail, 
  MessageSquare, 
  CalendarDays, 
  DollarSign, 
  Sparkles,
  Filter
} from "lucide-react";

export default function DashboardView() {
  const { campaigns, userProfile, brandToneInfo } = useStore();
  const [dateRange, setDateRange] = useState("30"); // 7, 30, 90
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Active" | "Draft">("All");

  // Simulated trend data based on dateRange selection
  const chartData = useMemo(() => {
    const generator = {
      "7": [
        { name: "Mon", openRate: 48, clickRate: 11, volume: 120 },
        { name: "Tue", openRate: 52, clickRate: 14, volume: 150 },
        { name: "Wed", openRate: 56, clickRate: 15, volume: 190 },
        { name: "Thu", openRate: 51, clickRate: 12, volume: 140 },
        { name: "Fri", openRate: 58, clickRate: 18, volume: 210 },
        { name: "Sat", openRate: 44, clickRate: 9, volume: 80 },
        { name: "Sun", openRate: 49, clickRate: 13, volume: 110 },
      ],
      "30": [
        { name: "Week 1", openRate: 42, clickRate: 10, volume: 450 },
        { name: "Week 2", openRate: 49, clickRate: 14, volume: 520 },
        { name: "Week 3", openRate: 55, clickRate: 18, volume: 610 },
        { name: "Week 4", openRate: 58, clickRate: 21, volume: 690 },
      ],
      "90": [
        { name: "Month 1", openRate: 38, clickRate: 9, volume: 1800 },
        { name: "Month 2", openRate: 47, clickRate: 15, volume: 2200 },
        { name: "Month 3", openRate: 56, clickRate: 20, volume: 2700 },
      ],
    };
    return generator[dateRange as "7" | "30" | "90"] || generator["30"];
  }, [dateRange]);

  // Dynamic KPI summaries depending on date range
  const totals = useMemo(() => {
    const multiplier = dateRange === "7" ? 0.25 : dateRange === "90" ? 2.5 : 1.0;
    
    const activeCamps = campaigns.filter(c => selectedStatus === "All" || c.status === selectedStatus);
    const sent = Math.round(activeCamps.reduce((acc, c) => acc + c.emailsSent, 0) * multiplier);
    const replies = Math.round(activeCamps.reduce((acc, c) => acc + c.repliesReceived, 0) * multiplier);
    const meetings = Math.round(activeCamps.reduce((acc, c) => acc + c.meetingsScheduled, 0) * multiplier);
    const pipeline = Math.round(activeCamps.reduce((acc, c) => acc + c.estimatedPipelineValue, 0) * multiplier);
    
    // Average rates
    const avgOpen = activeCamps.length 
      ? Math.round(activeCamps.reduce((acc, c) => acc + c.openRate, 0) / activeCamps.length)
      : 0;
    const avgClick = activeCamps.length
      ? Math.round(activeCamps.reduce((acc, c) => acc + c.clickRate, 0) / activeCamps.length)
      : 0;

    return { sent, replies, meetings, pipeline, avgOpen, avgClick };
  }, [campaigns, dateRange, selectedStatus]);

  // Simulated variant tables
  const topVariants = [
    {
      variantName: "A/B - LinkedIn Activity Hook",
      subject: "Quick question about {{Prospect Company}}'s scaling plans",
      openRate: 64.2,
      clickRate: 21.8,
      replyRate: 9.2,
      winner: true,
      tone: "Direct & Consultative"
    },
    {
      variantName: "A/B - Core Pain Focus",
      subject: "Outbound efficiency at {{Prospect Company}}",
      openRate: 51.5,
      clickRate: 15.3,
      replyRate: 6.4,
      winner: false,
      tone: "Professional & Empirical"
    },
    {
      variantName: "A/B - Mutual Connection Hook",
      subject: "Idea for {{Prospect Company}}'s sales pipeline",
      openRate: 38.0,
      clickRate: 8.5,
      replyRate: 2.1,
      winner: false,
      tone: "Friendly"
    }
  ];

  const handleExportCSV = () => {
    const headers = "Campaign Name,Status,Emails Sent,Open Rate %,Click Rate %,Replies,Meetings,Pipeline ($)\n";
    const rows = campaigns.map(c => 
      `"${c.name}","${c.status}",${c.emailsSent},${c.openRate},${c.clickRate},${c.repliesReceived},${c.meetingsScheduled},${c.estimatedPipelineValue}`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Cadence-Campaign-Analytics-${dateRange}d.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 max-w-7xl mx-auto font-sans focus-mode-trigger" id="dashboard-view-container">
      
      {/* High-Fidelity Modern Strategy Section inspired directly by tablet mockup */}
      <div className="bg-white dark:bg-[#11121a] text-black dark:text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[#e5e7eb] dark:border-cadence-slate-800 shadow-xl transition-all duration-300">
        
        {/* Absolute Circles Collage on Center-Right from Mockup */}
        <div className="absolute right-6 top-6 bottom-6 w-1/2 hidden lg:block overflow-hidden pointer-events-none select-none">
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Concentric Grey dashed circle boundary */}
            <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-gray-300/30 dark:border-gray-750/20 animate-spin-slow" />
            <div className="absolute w-[240px] h-[240px] rounded-full border border-gray-150 dark:border-gray-850" />
            
            {/* Overlapping Mint/Green aesthetic circle - left accent */}
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[#FF6B35]/15 dark:bg-[#FF6B35]/10 mix-blend-multiply opacity-80 left-[15%] top-[12%]" />
            
            {/* Overlapping Grey Striped Circle - Center background */}
            <div className="absolute w-[210px] h-[210px] rounded-full overflow-hidden border border-gray-200/50 dark:border-cadence-slate-750/35 right-[20%] top-[15%] opacity-60">
              <svg className="w-full h-full opacity-15 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="diagonal-stripe" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#1f2937" strokeWidth="2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagonal-stripe)" />
              </svg>
            </div>

            {/* Overlapping Solid Mint Green Circle - Core center foreground */}
            <div className="absolute w-[140px] h-[140px] rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#FFB84D] shadow-xl right-[22%] bottom-[12%] animate-pulse opacity-90 flex items-center justify-center">
              <div className="w-[110px] h-[110px] rounded-full border-2 border-white/40 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white filter drop-shadow-sm" />
              </div>
            </div>

            {/* Floating Top Locations Card from Mockup Top Right */}
            <div className="absolute top-4 right-10 w-48 bg-white dark:bg-[#1d1f2b] p-3.5 rounded-xl shadow-lg border border-[#e5e7eb] dark:border-cadence-slate-800 pointer-events-auto select-text animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Top Locations</span>
                <span className="text-xs text-[#FF6B35] font-bold">▲</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-semibold text-cadence-slate-800 dark:text-gray-200">
                  <span>Newtonbrook</span>
                  <span className="font-bold text-black dark:text-white">47%</span>
                </div>
                <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF6B35]" style={{ width: "47%" }} />
                </div>
                
                <div className="flex justify-between items-center text-[11px] font-semibold text-cadence-slate-800 dark:text-gray-200 pt-0.5">
                  <span>HenryFarm</span>
                  <span className="font-bold text-black dark:text-white">20%</span>
                </div>
                <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF6B35]" style={{ width: "20%" }} />
                </div>
                
                <div className="flex justify-between items-center text-[11px] font-semibold text-cadence-slate-800 dark:text-gray-200 pt-0.5">
                  <span>El Paso</span>
                  <span className="font-bold text-black dark:text-white">7%</span>
                </div>
                <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF6B35]" style={{ width: "7%" }} />
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Content Side of top banner layout */}
        <div className="relative z-10 max-w-xl space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary bg-[#FFF2EB] dark:bg-[#FF6B35]/15 px-3 py-1 rounded-full w-fit block font-mono">
              ★ AI Predictive System Active
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-black dark:text-white leading-tight">
              AI PREDICTIVE STRATEGY
            </h1>
            <p className="text-sm text-cadence-slate-550 dark:text-cadence-slate-400 leading-relaxed max-w-md">
              Al tracks and analyzes the performance of your marketing campaign, providing key insights into its reach. Optimized under your consultative corporate brand archetype.
            </p>
          </div>

          {/* Nike style brand tag selector block from mockup template */}
          <div className="flex items-center space-x-2 bg-white dark:bg-[#1d1f2b] border border-[#e5e7eb] dark:border-cadence-slate-800 px-4 py-2 rounded-full w-fit shadow-xs">
            {/* Nike check symbol or branding circle */}
            <div className="w-5 h-5 rounded-full bg-black dark:bg-[#FF6B35] flex items-center justify-center font-bold text-white text-[10px] select-none">
              ✓
            </div>
            <span className="text-xs font-extrabold text-black dark:text-white">
              {userProfile.companyName || "Nike, Inc"}
            </span>
          </div>

          {/* Symmetrical scoreboard aligned beneath the strategy text */}
          <div className="grid grid-cols-3 gap-6 pt-2 border-t border-gray-100 dark:border-cadence-slate-850 max-w-sm">
            <div>
              <strong className="text-2xl sm:text-3xl font-display font-extrabold text-[#111] dark:text-white block tracking-tight">
                50,784
              </strong>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mt-1">Uniques</span>
            </div>
            <div>
              <strong className="text-2xl sm:text-3xl font-display font-extrabold text-[#111] dark:text-white block tracking-tight">
                345
              </strong>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mt-1">Clicks</span>
            </div>
            <div>
              <strong className="text-2xl sm:text-3xl font-display font-extrabold text-[#111] dark:text-white block tracking-tight">
                101,785
              </strong>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mt-1">Impressions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row of Functional Filter Pills (Exactly mirroring the tags in mockup) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#11121a] p-4 rounded-2xl border border-[#e5e7eb] dark:border-cadence-slate-850">
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter icon and tag labels */}
          <div className="flex items-center space-x-1 p-1 bg-gray-50 dark:bg-[#1b1c26] rounded-lg border border-gray-100 dark:border-cadence-slate-800 mr-2">
            <Filter className="w-3.5 h-3.5 text-gray-550 dark:text-gray-300" />
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">Campaign Filter</span>
          </div>
          
          <button 
            className="flex items-center space-x-1.5 bg-[#f3f4f6] hover:bg-gray-200 dark:bg-[#1b1c26] text-[11px] font-semibold px-3 py-1.5 rounded-full text-black dark:text-white transition-colors"
          >
            <span>Last Month</span>
            <span className="text-[10px] text-gray-400">✕</span>
          </button>
          
          <button 
            className="flex items-center space-x-1.5 bg-[#f3f4f6] hover:bg-gray-200 dark:bg-[#1b1c26] text-[11px] font-semibold px-3 py-1.5 rounded-full text-black dark:text-white transition-colors"
          >
            <span>All Campaigns</span>
            <span className="text-[10px] text-gray-400">✕</span>
          </button>
          
          <button 
            className="flex items-center space-x-1.5 bg-[#f3f4f6] hover:bg-gray-200 dark:bg-[#1b1c26] text-[11px] font-semibold px-3 py-1.5 rounded-full text-black dark:text-white transition-colors"
          >
            <span>Global</span>
            <span className="text-[10px] text-gray-400">✕</span>
          </button>
        </div>

        {/* Dynamic Controls for Dates & CSV Export */}
        <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
          <div className="flex items-center space-x-1 px-3 py-1.5 bg-gray-50 dark:bg-cadence-slate-850 rounded-lg border border-gray-100 dark:border-cadence-slate-805">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-800 dark:text-white focus:outline-none pr-1 cursor-pointer"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Monthly Overview</option>
              <option value="90">Quarterly View</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-1.5 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black text-xs font-extrabold rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Outbound Reports</span>
          </button>
        </div>
      </div>

      {/* Symmetrical Grid of 4 Cards modeled directly from tablet mockup bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card A: Creative Size Performance with mountain wavy gradient at the bottom */}
        <div className="bg-white dark:bg-[#11121a] rounded-3xl p-6 border border-[#e5e7eb] dark:border-cadence-slate-805 shadow-md flex flex-col justify-between relative overflow-hidden h-[260px] group transition-all duration-300 hover:shadow-lg hover:border-black/10 dark:hover:border-white/10">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-black dark:text-white tracking-tight">
                  Creative Size Performance
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Impressions by size, highlighting reach.</p>
              </div>
              <span className="text-gray-300 dark:text-[#64748b] text-xs font-bold">↗</span>
            </div>
            
            <div className="mt-6 space-y-3">
              <div>
                <strong className="text-2xl font-display font-extrabold text-black dark:text-white block leading-5">
                  17,786
                </strong>
                <span className="text-[9px] font-mono font-bold text-primary bg-[#FFF2EB] dark:bg-[#FF6B35]/15 px-1 py-0.5 rounded uppercase">320x250 Dimension</span>
              </div>
              <div>
                <strong className="text-2xl font-display font-bold text-black dark:text-white block leading-5">
                  10,786
                </strong>
                <span className="text-[9px] font-mono font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 px-1 py-0.5 rounded uppercase">320x480 Dimension</span>
              </div>
            </div>
          </div>

          {/* Exquisite Mint/Green Mountain Wave vector fill in bottom layer */}
          <div className="absolute left-0 right-0 bottom-0 h-16 pointer-events-none opacity-90 transition-transform duration-500 group-hover:scale-y-110 origin-bottom">
            <svg viewBox="0 0 100 20" className="w-full h-full" fill="none" preserveAspectRatio="none">
              {/* Back wave */}
              <path d="M0 10 C 30 2, 70 15, 100 8 L 100 20 L 0 20 Z" fill="#22d3ee" className="opacity-20" />
              {/* Foreground wave */}
              <path d="M0 12 C 40 5, 60 18, 100 13 L 100 20 L 0 20 Z" fill="#2563eb" className="opacity-30" />
            </svg>
          </div>
        </div>

        {/* Card B: Impressions & Clicks (Thin High-Frequency Line Chart) */}
        <div className="bg-white dark:bg-[#11121a] rounded-3xl p-6 border border-[#e5e7eb] dark:border-cadence-slate-805 shadow-md flex flex-col justify-between h-[260px] hover:shadow-lg transition-all duration-300">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-black dark:text-white tracking-tight">
                  Impressions & Clicks
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Breakdown of impressions and clicks</p>
              </div>
              <span className="text-gray-300 dark:text-[#64748b] text-xs font-bold">↗</span>
            </div>
          </div>

          {/* High-frequency sleek charts representation container */}
          <div className="h-32 mb-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 12, right: 2, left: -25, bottom: 2 }}>
                <CartesianGrid strokeDasharray="1 4" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={9} tickLine={false} />
                <Line 
                  type="natural" 
                  dataKey="volume" 
                  stroke="#2563eb" 
                  strokeWidth={1.5} 
                  dot={false}
                  name="Impressions"
                />
                <Line 
                  type="natural" 
                  dataKey="clickRate" 
                  stroke="#374151" 
                  strokeWidth={1.5} 
                  dot={false}
                  name="Clicks"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card C: Gender Distribution with detailed columns and slider fills */}
        <div className="bg-white dark:bg-[#11121a] rounded-3xl p-6 border border-[#e5e7eb] dark:border-cadence-slate-805 shadow-md flex flex-col justify-between h-[260px] hover:shadow-lg transition-all duration-300">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-black dark:text-white tracking-tight">
                  Gender Distribution
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">CTR comparison for female and male users</p>
              </div>
              <span className="text-gray-300 dark:text-[#64748b] text-xs font-bold">↗</span>
            </div>

            {/* Layout Columns matching the mockup layout */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Female</span>
                <strong className="text-2xl font-display font-extrabold text-black dark:text-white block leading-6">
                  0.04%
                </strong>
                <p className="text-[9px] text-[#2563eb] font-semibold">Avg Conversions</p>
                {/* Horizontal slider progress bar */}
                <div className="w-full h-1.5 bg-[#f3f4f6] dark:bg-gray-805 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563eb] rounded-full" style={{ width: "42%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Male</span>
                <strong className="text-2xl font-display font-extrabold text-black dark:text-white block leading-6">
                  0.05%
                </strong>
                <p className="text-[9px] text-[#2563eb] font-semibold">Active Pipeline</p>
                {/* Horizontal slider progress bar */}
                <div className="w-full h-1.5 bg-[#f3f4f6] dark:bg-gray-850 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563eb] rounded-full" style={{ width: "58%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[9px] font-mono text-gray-400 border-t border-gray-100 dark:border-cadence-slate-800 pt-2.5">
            Updated via Real-time CRM Sync
          </div>
        </div>

        {/* Card D: Age Distribution with Striped Shaded Area charts */}
        <div className="bg-white dark:bg-[#11121a] rounded-3xl p-6 border border-[#e5e7eb] dark:border-cadence-slate-805 shadow-md flex flex-col justify-between h-[260px] hover:shadow-lg transition-all duration-300">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-black dark:text-white tracking-tight">
                  Age Distribution
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Impressions and clicks by age group</p>
              </div>
              <span className="text-gray-300 dark:text-[#64748b] text-xs font-bold">↗</span>
            </div>
          </div>

          {/* Recharts chart showing distribution by age groups */}
          <div className="h-32 mb-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 12, right: 2, left: -25, bottom: 2 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={8} />
                <Line 
                  type="monotone" 
                  dataKey="openRate" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#2563eb" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[9px] font-semibold text-gray-400 flex items-center space-x-1 justify-between border-t border-gray-100 dark:border-cadence-slate-800 pt-2">
            <span>Primary Focus: 25-44 Age Range</span>
            <span className="text-[#FF6B35] font-bold">▲ Hot Sector</span>
          </p>
        </div>

      </div>

      {/* A/B Testing copywriting Variants table */}
      <div className="bg-white dark:bg-[#11121a] p-6 rounded-3xl border border-[#e5e7eb] dark:border-cadence-slate-805 shadow-md transition-colors duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-display font-extrabold text-[#111] dark:text-white">
              A/B Testing - Top Copywriting Variants
            </h3>
            <p className="text-xs text-gray-400">Historical performance metrics across primary tone variants.</p>
          </div>
          <span className="px-3 py-1 bg-gradient-to-tr from-[#FFF2EB] to-[#FFF2EB]/40 dark:from-[#FF6B35]/15 dark:to-[#FF6B35]/5 border border-[#FF6B35]/30 rounded-full text-xs font-bold text-[#FF6B35] flex items-center space-x-1">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>AI Optimizer Engine Active</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-150 dark:border-cadence-slate-800 text-gray-400 font-bold uppercase tracking-wider">
                <th className="pb-3 pt-2">Variant / Anchor</th>
                <th className="pb-3 pt-2">Subject Line Snippet</th>
                <th className="pb-3 pt-2 text-center">Predicted Open Rate</th>
                <th className="pb-3 pt-2 text-center">Predicted CTR</th>
                <th className="pb-3 pt-2 text-center">Reply Rate</th>
                <th className="pb-3 pt-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-cadence-slate-850">
              {topVariants.map((v, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-cadence-slate-850/50 transition-colors">
                  <td className="py-4 font-semibold">
                    <div>
                      <p className="text-cadence-slate-900 dark:text-white font-bold">{v.variantName}</p>
                      <span className="text-[10px] text-cadence-slate-400 italic">Tone: {v.tone}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="text-[#374151] dark:text-gray-300 max-w-xs truncate font-mono bg-gray-50 dark:bg-cadence-slate-850 p-1.5 rounded border border-gray-100 dark:border-gray-800">
                      {v.subject}
                    </p>
                  </td>
                  <td className="py-4 text-center font-bold text-[#111] dark:text-white">
                    {v.openRate}%
                  </td>
                  <td className="py-4 text-center font-bold text-[#FF6B35]">
                    {v.clickRate}%
                  </td>
                  <td className="py-4 text-center text-[#555] dark:text-white font-bold">
                    {v.replyRate}%
                  </td>
                  <td className="py-4 text-right">
                    {v.winner ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-[#FFF2EB] dark:bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/30">
                        WINNING (A)
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-gray-100 dark:bg-gray-800 text-gray-400">
                        Variant (B)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outbound Performance Pipeline Table & Expandable Campaigns section */}
      <div id="active-campaigns-section" className="bg-white dark:bg-[#11121a] p-6 rounded-3xl border border-[#e5e7eb] dark:border-cadence-slate-805 shadow-md transition-colors duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-display font-extrabold text-black dark:text-white animate-fade-in">
              Active Outreach Campaigns Portfolio
            </h3>
            <p className="text-xs text-gray-400">Manage real campaigns, review live rates, and download personalization batches.</p>
          </div>
          <button 
            onClick={() => {
              alert("To create a new campaign, you can configure target copy variations using Creative Build!");
            }}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-extrabold rounded-lg transition-all shadow-xs flex items-center space-x-1.5"
          >
            <span>+ Create Outbound Campaign</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] dark:border-cadence-slate-800 text-gray-400 font-bold uppercase tracking-wider">
                <th className="pb-3 pt-2">Campaign Anchor Name</th>
                <th className="pb-3 pt-2">Status Flag</th>
                <th className="pb-3 pt-2 text-center">Batch Vol</th>
                <th className="pb-3 pt-2 text-center">Open Rate</th>
                <th className="pb-3 pt-2 text-center">CTR Rate</th>
                <th className="pb-3 pt-2 text-right">Replies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-cadence-slate-850">
              {campaigns.map((camp, idx) => (
                <tr key={camp.id || idx} className="hover:bg-gray-50/50 dark:hover:bg-cadence-slate-850/50 transition-colors">
                  <td className="py-4 font-bold text-black dark:text-white">
                    {camp.name}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                      camp.status === "Active"
                        ? "bg-[#FFF2EB] dark:bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/30"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                    }`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="py-4 text-center font-semibold text-gray-850 dark:text-gray-300">
                    {camp.emailsSent.toLocaleString()}
                  </td>
                  <td className="py-4 text-center font-bold text-gray-900 dark:text-white">
                    {camp.openRate}%
                  </td>
                  <td className="py-4 text-center font-bold text-[#FF6B35]">
                    {camp.clickRate}%
                  </td>
                  <td className="py-4 text-right font-bold text-[#6366f1]">
                    {camp.repliesReceived}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
