# Maritime Utilities Section Design

Date: 2026-07-18
Project: TekLink marketing site
Status: Approved in conversation, awaiting written-spec review

## Objective

Replace the current single maritime utility block with a shared two-utility section that demonstrates both operational leakage awareness and voyage-level commercial reasoning.

The section should:

- rename the existing demurrage tool to `Demurrage and Cash Leakage Estimator`
- add a second `Voyage Margin Estimator`
- keep both tools scoped as practical public estimators rather than pretending to be full operational systems

## Why this belongs on the Maritime page

The Maritime page already tells a broader platform story across freight, chartering, vessel feasibility, and commodity exposure. A dual-utility section strengthens that story by showing two complementary angles:

- delay and berth-time leakage
- voyage-level commercial performance

Together, these utilities communicate that TekLink understands both operations and commercial math.

## Placement

Keep the utility section on the Maritime page in `app/maritime/page.tsx`.

Placement order:

1. `Hero`
2. `EcosystemFlow`
3. `MaritimeUtilitiesSection`
4. `SolutionCards`
5. `Footer`

This placement should remain unchanged from the current utility location.

## Section concept

### Section name

`Operational and Commercial Utilities`

### Headline

`Two fast estimators for delay exposure and voyage economics`

### Supporting body

The short explanatory copy should frame the section as proof that TekLink understands both operational leakage and commercial voyage outcomes. The tone should remain calm, credible, and practical.

### Layout

Use a shared wrapper section with two cards:

- left card: `Demurrage and Cash Leakage Estimator`
- right card: `Voyage Margin Estimator`

Desktop:

- side-by-side equal-weight cards

Mobile:

- stacked vertically in the same order

The two cards should feel parallel in visual importance. Neither tool should look like the dominant flagship feature.

## Scope

### In scope

- one shared maritime utilities section
- two independent estimator cards
- consistent card structure and interaction behavior
- live calculations for both tools
- mobile-safe stacking behavior
- restrained public-site copy and trust notes

### Out of scope

- legal settlement logic
- accounting-grade reporting
- document import
- saved scenarios
- export features
- API integration
- user persistence
- workflow orchestration between the two tools

## Tool 1: Demurrage and Cash Leakage Estimator

### Purpose

Show how berth-time overrun becomes direct financial leakage.

### Inputs

- `Port / terminal`
- `Allowed laytime`
- `Actual time used`
- `Port demurrage rate (per day)`
- `Excludable time`
- `Cargo quantity (tons)`

### Behavior

- keep time entry switchable between `Hours` and `Days`
- keep the commercial rate on a daily basis
- convert time internally to hours
- default the allowed laytime field to `24`

### Calculation logic

Use the existing demurrage estimator logic:

```text
netUsedHours = max(0, actualTimeUsedHours - excludableHours)
excessHours = max(0, netUsedHours - allowedLaytimeHours)
estimatedDemurrage = (excessHours / 24) * demurrageRatePerDay
costPerTon = cargoQuantity > 0 ? estimatedDemurrage / cargoQuantity : null
```

### Outputs

- `Estimated demurrage exposure`
- `Net counted time`
- `Excess laytime`
- `Estimated cost per ton`

### Framing

This tool should be described as an operational estimate for early visibility. It must not imply legal charterparty settlement or automated claims treatment.

## Tool 2: Voyage Margin Estimator

### Purpose

Show how voyage revenue and cost inputs translate into a rough commercial margin.

### Inputs

- `Cargo quantity (tons)`
- `Freight rate per ton`
- `Bunker cost`
- `Port cost`
- `Delay cost`
- `Other voyage cost` optional

### Calculation logic

```text
grossRevenue = cargoQuantityTons * freightRatePerTon
totalVoyageCost = bunkerCost + portCost + delayCost + otherVoyageCost
voyageMargin = grossRevenue - totalVoyageCost
marginPerTon = cargoQuantityTons > 0 ? voyageMargin / cargoQuantityTons : null
```

### Outputs

- `Estimated gross revenue`
- `Estimated total voyage cost`
- `Estimated voyage margin`
- `Estimated margin per ton`

### Framing

This tool should feel commercial and practical, not like a finance product or trading engine. It should behave like a quick voyage economics estimator.

## Shared interaction model

The two cards must remain fully independent.

Requirements:

- each card owns its own local state
- changing one tool must not affect the other
- each tool updates live as values are entered
- each tool has its own reset action
- each tool shows a calm placeholder state before required inputs are complete

Additional behavior:

- demurrage tool keeps its current `Hours / Days` toggle
- voyage margin tool does not need a unit toggle in v1
- voyage margin may go negative and that state should display clearly rather than being hidden

## Shared visual rules

Both tools should use the same overall card pattern:

- same height family
- same label hierarchy
- same field shell treatment
- same results-card treatment
- same action placement

The section should look like a coherent utility hub rather than two unrelated widgets.

The visual language should remain consistent with the current TekLink site:

- IBM Plex typography
- navy and restrained accent palette
- clean bordered cards
- no faux-terminal treatment
- no exaggerated product-marketing styling

## Copy recommendations

### Section eyebrow

`Operational and Commercial Utilities`

### Section headline

`Two fast estimators for delay exposure and voyage economics`

### Tool 1 title

`Demurrage and Cash Leakage Estimator`

### Tool 1 summary

`Estimate how excess laytime can turn berth delay into direct commercial exposure.`

### Tool 2 title

`Voyage Margin Estimator`

### Tool 2 summary

`Estimate how freight revenue, bunker cost, port cost, and delay cost affect voyage margin.`

### Shared trust posture

Both tools should keep restrained notes that make clear they are practical early estimators and not final settlement or accounting outputs.

## Validation and guardrails

For both tools:

- numeric inputs must be non-negative
- decimals are allowed
- required inputs must be present before result outputs appear
- result values should be readable and rounded cleanly for display

Additional tool-specific rules:

- demurrage cost per ton appears only when cargo quantity is above zero
- voyage margin per ton appears only when cargo quantity is above zero
- voyage margin may be positive, zero, or negative

## Component structure

Recommended component split:

- `components/MaritimeUtilitiesSection.tsx`
- `components/DemurrageExposureEstimator.tsx`
- `components/VoyageMarginEstimator.tsx`

Responsibilities:

- `MaritimeUtilitiesSection` handles the wrapper section, heading, copy, and responsive two-card layout
- `DemurrageExposureEstimator` handles the demurrage leakage tool
- `VoyageMarginEstimator` handles the commercial voyage margin tool

This keeps the tools isolated and easier to test independently.

## Testing expectations

### Demurrage estimator

Maintain or extend tests for:

- zero exposure case
- excess-time case
- excludable-time case
- decimal input handling
- time-unit conversion

### Voyage margin estimator

Add tests for:

- positive margin
- zero margin
- negative margin
- margin-per-ton calculation
- optional other-cost handling

### Layout verification

Verify:

- desktop side-by-side layout
- mobile stacked layout
- card independence

## Narrative fit

This section should communicate:

- TekLink understands delay-driven leakage
- TekLink understands voyage economics
- TekLink can reason across port operations and commercial outcomes

This section should not communicate:

- TekLink is now mainly a calculator site
- these estimators replace legal, contractual, or accounting workflows
- one tool is the hero and the other is a secondary add-on

## Recommended next step

Write the implementation plan for replacing the current single maritime utility with the new dual-utility section, then execute that plan in a fresh session.
