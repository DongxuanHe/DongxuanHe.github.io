---
layout: post
title: "Success Conditioning as Policy Improvement"
date: 2026-11-13 15:00:00 -0500
description: "Why imitating successful trajectories can improve a policy, and how action influence limits the gain."
categories: [icon]
tags: [seminar, reinforcement-learning, imitation-learning, policy-improvement, llm-post-training]
related_posts: false
source_archive: _blog_sources/2026-11-13-success-conditioning-as-policy-improvement/
---

**[Daniel Russo](https://djrusso.github.io/), Columbia University**<br>
Purdue ICON Weekly Seminar · November 13, 2026

The talk asked what is actually optimized when a policy learns only from its successful attempts. The procedure is simple: **generate trajectories, keep successes, and imitate their action choices** through supervised learning.

For a language model, a state is the tokens generated so far, an action is the next token, and success might mean passing unit tests. Given a base policy $\pi_0$ and a binary outcome $R$, the idealized update is

$$
\pi_+(a\mid s)
=\mathbb{P}_{\pi_0}(A_t=a\mid S_t=s,\ R(\tau)=1).
$$

The new policy reproduces the action distribution observed at state $s$ among successful trajectories.

## A conservative policy update

[Russo’s paper](https://arxiv.org/abs/2601.18175) shows that this exact update maximizes a first-order policy-improvement objective within a $\chi^2$ trust region. The region’s size is determined by the data, with states weighted by their frequency along successful trajectories.

Under the paper’s assumptions, exact success conditioning cannot reduce success probability. A single update can still leave a large gap to the optimal policy.

## Success can provide a weak learning signal

Consider two actions with success rates of **49.5% and 50.5%**, initially chosen equally often. Among successful attempts, the better action accounts for only 50.5% of the data. Imitating those attempts therefore raises its selection probability from 50% to just 50.5%; the optimal policy would always choose it.

The key quantity is **action influence**: how strongly variation in action choices changes the chance of success. When both actions succeed at nearly the same rate, filtering for success barely distinguishes them, so the update is small.

The analysis assumes terminating episodes, a fixed success criterion, and an exact conditional distribution, with success possible under the base policy from each nonterminal state. Finite data and imperfect fitting introduce additional error; the exact improvement guarantee does not automatically carry over to practical fine-tuning.

The closing discussion emphasized two choices that shape learning: how trajectories are generated and which outcomes count as successes. Raising a return threshold can sharpen selection, but may also change the objective being learned.

_Based on the supplied transcript and four slide screenshots; the paper was used to check the formal statement. Unclear passages are omitted._
