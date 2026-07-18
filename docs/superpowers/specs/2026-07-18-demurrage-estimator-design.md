# Demurrage Exposure Estimator Design

Date: 2026-07-18
Project: TekLink marketing site
Status: Approved in conversation, awaiting written-spec review

## Objective

Add a narrow, credible maritime utility to the public site that demonstrates TekLink's understanding of operational and commercial pain points without turning the site into a calculator-first experience.

The utility should estimate demurrage exposure from excess laytime using transparent logic and clearly stated assumptions. It should feel useful and trustworthy, not flashy.

## Why this belongs on the site

The current TekLink maritime story already spans freight, chartering, vessel feasibility, and commodity exposure. A demurrage estimator fits that narrative because it sits at the overlap of:

- port operations
- commercial exposure
- finance-aware decision making

This makes it a strong proof point for TekLink's domain understanding while staying consistent with the current site structure and tone.

## Placement

Add the estimator to the Maritime page in `app/maritime/page.tsx`.

Placement order:

1. `Hero`
2. `EcosystemFlow`
3. `DemurrageExposureEstimator`
4. `SolutionCards`
5. `Footer`

Rationale:

- the hero introduces the maritime ecosystem
- the flow explains the journey across the ecosystem
- the estimator proves TekLink understands a real operational cost issue
- the solution cards then broaden the story back out to the platform portfolio

The estimator should not be treated as the page hero, the central wow factor, or the site's headline feature.

## Scope

### In scope

- one public-facing demurrage exposure estimator section
- live-updating calculations as the user enters values
- transparent display of intermediate values and final exposure
- optional cargo-based cost normalization
- restrained section copy and styling aligned with the rest of the site

### Out of scope

- full charterparty demurrage and dispatch engine
- legal settlement logic
- separate load-port and discharge-port workflows
- complex exception handling across contract clauses
- saved scenarios
- export features
- API integration
- user accounts or persistence

## User story

As a maritime visitor evaluating TekLink, I want to enter a few operational inputs and immediately see how berth-time overrun can create financial exposure, so I can understand that TekLink is capable of thinking across operational and commercial layers.

## Tool concept

### Name

`Demurrage Exposure Estimator`

### Intent

Provide a practical early-warning estimate of excess laytime cost exposure using a small number of understandable inputs.

### Framing

The tool should be framed as an operational estimator for early visibility, not a legal claims engine.

## Inputs

Required inputs:

- `Allowed laytime (hours)`
- `Actual time used (hours)`
- `Demurrage rate (per day)`

Optional inputs:

- `Excludable hours`
- `Cargo quantity (tons)`

### Input definitions

- `Allowed laytime (hours)`: contractual or working laytime allowance used for the estimate
- `Actual time used (hours)`: total time consumed in the relevant port-stay window
- `Demurrage rate (per day)`: agreed or assumed commercial rate applied to excess time, using the visitor's own currency context
- `Excludable hours`: hours the user wants excluded from counted time for a rougher operational adjustment
- `Cargo quantity (tons)`: optional quantity used only to calculate cost per ton

## Calculation logic

The tool must use simple, explicit logic:

```text
netUsedHours = max(0, actualTimeUsed - excludableHours)
excessHours = max(0, netUsedHours - allowedLaytime)
estimatedDemurrage = (excessHours / 24) * demurrageRatePerDay
costPerTon = cargoQuantity > 0 ? estimatedDemurrage / cargoQuantity : null
```

### Interpretation notes

- `Excludable hours` should reduce counted time only; it should never create negative time
- if actual time remains within allowed laytime, exposure is zero
- cost per ton appears only when a valid cargo quantity above zero is provided

## Outputs

The results panel should show:

- `Net counted time`
- `Excess laytime`
- `Estimated demurrage exposure`
- `Estimated cost per ton` when cargo quantity is present and greater than zero

The section should also show a readable breakdown of how the estimate was produced.

Example explanation lines:

- `Net counted time = Actual time used - Excludable hours`
- `Excess laytime = Net counted time - Allowed laytime`

