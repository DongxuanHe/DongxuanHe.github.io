---
layout: post
title: "Learning Causal Graphs with Mixed-Integer Optimization"
date: 2026-10-16 13:30:00 -0400
description: "Seminar notes on DAG learning, statistically motivated early stopping, and coordinate descent."
categories: [optimization]
tags: [seminar, causal-discovery, mixed-integer-optimization]
related_posts: false
---

**Speaker:** Simge Küçükyavuz, Northwestern University<br>
**Date:** October 16, 2026<br>
**Series:** Optimization seminar, Purdue University

The seminar discussed how optimization can help learn directed graphical models from observational data. The main setting was a linear Gaussian structural equation model, with particular attention to the case where different variables have different noise variances. The talk connected three ideas: a convex mixed-integer formulation, an early stopping rule guided by statistical accuracy, and a coordinate descent method for larger problems.

## Learning a graph from data

The opening example involved exercise, body weight, and heart health. Observations may reveal relationships among these variables, but learning a directed graph requires deciding which relationships exist and how they are oriented. The model considered in the talk represents these relationships with a **directed acyclic graph (DAG)**.

Each variable is expressed as a linear combination of its parents plus a noise term. Learning the model therefore means estimating both the graph structure and the coefficients on its edges. The objective combines a negative log-likelihood with an **L0 penalty**, which counts nonzero edge coefficients and encourages a sparse graph. An acyclicity constraint rules out directed cycles.

A key distinction was between equal and unequal noise variances. Equal variances can make the graph identifiable under suitable assumptions. With unequal variances, observational data generally cannot determine every edge direction uniquely. The appropriate target is then a **Markov equivalence class**: a collection of DAGs that encode the same conditional independencies. A completed partially directed acyclic graph (CPDAG) represents this class, showing which directions are shared across its members and which remain unresolved.

## A convex mixed-integer formulation

The original likelihood formulation contains difficult interactions between the edge coefficients and noise variances. The speaker described a change of variables based on a factorization of the precision matrix, the inverse covariance matrix.

The DAG structure is useful here: there exists a simultaneous permutation of rows and columns that makes the relevant matrix triangular. This allows a log-determinant expression to be rewritten using scalar logarithms of diagonal entries. The resulting formulation has a convex continuous objective, together with discrete decisions that encode the graph.

Binary variables indicate whether edges are present. They also make it possible to count edges for the L0 penalty. Layer variables enforce acyclicity by requiring a selected edge to move forward in the layer ordering. The formulation can incorporate a candidate superstructure to restrict the search, as well as prior knowledge about particular relationships. The talk also mentioned perspective strengthening as a way to improve continuous relaxations.

## Stopping at a statistically meaningful accuracy

Branch and bound maintains a lower bound from relaxations and an upper bound from feasible solutions. Their difference measures the remaining optimization gap. Finding a good graph may be much faster than proving that no better graph exists.

The seminar connected this gap to the statistical properties of the estimator. Under the stated assumptions, an appropriately chosen stopping threshold can preserve consistency without requiring the solver to close the gap completely. The threshold depends on statistical quantities such as regularization and sparsity.

The experiments illustrated the tradeoff: a suitable early stopping rule reduced computation while maintaining estimation quality, whereas stopping with too large a gap could reduce accuracy. A practical complication discussed in the questions was that the true graph sparsity is unknown and must be estimated when applying the rule.

## Coordinate descent for larger problems

For larger graphs, the talk introduced a coordinate descent algorithm. It updates one entry of the transformed parameter matrix at a time while keeping the others fixed. An update that would create a directed cycle is excluded.

The method has convergence guarantees to a coordinate-wise minimum. Under the paper's assumptions, its objective value also approaches the optimal penalized likelihood value as the sample size grows, with finite-sample statistical guarantees. This asymptotic result does not imply that every finite-data run finds a globally optimal solution.

The reported experiments compared computation time and differences between estimated and true CPDAGs. They showed the benefits of accounting for unequal noise variances and the speed of coordinate descent on larger benchmark networks. The discussion also highlighted the importance of the coordinate update order.

## Further discussion

The closing discussion covered using expert knowledge or interventions to resolve ambiguous directions, extending the model beyond the linear Gaussian setting, and exploiting structure in sparse quadratic optimization problems. One computational distinction was that the data enter the formulation through a sample covariance matrix: increasing the sample size does not directly add graph-decision variables, while increasing the number of nodes or candidate edges expands the combinatorial search.

## Related papers

These notes summarize the seminar rather than reproduce its proofs. The following papers provide the precise assumptions and guarantees behind the two main methods:

- Tong Xu, Armeen Taeb, Simge Küçükyavuz, and Ali Shojaie. [Integer programming for learning directed acyclic graphs from nonidentifiable Gaussian models](https://doi.org/10.1093/biomet/asaf032). *Biometrika*, 2025.
- Tong Xu, Simge Küçükyavuz, Ali Shojaie, and Armeen Taeb. [An Asymptotically Optimal Coordinate Descent Algorithm for Learning Bayesian Networks from Gaussian Models](https://arxiv.org/abs/2408.11977).
