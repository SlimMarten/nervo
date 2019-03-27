<p align="center">
    <!-- <img align="center" src="http://exchange.weareslim.de/assets/images/svg/logo_blue.svg" width="100" height="auto" alt="slim Logo" class="js-lazy-loaded"> -->
    <h3 align="center">
        Nervo
    </h3>
    <p align="center">
        [WIP] Javascript Animation Library
    </p>
</p>

## Installation

```
npm i nervo
```

## Usage


```js
import * as Nervo from 'nervo';
```

## Tween

```js
const tween = new Nervo.Tween(start, end, parameters = {});
```

#### Start `type: {}`

```js
{
    x: 0,
    y: 0,
    z: 0,
}
```

#### End `type: {}`

```js
{
    x: 10,
    y: 100,
    z: 1000,
}
```

#### Parameters `type: {}`

* autoStart `type: boolean`
* duration `type: float`
* easing `type: string`
* loop `type: boolean`
* onUpdate `type: callback function`
* onComplete `type: callback function`


#### Methods

* `.start()`
* `.stop()`
* `.play()`
* `.pause()`

## Timeline

```js
const timeline = new Nervo.Timeline();
```
