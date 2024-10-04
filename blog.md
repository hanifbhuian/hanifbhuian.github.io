---
layout: default  # Use your default layout
title: "Blog Posts"
permalink: /blog/
---

<div class="page-content">
  <div class="sidebar">
    {% include sidebar.html %} <!-- This includes your profile section, as seen on the research page -->
  </div>

  <div class="content-area">
    <h1>Blog Posts</h1>
    <ul class="blog-list">
      {% for post in site.posts %}
        <li class="blog-post">
          <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
          <p>{{ post.excerpt }}</p>
          <a class="read-more" href="{{ post.url | relative_url }}">Read More</a>
        </li>
      {% endfor %}
    </ul>
  </div>
</div>
