---
layout: page
title: Reinforcement Learning for UAV Obstacle Avoidance
description: Learning a reactive UAV controller in a 2D partially observable environment with randomized obstacle layouts
img: /assets/img/uav.png
importance: 2
category: work
related_publications: false
---

### Overview

This project investigates a **model-free deep reinforcement learning** approach for **UAV obstacle avoidance** under **partial observability**.  
A continuous-control policy is trained to navigate from a start location to a goal while avoiding **randomized static obstacles** in a lightweight 2D simulation.

Rather than focusing on algorithmic novelty, this work emphasizes **end-to-end problem formulation**, **fair baseline comparison**, and **systematic evaluation** as a first research-style RL project.

### Key Topics
- Reactive obstacle avoidance under partial observability (POMDP)  
- Domain randomization across start–goal pairs and obstacle layouts  
- Reward shaping for safe, smooth, and energy-efficient control  
- PPO-based continuous control (acceleration commands)  
- Baseline comparison against a classical Artificial Potential Field controller  

### Problem Motivation

Classical autonomy pipelines often combine global planners (e.g., A*/RRT) with tracking controllers (PID/MPC). They can work well when maps are accurate and environments are static, but performance degrades when obstacle layouts vary across missions or global maps are unavailable.

Reinforcement learning offers a model-free alternative: the UAV directly learns a **reactive policy** that maps **local sensing** to control actions, enabling navigation without explicit path planning.

### Problem Formulation

We formulate the task as a **partially observable Markov Decision Process (POMDP)**.

**Dynamics (2D double integrator).** The UAV state evolves with a simple inertial model using continuous acceleration commands, with velocity and actions clipped for feasibility.

**Observations (local sensing only).**
- Goal-relative position: \((x_g-x,\, y_g-y)\)  
- Current velocity: \((v_x,\, v_y)\)  
- Ray-based range sensor distances: \(N\) rays over a **180° field of view**  

No global map is provided.

**Actions (continuous control).**
- Planar acceleration command: \((a_x, a_y)\)

**Reward design.** The shaped reward encourages:
- progress toward the goal,
- a goal-reaching bonus,
- collision and safety-margin penalties,
- energy (control effort) regularization,
- smoothness (jerk) regularization,
- a small per-step time penalty.

### Methods

**PPO (learned policy).** We train a continuous-control policy using **Proximal Policy Optimization (PPO)** with Stable-Baselines3. Training runs for **300k timesteps**, and each episode randomizes the start–goal pair and obstacle configuration (domain randomization).

**APF (classical baseline).** We implement an **Artificial Potential Field (APF)** controller with goal attraction and obstacle repulsion within an influence radius. APF is reactive and does not require training, but is known to suffer from local minima in cluttered environments.

All controllers run under the **same dynamics, sensing, and collision checking** for a fair comparison.

### Evaluation

Controllers are evaluated on **unseen randomized layouts** using:
- Success rate (reach goal without collision)
- Collision rate
- Path length
- Episode time
- Energy per step (average squared acceleration)
- Smoothness per step (average squared change in acceleration / jerk proxy)

### Results Summary

On randomized test environments, the learned PPO policy achieves substantially higher reliability and better control quality than APF:

- **Success rate:** PPO **0.76** vs. APF **0.00**  
- **Collision rate:** PPO **0.22** vs. APF **0.39**  
- **Avg path length (m):** PPO **5.02** vs. APF **4.75**  
- **Energy per step:** PPO **1.06** vs. APF **8.91**  
- **Smoothness (jerk/step):** PPO **0.10** vs. APF **1.25**

Overall, PPO generalizes to unseen static obstacle layouts and produces trajectories that are **safer, smoother, and more energy-efficient**, while APF frequently fails in clutter due to local minima.

### Limitations and Future Work

This project is limited to a **2D** setting with **static obstacles** and a restricted **180° range-sensor observation**. Performance degrades in densely cluttered or narrow environments, and reward tuning remains sensitive.

Future directions include:
- Extending to 3D UAV dynamics
- Adding temporal memory (e.g., recurrent policies) to mitigate partial observability
- Handling dynamic obstacles and sensor noise
- Evaluating in higher-fidelity simulators and exploring sim-to-real transfer
