export type Vendor = {
  id: string;
  name: string;
  category: string;
  description: string;
  revenue: number;
  orders: number;
  rating: number;
  refundRate: number;
  status: "Top Seller" | "Enterprise" | "Review Due" | "Active";
  initial: string;
  color: string;
};

export const vendors: Vendor[] = [
  { id: "stripe", name: "Stripe Inc.", category: "Financial Services & Payments", description: "Digital payment infrastructure powering global commerce.", revenue: 1200000, orders: 12480, rating: 4.9, refundRate: 1.2, status: "Top Seller", initial: "S", color: "from-indigo-500 to-purple-500" },
  { id: "adobe", name: "Adobe", category: "Creative Cloud & Software", description: "Creative software suite for design professionals.", revenue: 850000, orders: 8930, rating: 4.7, refundRate: 2.4, status: "Enterprise", initial: "A", color: "from-rose-500 to-orange-500" },
  { id: "slack", name: "Slack", category: "Collaboration & Productivity", description: "Channel-based messaging platform for teams.", revenue: 420000, orders: 6210, rating: 4.8, refundRate: 1.8, status: "Top Seller", initial: "S", color: "from-emerald-500 to-teal-500" },
  { id: "datadog", name: "Datadog", category: "Monitoring & Security", description: "Cloud-scale observability and security platform.", revenue: 610000, orders: 4180, rating: 4.5, refundRate: 3.6, status: "Review Due", initial: "D", color: "from-purple-500 to-fuchsia-500" },
  { id: "aws", name: "AWS", category: "Cloud Computing & Infrastructure", description: "Comprehensive cloud computing platform.", revenue: 3400000, orders: 22140, rating: 4.9, refundRate: 0.8, status: "Top Seller", initial: "A", color: "from-orange-500 to-amber-500" },
  { id: "notion", name: "Notion", category: "Workspace Tools", description: "Connected workspace for notes, docs, and projects.", revenue: 122000, orders: 3870, rating: 4.6, refundRate: 2.1, status: "Active", initial: "N", color: "from-slate-500 to-zinc-500" },
  { id: "nova", name: "Nova Dynamics", category: "Logistics Automation", description: "Automated logistics and supply chain optimization systems.", revenue: 982000, orders: 7420, rating: 4.8, refundRate: 1.4, status: "Enterprise", initial: "ND", color: "from-blue-500 to-cyan-500" },
  { id: "omnicorp", name: "OmniCorp Logistics", category: "Logistics", description: "Global last-mile delivery and fulfillment network.", revenue: 1540000, orders: 15290, rating: 4.7, refundRate: 1.9, status: "Top Seller", initial: "O", color: "from-cyan-500 to-blue-500" },
];

export const revenueMonthly = [
  { month: "Jan", direct: 42000, marketplace: 28000 },
  { month: "Feb", direct: 51000, marketplace: 34000 },
  { month: "Mar", direct: 47000, marketplace: 39000 },
  { month: "Apr", direct: 68000, marketplace: 44000 },
  { month: "May", direct: 75000, marketplace: 52000 },
  { month: "Jun", direct: 94000, marketplace: 61000 },
  { month: "Jul", direct: 112000, marketplace: 73000 },
  { month: "Aug", direct: 128000, marketplace: 84000 },
];

export const marketShare = [
  { name: "Logistics", value: 38, color: "var(--chart-1)" },
  { name: "Cloud", value: 34, color: "var(--chart-3)" },
  { name: "Hardware", value: 28, color: "var(--chart-2)" },
];

export const reports = [
  { name: "Q3_Vendor_Performance_Full.pdf", by: "Alex Rivera", date: "Oct 24, 2024", status: "Ready", size: "4.2 MB", type: "pdf" },
  { name: "OmniCorp_Logistics_Audit_2024.xlsx", by: "Sarah Chen", date: "Oct 22, 2024", status: "Ready", size: "1.8 MB", type: "xlsx" },
  { name: "Financial_Projection_Draft.pdf", by: "System Automator", date: "Oct 21, 2024", status: "Failed", size: "—", type: "pdf" },
  { name: "Hardware_Vendor_Comparison.pdf", by: "Marcus Hill", date: "Oct 19, 2024", status: "Ready", size: "2.7 MB", type: "pdf" },
  { name: "Refund_Trends_Q3.csv", by: "Lisa Park", date: "Oct 18, 2024", status: "Ready", size: "640 KB", type: "csv" },
];

export const notifications = [
  { id: 1, type: "success" as const, title: "Vendor surge detected", body: "Stripe Inc. sales increased by 25% this week.", time: "2m ago", unread: true },
  { id: 2, type: "warning" as const, title: "Refund rate alert", body: "Datadog refund rate crossed 3.5% threshold.", time: "1h ago", unread: true },
  { id: 3, type: "info" as const, title: "Quarterly report ready", body: "Q3 Vendor Performance report is ready for review.", time: "3h ago", unread: true },
  { id: 4, type: "success" as const, title: "New vendor onboarded", body: "Nova Dynamics joined as a strategic partner.", time: "Yesterday", unread: false },
  { id: 5, type: "info" as const, title: "Latency improved", body: "Avg API latency dropped by 120ms across regions.", time: "2 days ago", unread: false },
];

export const transactions = [
  { id: "#TRX-8829-21", date: "Oct 24, 2023", status: "Completed", volume: "452 Units", amount: 12450 },
  { id: "#TRX-8742-05", date: "Oct 21, 2023", status: "Processing", volume: "1,200 Units", amount: 28900 },
  { id: "#TRX-8631-99", date: "Oct 18, 2023", status: "Completed", volume: "88 Units", amount: 2100 },
  { id: "#TRX-8512-44", date: "Oct 14, 2023", status: "Completed", volume: "320 Units", amount: 8740 },
  { id: "#TRX-8403-12", date: "Oct 09, 2023", status: "Refunded", volume: "42 Units", amount: -1100 },
];

export const radarData = [
  { metric: "Quality", A: 92, B: 78 },
  { metric: "Speed", A: 88, B: 84 },
  { metric: "Support", A: 95, B: 72 },
  { metric: "Pricing", A: 70, B: 88 },
  { metric: "Reliability", A: 96, B: 80 },
  { metric: "Innovation", A: 84, B: 76 },
];

export const formatMoney = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
