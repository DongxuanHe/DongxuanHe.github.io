---
layout: page
title: Projects
permalink: /projects/
description:
nav: true
nav_order: 1
horizontal: false
project_sections:
  - category: research
    title: Research Projects
  - category: course
    title: Course Projects
---

<div class="projects">
  {% for section in page.project_sections %}
    {% assign sorted_projects = site.projects | where: "category", section.category | sort: "importance" %}
    {% if sorted_projects.size > 0 %}
      <section class="mb-5" aria-labelledby="{{ section.category }}-projects">
        <h2 class="project-section-title mb-3" id="{{ section.category }}-projects">{{ section.title }}</h2>
        {% if page.horizontal %}
          <div class="row row-cols-1 row-cols-md-2">
            {% for project in sorted_projects %}
              {% include projects_horizontal.liquid %}
            {% endfor %}
          </div>
        {% else %}
          <div class="row row-cols-1 row-cols-md-2">
            {% for project in sorted_projects %}
              {% include projects.liquid %}
            {% endfor %}
          </div>
        {% endif %}
      </section>
    {% endif %}
  {% endfor %}
</div>
