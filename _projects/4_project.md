---
layout: page
title: Active Learning Strategies for Image Classification
description: A comparative study of five active learning sampling strategies aimed at reducing labeling cost while maintaining model accuracy.
img: /assets/img/al.png
importance: 4
category: work
related_publications: false
---

### Overview

This project explores how **active learning (AL)** can reduce the cost of data annotation for image classification by selectively querying the most informative samples. Instead of labeling the entire dataset, AL aims to construct a compact yet highly representative training set, allowing models to achieve strong performance with fewer labels.

Our work compares **five active learning sampling strategies** under a unified experimental framework using the Fashion-MNIST dataset. The goal is to understand how different query mechanisms balance *labeling efficiency*, *uncertainty*, and *diversity*.
This project is based on the proposal document
:contentReference[oaicite:1]{index=1}.

---

### Motivation

In real-world machine learning applications, acquiring large labeled datasets is often expensive, slow, or requiring domain expertise. Active learning addresses this challenge by allowing a model to:

- evaluate its uncertainty  
- identify the most valuable unlabeled samples  
- request labels only where they matter  

This makes AL particularly useful in medical imaging, robotics, remote sensing, and any domain where annotation is costly.

Our objective is to conduct a structured comparison and determine which strategies provide the **best trade-off between accuracy and labeling cost**.

---

### Methods Compared

Each team member implements one AL method, forming a diverse set of strategies:

#### • Bayesian Active Learning (BALD) – *He*  
Implements **MC Dropout**–based Bayesian inference (Gal et al., 2017).  
The method evaluates uncertainty via predictive disagreement and selects samples that maximize **mutual information** with the model parameters.

#### • Core-Set Selection – *Pengyuan*  
Implements the **k-Center greedy** algorithm (Sener & Savarese, 2018), treating active learning as a covering problem in feature space.  
This method aims to choose a representative subset that approximates the full training distribution.

#### • BADGE – *Teresa*  
Implements **gradient embedding clustering** (Ash et al., 2020).  
Each sample is mapped to a gradient space capturing both uncertainty and diversity, and batches are chosen using k-means++ initialization.

#### • Uncertainty-Based Sampling – *Wei*  
Implements three classical uncertainty measures:  
- least confidence  
- margin sampling  
- entropy-based sampling  

These approaches query samples where the model is most unsure, providing a strong and widely used baseline.

#### • Consistency-Based Semi-Supervised Active Learning – *Yi*  
Implements the CSAL method (Gao et al., 2020), which leverages unlabeled data through **consistency regularization**.  
By training the model to be stable against perturbations, it improves learning even before labels are acquired.

---

### Experimental Framework

All methods will be compared under the same setup:

- **Dataset**: Fashion-MNIST  
- **Baseline**: Random sampling  
- **Classifier**: CNN model trained iteratively  
- **Evaluation criteria**  
  - Classification accuracy  
  - Label efficiency  
  - Convergence rate across AL rounds  
  - Sample diversity and informativeness  

The shared framework ensures a fair and reproducible comparison.

---

### Expected Outcomes

As the project progresses, the following components will be added:

- Accuracy curves across AL rounds  
- Label efficiency comparisons  
- Visualizations of queried samples  
- Gradient embedding or uncertainty heatmaps  
- Detailed analysis comparing the strengths and weaknesses of each method  

This page will be updated as results and visualizations become available.

---

### Future Extensions

Potential follow-up directions include:

- Extending from Fashion-MNIST to CIFAR-10 or medical imaging datasets  
- Evaluating AL under noisy labels or distribution shifts  
- Investigating hybrid AL strategies combining uncertainty + diversity  
- Applying AL to semi-supervised or reinforcement learning settings  
- Analyzing computational cost vs. performance trade-offs  

<div class="text-center mt-4">
  <em style="color:gray;">🕒 Results, plots, and comparative insights will be added as the project develops.</em>
</div>
