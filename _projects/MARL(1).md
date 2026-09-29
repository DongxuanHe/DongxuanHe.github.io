---
layout: page
title: Curriculum Learning for Multi-Agent RL
description: Selecting training tasks to accelerate learning on a target multi-agent task
img: /assets/img/multi-agents/MARL.png
importance: 1
category: work
img_alt: A group of learning agents connected through a shared learning system
related_publications: false
---

### Overview

**SCALE Robotics Lab, Purdue University**<br>
Advisor: **Rohan Paleja**

This project investigates **curriculum learning for multi-agent reinforcement learning (MARL)**. The goal is to accelerate learning on a target task by selecting useful intermediate training tasks and transferring the policy between them.

The setting consists of simulated combat tasks with varying numbers of allied and opposing agents. These task configurations provide a space of possible training experiences, raising a central question: **which task should the agents train on next to improve learning on the target task?**

### Task Selection and Policy Transfer

I am developing a task-selection algorithm that considers both **transfer difficulty** and **estimated learning gains on the target task**. The selected task is used for further policy training before the next selection decision.

The aim is to choose intermediate tasks that are learnable from the current policy and useful for the target objective. Progress on an intermediate task is therefore considered in relation to its contribution to target-task learning.

### Current Focus

Current work investigates how **gradient information** and **task configuration features** can inform task selection. This is an ongoing research direction; the objective is to understand which signals help identify useful training tasks and accelerate target-task learning.

### Key Topics

- Multi-agent reinforcement learning
- Curriculum learning and adaptive task selection
- Policy transfer across task configurations
- Transfer difficulty and target-task learning gains
- Gradient information for learning guidance
