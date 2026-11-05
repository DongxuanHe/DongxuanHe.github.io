---
layout: post
title: "Statistical Inference with AI-Generated Predictive Distributions"
date: 2026-10-30 13:30:00 -0400
description: "Using predictive distributions, score calibration, and cross-fitting to improve statistical inference with limited labeled data."
categories: [optimization]
tags: [seminar, prediction-powered-inference, statistical-inference, predictive-distributions, cross-fitting]
related_posts: false
source_archive: _blog_sources/2026-10-30-statistical-inference-with-ai-generated-predictive-distributions/
---

**Speaker:** Emma Jingfei Zhang, Emory University<br>
**Date:** October 30, 2026<br>
**Series:** Purdue Quantitative Methods Seminar

The seminar asked how AI-generated predictions can improve statistical inference without treating them as observed outcomes. The central idea was **distribution-informed prediction-powered inference (DiPPI)**: retain information from a predictive distribution, then use a smaller labeled sample to learn how that information should enter the estimator.

These notes combine the recorded discussion with four slide photos. The recording starts after the introduction and ends during a question; the photos clarify the displayed notation and one application.

## Predictions supplement observed outcomes

The setup contains a small labeled sample with covariates $X_i$ and observed responses $Y_i$, together with a larger unlabeled sample where the responses are missing. A pretrained model supplies predictions for both samples.

Simply averaging AI-generated responses can leave systematic prediction bias intact. The role of the labeled observations is to estimate a correction. More generated responses can reduce sampling variability in the predictions, but do not by themselves remove their bias.

For a fixed prediction function $f$, the basic PPI mean estimator combines predictions on the unlabeled sample with residuals from the labeled sample:

$$
\widehat{\mu}_{\mathrm{PPI}}
=\frac{1}{N}\sum_{j=n+1}^{n+N}f(X_j)
+\frac{1}{n}\sum_{i=1}^{n}\bigl(Y_i-f(X_i)\bigr).
$$

Here $n$ is the number of labeled observations and $N$ the number of additional unlabeled observations. The slide gave its variance as

$$
\operatorname{Var}(\widehat{\mu}_{\mathrm{PPI}})
=\frac{\operatorname{Var}(Y-f(X))}{n}
+\frac{\operatorname{Var}(f(X))}{N}.
$$

This expression uses independent labeled and unlabeled samples and treats the externally trained predictor as fixed. It does **not** require the residual $Y-f(X)$ to be independent of $f(X)$ within an observation, a distinction raised in the discussion.

When predictions explain the response well, the residual variance can be much smaller than the response variance. However, an unhelpful prediction function can make the basic estimator less efficient than using only the labeled outcomes.

## A distribution can retain information that a point prediction loses

The talk illustrated this with two rating distributions: one puts all its mass at 3, while another puts equal mass at 1 and 5. Both have mean 3, but communicate different uncertainty.

For each observation, DiPPI uses a predictive distribution $Q_i$ rather than only a predicted response. Its spread, shape, or other features may help explain the outcome or the reliability of a prediction. Those features are useful when they carry information relevant to the statistical quantity being estimated.

The setup does not require $Q_i$ to equal the true conditional distribution of $Y_i$. Predictions can be misspecified and can incorporate auxiliary text or image information. The labeled and unlabeled observations must still satisfy the common-population assumptions of the method; the correction is not a general solution to arbitrary population shifts.

## Calibrate the estimating function

The target parameter is defined through a population estimating equation,

$$
\mathbb{E}\bigl[U_\theta(X,Y)\bigr]=0.
$$

For a mean, $U_\theta$ can be $Y-\theta$. For linear regression, it can be $X(Y-X^{\mathsf T}\theta)$. The analyst chooses the target and corresponding estimating function before using AI information to improve its estimation.

The method predicts this estimating function using $h_\theta(X,Q)$. The displayed estimator solves

$$
\frac{1}{n+N}\sum_{i=1}^{n+N}h_\theta(X_i,Q_i)
+\frac{1}{n}\sum_{i=1}^{n}
\left\{U_\theta(X_i,Y_i)-h_\theta(X_i,Q_i)\right\}
=0.
$$

The first term uses predictions on **all observations**. The second uses labeled observations to correct the prediction. At the population level, the two contributions involving $h_\theta$ cancel, preserving the original estimating equation. The choice of $h_\theta$ determines how much variance can be reduced.

The oracle choice discussed in the talk was

$$
h_\theta^\star(X,Q)
=\mathbb{E}\bigl[U_\theta(X,Y)\mid X,Q\bigr].
$$

This calibrates the quantity defining the parameter using both the covariates and distributional information. In practice, the conditional expectation is unknown and must be estimated. Discrete predictive distributions can be represented by probability vectors; continuous distributions may be represented through summaries or basis coefficients. The information retained in that representation matters for the attainable efficiency.

## Cross-fitting and protection against negative learning

The implementation splits labeled data into three parts with separate roles: obtaining a preliminary parameter estimate, fitting the prediction function, and constructing the corrected estimator using held-out labeled data and the unlabeled sample. Rotating the roles produces three estimates that are then combined.

This **cross-fitting** separates nuisance estimation from the observations used to evaluate its correction. The talk also introduced a calibration matrix that adjusts the strength and direction of the predicted score contribution, reducing reliance on predictions that provide little useful information.

The theoretical discussion distinguished several results. Under the stated regularity and convergence conditions, the cross-fitted estimator is consistent and asymptotically normal. The additional calibration provides a positive-learning guarantee relative to labeled-only inference in terms of asymptotic covariance. When the fitted conditional expectation is consistent for the oracle function, the estimator can attain the relevant efficiency bound for the chosen representation.

These are asymptotic statements under assumptions, rather than a promise that every finite-data run improves on every baseline. The confidence-interval slide described a consistent estimate of the asymptotic covariance, which supports the corresponding normal-approximation intervals.

## Application: politeness ratings

One example used written requests from Stack Exchange and Wikipedia, together with human politeness ratings and an indicator for hedging language. The target was the coefficient on that indicator in a regression of the human ratings.

The model supplied probabilities over 25 possible rating levels. DiPPI could use this distribution rather than collapse it to a single predicted rating.

The slide compared labeled-only estimation, point-prediction methods, and DiPPI using relative RMSE, confidence-interval width, and empirical coverage across different labeled fractions. The example showed gains in estimation error and interval width for DiPPI; coverage was reported separately and varied across methods and labeled fractions.

## Extension: deciding which outcomes to collect

The closing discussion considered a fixed labeling budget. Instead of accepting a predetermined split between labeled and unlabeled observations, an investigator could choose which individuals to survey using their covariates and predictive distributions.

The objective is to select observations that improve inference about the target parameter. The speaker described jointly choosing the sampling strategy and estimating procedure as ongoing work, alongside possible extensions involving multiple predictive distributions.

## Sources and further reading

The [Purdue QM seminar schedule](https://sites.google.com/view/purdue-qm-seminar/schedule) provides the speaker, title, and date. The summary follows the supplied transcript and slide photos; unclear formula references and unrecorded material are not reconstructed.

Related paper: Maoyu Zhang, Jingfei Zhang, and Xuming He. [Beyond Point Predictions: Distribution-Informed Prediction-Powered Inference](https://arxiv.org/abs/2609.32006), 2026.
