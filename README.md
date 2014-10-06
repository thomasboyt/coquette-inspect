# coquette-inspect

A Chrome DevTools extension for inspecting [Coquette.js](http://coquette.maryrosecook.com/) games.

## Features

Current:

* List entities currently in the game world

Planned:

* Inspect the properties of entities as they update
* Change the property of entities
* Play/pause/step through the game loop

## Installing

To build:

```
npm install && webpack
```

Then load the `chrome-extension` folder as an unpacked extension ([guide](https://developer.chrome.com/extensions/getstarted#unpacked)).

If it worked, you should see a "Coquette" tab in your developer tools when you open them.

## Usage

There are two modifications you'll need to do to your Coquette apps to make them work.

The most important one is that you expose the Coquette instance in your game as `window.__coquette__`, e.g.:

```js
var Game = function() {
  window.__coquette__ = this.c = new Coquette(this, "canvas", 500, 150, "#000");
// ...
```

The other change is that, for the *name* of an entity to display correctly, *one* of the following needs to be true:

* The entity's constructor needs to have been declared in the format `function Foo() {...}`, *not* `var Foo = function() {...}`. This is so that [function.name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) can work.
* Otherwise, the entity needs to have the property `displayName` set to a string representation of it (e.g. `this.displayName = 'Person'`).
