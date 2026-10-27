---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 2
---

<div class="post blog-home">
  <header class="header-bar">
    <h1>{{ site.blog_name }}</h1>
    <h2>{{ site.blog_description }}</h2>
  </header>

  <nav class="blog-sections" aria-label="Blog sections">
    {% for section in site.data.blog_sections %}
      {% assign section_posts = site.posts | where_exp: "post", "post.tags contains section.tag" %}
      {% assign note_count = section_posts | size %}
      <a class="blog-section-card" href="{{ section.url | relative_url }}">
        <h2>{{ section.title | escape }}</h2>
        <p>{{ section.description | escape }}</p>
        <span class="blog-section-footer">
          <span>{{ note_count }} {% if note_count == 1 %}note{% else %}notes{% endif %}</span>
          <span>Browse notes <span aria-hidden="true">&rarr;</span></span>
        </span>
      </a>
    {% endfor %}
  </nav>
</div>
