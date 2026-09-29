---
layout: page
title: Grid Expansion and Data-Center Interconnection
description: Planning grid upgrades and phased data-center admissions under network and investment constraints
img: /assets/img/projects/grid-expansion.svg
img_alt: A transmission network connecting to a data center with staged capacity expansion over time
importance: 4
category: work
related_publications: false
---

### Overview

**MIT–UF–NEU Joint Summer Research Camp**

This project studies **multi-year grid expansion and data-center interconnection**. The goal is to allow data centers to connect before their full power demand can be met, with admitted capacity increasing over time as grid upgrades become available.

The planning problem links two decisions: **when to upgrade the network** and **how much load to admit each year**. Coordinating these decisions can help identify opportunities for earlier access to power while respecting network and investment constraints.

<div class="my-4">
  <img src="{{ '/assets/img/projects/grid-expansion.svg' | relative_url }}" alt="Conceptual diagram connecting grid expansion with phased data-center admission across planning years" class="img-fluid rounded" width="1200" height="675" loading="lazy">
</div>
<div class="caption">Conceptual illustration of grid connections and phased capacity admission; the network and stages are schematic, not study results.</div>

### Optimization Model

I formulate and implement a **mixed-integer optimization model** that jointly schedules grid upgrades and annual load admissions. The model incorporates:

- **DC power-flow constraints** to represent network operation and transmission limits.
- **Investment budgets** to limit the upgrades that can be funded.
- **Construction lead times** to account for the delay between investment decisions and available capacity.
- **Annual load-admission decisions** to represent phased data-center connections.

These constraints couple near-term connection opportunities with longer-term infrastructure planning.

### Current Focus

Current work evaluates a **capacity-maximizing baseline** using Virginia data-center records and a synthetic transmission network. Sensitivity studies examine how the plans change with **connection locations** and **power-import limits**.

The analysis focuses on how network constraints and planning assumptions affect feasible admission schedules. The synthetic network provides a study setting; it is not an exact representation of the physical transmission system.

### Key Topics

- Multi-year infrastructure planning
- Mixed-integer optimization
- DC power flow and transmission constraints
- Phased data-center interconnection
- Investment timing and sensitivity analysis
