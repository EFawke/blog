---
title: Optimising Reaction Schedules in Eve Online
date: "2025-05-03"
excerpt: A short summary for the index page.
tags: [JavaScript, Algorithm, Scheduling]
length: 5 min read
backgroundImage: "https://res.cloudinary.com/dlkofkgto/image/upload/v1788805379/dev_blog/lcgldivbcrrkkcojzhha.jpg"
---

Hi, welcome to my dev blog. Today we're going to be discussing how I lost my mind trying to optimise reaction schedules in Eve Online while making a third-party tool, [Eve Subsystem Analysis](https://evesubsystemanalysis.com/).

For any readers not familiar with Eve - hey, how's it going? Having a social life must be nice. Eve is a sandbox MMO which is many things to many different people. Some players are only interested in shooting one another, some play as evil space emperors, some mine rocks. Personally, I manufacture T3 subsystems and occasionally get blown up in wormholes.

## Spreadsheets in Space

Anyway, I built Eve Subsystem Analysis because I was kind of fed up of using spreadsheets for my manufacturing, and I figured building a tool myself seemed like a fun project. Subsystems are a pretty small and niche market, but the margins tend to be good. There are 48 subsystems in total, and the inputs are almost exactly the same for each, but the price of the end product is always fluctuating, so I wanted a tool that would give me up to date price information on the inputs and the outputs. So I set out to build it and everything was working great. It performed all of the in-game calculations and I had my real-time snapshot of the market like I wanted. The only issue remaining was the reaction slots.

## The Problem

Reactions are a specific step in the manufacturing process of a lot of items in Eve. This is where you mix up some fuel, gas and minerals to create a new material inside of a special type of player-owned station, called a refinery. What this means in practice is a player will have this list of reactions that they have to complete and they'll have a set number of slots that they can do them in (this is a trainable player skill, up to a max of 11 per character). 

For subsystems, each reaction job takes the same amount of time to execute, but the number of jobs per reaction can vary. Also, since users have to log in to begin a reaction, it's preferable to schedule them in a way that you don't have to re-use the same slot for two different kinds of reaction. Ideally you want one kind of reaction per slot for the duration of your build time. This way you can set them up once and come back in x number of days, once all of your reaction jobs are complete.

Most people kind of schedule their reactions by vibes, I would guess. You take a number that's close to the number of reactions total divided by the number of slots you've got, and add a few more in some slots and a few less in others. This achieves the objective of completing all the reactions but it's not necessarily optimal. It leads to having to run reactions for longer than is necessary, and it ends up using more materials than you really need to. I didn't really have a solution for this when I began building my app. Initially, I just told the user how many reactions they would need to run and left the schedule up to them. But as I began using the app myself, I realised that there was an optimal solution for scheduling reactions. Definitionally, there had to be - but, given that no one had really bothered to solve this problem before, I was stuck.

## Dead Ends

I really did look all over the place for some way to solve this problem. I was reading up on wikipedia, google, chatGPT (4o), but the problem just seemed too weird and abstract and niche. Every time I thought I was close to finding a solution it would just be another dead-end. I was reading up on bin-packing problems, and trying to wrap my head around seemingly related math-type stuff before realising it wasn't actually related to the problem I was trying to solve. But then one night, whiteboard marker in hand, I had an idea.

## A-Ha

It's easier to think through the solution if you imagine you're running a real factory. Let's say you're a milkshake producer, you have these milkshakes you need to prepare. You've got orders for 1000L of strawberry milkshake, 700L of banana and 500L of vanilla. Now let's say you have 12 blenders with infinite volume, but the more you put in each blender, the longer you have to blend them, and you don't wanna take that long doing it. So that's 2200L of milkshakes or about 183L per blender.

But there's a problem with that, if you actually use 183L per blender, your vanilla milkshakes will take up 3 blenders, your banana milkshake would take up 4 and the strawberry would take up 6. Wait a minute, that's 13 blenders! But we've already said that our blenders have infinite volume, so what would happen if instead of adding 183L we tried 184? Then if that doesn't work, we try 185 until we reach the smallest number possible (least time) while still fitting all of the milkshake we need to make in the blenders we have. Well it turns out that the correct amount of milkshake is 200L per blender. Some milkshake will be done quicker (there will be blenders with only 100L of milkshake in them) but we don't care about that, we care about how long it takes to finish all our shakes.

That's basically the algorithm I ended up going with. It's an incrementing loop trying to fill all of the available reaction slots starting from the solution that would be the fastest if it actually worked. And because we're incrementing up from the number of total reactions (milkshakes) divided by the number of slots (blenders) the first reaction schedule we arrive at will be the fastest possible - we've already verified the faster alternatives didn't work.

As a bonus, I was able to further optimise the code by performing a binary search to arrive at the solution in a lot less time than by just using brute force. To arrive at a reasonable upper bound for the binary search, we simply increase the increment exponentially until a schedule is found which doesn't require more slots than we have, and binary search between that and the previously tried upper-bound. This was recommended to me by a friend who plays the game and was kind enough to read through an early draft of this blog post. Thanks Ionis!

## The Code

So, without further ado, here's the code. I'll include one example without the binary search because that shows the idea more clearly. The full version with the additional optimisations will be right underneath.

