import { combine, constant, stream, fromEvents, merge } from 'https://unpkg.com/kefir@^3.8.6?module';
import { Spring } from 'https://unpkg.com/wobble@^1.5.1?module';

function ensureKefirStream (any) {
  return typeof any === 'number' ? constant(any) : any.kefirProperty
}

const mathFunctions = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  pow: (a, b) => Math.pow(a, b),
  floor: (a) => Math.floor(a),
  ceil: (a) => Math.ceil(a)
};

function decorate (stream, name, value) {
  Object.defineProperty(stream, name, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: value
  });
}

function create (kefirStream, initial = 0) {
  const kefirProperty = kefirStream.toProperty(() => initial);

  const stream = {
    kefirProperty
  };

  Object.keys(mathFunctions).forEach(key => {
    decorate(stream, key, (...args) => (
      create(
        combine([
          kefirProperty,
          ...args.map(arg => ensureKefirStream(arg))
        ], mathFunctions[key])
      )
    ));
  });

  decorate(stream, 'connect', function (fn) {
    kefirProperty.onValue(fn);
    return this
  });

  decorate(stream, 'log', function () {
    kefirProperty.log();
    return this
  });

  decorate(stream, 'throttle', function (...args) {
    return create(kefirProperty.throttle(...args), 0)
  });

  decorate(stream, 'delay', function (...args) {
    return create(kefirProperty.delay(...args), 0)
  });

  decorate(stream, 'spring', function (options) {
    let emit;
    let running;

    const spring = new Spring(options);

    spring
      .onStart(() => {
        running = true;
      })
      .onUpdate((s) => {
        if (emit) {
          emit(s.currentValue);
        }
      })
      .onStop(() => {
        running = false;
      });

    return create(kefirProperty.withHandler((emitter, event) => {
      emit = emitter.emit;

      if (event.type === 'value') {
        spring.updateConfig({
          toValue: event.value
        });

        if (!running) {
          spring.start();
        }
      }
    }))
  });

  return stream
}

const raf = stream(emitter => {
  function tick (time = 0) {
    emitter.emit(time);
    window.requestAnimationFrame(tick);
  }

  tick();
});

var lfo = {
  sine: (rate = 1000) => create((
    raf.map(seconds => Math.sin(seconds / (rate / Math.PI)) * 0.5 + 0.5)
  )),

  square: (rate = 1000) => create((
    raf.map(seconds => Math.round(Math.sin(seconds / (rate / Math.PI)) * 0.5 + 0.5)).skipDuplicates()
  ))
};

var mouse = {
  x: create((
    fromEvents(window, 'mousemove')
      .map(e => e.clientX / window.innerWidth)
      .skipDuplicates()
  ), 0),

  y: create((
    fromEvents(window, 'mousemove')
      .map(e => e.clientY / window.innerHeight)
      .skipDuplicates()
  ), 0),

  down: create((
    merge([
      fromEvents(window, 'mousedown').map(() => 1),
      fromEvents(window, 'mouseup').map(() => 0)
    ])
  ), 0),

  up: create((
    merge([
      fromEvents(window, 'mousedown').map(() => 0),
      fromEvents(window, 'mouseup').map(() => 1)
    ])
  ), 0)
};

document.addEventListener('touchstart', e => {
  e.preventDefault();
}, {
  passive: false
});

var touch = {
  down: create((
    merge([
      fromEvents(document, 'touchstart').map(() => 1),
      fromEvents(document, 'touchend').map(() => 0)
    ])
  ), 0),

  x: create(
    merge([
      fromEvents(document, 'touchmove').map(e => e.changedTouches[0].clientX / window.innerWidth),
      fromEvents(document, 'touchstart').map(e => e.changedTouches[0].clientX / window.innerWidth)
    ])
  ),

  y: create(
    merge([
      fromEvents(document, 'touchmove').map(e => e.changedTouches[0].clientY / window.innerHeight),
      fromEvents(document, 'touchstart').map(e => e.changedTouches[0].clientY / window.innerHeight)
    ])
  )
};



var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  lfo: lfo,
  mouse: mouse,
  stream: create,
  touch: touch
});

const context = new window.AudioContext();

function oscillator () {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.frequency.setTargetAtTime(440, 0, 0);
  oscillator.start();
  oscillator.connect(gain);

  gain.connect(context.destination);
  gain.gain.setTargetAtTime(0, 0, 0);

  const transitionTimes = {
    gain: 0.005,
    frequency: 0.005
  };

  return {
    sine () {
      oscillator.type = 'sine';
      return this
    },

    square () {
      oscillator.type = 'square';
      return this
    },

    sawtooth () {
      oscillator.type = 'sawtooth';
      return this
    },

    triangle () {
      oscillator.type = 'triangle';
      return this
    },

    gainTransitionTime (value) {
      transitionTimes.gain = value;
      return this
    },

    frequencyTransitionTime (value) {
      transitionTimes.frequency = value;
      return this
    },

    gain (value) {
      gain.gain.setTargetAtTime(value, 0, transitionTimes.gain);
      return this
    },

    frequency (value) {
      oscillator.frequency.setTargetAtTime(value, 0, transitionTimes.frequency);
      return this
    }
  }
}



