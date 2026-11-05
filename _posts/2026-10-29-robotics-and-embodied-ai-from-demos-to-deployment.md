---
layout: post
title: "Robotics and Embodied AI: From Demos to Deployment"
date: 2026-10-29 13:30:00 -0400
description: "Lightning talks and a panel on physical grounding, reactive planning, interpretable policies, multi-robot coordination, and deployment safety."
categories: [purdue-google-ai-summit-2026]
tags: [event, embodied-ai, motion-planning, multi-agent-systems, robot-safety]
related_posts: false
source_archive: _blog_sources/2026-10-29-robotics-and-embodied-ai-from-demos-to-deployment/
---

**Session:** Robotics & Embodied AI: Lightning Talks & Panel<br>
**Speakers:** Yan Gu, Aniket Bera, Zachary Kingston, Rohan Paleja, Shreyas Sundaram, and Raymond Yeh<br>
**Moderator:** Ananth Grama<br>
**Event:** Purdue + Google AI Summit 2026<br>
**Date:** October 29, 2026

This session combined six research presentations with an audience discussion about deploying AI in physical systems. A recurring question was how to connect learned representations and flexible reasoning with the timing, physical constraints, and safety requirements of a robot operating in the real world.

The recording begins during the first presentation and contains several unclear intervals. The summary follows the available material, grouping the discussion by topic.

## Physics and adaptation in changing environments

The opening presentation focused on environments that move or change while a robot is acting. Examples included walking on a moving vessel, striking a fast-moving table-tennis ball, and adjusting contact forces when an external disturbance changes the load on an object.

These cases connect physical modelling with adaptive control and learning. A robot cannot assume that its support surface is stationary or that the forces involved in manipulation remain constant. State estimation, prediction, and control need to account for the changing conditions.

## Make perception useful to the rest of the system

Another presentation examined the full autonomy pipeline: perception, reasoning, planning, validation, and operation. Many successful systems benefit from carefully prepared environments, such as floor markers, prior maps, or fixed manufacturing procedures. Removing that support exposes harder problems.

The discussion emphasized representations that downstream components can use. A visually convincing reconstruction is not automatically sufficient for a robot that needs a current state estimate, semantic relationships, uncertainty information, and constraints on possible actions.

Examples included constructing useful scene representations from limited visual observations and coordinating heterogeneous robots with different capabilities. The question was how perception can support a checkable decision, rather than simply produce an image or an opaque embedding.

## Plan fast enough to react

Zachary Kingston’s presentation distinguished forgiving demonstrations from tasks in which time matters. In a nearly static setting, a robot may pause to reason or recover from a mistake. Intercepting a moving object or responding to a changing obstacle requires much faster decisions.

The examples used rapid motion planning for manipulators and higher-dimensional systems, including whole-body motion. The talk also described combining these planning tools with learned policies and vision-language-action models.

The key idea was to give a higher-level system tools that can respond at the necessary timescale. Model-based planning can then handle motion constraints while learned components contribute task understanding or other capabilities.

## Understand policies and coordinate teams

The next research overview connected robot teaching, policy interpretation, safety constraints, and multi-agent learning. One direction examined internal features of vision-language-action policies to understand which representations affect task success, motion characteristics, and target selection.

Other examples involved steering behaviour with logical constraints, detecting undesirable coordination between agents, and enabling teams to follow strategies communicated through sketches. A multi-agent objective can produce unexpected collective behaviour, so understanding the team’s incentives matters alongside each agent’s individual performance.

Together, these examples treated human teaching, internal representations, and collective incentives as parts of understanding and shaping robot behaviour.

## Use autonomous racing to test the whole stack

Autonomous racing provided a systems-level example of perception, planning, and control under tight physical limits. At high speed, even a short interval between sensor updates corresponds to a substantial distance travelled. Sensor fusion and prediction must therefore support decisions with very little delay.

Planning also needs to account for other teams’ behaviour and willingness to take risks. Control must translate the selected manoeuvre into feasible motion near the vehicle’s performance limits.

In the discussion, adaptation was described as a correction to an existing model. Changes in conditions, such as tyre temperature and available friction, can be handled through sensing and online adaptation without attempting to relearn the entire vehicle model from scratch on each lap.

## Build visual models that answer at the right time

Raymond Yeh’s presentation connected computer vision to three needs of embodied AI: reconstructing environments, reasoning about observations, and maintaining robust perception.

The examples included recovering 3D scene structure from an image, building time-varying representations from video, and answering questions about spatial relationships. For a live video stream, a correct answer is not enough: the system also needs to determine when the relevant evidence has become available and respond promptly.

The presentation also showed how apparently minor visual changes can alter a model’s answer unexpectedly. This motivated work on robustness to transformations such as changes in object scale.

## Will one large model be enough?

The panel did not reach a single answer about whether a general vision-language-action model should become the central component of a robot.

Some responses emphasized the ability of large models to absorb capabilities previously handled by specialized systems. Others argued for modular or hierarchical designs, especially when perception, reasoning, and control operate at different timescales. A model that can call a conventional planner also complicates the distinction between a single intelligent system and a collection of specialized components.

The practical questions were about latency, constraints, failure diagnosis, and choosing methods appropriate to the task. Several speakers emphasized that a plausible plan still needs a way to be checked before it becomes a physical action.

## Scaling data and keeping humans involved

The data discussion covered teleoperation, human video, synthetic environments, and the use of physical priors. Speakers stressed that **quantity, diversity, quality, and alignment with deployment conditions** all matter.

A difficulty with indirect demonstrations is connecting what is visible in a video to the forces and actions needed by a particular robot. Precise contact tasks make that mismatch especially important. Coordinated demonstrations involving several people or robots introduce further collection challenges.

Human input also extends beyond initial demonstrations. Corrections, preferences, rewards, and sketches can help communicate a desired behaviour. The closing exchange raised an earlier problem in that process: people may struggle to articulate what they actually want, even before the system attempts to learn or execute it.

## Safety remains a systems question

The safety discussion ranged from physical failures, such as a humanoid falling, to context-dependent requirements and how a person experiences an interaction. It also raised a difficult question: if a foundation model can itself fail unpredictably, using it to supervise another component does not automatically make the resulting system safe.

Across the session, the central deployment problem was connecting capabilities to explicit assumptions, checks, and mechanisms for responding when those assumptions no longer hold.

## Source and related notes

The [official session page](https://www.purdue.edu/events/ai-summit/robotics-embodied-ai-lightning-talks-panel/) lists the panelists and moderator. These notes summarize the recorded presentations and discussion; unclear project names and numerical claims without sufficient context are omitted.

Other sessions from the same event:

- [From AI Capabilities to Useful Tools]({{ '/blog/2026/from-ai-capabilities-to-useful-tools/' | relative_url }})
- [AI and Big Data for Transportation Systems]({{ '/blog/2026/ai-and-big-data-for-transportation-systems/' | relative_url }})
