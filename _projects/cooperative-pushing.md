---
layout: page
title: Multi-Robot Cooperative Pushing
description: Learning to push and align objects with two robots using limited egocentric observations
img: /assets/img/projects/cooperative-pushing.svg
img_alt: Two mobile robots pushing a rectangular object toward a target pose
importance: 3
category: work
related_publications: false
---

### Overview

**AI4CE Lab, New York University**<br>
Advisor: **Chen Feng**

This project investigates how mobile robots can learn to **cooperatively push and position an object** using limited egocentric observations, without explicit planning or inter-robot communication.

The work extends **EgoPush** to a two-robot pushing setup. The target task is to move a rectangular object to a desired position and orientation in simulation. The robots must coordinate their physical interactions with the object while each acts on its own local observations.

<div class="my-4">
  <img src="{{ '/assets/img/projects/cooperative-pushing.svg' | relative_url }}" alt="Conceptual diagram of two mobile robots pushing an object toward a target position and orientation" class="img-fluid rounded" width="1200" height="675" loading="lazy">
</div>
<div class="caption">Conceptual illustration of cooperative pushing and target-pose alignment; not an experimental rollout.</div>

### Learning Approach

I train cooperative policies using **parameter-shared MAPPO**, with **centralized training and decentralized execution**. The robots share policy parameters, while the centralized critic supports learning during training. At execution time, each robot selects its actions from its own observations.

The task requires more than moving the object toward the goal: the robots also need to align it with the target orientation. Their actions must support a shared outcome despite limited visibility and the effects of one robot's contact on the other robot's interaction with the object.

### Current Focus

Current work evaluates whether two robots can reliably push and align a rectangular object at a target pose in simulation. I also examine unsuccessful rollouts to identify **coordination failures** and understand where the learned behavior breaks down.

### Key Topics

- Cooperative multi-robot manipulation
- Learning from limited egocentric observations
- Parameter sharing in multi-agent reinforcement learning
- Centralized training and decentralized execution
- Object positioning, orientation alignment, and coordination failures
