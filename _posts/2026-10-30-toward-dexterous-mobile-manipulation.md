---
layout: post
title: "Toward Dexterous Mobile Manipulation"
date: 2026-10-30 15:00:00 -0400
description: "Nikolaus Correll on combining industrial automation, language models, optimization, and robot learning for dexterous mobile manipulation."
categories: [icon]
tags: [seminar, robotic-manipulation, humanoid-robots, model-predictive-control, sim-to-real]
related_posts: false
source_archive: _blog_sources/2026-10-30-toward-dexterous-mobile-manipulation/
---

**Speaker:** Nikolaus Correll, University of Notre Dame<br>
**Date:** October 30, 2026<br>
**Series:** Purdue ICON Weekly Seminar

The talk examined what is still required to make dexterous mobile manipulation useful outside a demonstration. Correll connected earlier industrial manipulation systems with current work on EV battery disassembly, humanoid control, and simulation-based optimization. A recurring theme was choosing where to use learned capabilities and where established robotics methods already provide useful tools.

The available recording begins during an example and ends partway through the final discussion. These notes summarize that recording, supported by three screenshots from the presentation.

## A working demonstration is only part of the application

The opening examples covered industrial kitting and assembly, gentle handling of strawberries, grocery picking, and integration with a worker’s task-tracking interface. They illustrated capabilities that could be achieved with relatively structured systems, including wrist-mounted vision and independently controlled gripper fingers.

They also exposed limitations that a short video can hide. A shelf-restocking demonstration may cover only a small reachable area, while a complete application requires access to other heights and locations. A successful manipulation skill still needs to fit the surrounding workflow and solve a problem that an industrial partner is willing to adopt.

In one strawberry-handling example, regulating motor current was sufficient without using the available tactile sensors. Later examples returned to the benefits of fingertip sensing. The role of sensing therefore depended on the task and the mechanical system being controlled.

## Use battery disassembly as a concrete target

EV battery disassembly provided the main application for the current work. The proposed workflow combines industrial robots, additional manipulation capabilities, and human work at selected stages. The aim is to reduce difficult manual handling while retaining as much conventional automation as practical.

One prototype paired a trained detector for battery-specific components with a registered representation of the battery’s geometry and parts. A language interface could then interpret a request such as removing the remaining screws and connect it to the corresponding objects and robot actions.

The example made the supporting infrastructure important: the instruction becomes useful because the system has a record of the parts, their locations, and the available operations. Extending the workflow to picking up loosened screws, changing tools, or removing other components adds further manipulation problems.

## Combine high-level reasoning with existing robot tools

The architecture described in the talk combined language and vision models with simulation, perception, navigation, control, and memory. Correll argued for retaining established methods for tasks such as localization and navigation rather than expecting one foundation model to relearn the entire robotics stack.

A persistent challenge is representing what the robot has seen and how the scene changes after an action. A useful memory needs to track objects and their locations while allowing updates when a screw is removed, a part moves, or the robot changes viewpoint.

This places language-based interaction within a larger system. The high-level request still has to connect to an executable skill, current state information, and a controller suited to the hardware.

## Manipulation and balance cannot be separated

A humanoid that can walk or wave does not automatically provide the control needed for manipulation. Forces at the wrists affect the rest of the body, while a balancing response that takes a step can interfere with a precise arm task.

One approach fed an encoding of wrist forces into a learned lower-body policy. The goal was to make the robot account for manipulation loads while maintaining its stance. The talk presented this as continuing work rather than a completed solution to whole-body manipulation.

Correll also discussed model predictive control using physics simulation and derivatives of simulated quantities. A task can be expressed through costs on virtual sensor outputs, allowing numerical optimization to search for useful actions. Examples included standing, responding to disturbances, and leaning against a work surface.

The experiments showed both opportunities and limitations. Online optimization could produce useful behaviour without training a new policy for every example, but local minima and recovery failures remained problems. Reinforcement learning performed better in some of the comparisons shown. The discussion therefore treated optimization and learning as complementary tools whose roles depend on the task.

## Dexterity also depends on hand geometry

Another theme was that a hand’s appearance does not establish its manipulation capability. Limited finger and thumb motions can force substantial changes in wrist orientation or body posture to grasp objects of different sizes. Computing a grasp then involves more than deciding how far to close the fingers.

The examples used simulation-based optimization to account for those geometric constraints. A separate contact experiment compared force measurements at the wrist and fingers, motivating sensing closer to the interaction when a local contact signal is needed to trigger a reflex.

The talk also explored using language models to suggest approximate physical properties, including mass, friction, and stiffness. These estimates could be combined with simple mechanical relationships, such as a spring model, to choose grasping forces for fragile objects. The role of the model was to provide a useful prior that the robot could connect to physical control.

## Precision becomes harder when the base can move

A screw-picking comparison illustrated the gap between a fixed manipulator and mobile manipulation. Correll reported substantially better reliability when the humanoid was supported than when it stood independently, with a further decline in a condition involving locomotion.

The explanation involved body motion, stability, and uncertainty about the target’s location. Visual servoing was already being used, so adding vision alone had not removed the difficulty. The robot still needed accurate coordination between the moving base, hand, and object.

This was one of the talk’s central deployment questions: how can a system preserve the precision of a manipulation skill when the platform supporting that skill is itself moving?

## Bring real environments into simulation

The real-to-sim examples constructed simulation assets from observations of physical objects and environments. Once an object or scene is represented in a simulator, a controller can be explored or optimized before trying the behaviour on the robot.

Another example combined human motion tracking with retargeting to a humanoid. This could provide a starting demonstration, followed by simulation-based refinement or the generation of additional training examples. Differences in body size and movement still have to be handled explicitly; a human step does not always correspond to a single robot step.

The talk also noted that a plausible-looking asset may not reproduce the physical behaviour of the object, as in the example of a generated cable model. Obtaining the geometry is therefore useful progress, while contact and dynamics remain part of making the simulation suitable for control.

## Toward useful systems

The closing discussion connected these methods to laboratory assistance, lower-cost research platforms, better actuators and sensing, and more integrated mechanical design. In the questions, Correll emphasized that the mechanism itself can eliminate or create major control difficulties.

Safety was another unresolved part of the full system. For example, stopping an action must be considered together with the robot’s balance and contact state. The overall direction was to combine advances in language and vision models with optimization, learning, and established automation around specific applications whose reliability can be tested.

## Sources

The [Purdue ICON series announcement](https://www.linkedin.com/posts/purdue-icon_purdue-purdueicon-autonomy-activity-7500218589111685121-ERmk) lists the October 30 talk. The speaker’s [Notre Dame faculty page](https://ame.nd.edu/faculty/nikolaus-correll/) provides his name and affiliation. The summary follows the supplied transcript and screenshots; unclear names and incomplete answers are not reconstructed.
