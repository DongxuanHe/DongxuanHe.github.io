---
layout: post
title: "From AI Capabilities to Useful Tools"
date: 2026-10-29 09:55:00 -0400
description: "Charles Elliott’s keynote on product judgment, scientific workflows, and oversight for long-running AI agents."
categories: [purdue-google-ai-summit-2026]
tags: [event, ai-agents, ai-for-science, product-design, human-ai-interaction]
related_posts: false
source_archive: _blog_sources/2026-10-29-from-ai-capabilities-to-useful-tools/
---

**Speaker:** Charles Elliott, Google Labs<br>
**Event:** Purdue + Google AI Summit 2026<br>
**Date:** October 29, 2026

Charles Elliott’s keynote examined what it takes to turn improving AI capabilities into useful products. The emphasis was on choosing worthwhile problems, understanding how people work, and giving agents enough context and oversight to make progress over longer periods.

## Start with a problem worth solving

Elliott described Google Labs and Google X as environments for exploring ideas that may not yet fit an established product. A recurring principle was to stay committed to the underlying problem while remaining willing to change the proposed solution.

He also argued for revisiting ideas that were previously impractical. A task may become feasible as models improve, costs fall, or the right expertise becomes available. An earlier unsuccessful prototype therefore does not necessarily settle whether an idea is worth pursuing.

One example came from laboratory automation: using models to help translate experimental protocols into code for laboratory robots. The broader point was that useful applications often connect disciplines, requiring both technical capability and an understanding of the domain in which a tool will be used.

## Design around the user’s work

The talk used **taste** to describe judgment about what makes an AI tool helpful in a particular setting. For a developer, this might involve the interface and workflow. For a researcher, it might concern how scientific material is explained or how a proposed method fits an existing process.

Examples included notebook-style assistants that turn source material into accessible explanations and audio discussions, and creative tools developed with input from filmmakers and other creators. These examples illustrated why the surrounding tool matters: users need ways to supply context, steer the output, and continue working with it.

Elliott also distinguished producing a technically valid artifact from communicating it well. A formal proof or lengthy research document may still be difficult for a person to understand. Presentation and interpretability remain part of making the output useful.

## Give long-running agents a clear objective

The next theme was the friction of repeatedly correcting or redirecting an assistant. Agents that operate for hours need a stronger understanding of the user’s intentions than a short prompt may provide.

Elliott described an interview-style interaction in which an agent asks questions about the task before beginning. This can help users express goals they understand intuitively but have not yet specified clearly. Clarifying the objective early may reduce unnecessary work and repeated intervention later.

He discussed research workflows involving literature exploration, hypothesis generation, and computational searches for improvements to existing algorithms. Across these examples, the agent needs both an objective and evidence against which to assess its progress.

## Use agents to generate and challenge hypotheses

The co-scientist example organized hypothesis generation as a process of proposing, reviewing, comparing, and refining ideas. Different agents can bring different perspectives or tools, such as access to literature or computational environments. Tournament-style comparisons and Elo-style ratings help prioritize candidates.

The surrounding workflow starts with selecting a problem, gathering relevant data, and defining an analysis strategy. The proposed hypotheses then give the researcher concrete candidates to investigate.

## Increase autonomy with checkpoints

Elliott closed by connecting autonomy to permissions, cost, and confidence in the result. The suggested progression involved bounded environments for exploration, opportunities for human review, and greater independence only where the work can be evaluated adequately.

His distinction between generating code and accepting it into a codebase was especially concrete: a large amount of AI-generated output does not remove the need for review, evaluation, and benchmarks. The same distinction applies to agents producing research artifacts over longer runs.

## Source and related notes

These notes summarize the recorded keynote. Unclear phrases and an untranscribed video segment are omitted. The [official summit agenda](https://www.purdue.edu/events/ai-summit/) identifies the speaker and session date.

Other sessions from the same event:

- [AI and Big Data for Transportation Systems]({{ '/blog/2026/ai-and-big-data-for-transportation-systems/' | relative_url }})
- [Robotics and Embodied AI: From Demos to Deployment]({{ '/blog/2026/robotics-and-embodied-ai-from-demos-to-deployment/' | relative_url }})
