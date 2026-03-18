# Project 2 Student Hub: Lost in the Scroll

Student-facing repo for final project execution and turn-in.

## Why This Repo Uses Issues

Issues are required because they mirror real development workflow.

You will use them to:

- plan and sequence work
- track progress publicly
- report blockers with evidence
- verify final completion

## Use This Template

If you already completed template setup from the Canvas assignment, skip this section and go to **Start Here**.

If you have not created your repo yet:

1. Click [Use this template](https://github.com/sicxz/desn378-project-2-student-hub/generate)
2. Create a new repo named `scrollytelling-[project-title]-[firstname]`
3. Keep it `Public`
4. Clone your new repo locally and start building

After your repo is created:

5. In your own copied repo, delete this `Use This Template` section from `README.md`.

## Start Here

1. Read [Start Here](docs/01-start-here.md) and follow the step-by-step issue setup
2. Open [GSAP Scroll](https://gsap.com/scroll/) and study examples
3. Track progress using [Progress Tracking Options](docs/08-progress-tracking-options.md)
4. Build, test, and check items off as you complete them
5. Submit using [Final Turn-In Spec](docs/03-final-turn-in-spec.md)

## What Is In This Repo

- [Project Completion Checklist (Reference)](docs/02-project-completion-checklist.md)
- [Final Turn-In Spec](docs/03-final-turn-in-spec.md)
- [Project Structure Suggestion](docs/04-project-structure-suggestion.md)
- [Resources](docs/05-resources.md)
- [Copy This Template](docs/06-copy-this-template.md)
- [Kickoff Assignment](docs/07-assignment-kickoff-template-and-tracking.md)
- [Progress Tracking Options](docs/08-progress-tracking-options.md)
- GitHub issue templates for progress tracking and blocker reporting

## How To Use Issues

1. Create `Project 2 Master Checklist` issue first.
2. Create all required sub-issues from templates.
3. Link sub-issues back into the master issue.
4. Use `Blocker Report` if stuck for more than 20 minutes.

# A Scroll Through Time
## Description

This project is a scrollytelling website that walks through different stages of life using birthday celebrations. Each section represents a different age, starting at birth and moving all the way to old age. As you scroll, you move through these moments and see how the way we celebrate changes over time.

At the same time, the project also reflects my experience learning JavaScript. Each section connects to something I learned, starting with “Hello, World” and building into things like variables, event listeners, functions, loops, and conditionals. The scroll acts like a timeline, but also like a program running from start to finish.

The site is built using HTML, CSS, and JavaScript, with GSAP and ScrollTrigger controlling the animations. As you scroll, elements fade in, move across the screen, and layer on top of each other to create depth. Some sections use parallax so different layers move at different speeds, which helps make the experience feel more interactive and engaging.

## The main files include:

index.html, which holds the structure of each section

style.css, which controls layout, typography, and positioning

main.js, which handles all animations using GSAP and ScrollTrigger

One of my main design choices was keeping everything black and white. I wanted the focus to be on the motion and storytelling instead of color. I also adjusted how busy or simple each section felt depending on the age, so the pacing changes as you scroll through the site.

## Links

Live Site: https://p3ytonk.github.io/scrollytelling-a-scroll-through-time-peyton/

Repository: https://github.com/p3ytonk/scrollytelling-a-scroll-through-time-peyton

## Tech Stack

HTML

CSS

JavaScript

GSAP

ScrollTrigger

ScrollSmoother

# Reflection
Metaphor Summary

This project connects growing up with learning JavaScript. Each stage of life lines up with something I learned in coding, showing how both start simple and get more complex over time. By the end, it becomes more about understanding everything as a whole rather than just learning new things.

## Section I Am Most Proud Of

The part I am most proud of is the background movement throughout the site. I spent time making sure it shifts and moves in a way that adds depth without being distracting. It helps tie everything together and makes the scroll feel more smooth and intentional.

## Technical Bug I Solved

One problem I ran into was animations not triggering when they were supposed to. Some elements would not show up or would stay still. I figured out it had to do with my ScrollTrigger settings and how things were being targeted. Once I fixed the triggers and cleaned up my class names, everything started working correctly.

## Accessibility Decision

I added support for reduced motion by checking the user’s system preferences. If reduced motion is turned on, the animations are limited so the site is still easy to use and not overwhelming.

## What I Would Improve With More Time

If I had more time, I would work on making the transitions between sections feel even smoother. I would also explore adding more variation in movement and possibly small color accents to help separate each stage a little more while still keeping the overall style consistent.
