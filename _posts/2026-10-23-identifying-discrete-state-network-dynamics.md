---
layout: post
title: "Identifying Discrete-State Network Dynamics"
date: 2026-10-23 15:00:00 -0400
description: "ICON seminar notes on Bernoulli autoregressive models, network identification, and finite-sample estimation guarantees."
categories: [icon]
tags: [seminar, system-identification, network-inference, sample-complexity]
related_posts: false
source_archive: _blog_sources/2026-10-23-identifying-discrete-state-network-dynamics/
---

**Speaker:** Carolyn L. Beck, University of Illinois Urbana-Champaign<br>
**Date:** October 23, 2026<br>
**Series:** Purdue ICON Weekly Seminar / ECE Distinguished Lecture

The lecture asked how to identify a networked dynamical system when its observed states take only discrete values. The main goal was to recover network weights and topology from binary time series, with guarantees on the estimation error after a finite number of observations.

These notes are based on two partial transcripts and four slide screenshots. A middle segment was not recorded, so the summary covers the available material without reconstructing the missing discussion.

## From binary observations to network structure

Examples included opinion dynamics, epidemic spread, gene regulation, and cascading defaults in financial networks. In each case, a node's state can depend on its neighbors' earlier states. The identification problem is to infer those interactions from the observed evolution of the network.

For a network with $p$ binary nodes, the full state space has $2^p$ elements. Estimating an unrestricted Markov transition matrix therefore involves exponentially many entries. The lecture instead used a **Bernoulli autoregressive (BAR) model**, which expresses each node's activation probability through a weighted combination of the previous network state and a noise contribution.

After combining the noise parameters into an offset, the conditional activation probability has the form

$$
\Pr\!\left(X_i(k+1)=1\mid X(k)\right)
=a_i^{\mathsf T}X(k)+c_i.
$$

Here, $a_i$ contains the incoming network weights for node $i$. Together, the weight matrix and offsets have $p^2+p$ parameters. Parameter constraints keep the probabilities valid. In the basic nonnegative-influence model, persistent noise prevents the process from remaining trapped at an all-zero or all-one state and supports identification.

This is a structured model of the transition dynamics: the reduction in parameters comes from the BAR assumptions, rather than from an ability to estimate any arbitrary Markov chain with the same amount of data.

## Consistency and the two estimators

The talk distinguished **strong consistency** from **sample complexity**. Consistency asks whether an estimator converges to the true parameters as the observation horizon grows without bound. Sample complexity asks how many observations suffice for a specified error with high probability.

The lecture considered the direct maximum likelihood estimator and a closed-form estimator. Empirical state and transition counts supply estimates of conditional probabilities; the BAR structure then relates these probabilities to the network parameters through linear equations. The displayed closed-form construction uses a Gram-matrix inverse.

The finite-sample analysis presented later concerned the **closed-form estimator**. The speaker identified corresponding sample-complexity guarantees for the direct maximum likelihood estimator as an open problem.

## What controls the number of observations?

One slide gave a sufficient sample-size requirement on the scale

$$
\frac{p^3\log p}
{(1-r)^2\epsilon^2\lambda_{\min}(\Pi)^2}
$$

to obtain $\lVert\widehat{\Theta}-\Theta_0\rVert_F<\epsilon$ with high probability, under the stated model assumptions. The quantities have distinct roles:

- **Network dimension $p$:** larger networks require more observations.
- **Target error $\epsilon$:** a smaller error tolerance increases the sample requirement.
- **Dobrushin coefficient $r$:** this describes dependence and contraction of the process. As $r$ approaches one, the dependence makes the bound less favorable.
- **Correlation matrix $\Pi$:** this is the second-moment matrix of the state augmented with a constant. A small minimum eigenvalue indicates poor conditioning for parameter estimation.

The interpretation of $r$ was how quickly the process forgets its earlier conditions. This matters because consecutive observations are dependent; a long trajectory cannot simply be treated as equally many independent samples.

The requirement is a **conservative sufficient condition**, obtained by bounding the estimation error. It does not establish a matching lower bound on the number of samples every estimator must use. This distinction also came up in the questions after the talk.

## How the proof separates the difficulties

The slides bounded the spectral-norm estimation error by a ratio: a random error term in the numerator and the minimum eigenvalue of a data Gram matrix in the denominator. The proof therefore needs an upper bound on the numerator and a positive lower bound on the denominator, both holding with high probability.

For the denominator, the argument rescales the data matrix using its expected second moments and controls how far the resulting Gram matrix deviates from the identity. Since the observations form a dependent process, this requires concentration results for Markov chains rather than a direct independent-sample argument.

For the numerator, the slides used a **matrix Freedman inequality**. The error can be expressed through a martingale difference sequence, allowing matrix concentration bounds to control it. Combining the two estimates yields the finite-sample guarantee.

## Applications and open directions

The reported simulations suggested that the theoretical sample requirement could be conservative. Gene-signaling examples also involved positive and negative influences. More recent work explored dependencies in waterway transportation networks, including seasonal usage of locks.

The lecture closed with several directions for further work: tighter bounds, guarantees for the direct likelihood estimator, and the use of known network structure. For example, physical geography can rule out particular connections in a waterway network. Such information, or assumptions about sparsity and maximum degree, could reduce the identification burden.

Other extensions included partial observation, states with more than two values, and alternative estimators. The presentation's main analysis assumed that all node states were observed over time.

## Related paper

Xiaotian Xie, Dimitrios Katselis, Carolyn L. Beck, and R. Srikant. [Finite Sample Analysis for Structured Discrete System Identification](https://doi.org/10.1109/TAC.2023.3236243). _IEEE Transactions on Automatic Control_, 68(10), 6345–6352, 2023. The paper gives the formal assumptions and results behind the finite-sample analysis.
