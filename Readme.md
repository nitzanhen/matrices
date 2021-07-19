# Matrix operation demos

[Demo](https://nitzanhen.github.io/matrices/) (this is the latest version of the React demo, built and deployed using Actions)

This repository contains different implementations of the same small app - a matrix operation calculator.
Each implementation uses a different stack. The purpose of this is to get a first taste for different tools and frameworks - something more than a "hello world" app, but not so big that it takes weeks to complete.

Stack aside, the implementations are meant to be practical clones. Each demo should have seven different screens: a welcome page, and six pages, one for each supported operation. 

The supported operations are:
- Matrix addition
- Matrix multiplication
- Matrix transposition
- Matrix determinants

- Dot products
- Cross products

The welcome page contains a greeting, and links to the operation pages.

## Implementations 

All implementations use Typescript.

- [x] React
- [x] Angular
- [x] Vue
- [x] Svelte

A package exists for each of these; in addition, there's a `common` package, which contains mostly the operation logic itself.
The common package, and particularily the operations in it, are covered by unit tests.

# Reflection

**tl;dr**: My main framework of choice is React, before and after this project; i'm the most experienced with it, and am well accustomed to its unique syntax and methodologies as well as its nuances. That being said, I've gained respect for the strong points of the other frameworks - and in paraticular, I've gained much respect for Angular. 

Before working on the other demos, I had a bit of expreience in working with Vue (vue 2), and some working with Svelte; I had zero experience with Angular.

## React

React was my "control demo" - both in the sense that it's the framework I know best, by far, and in the sense that this demo, as the first one, was where I dealt with the dilemmas of what to actually develop, how to style it, etc. ("design choices" is a large word for this case, but it's something along those lines). One thing I decided upon here, and tried to mimic in the other demos (each implementation adapted to its new enviroment, of course), was the consolidation of all logic related to a matrix under a single custom hook. I've used custom hooks for multiple purposed before, but this was the first time I created a "logical" hook - somewhat like a class, it consolidates all of the math and ui logic of a matrix into one place, but unlike a class it does so in a way that fits in perfectly with React's reactivity model.

Two things I enjoy constantly when using React, and have found lacking in other languages, are the ability to pass around classes between components, and more generally React's aesthetic as an extension of javascript (which the former technically falls under). React's JSX, which allows the developer to mix and match HTML and Javascript, is something that I really missed when working with other frameworks; other frameworks, in one way or another, constrain you to working with their version of conditionals, loops, etc. inside the template (HTML) part, and the ability of JSX to interweave any Javascript code with HTML really felt like a higher degree of freedom. 
(it is worth noting that Vue 3 technically supports JSX, but I've found setting it up to be troublesome, and little documentation about it online).

Additionally, all other frameworks seem to prevent the developer, in varying degrees, from passing CSS from a parent component to a child one. In discussions online, it is always boiled down to some sort of a conscious desicion whose purpose is to enforce encapsulation between components. I understand the importance of encapsulation, of course, but there's no denying that CSS needs to be passed from a parent component to a child component - most notably properties related to flexbox, grid, position, dimensions, etc. Complete isolation of components makes that impossible unless one is using a workaround - all of which brought the CSS into too wide of a scope, risking the developer in introducing CSS conflicts and overrides. The opposite solution is the correct one - the creator of a component should allow modifying it from outside, to the degree they think is right (or as close to it as possible). In that sense, there should be no fundamental difference, in my opinion, between "data" props and style (classname) props.

## Svelte

My first demo after having completed the React one was the Svelte demo. The idea of Svelte - a framework that pushed the heavy workloads towards compile-time rather than run-time - is appealing to me, and I believe that if it really took off into a mature and complete framework like React or Angular, it would prove a most worthy comptetitor. That aside, I like the relative conciseness of Svelte syntax, most notably in effects, computed value, and stores.

However, the "if" I mentioned above is a big if - I've found developing with Svelte to be a non-complete experience, with many weird bugs and lacking dev tooling, few of which had proper documentation online. The Typescript support is also not complete (definitely not when compared to React's or Angular's). And lastly, although my demo was quite small, I've found that Svelte falters when things need to go more abstract - passing in props (including typing of said props) and event handlers dynamically, for one, is an important capability that Svelte doesn't have locked down.  

## Vue

After completing the Svelte demo, I turned to Vue. 
I like Vue. it is quite easy to learn, something in it feels lighter to me, and it does provide a more mature developement experience than svelte.

On the other hand, Vue too is far from being as mature as React or Angular - and it shows. My main strife with the Vue team is that, for some reason I couldn't explain, they never seemed to fully commit to Vue 3. Even though it has the same Options API as Vue 2, even thoughh it performs much better in multiple aspects. In most places the default is Vue 2, and to get to Vue 3 docs / code one has to explicitly search for "Vue 3" or "composiiton API" and find the correct link. The composition API is nice, but whenever I ran into a bug or unexplained error, finding discussion about it online - let alone a solution - required a proper search. JSX didn't work for me, and after finding close to no information about it online - I gave up. 

Vue 3, too, has a lot of potential - and I think it does many things, especially in the small dev-experience-aesthetic areas, better than React. But presently (July 2021), I've found that it doesn't fully make use of this potential.

## Angular

Unlike Vue or Svelte, I had zero knowledge of Angular before working on the demo. I didn't even know, well, how Angular code *looks*. And I've found learning it all to be quite the pleasant experience. To start off, coming to a mature and battle-tested framework like Angular after having worked only with Svelte and Vue for a few days was a welcome change, and I enjoyed completing the two basic tutorials (the shop "try it out" demo and the heroes app tutorial) in the official Angular docs. Its CLI tooling is a pleasure to work with, and I've found some of their features (namely, the dependency injection system) to be very elegant. The separation of (most) components to three files, while seemed to be awkward at first, is actually pretty neat. Angular's way of handling state (Services, RxJS and classes) were a bit tricky, but fun once I picked them up, and I'm sure I've only scratched the surface.

As for pain points, the main difficuly I had with angular is with passing styles, which I explained above. That, and the entire system of working with `ng-content`, `ng-container`, `ng-template`, content project, etc. I've found to be unnecessarily complicated, but may be a point I just don't fully understand yet.

All in all, I think I need to experiment with Angular more, but it seems like a great framework to work with.

# License

[MIT](https://choosealicense.com/licenses/mit/)