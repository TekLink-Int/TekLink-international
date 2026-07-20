import type { Solution } from '@/components/SolutionCard'

export const maritimeSolutions: Solution[] = [
  {
    eyebrow: 'Maritime Freight',
    title: 'Freight Marketplace',
    description:
      'A B2B freight marketplace connecting shippers and carriers with real-time tracking, SAP/ERP integration, and a full document management suite.',
    badges: ['Shipper Dashboard', 'Carrier Portal', 'Live Tracking', 'ERP Integration'],
    audience: 'For shippers & carriers',
    url: 'https://freight.teklinkinternational.com',
    previewImages: [
      { src: '/freight-dashboard.png', alt: 'Freight Marketplace dashboard screenshot', label: 'Dashboard' },
      { src: '/freight-board.png', alt: 'Freight Marketplace freight board screenshot', label: 'Freight Board' },
      { src: '/freight-live-tracking.png', alt: 'Freight Marketplace live tracking screenshot', label: 'Live Tracking' },
    ],
  },
  {
    eyebrow: 'Vessel Chartering',
    title: 'Ship Chartering',
    description:
      'Multi-role chartering platform for managing cargo inquiries, vessel matching, structured negotiations, and fixture tracking — built for the full chartering workflow.',
    badges: ['Charterer', 'Shipowner', 'Broker', 'Admin'],
    audience: 'For charterers & owners',
    url: 'https://chartering.teklinkinternational.com',
    previewImages: [
      { src: '/chartering-dashboard.png', alt: 'Ship Chartering dashboard screenshot', label: 'Dashboard' },
      { src: '/chartering-inquiry.png', alt: 'Ship Chartering cargo inquiry screenshot', label: 'Cargo Inquiry' },
      { src: '/chartering-availability.png', alt: 'Ship Chartering availability screenshot', label: 'Availability' },
    ],
  },
  {
    eyebrow: 'Vessel Acquisition',
    title: 'Bareboat chartering and ship owning feasibility',
    description:
      'Financial feasibility analysis for vessel purchases. Model acquisition costs, operating economics, and return scenarios — then export a full report before you commit.',
    badges: ['Cost Modelling', 'ROI Analysis', 'PDF Export'],
    audience: 'For buyers & investors',
    url: 'https://feasibility.teklinkinternational.com',
    previewImages: [
      {
        src: '/feasibility-features.png',
        alt: 'Bareboat chartering and ship owning feasibility feature overview screenshot',
        label: 'Feature Set',
      },
      {
        src: '/feasibility-score-breakdown.png',
        alt: 'Bareboat chartering and ship owning feasibility score breakdown screenshot',
        label: 'Score Breakdown',
      },
      {
        src: '/feasibility-cash-flow-risk.png',
        alt: 'Bareboat chartering and ship owning feasibility cash flow and risk screenshot',
        label: 'Cash Flow',
      },
    ],
  },
  {
    eyebrow: 'Commodity Risk',
    title: 'Commodity Hedging and Trading',
    description:
      'Commodity exposure workspace for cargo economics, hedge scenarios, landed cost analysis, and effective cost visibility.',
    badges: ['Exposure', 'Hedging', 'Scenario Analysis'],
    audience: 'For operators & traders',
    url: 'https://trading.teklinkinternational.com',
    previewImages: [
      { src: '/iron-ore-exposure.png', alt: 'Commodity Hedging and Trading exposure dashboard screenshot', label: 'Exposure' },
      { src: '/iron-ore-paper-hedge.png', alt: 'Commodity Hedging and Trading paper hedge desk screenshot', label: 'Paper Hedge' },
      { src: '/iron-ore-scenario.png', alt: 'Commodity Hedging and Trading scenario model screenshot', label: 'Scenario Model' },
    ],
  },
  {
    eyebrow: 'Vessel Operations',
    title: 'Ship Operations',
    description:
      'Operational control layer for voyage events, onboard-to-shore coordination, task execution, maintenance visibility, and day-to-day vessel operations.',
    badges: ['Voyage Ops', 'Tasks', 'Crew', 'Maintenance'],
    audience: 'For operators & managers',
    url: '/maritime',
    cta: 'Explore Maritime',
  },
  {
    eyebrow: 'Terminal Control',
    title: 'Port Operations',
    description:
      'Port and terminal operations workspace for berth activity, yard coordination, gate movement, equipment visibility, and operational control across the port estate.',
    badges: ['Berth Ops', 'Yard', 'Gate', 'Control Tower'],
    audience: 'For ports & terminals',
    url: '/maritime',
    cta: 'Explore Maritime',
  },
  {
    eyebrow: 'Intermodal Logistics',
    title: 'Intermodal Booking System',
    description:
      'Booking workspace for coordinating cargo across vessel, rail, road, and terminal legs with unified job visibility, scheduling, and handoff tracking.',
    badges: ['Booking', 'Rail', 'Road', 'Visibility'],
    audience: 'For logistics teams',
    url: '/maritime',
    cta: 'Explore Maritime',
  },
]


