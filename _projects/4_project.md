---
layout: page
title: Active Learning Strategies for Image Classification
description: A controlled empirical study of active learning sampling strategies on Fashion-MNIST, with a focused analysis of BALD.
img: /assets/img/al.png
importance: 4
category: work
related_publications: false
---

## Overview

Active learning (AL) reduces annotation cost by iteratively selecting the most informative unlabeled samples for labeling, rather than labeling the full dataset upfront. In this project, we conduct a survey-driven, controlled empirical comparison of representative AL acquisition strategies on **Fashion-MNIST**, using a single unified experimental pipeline so that observed performance differences primarily stem from the query strategy itself.

This is a collaborative project conducted under a shared experimental protocol. While multiple acquisition methods are evaluated, this page places particular emphasis on **BALD (Bayesian Active Learning by Disagreement)**, whose behavior exhibits an especially instructive accuracy–efficiency trade-off. :contentReference[oaicite:0]{index=0}


## Experimental Framework (Unified Protocol)

We follow a standard pool-based active learning loop:

1. Initialize a small labeled set $L_0$ and a large unlabeled pool $U$
2. Train a classifier on the current labeled set
3. Score the unlabeled pool using an acquisition function
4. Query a batch for labeling and update the labeled set
5. Retrain the model and repeat

- Dataset: Fashion-MNIST (10 classes, 28×28 grayscale)
- Initial labeled set: $L_0 = 500$
- Query budget: $b = 100$ samples per round  
- Rounds: 100 (total labeled samples: 10,000)  
- Model: MLP with a 256-dimensional hidden layer and linear softmax head  
- Loss: sparse categorical cross-entropy  
- Optimizer: Adam, learning rate \( 3 \times 10^{-4} \)  
- Training protocol: model reinitialized and trained from scratch each round until convergence  
- Baseline: uniform random sampling

This controlled setup ensures a fair and reproducible comparison across acquisition strategies.


## Methods Compared (Brief)

Five representative active learning strategies are evaluated:

- **BALD**: Bayesian uncertainty via Monte Carlo dropout  
- **BADGE**: Gradient-embedding–based batch selection with diversity  
- **CSAL**: Consistency-based semi-supervised active learning  
- **Uncertainty Sampling**: Least confidence, margin sampling, entropy  
- **Core-Set Selection**: k-Center greedy coverage in feature space  

All methods are implemented independently but evaluated within the same pipeline.

---

## Focus Method: BALD (Bayesian Active Learning by Disagreement)

### Bayesian Uncertainty via MC Dropout

BALD targets **epistemic uncertainty**, measuring how much revealing a label would reduce uncertainty over model parameters. Exact Bayesian inference is intractable for deep networks, so BALD employs **Monte Carlo dropout** to approximate sampling from the posterior.

For an unlabeled input \( x \), we perform \( T \) stochastic forward passes with dropout enabled, yielding predictive distributions
$$
p^{(t)}(y \mid x), \quad t = 1, \dots, T
$$

The BALD acquisition score is computed as the mutual information between predictions and model parameters:
$$
\text{BALD}(x)
=
H\!\big(p(y \mid x)\big)
-
\frac{1}{T}
\sum_{t=1}^{T}
H\!\big(p^{(t)}(y \mid x)\big),
$$
where
$$
p(y \mid x) = \frac{1}{T} \sum_{t=1}^{T} p^{(t)}(y \mid x),
$$
and $H(\cdot)$ denotes entropy.  
The first term captures total predictive uncertainty, while the second estimates expected aleatoric uncertainty; their difference isolates **epistemic uncertainty**, which is the quantity active learning seeks to reduce.

### Computational Cost

BALD incurs substantially higher computational cost than single-pass uncertainty heuristics because each acquisition step requires **\( T = 20 \)** stochastic forward passes per unlabeled example, making it roughly **20× more expensive** than entropy- or margin-based methods.


## Key Insight: Why BALD Starts Near 50% Accuracy but Finishes Best

A notable empirical phenomenon is that **BALD exhibits low initial accuracy (≈50%)**, yet ultimately **outperforms all other strategies**.

### Early-Stage Instability

In the earliest active learning rounds:
- the labeled set is extremely small,
- learned representations are poorly structured,
- and dropout-induced predictions behave nearly randomly.

Under these conditions, disagreement across stochastic forward passes does **not yet reliably reflect epistemic uncertainty**, causing BALD to query suboptimal samples and lag behind simpler heuristics.

### Late-Stage Superiority

As training progresses and the representation space stabilizes:
- predictive disagreement increasingly corresponds to genuine model uncertainty,
- BALD naturally avoids aleatoric noise and outliers,
- and queried samples more effectively reduce parameter uncertainty.

Once uncertainty estimates become reliable, BALD consistently selects highly informative samples and achieves the **highest final test accuracy** across labeling budgets. This behavior highlights a central trade-off: BALD sacrifices early stability in exchange for superior long-term performance.


## Results Summary

Empirical results on Fashion-MNIST show that:

- **BALD** achieves the highest final accuracy
- **BADGE, CSAL, and uncertainty heuristics** form a strong second tier
- **Core-Set selection** underperforms in this setting, often matching or falling below random sampling
- Simpler uncertainty methods are computationally efficient, while BALD and CSAL incur higher overhead

The underperformance of Core-Set is attributed to the limited geometric quality of MLP feature embeddings, which can cause the k-center algorithm to prioritize outliers rather than informative samples.
