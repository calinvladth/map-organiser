![banner](map-organiser-banner.jpg)

## Video preview
[![Watch the video](https://i.vimeocdn.com/video/1919473446-4eba41fe5a3eefa75ce23bee7060f9dd18932e27202c237df086e29ce66da220-d_295x166?r=pad)](https://player.vimeo.com/video/1003105403)


## About this project
This is a basic project that let's you manage things on maps. It allows you to create multiple maps and grow each map however you want with multiple locations.

You can use this project in any way you want, but to be more specific, that's what I'm thinking about: 
- clone it and make it work for your specific use case
- contribute to it, leave a pr and I will get to it

You can check [IMPROVEMENT_IDEAS](/IMPROVEMENT_IDEAS.md) and contribute to it by checking some boxes or by suggesting other improvements.

## What is this project
I started it because I wanted to do something with maps, try sveltekit and some idea of open source.\ 
Because there isn't much logic for server, I use pocketbase.\ 
To give this project a meaning, I thought it would be cool to share a bit of my experience through it. Here, you can see a bit of my coding style and my way of thinking, but i'm open to see other opinions as well. 

## Steps to run the project

From root directory start the client view

```
$ yarn install
$ yarn start
```

From ./pb, start the database server

Important: 
* You need to download [pocketbase](https://pocketbase.io/docs/) based on your system
* Extract the pocketbase file to ./pb
```
$ cd pb/
$ ./pocketbase serve
```

## Resources for this project
Client view docs
- [SvelteKit](https://kit.svelte.dev/docs/introduction) 
- [Tailwind cheat sheet](https://www.creative-tim.com/twcomponents/cheatsheet/)
- [Leaflet](https://leafletjs.com/)
- [Leaflet Plugins](https://leafletjs.com/plugins.html)
- [Typescript](https://www.typescriptlang.org/docs/)

"Server" docs
- [Pocketbase](https://pocketbase.io/docs/)


## Building and deploy
-  Read the docs from the provided resources

