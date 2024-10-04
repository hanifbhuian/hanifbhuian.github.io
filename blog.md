---
layout: compress
title: "Blog Posts"
permalink: /blog/
---

<div class="blog-posts-container">
  <h1>Blog Posts</h1>
  <ul>
    {% for post in site.posts %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a> - <span>{{ post.date | date: "%B %d, %Y" }}</span>
      </li>
    {% endfor %}
  </ul>
</div>