```javascript
// helper function called by scheduleReactions
const runScheduleAlgorithm = (numAboveMean, sortedReactions, meanRuns, slots) => {
    let schedule = [];
    let availableSlots = slots;
    const meanRunsPlusX = meanRuns + numAboveMean;
    for (let i = 0; i < sortedReactions.length; i++) {
        const numberOfInitialRuns = Math.floor(sortedReactions[i].runs / meanRunsPlusX);
        const numberLeftOver = sortedReactions[i].runs - (meanRunsPlusX * numberOfInitialRuns);
        for (let j = 0; j < numberOfInitialRuns; j++) {
            schedule.push({
                name: sortedReactions[i].name,
                runs: meanRunsPlusX,
            });
            availableSlots -= 1;
        }
        if (sortedReactions[i].runs % meanRunsPlusX !== 0) {
            schedule.push({
                name: sortedReactions[i].name,
                runs: numberLeftOver,
            });
            availableSlots -= 1;
        }
    }
    if (availableSlots >= 0) {
        // fastest schedule
        return schedule;
    } else {
        // too many slots, try again
        return runScheduleAlgorithm(numAboveMean + 1, sortedReactions, meanRuns, slots);
    }
};
const scheduleReactions = (reactions, slots) => {
    let schedule = false;
    if (slots > 1000) {
        slots = 1000; // Users probably won't need more than 1000 slots but stops trolling
    }
    const sortedReactions = reactions.sort((a, b) => a.runs - b.runs)
    const reacRunsSum = sortedReactions.reduce((acc, curr) => acc + Number(curr.runs), 0);
    const meanRuns = Math.round(reacRunsSum / slots)
    const numAboveMean = 0;
    if (slots <= sortedReactions.length) {
        // Exit early if user has too few slots
        return sortedReactions;
    } else {
        schedule = runScheduleAlgorithm(numAboveMean + 1, sortedReactions, meanRuns, slots);
    }
    return schedule;
}
module.exports = { scheduleReactions };
```

And now with the binary search optimisation. This isn't strictly necessary. I've seen the above version run for around 30 iterations in some stubborn cases, but usually it's under 10. Regardless, this version usually arrives at the correct answer in fewer iterations and typically uses fewer resources. (Ok I couched my language in a lot of qualifiers here, but please, I'm trying to be accurate)

```javascript
const runScheduleAlgorithm = (numAboveMean, sortedReactions, meanRuns, slots) => {
    let schedule = [];
    let availableSlots = slots;
    const meanRunsPlusX = meanRuns + numAboveMean;
    for (let i = 0; i < sortedReactions.length; i++) {
        const numberOfInitialRuns = Math.floor(sortedReactions[i].runs / meanRunsPlusX);
        const numberLeftOver = sortedReactions[i].runs - (meanRunsPlusX * numberOfInitialRuns);
        for (let j = 0; j < numberOfInitialRuns; j++) {
            schedule.push({
                name: sortedReactions[i].name,
                runs: meanRunsPlusX,
            });
            availableSlots -= 1;
        }
        if (sortedReactions[i].runs % meanRunsPlusX !== 0) {
            schedule.push({
                name: sortedReactions[i].name,
                runs: numberLeftOver,
            });
            availableSlots -= 1;
        }
    }

    if (availableSlots >= 0) {
        // Upper bound
        return {
            success: true,
            schedule: schedule
        }
    } else {
        return {
            success: false,
            schedule: schedule
        }
    }
};

const scheduleReactions = (reactions, slots) => {
    let schedule = false;
    if (slots > 1000) {
        slots = 1000; // User probably won't have 1000 slots
    }
    const sortedReactions = reactions.sort((a, b) => a.runs - b.runs)
    const reacRunsSum = sortedReactions.reduce((acc, curr) => acc + Number(curr.runs), 0);
    const meanRuns = Math.round(reacRunsSum / slots)
    if (slots <= sortedReactions.length) {
        return sortedReactions; // Queue can't be optimised
    }

    let numAboveMean = 1;
    let lastFail = 0;
    let lastSuccess = null;

    while(true){
        const {success} = runScheduleAlgorithm(numAboveMean, sortedReactions, meanRuns, slots)
        if(success){
            lastSuccess = numAboveMean;
            break;
        } else {
            lastFail = numAboveMean;
            numAboveMean *= 2; // Exponential
            if(numAboveMean > reacRunsSum){
                lastSuccess = reacRunsSum;
                break;
            }
        }
    }

    let low = lastFail
    let high = lastSuccess

    // Binary search over schedule ranges
    while(low < high){
        const mid = Math.floor((low + high) / 2);
        const {success} = runScheduleAlgorithm(mid, sortedReactions, meanRuns, slots);
        if(success){
            high = mid;
        } else {
            low = mid + 1
        }
    }

    schedule = runScheduleAlgorithm(low, sortedReactions, meanRuns, slots);
    return schedule;
}

module.exports = { scheduleReactions };
```

## And that's about all I've got to say...

I did not initially set out to design an algorithm for running Eve Online reactions in the shortest amount of time. When I started building this app, it was mostly so that I could spend less time thinking about subsystems and more time getting blown up in wormholes. But when it came down to building this, the issue of reactions schedules was not one I could simply brush off. I still think mine is the only build tool for Eve that properly addresses this specific issue. Hopefully sharing the code here will lead others to adapt their tools and we can all enjoy reaction schedules that aren't based on vibes.