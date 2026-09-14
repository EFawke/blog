## Greetings, traveller

This is a portfolio site built using next.js.
It hosts blog posts and has a custom auth system.

# Setup

The setup's pretty normal for a next.js app.
You'll have to define an env.local to run this at home.

The Required fields are:

# Contact Form

This is set up using (Google Developer Console)[https://console.cloud.google.com] and a gmail account.
You'll need to get the following data from there.

MY_EMAIL
MY_PASSWORD
SESSION_SECRET

Also create an account on (Cloudinary)[https://console.cloudinary.com/].
This is used to 'host' images, as we couldn't otherwise with vercel!

# Cloudinary

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
CLOUDINARY_FOLDER_NAME

# Postgres

Local env postgres variables.

SSL=true
USER
PORT=5432
NODE_ENV=local

# Blog

You can add or remove blog posts by updating the files in /posts.
Posts must be .md format and contain a header with the following metadata:

---
title: Your Title
date: "2026-09-14"
excerpt: A short summary for the index page.
tags: [The, Tags, You, Want, To, Include]
length: 2 min read
backgroundImage: "yoururl.com"
---

Naturally, this means that you'll have to make a commit to post a blog post.