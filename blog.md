---
layout: compress
title: "Blog Posts"
permalink: /blog/
---

<div class="blog-posts-container">
  <h1>Blog Posts</h1>
  <div class="posts-grid">
    {% for post in site.posts %}
      <div class="post-card">
        <div class="post-thumbnail">
          <!-- You can use the 'image' front matter in each post or a default image -->
          {% if post.image %}
            <img src="{{ post.image }}" alt="Thumbnail for {{ post.title }}">
          {% else %}
            <img src="/assets/default-thumbnail.jpg" alt="Default Thumbnail">
          {% endif %}
        </div>
        <div class="post-content">
          <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <a class="read-more" href="{{ post.url | relative_url }}">Read More</a>
        </div>
      </div>
    {% endfor %}
  </div>
</div>