var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  oscillator: oscillator
});

var raf$1 = stream => {
  let value;
  let frame;

  return stream.withHandler((emitter, event) => {
    if (event.type === 'end') {
      emitter.end();
    }

    if (event.type === 'value') {
      value = event.value;

      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = null;
          emitter.emit(value);
        });
      }
    }
  })
};

const canvas = document.createElement('canvas');
const context$1 = canvas.getContext('2d');

window.addEventListener('load', () => {
  document.body.style.margin = 0;
  document.body.appendChild(canvas);
});

canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.display = 'block';

const resize = fromEvents(window, 'resize').map(getSize).toProperty(getSize);

resize.onValue(updateSize);

const instances = [];

let renderStream;

function updateSize (size) {
  canvas.width = size.width;
  canvas.height = size.height;
}

function getSize () {
  return {
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio
  }
}

function aspect () {
  const { width, height } = canvas;

  if (width < height) {
    context$1.scale(1, width / height);
  } else {
    context$1.scale(height / width, 1);
  }
}

function render (instances) {
  context$1.save();
  context$1.fillStyle = 'black';
  context$1.scale(canvas.width, canvas.height);
  context$1.fillRect(0, 0, 1, 1);
  context$1.lineWidth = 1 / Math.min(canvas.width, canvas.height);

  instances.forEach(instance => {
    context$1.save();
    instance.render(context$1, instance, aspect);
    context$1.restore();
  });

  context$1.restore();
}

function add (instance) {
  instances.push(instance);

  if (renderStream) {
    renderStream.offValue(render);
  }

  const kefirProperties = instances.map(instance => instance.kefirProperty);

  renderStream = raf$1(combine([resize, ...kefirProperties], (size, ...properties) => (
    properties
  ))).onValue(render);

  return instance
}

function shape ({ type, props, render }) {
  return function () {
    let emitter;

    const instanceProps = Object.assign({}, props);
    const instance = {};

    Object.keys(instanceProps).forEach(key => {
      Object.defineProperty(instance, key, {
        configurable: false,
        enumerable: false,
        writable: false,
        value (value) {
          instanceProps[key] = value;

          if (emitter) {
            emitter.emit(instanceProps);
          }

          return instance
        }
      });
    });

    const kefirProperty = stream(e => {
      emitter = e;
    }).toProperty(() => instanceProps);

    Object.defineProperty(instance, 'kefirProperty', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: kefirProperty
    });

    Object.defineProperty(instanceProps, 'render', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: render
    });

    return add(instance)
  }
}

var circle = shape({
  type: 'circle',

  props: {
    x: 0,
    y: 0,
    radius: 0.5,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: (context, props, aspect) => {
    const { x, y, radius, hue, saturation, lightness, alpha } = props;

    context.translate(x, y);
    aspect();
    context.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`;
    context.beginPath();
    context.arc(0, 0, Math.max(0, radius), 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
});

var rectangle = shape({
  type: 'rectangle',

  props: {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    rotation: 0,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: (context, props, aspect) => {
    const { x, y, width, height, rotation, hue, saturation, lightness, alpha } = props;

    context.translate(x, y);
    aspect();
    context.rotate(rotation * Math.PI / 180);
    context.translate(-width / 2, -height / 2);
    context.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`;
    context.fillRect(0, 0, width, height);
  }
});

var triangle = shape({
  type: 'triangle',

  props: {
    x: 0,
    y: 0,
    size: 1,
    rotation: 0,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: (context, props, aspect) => {
    const { x, y, size, rotation, hue, saturation, lightness, alpha } = props;

    context.translate(x, y);
    aspect();
    context.rotate(rotation * Math.PI / 180);
    context.translate(-size / 2, -size / 2);
    context.beginPath();
    context.moveTo(size / 2, 0);
    context.lineTo(size, size);
    context.lineTo(0, size);
    context.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`;
    context.fill();
  }
});

var line = shape({
  type: 'line',

  props: {
    x1: 0,
    y1: 0,
    x2: 0.5,
    y2: 0.5,
    width: 0.01,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: (context, props, aspect) => {
    const { x1, y1, x2, y2, width, hue, saturation, lightness, alpha } = props;

    // aspect()
    context.beginPath();
    context.lineWidth = width;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`;
    context.stroke();
  }
});



var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  circle: circle,
  rectangle: rectangle,
  triangle: triangle,
  line: line
});



var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  audio: index$1,
  visual: index$2
});

export { index as input, index$3 as output };
