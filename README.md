# avio

_avio_ is a library for making interactive audio/visual systems in the browser

## Usage

The recommended way is using ECMAScript modules (esm):

```html
<script type='module'>
  import { input, output } from 'https://unpkg.com/avio@0.0.14?module'
</script>
```

## Input

The `input` object are collections of [_signals_](#signals).

### Mouse

The `mouse` collection has the cursor `x` and `y` coordinates relative to the window viewport. The values are decimal numbers between 0 and 1.

```js
input.mouse.x // 0.01, 0.02, 0.03
input.mouse.y // 0.005, 0.008, 0.01
```

## Output

### Audio

#### Oscillator

...

### Visual

...

## Signals

_avio_ uses a high-level concept of _signals_. A _signal_ in _avio_ is an object whose value changes over time, similar to voltage in a wire. It has methods for transformation, inspection and connection. All methods return a signal which means that they can be chained.

### Inspection

A signal can be inspected by using the `print` method. It will print all values continuously in the developer tools console of the browser. In example:
```js
signal.print()
```

### Transformations

#### Math

Basic arithmetic (_add_, _subtract_, _multiply_, _divide_) and all built-in JavaScript [Math methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math#Methods) can be used. In example:

```js
signal.multiply(0.5).subtract(1).sin().pow(2)
```