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

This project investigates a **model-free deep reinforcement learning** approach for*UAV obstacle avoidance under partial observability. A continuous-control policy is trained to navigate from a start location to a goal while avoiding randomized static obstacles in a lightweight 2D simulation.

Rather than focusing on algorithmic novelty, this work emphasizes **end-to-end problem formulation**, fair baseline comparison, and systematic evaluation as a first research-style RL project.

### Key Topics
- Reactive obstacle avoidance under partial observability (POMDP)  
- Domain randomization across start–goal pairs and obstacle layouts  
- Reward shaping for safe, smooth, and energy-efficient control  
- PPO-based continuous control (acceleration commands)  
- Baseline comparison against a classical Artificial Potential Field controller  

### Problem Motivation

Classical autonomy pipelines often combine global planners (e.g., A*/RRT) with tracking controllers (PID/MPC). They can work well when maps are accurate and environments are static, but performance degrades when obstacle layouts vary across missions or global maps are unavailable.

**Reinforcement learning** offers a model-free alternative: the UAV directly learns a reactive policy that maps local sensing to control actions, enabling navigation without explicit path planning.

### Problem Formulation

We formulate the task as a partially observable Markov Decision Process **(POMDP)**.

**Dynamics** (2D double integrator): The UAV state evolves with a simple inertial model using continuous acceleration commands, with velocity and actions clipped for feasibility.

**Observations** (local sensing only):
- Goal-relative position:
$$
(x_g - x,\; y_g - y)
$$
- Current velocity:
$$
(v_x,\; v_y)
$$
- Ray-based range sensor distances: $N$ rays over a 180° field of view

No global map is provided.

Actions (continuous control):
- Planar acceleration command: $(a_x, a_y)$

**Reward Design**

The shaped reward encourages safe, smooth, and efficient goal-directed behavior.  
At each timestep $t$, the total reward is defined as:

$$
r_t
= r_t^{\text{prog}}
+ r_t^{\text{goal}}
+ r_t^{\text{col}}
+ r_t^{\text{safe}}
+ r_t^{\text{energy}}
+ r_t^{\text{smooth}}
+ r_t^{\text{time}}
$$

Each component is defined as follows.

- Goal progress:
$$
r_t^{\text{prog}} = \alpha \left( \lVert g_t \rVert - \lVert g_{t+1} \rVert \right),
$$
which rewards reduction in distance to the goal.

- Goal-reaching bonus:
$$
r_t^{\text{goal}} = \kappa \, \mathbb{I}\!\left[\lVert g_{t+1} \rVert \le r_{\text{goal}} \right],
$$
where $\mathbb{I}[\cdot]$ is the indicator function.

- Collision penalty:
$$
r_t^{\text{col}} = -\beta \, \mathbb{I}[\text{collision}],
$$
which strongly penalizes unsafe trajectories.

- Safety-margin penalty:
$$
r_t^{\text{safe}} = -\beta_m \,
\mathbb{I}\!\left[ \min_i \lVert x_t - c_i \rVert \le r_i + m \right],
$$
penalizing proximity to obstacles within a safety margin $m$.

- Energy regularization:
$$
r_t^{\text{energy}} = -\lambda \lVert a_t \rVert^2,
$$
discouraging excessive control effort.

- Smoothness (jerk) regularization:
$$
r_t^{\text{smooth}} = -\mu \lVert a_t - a_{t-1} \rVert^2,
$$
penalizing abrupt changes in control.

- Time penalty:
$$
r_t^{\text{time}} = -\eta,
$$
encouraging efficient task completion.


### Methods

**PPO (learned policy).** We train a continuous-control policy using Proximal Policy Optimization (PPO) with Stable-Baselines3. Training runs for 300k timesteps, and each episode randomizes the start–goal pair and obstacle configuration (domain randomization).

**APF (classical baseline):** We implement an Artificial Potential Field (APF) controller with goal attraction and obstacle repulsion within an influence radius. APF is reactive and does not require training, but is known to suffer from local minima in cluttered environments.

All controllers run under the same dynamics, sensing, and collision checking for a fair comparison.

### Evaluation

Controllers are evaluated on unseen randomized layouts using:
- Success rate (reach goal without collision)
- Collision rate
- Path length
- Episode time
- Energy per step (average squared acceleration)
- Smoothness per step (average squared change in acceleration / jerk proxy)

### Results Summary

On randomized test environments, the learned PPO policy achieves substantially higher reliability and better control quality than APF:

- Success rate ↑: PPO 0.76 vs. APF 0.00  
- Collision rate ↓: PPO 0.22 vs. APF 0.39  
- Avg path length (m): PPO 5.02 vs. APF 4.75  
- Energy per step ↓: PPO 1.06 vs. APF 8.91  
- Smoothness (jerk/step) ↓: PPO 0.10 vs. APF 1.25

<!-- Learning curve (single figure) -->
<div class="text-center">
  <img src="/assets/img/uav/learning_curve_success.png"
       class="img-fluid rounded d-block mx-auto"
       style="max-width: 500px; width: 100%;"
       alt="Learning curve: success rate vs timesteps">

  <p class="text-muted small mt-2">
    Learning curve showing success rate as a function of training timesteps for the PPO policy.
  </p>
</div>

<p class="mt-2">
  The learning curve indicates stable convergence after approximately
  <strong>170k timesteps</strong>, suggesting that the policy consistently improves under
  domain randomization.
</p>


<div class="mt-4"></div>

<!-- Final evaluation: side-by-side figures -->
<div class="row">
  <div class="col-md-6 text-center">
    <img src="/assets/img/uav/fig_success_rate.png"
         class="img-fluid rounded"
         style="max-width: 360px; width: 100%;"
         alt="Final success rate comparison">
    <p class="text-muted small mt-2">
      Final success rate on unseen randomized environments (PPO vs APF).
    </p>
  </div>

  <div class="col-md-6 text-center">
    <img src="/assets/img/uav/fig_energy.png"
         class="img-fluid rounded"
         style="max-width: 360px; width: 100%;"
         alt="Energy per step comparison">
    <p class="text-muted small mt-2">
      Average energy consumption per step (PPO vs APF).
    </p>
  </div>
</div>



Overall, PPO generalizes to unseen static obstacle layouts and produces trajectories that are safer, smoother, and more energy-efficient, while APF frequently fails in clutter due to local minima.

### Limitations and Future Work

This project is limited to a **2D** setting with static obstacles and a restricted **180° range-sensor** observation. Performance degrades in densely cluttered or narrow environments, and reward tuning remains sensitive.

Future directions include:
- Extending to 3D UAV dynamics
- Adding temporal memory (e.g., recurrent policies) to mitigate partial observability
- Handling dynamic obstacles and sensor noise
- Evaluating in higher-fidelity simulators and exploring sim-to-real transfer


### Additional Materials

For readers interested in detailed problem formulation, reward design,
and experimental evaluation, the complete technical report is available here:

- [Project report (PDF)](/assets/files/Final_Report.pdf)
