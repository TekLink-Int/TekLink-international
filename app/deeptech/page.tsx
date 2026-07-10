import type { Metadata } from 'next'
import IndustryPage, { type IndustrySolution } from '@/components/IndustryPage'

export const metadata: Metadata = {
  title: 'TekLink - Deeptech',
  description:
    'Deeptech capability areas across drones, semiconductors, embedded systems, robotics, automation, and quantum computing.',
}

const solutions: IndustrySolution[] = [
  {
    eyebrow: 'Highlight',
    title: 'Drones (UAV, UAS)',
    description:
      'A focused capability lane for unmanned aerial systems, mission planning, payload operations, inspection workflows, and field-ready data capture.',
    badges: ['UAV', 'UAS', 'Payloads', 'Field Ops'],
    audience: 'Highlighted deeptech focus',
    highlight: true,
  },
  {
    eyebrow: 'Silicon Systems',
    title: 'Semiconductors, PLC and Embedded Systems',
    description:
      'Hardware-aware software for control systems, embedded devices, industrial interfaces, and semiconductor-adjacent workflows.',
    badges: ['PLC', 'Firmware', 'Controls'],
    audience: 'For industrial teams',
  },
  {
    eyebrow: 'Industrial Motion',
    title: 'Robotics and Automation',
    description:
      'Automation concepts for repeatable operations, production workflows, robotic process cells, and operator-facing control surfaces.',
    badges: ['Robotics', 'Automation', 'Controls'],
    audience: 'For operations teams',
  },
  {
    eyebrow: 'Applied Research',
    title: 'Quantum Computing',
    description:
      'Exploration of quantum-ready algorithms, optimization problems, simulation workflows, and research-to-product pathways.',
    badges: ['Optimization', 'Simulation', 'Research'],
    audience: 'For research-led teams',
  },
]

export default function DeeptechPage() {
  return (
    <IndustryPage
      eyebrow="Page 2"
      title="Deeptech"
      accent="solutions"
      description="A lean view of TekLink's deeptech lanes, with drones kept as the visible highlight and the rest presented as focused capability areas."
      solutions={solutions}
    />
  )
}
