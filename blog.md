---
layout: single
permalink: /blog/
author_profile: true  # This ensures the profile section is included
---

<!-- Blog Posts Page Structure -->
<h2>Blog Posts</h2>

<div class="blog-list">
  {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
  {% for post in sorted_posts %}
  <div class="blog-item">
    <!-- Blog Title linking to the post page -->
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    
    <!-- If you have images associated with each post -->
    {% if post.image %}
      <img src="{{ post.image }}" alt="{{ post.title }}" style="max-width: 100%; height: auto; object-fit: contain;">
    {% endif %}
    
    <!-- Display date -->
    <p><strong>Published on:</strong> {{ post.date | date: "%B %d, %Y" }}</p>
    
    <!-- Blog post excerpt -->
    <p>{{ post.excerpt }}</p>
    
    <!-- Link to the full post -->
    <a href="{{ post.url | relative_url }}">Read More</a>
  </div>
  <hr>
  {% endfor %}
</div>
