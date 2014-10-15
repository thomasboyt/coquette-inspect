# coquette-inspect [![Stories in Ready](https://badge.waffle.io/thomasboyt/coquette-inspect.png?label=ready&title=Ready)](https://waffle.io/thomasboyt/coquette-inspect)

A Chrome DevTools extension for inspecting [Coquette.js](http://coquette.maryrosecook.com/) games.

![](https://cloud.githubusercontent.com/assets/579628/4639937/32eca436-5417-11e4-8f2b-422e33b11d9e.gif)

## Features

* List entities currently in the game world
* Inspect the properties of entities as they update
* Change the properties of entities
* Play/pause the game loop
* Step through the game loop

## Installing

To build:

```
npm install && webpack
```

Then load the `chrome-extension` folder as an unpacked extension ([guide](https://developer.chrome.com/extensions/getstarted#unpacked)).

If it worked, you should see a "Coquette" tab in your developer tools when you open them.

## Usage

There are two modifications you'll need to do to your Coquette apps to make them work.

### Exposing Coquette

The most important one is that you expose the Coquette instance in your game as `window.__coquette__`, e.g.:

```js
var Game = function() {
  window.__coquette__ = this.c = new Coquette(this, "canvas", 500, 150, "#000");
// ...
```

Without this, the inspector won't be able to find your Coquette instance.

### Entity display names

To display your entities with their proper names (i.e. their constructors), one of two of the following need to be true:

If your constructors are defined with the syntax `function Foo() {...}`, the name will be looked up with `entity.constructor.name`. This doesn't work if your function is anonymous, e.g. `var Foo = function() {...}`, because that's just how `function.name` works. See [MDN] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) for more detail on this weird quirk.

Otherwise, you can set the `displayName` property on your entity. You can either set it inside the constructor (e.g. `this.displayName = 'Person'`), or inside the call to `entities.create` (e.g. `c.entities.create(Person, {displayName: 'Player'})`).
