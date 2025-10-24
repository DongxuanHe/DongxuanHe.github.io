---
layout: page
title: Reinforcement Learning for UAV Obstacle Avoidance
description: Training autonomous UAVs to navigate from point A to B while avoiding randomly placed obstacles
img: /assets/img/uav.png
importance: 2
category: work
related_publications: true
---

### Overview

This project explores the application of **reinforcement learning (RL)** to enable **autonomous unmanned aerial vehicles (UAVs)** to safely navigate toward a target location while avoiding obstacles in complex environments.  
Instead of relying on handcrafted control laws or pre-defined paths, the UAV learns an adaptive policy through trial and error, optimizing long-term rewards that balance **goal-reaching** and **collision avoidance**.

The agent interacts with a 2D continuous environment where both the number and positions of obstacles are **randomized** across training episodes.  
By employing **curriculum learning**, the UAV starts in simple scenarios with few obstacles and gradually progresses to dense, cluttered environments—eventually achieving robust, multi-stage avoidance behavior.

### Key Topics
- Policy learning for dynamic obstacle avoidance  
- Environment randomization and curriculum training  
- Reward shaping for stable convergence  
- PPO-based continuous control and behavior generalization  
- Comparative baselines: reactive vs. learned policies  

### Problem Motivation

Classical control methods (e.g., PID or trajectory planning) perform well in static, known environments but struggle in unpredictable or changing obstacle configurations.  
Reinforcement learning offers a model-free alternative: the UAV directly learns **how to react to any configuration** without explicit path planning.  
This flexibility allows for scalable deployment in scenarios where **mission routes, obstacles, or wind disturbances** vary dynamically.

### Future Work


<div class="text-center mt-4">
  <em style="color:gray;">🕒 Publication and more detailed content coming soon.</em>
</div>
