import type { Metadata } from 'next'
import IndustryPage, { type IndustrySolution } from '@/components/IndustryPage'

export const metadata: Metadata = {
  title: 'TekLink - Fintech',
  description:
    'Fintech solutions across OCR/ICR reconciliation, vendor selection, commercial calculation, fund management, and GRC.',
}

const solutions: IndustrySolution[] = [
  {
    eyebrow: 'Governance',
    title: 'GRC Application',
    description:
      'Governance, risk and compliance workflows for deal assessment, risk registers, audit evidence, and controlled review paths.',
    badges: ['Governance', 'Risk', 'Compliance'],
    audience: 'For control teams',
    url: 'https://risk.teklinkinternational.com',
  },
  {
    eyebrow: 'Procurement Finance',
    title: 'Vendor Select',
    description:
      'SAP PO vendor-selection workflow for comparing suppliers, structuring approvals, and keeping vendor decisions auditable.',
    badges: ['SAP PO', 'Vendors', 'Approvals'],
    audience: 'For procurement teams',
    url: 'https://vendor.teklinkinternational.com',
  },
  {
    eyebrow: 'Commercial Models',
    title: 'Commercial Calculator',
    description:
      'A finance calculator workspace for margins, ROI, GST, commissions, loans, investments, and operating economics.',
    badges: ['ROI', 'Margin', 'GST', 'Currency'],
    audience: 'For commercial teams',
    url: 'https://calculator.teklinkinternational.com',
  },
  {
    eyebrow: 'Asset Management',
    title: 'Fund Management System',
    description:
      'Operational backbone for fund accounting, NAV, investor capital, portfolio reporting, audit trails, and secure portals.',
    badges: ['NAV', 'Ledger', 'Investors', 'Portal'],
    audience: 'For asset managers',
    url: 'https://fund.teklinkinternational.com',
  },
  {
    eyebrow: 'Document Intelligence',
    title: 'OCR to ICR',
    description:
      'Invoice OCR/ICR with purchase-order reconciliation, validation logs, matching logic, and finance-team review workflows.',
    badges: ['OCR', 'ICR', 'PO Match', 'Review'],
    audience: 'For finance operations',
    url: 'https://ocr.teklinkinternational.com',
  },
]

export default function FintechPage() {
  return (
    <IndustryPage
      title="Fintech"
      accent="solutions"
      description="A concise portfolio view of the finance products found in the local TekLink workspace, renamed and grouped for the public site."
      solutions={solutions}
    />
  )
}
