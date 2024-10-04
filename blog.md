---
layout: compress
title: "Blog Posts"
permalink: /blog/
---

<div class="page-wrapper">
  <div class="profile-sidebar">
    <!-- If you have a sidebar include for your picture and information, you can include it here -->
    {% include sidebar.html %} <!-- Modify this to your actual include if applicable -->
  </div>

  <div class="content-area">
    <h1>Blog Posts</h1>
    <div class="posts-grid">
      {% for post in site.posts %}
        <div class="post-card">
          <div class="post-thumbnail">
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
</div>