## Interaction model

- calculations update live as the user types
- fields should remain visually blank until the user enters values
- required fields are the three primary numeric inputs
- optional fields default to zero behavior internally
- negative values are not allowed
- decimals are allowed
- reset clears all fields back to blank values

## Placeholder and validation behavior

### Empty state

If required fields are missing, the results panel should show a calm placeholder state rather than defaulting to misleading totals.

### Validation rules

- all numeric fields must be non-negative
- required inputs must be present before final totals are displayed
- excludable hours may exceed actual time used, but net used time must floor at zero
- cargo quantity of zero or blank suppresses the cost-per-ton row

### Display formatting

- calculations should retain full precision internally
- displayed values should be rounded cleanly for readability
- currency presentation should be clear and explicitly treated as the same currency basis as the entered daily rate

## Trust and scope guardrails

To keep the tool credible, the UI must include a short trust note:

`This is an operational estimate for early visibility. Final demurrage treatment depends on charterparty terms, records, and agreed exceptions.`

The UI should avoid overstating the feature with language such as:

- AI terminal
- intelligence engine
- legal-grade settlement
- automated charterparty interpretation

## Narrative fit

This section should function as supporting evidence within the maritime page narrative.

It should communicate:

- TekLink understands how operational delay turns into commercial leakage
- TekLink can reason across operations and finance
- TekLink's platform story is grounded in real workflows

It should not communicate:

- TekLink is now primarily a calculator product
- the site's main value is a public tool
- the estimate replaces documented charterparty or legal treatment

## Copy recommendations

### Eyebrow

`Operational Utility`

### Headline

`Estimate demurrage exposure before time at berth turns into cost`

### Body copy

`Port delays do not stay operational for long. They become commercial exposure. This estimator gives a quick view of how excess laytime can translate into demurrage cost, using a small set of working assumptions.`

### Results labels

- `Net counted time`
- `Excess laytime`
- `Estimated demurrage exposure`
- `Estimated cost per ton`

### Trust note

`This is an operational estimate for early visibility. Final demurrage treatment depends on charterparty terms, records, and agreed exceptions.`

### Soft CTA

`Need stronger control across port events, documents, and commercial workflows? Collaborate with TekLink.`

## UI layout

Recommended section structure:

- left column for section copy, inputs, and actions
- right column for a result card with the main total and supporting breakdown

Recommended content hierarchy:

- eyebrow
- headline
- short explanatory body
- input fields
- reset action
- result card with main exposure number
- breakdown rows
- trust note
- soft CTA

The visual treatment should align with the current TekLink design language:

- navy and restrained accent palette
- IBM Plex typography already in use across the site
- clean bordered surfaces
- no overdesigned faux-terminal presentation

## Accessibility and usability expectations

- labels must stay explicit and readable
- input fields should be keyboard-friendly
- the result state should remain understandable without animation
- the section should work cleanly on desktop and mobile
- copy should explain any domain-specific term that may be unclear, especially `Excludable hours`

## Implementation approach

Create a dedicated client component, for example `components/DemurrageExposureEstimator.tsx`, and render it from the Maritime page.

Guidelines:

- keep the calculation logic in a small pure helper within the component file or a tiny utility
- avoid unnecessary abstraction in v1
- keep the section self-contained so it can be moved or reused later
- preserve the site's existing visual language and spacing rhythm

## Testing expectations

Implementation should be verified against at least these cases:

- zero exposure when actual time is within allowed laytime
- positive exposure when actual time exceeds allowed laytime
- excludable-hours adjustment case
- optional cargo quantity case
- reset behavior
- decimal input handling
- mobile layout sanity check

## Open decisions intentionally deferred

These are intentionally not part of v1 and should be revisited only if the section proves useful:

- dispatch calculation
- multi-port or load/discharge split
- document-driven data import from NOR or SOF systems
- saved scenarios
- PDF output
- integration with broader maritime or finance tools

## Recommended next step

Turn this design into an implementation plan and then build the estimator as a focused support section on the Maritime page.
