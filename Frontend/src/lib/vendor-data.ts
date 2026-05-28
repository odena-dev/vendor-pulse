// Mock data for the currently "logged-in" vendor (Nova Dynamics).
export const currentVendor = {
  id: "nova",
  name: "Nova Dynamics",
  category: "Logistics Automation",
  storefront: "nova-dynamics",
  joined: "Mar 2022",
  tier: "Enterprise",
  initial: "ND",
  color: "from-blue-500 to-cyan-500",
};

export const vendorMonthlyRevenue = [
  { month: "Feb", revenue: 62000, benchmark: 48000 },
  { month: "Mar", revenue: 71000, benchmark: 51000 },
  { month: "Apr", revenue: 68000, benchmark: 55000 },
  { month: "May", revenue: 84000, benchmark: 58000 },
  { month: "Jun", revenue: 96000, benchmark: 62000 },
  { month: "Jul", revenue: 108000, benchmark: 67000 },
  { month: "Aug", revenue: 124000, benchmark: 71000 },
  { month: "Sep", revenue: 138000, benchmark: 74000 },
];

export const vendorOrders = [
  { id: "#NV-44218", customer: "Apex Retail Group", date: "Oct 24, 2024", items: 12, total: 4820, status: "Completed" as const },
  { id: "#NV-44197", customer: "Northwind Traders", date: "Oct 23, 2024", items: 4, total: 1290, status: "Processing" as const },
  { id: "#NV-44181", customer: "Beacon Logistics", date: "Oct 22, 2024", items: 28, total: 11340, status: "Completed" as const },
  { id: "#NV-44166", customer: "Vertex Industries", date: "Oct 21, 2024", items: 6, total: 2180, status: "Refunded" as const },
  { id: "#NV-44142", customer: "Pioneer Freight", date: "Oct 19, 2024", items: 18, total: 7420, status: "Completed" as const },
  { id: "#NV-44128", customer: "Cascade Supply Co.", date: "Oct 18, 2024", items: 3, total: 980, status: "Processing" as const },
  { id: "#NV-44109", customer: "Helios Manufacturing", date: "Oct 17, 2024", items: 22, total: 9120, status: "Completed" as const },
  { id: "#NV-44094", customer: "Stride Couriers", date: "Oct 15, 2024", items: 8, total: 3450, status: "Completed" as const },
];

export const vendorPayouts = [
  { id: "PYT-2024-09", period: "Sep 16 – Sep 30", amount: 48280, status: "Paid" as const, date: "Oct 02, 2024", method: "ACH •••• 4421" },
  { id: "PYT-2024-08", period: "Sep 01 – Sep 15", amount: 52910, status: "Paid" as const, date: "Sep 17, 2024", method: "ACH •••• 4421" },
  { id: "PYT-2024-07", period: "Aug 16 – Aug 31", amount: 41360, status: "Paid" as const, date: "Sep 02, 2024", method: "ACH •••• 4421" },
  { id: "PYT-2024-06", period: "Aug 01 – Aug 15", amount: 38740, status: "Paid" as const, date: "Aug 17, 2024", method: "ACH •••• 4421" },
];

export const vendorReviews = [
  { id: 1, author: "Maya R.", rating: 5, date: "Oct 23, 2024", body: "Shipment arrived two days early. Tracking was transparent throughout — would order again.", replied: true },
  { id: 2, author: "Daniel K.", rating: 4, date: "Oct 21, 2024", body: "Solid quality and great packaging. The onboarding paperwork felt heavier than necessary.", replied: false },
  { id: 3, author: "Priya S.", rating: 5, date: "Oct 18, 2024", body: "Their support team resolved a customs hiccup in under an hour. Top-tier service.", replied: true },
  { id: 4, author: "Thomas B.", rating: 3, date: "Oct 14, 2024", body: "Delivery was fine but the invoice format didn't match our ERP fields.", replied: false },
];

export const vendorBenchmarks = [
  { metric: "Fulfillment Speed", you: 94, median: 76 },
  { metric: "On-Time Delivery", you: 97, median: 88 },
  { metric: "Refund Rate", you: 1.4, median: 2.8 },
  { metric: "CSAT", you: 4.8, median: 4.4 },
  { metric: "Response Time (h)", you: 1.2, median: 3.6 },
];

export const vendorNotifications = [
  { id: 1, title: "New high-value order", body: "Beacon Logistics placed an $11.3K order.", time: "12m ago", tone: "success" as const },
  { id: 2, title: "Review needs reply", body: "Daniel K. left a 4-star review — pending response.", time: "2h ago", tone: "warning" as const },
  { id: 3, title: "Payout scheduled", body: "$48,280 will land in your bank on Oct 30.", time: "Yesterday", tone: "info" as const },
];

export const formatMoney = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n}`;
