import type { Solution } from '@/components/SolutionCard'

export const maritimeSolutions: Solution[] = [
  {
    eyebrow: 'Maritime Freight',
    title: 'Freight Marketplace',
    description:
      'A B2B freight marketplace connecting shippers and carriers with real-time tracking, SAP/ERP integration, and a full document management suite.',
    badges: ['Shipper Dashboard', 'Carrier Portal', 'Live Tracking', 'ERP Integration'],
    audience: 'For shippers & carriers',
    url: 'https://freight.teklink.com.au',
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
    url: 'https://shipchartering.teklink.com.au',
    previewImages: [
      { src: '/chartering-dashboard.png', alt: 'Ship Chartering dashboard screenshot', label: 'Dashboard' },
      { src: '/chartering-inquiry.png', alt: 'Ship Chartering cargo inquiry screenshot', label: 'Cargo Inquiry' },
      { src: '/chartering-availability.png', alt: 'Ship Chartering availability screenshot', label: 'Availability' },
    ],
  },
  {
    eyebrow: 'Vessel Acquisition',
    title: 'Ship Feasibility',
    description:
      'Financial feasibility analysis for vessel purchases. Model acquisition costs, operating economics, and return scenarios — then export a full report before you commit.',
    badges: ['Cost Modelling', 'ROI Analysis', 'PDF Export'],
    audience: 'For buyers & investors',
    url: 'https://ship.feasibility.teklink.com.au',
    previewImages: [
      { src: '/feasibility-features.png', alt: 'Ship Feasibility feature overview screenshot', label: 'Feature Set' },
      { src: '/feasibility-score-breakdown.png', alt: 'Ship Feasibility score breakdown screenshot', label: 'Score Breakdown' },
      { src: '/feasibility-cash-flow-risk.png', alt: 'Ship Feasibility cash flow and risk screenshot', label: 'Cash Flow' },
    ],
  },
  {
    eyebrow: 'Commodity Risk',
    title: 'Commodity Hedging and Trading',
    description:
      'Commodity exposure workspace for cargo economics, hedge scenarios, landed cost analysis, and effective cost visibility.',
    badges: ['Exposure', 'Hedging', 'Scenario Analysis'],
    audience: 'For operators & traders',
    url: '/#collaborate',
    cta: 'Discuss Platform',
    previewImages: [
      { src: '/iron-ore-exposure.png', alt: 'Commodity Hedging and Trading exposure dashboard screenshot', label: 'Exposure' },
      { src: '/iron-ore-paper-hedge.png', alt: 'Commodity Hedging and Trading paper hedge desk screenshot', label: 'Paper Hedge' },
      { src: '/iron-ore-scenario.png', alt: 'Commodity Hedging and Trading scenario model screenshot', label: 'Scenario Model' },
    ],
  },
]
