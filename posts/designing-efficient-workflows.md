---
title: Designing Efficient Workflows
date: "2025-06-22"
excerpt: A short summary for the index page.
tags: [Tools, UX, Performance]
length: 2 min read
backgroundImage: "https://res.cloudinary.com/dlkofkgto/image/upload/v1788807040/dev_blog/viz6g8cehkhufjrwlhag.jpg"
---

Today I'm going to kick things off with a quote that's been in my head for several years, and it hints at a very interesting idea which is definitely worth keeping in mind when building software.

> "Yahoo has so much leverage in 2007. With the company so far out in front of Google in terms of time spent on Yahoo properties, it comes down to monetization -- Yahoo has the audience, it now has to do something with it."
>
> — Dr. Paul Kedrosky, 2007

To put some concrete numbers to that statement, at the time it was made, internet users spent 8.5% of their time on Yahoo, to Google's 2.1%. That's a stark difference, but here's the thing. At that time in 2007, I really don't think that Google was trying to get users to stick around, they instead did the opposite. Where Yahoo had a cluttered landing page with the weather, the news and a search engine stuck on, Google's homepage consisted of, and still is, just a logo and a search box. They displayed stats showing how many milliseconds it took to fetch the answer to your query. And back then you could actually find what you were looking for on it without having to tack reddit to the end of your query or scroll past 15 adverts.

Anyway, what I'm trying to say is that users value their time, and as a developer, so should you. Unless you're building the next Tik-Tok or YouTube, most users are coming to your app to try to fix some kind of problem that they're encountering. Back before I was a web developer, I used to go outside. More specifically, I spent a couple years running a farm with my sister in the countryside up in Wales. As part of that we had to put up several poly tunnels, and I was using this cheap drill to try to screw a steel screw into an aluminium tube. It was a tough job, and this screw was actually up above my head, and I had to stand on a chair, so not even gravity was on my side. Anyway, after a lot of pain and struggling I had to take a break. Later that day, my friend showed up with a better drill, he was a builder by trade, so his work bought it for him, and he let me use it. The screw went in instantly. That's the big difference between a good tool and a bad one, time. With the bad drill, I could've been up on that chair forever, but the tool my friend lent me was better just because it let me do what I wanted to do quicker.

## Page Load Speed

Now that we've established that time to complete task is the main thing we need to be optimising for, how do we go about it? Well the obvious answer most developers will think of is probably going to be related to performance, and it's actually not a bad place to start the conversation. Developers and search engines are obsessed with page load speed. It's why we learn frameworks like Next.js and Remix which render on the server rather than relying on whatever device their users might be accessing their app from, and the time savings from switching to a SSR framework can be huge. Aside from that, there are several tricks like minimising the number of database connections your page makes, avoiding too many nested loops and even optimising your database engine or devops setup, which can all save valuable milliseconds.

## Common Standards And Conventions

But let's say you want to do better than skimming a few milliseconds. The thrill of refactoring all of your REST routers wasn't enough for you. Well, for your next big time save, you're probably going to need to learn how to be a good designer. The way I've personally taken on this challenge is by doing what the best designers in the industry do and copying each other's homework. If you have some task that a user can complete, give them an element that they've seen before somewhere else. Over the years, there are several kinds of components which users have become accustomed to without ever learning what they're called or why they're used, but now it's your job to figure that out. You've got carousels, accordions, modals, cards, and the list goes on. The trick is figuring out what kind of pattern the thing you're trying to display needs.

On top of that, users have developed a kind of vocabulary for how they interact with elements on the page, and expectations for what happens when they do, these are largely documented in the Web Accessibility Initiative – Accessible Rich Internet Applications (WAI-ARIA) technical specifications. These are a set of rules and standards for delivering accessible web applications that all users will be familiar with. Fortunately, the problem of actually writing code for your components has been taken on by common frameworks like Radix, Ant Designs, Bootstrap, etc and there's no reason to write the javascript for your carousel by hand these days. But the decision to use one kind of element in a specific situation still takes good judgment and pattern recognition.

## Semiotic Resonance

Ok, you've optimised your code so it's executing at the speed of light, you're using common conventions and a modern web development framework with a UI that's super familiar for your users while still making it yours. But now you've got a problem, your users are spending too much time reading about all of your great [insert thing here]. Well, there's an answer to this problem too. Semiotics. According to google, semiotics is "the study of signs and symbols and their use or interpretation". Don't worry, this hasn't turned into a blog about psychology, yet. It's just an interesting concept I've come across lately, and it's weirdly another effective way to save time for your users if you're in a situation where you want to convey a complex idea to them quickly.

Semiotics are actually a huge part of most designs, and once you begin looking for them you can see them everywhere. From the volume icon on your desktop to the little x's we all just assume means "close" nowadays. The basic gist of my point here is don't use words when an icon could do. Don't use a paragraph when an image could do. Just put some thought into how to convey the idea you want to share with as little effort as possible!

So, anyway that's all I've really got for you today. Time is a precious thing, but hopefully these examples show that there's really no reason to keep your users hanging around and struggling when using your app. And there's no shortage of tools at your disposal when considering how to reduce the amount of time it takes for them to get things done. Whether that's Server Side Rendering, serving them a UI that they know how to navigate before they've ever even laid eyes on it, or even tunnelling into the way their brain comprehends meaning.
