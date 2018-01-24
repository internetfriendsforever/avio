import { stream as kefirStream, merge, fromEvents } from 'kefir'
import stream from './stream'
import ZingTouch from 'zingtouch'

document.addEventListener('touchstart', e => {
  e.preventDefault()
}, {
  passive: false
})

const getRegion = (() => {
  let region

  return () => new Promise(resolve => {
    if (region) {
      resolve(region)
    } else {
      window.addEventListener('load', () => {
        if (!region) {
          region = new ZingTouch.Region(document.body)
        }

        resolve(region)
      })
    }
  })
})()

const createGestureStream = (GestureType, options) => (
  kefirStream(emitter => {
    getRegion().then(region => {
      const key = Math.random().toString()
      region.register(key, new GestureType(options))
      region.bind(document.body, key, emitter.emit)
    })
  })
)

const normalizeDistance = px => (
  px / Math.min(window.innerWidth, window.innerHeight)
)

const gestures = {
  tap: createGestureStream(ZingTouch.Tap, null),
  swipe: createGestureStream(ZingTouch.Swipe, null),
  pinch: createGestureStream(ZingTouch.Pinch, null),
  expand: createGestureStream(ZingTouch.Expand, null),
  pan: createGestureStream(ZingTouch.Pan, null),
  rotate: createGestureStream(ZingTouch.Rotate, null)
}

// gestures.pinch.map(e => ['pinch', e.detail.distance]).log()
// gestures.expand.map(e => ['expand', e.detail.distance]).log()

export default {
  down: stream((
    merge([
      fromEvents(document, 'touchstart').map(() => 1),
      fromEvents(document, 'touchend').map(() => 0)
    ])
  ), 0),

  up: stream((
    merge([
      fromEvents(document, 'touchstart').map(() => 0),
      fromEvents(document, 'touchend').map(() => 1)
    ])
  ), 0),

  x: stream(
    merge([
      fromEvents(document, 'touchmove').map(e => e.changedTouches[0].clientX / window.innerWidth),
      fromEvents(document, 'touchstart').map(e => e.changedTouches[0].clientX / window.innerWidth)
    ])
  ),

  y: stream(
    merge([
      fromEvents(document, 'touchmove').map(e => e.changedTouches[0].clientY / window.innerHeight),
      fromEvents(document, 'touchstart').map(e => e.changedTouches[0].clientY / window.innerHeight)
    ])
  ),

  tap: stream(
    gestures.tap.withHandler((emitter, event) => {
      if (event.type === 'value') {
        emitter.emit(1)
        setTimeout(() => emitter.emit(0), event.value.detail.interval)
      }
    })
  ),

  swipe: {
    velocity: stream(
      gestures.swipe.map(event => event.detail.data[0].velocity)
    ),
    direction: stream(
      gestures.swipe.map(event => event.detail.data[0].currentDirection)
    )
  },

  pinch: stream(
    gestures.pinch.map(event => (
      normalizeDistance(event.detail.distance)
    ))
  ),

  expand: stream(
    gestures.expand.map(event => (
      normalizeDistance(event.detail.distance)
    ))
  ),

  pan: {
    distanceFromOrigin: stream(
      gestures.pan.map(event => (
        normalizeDistance(event.detail.data[0].distanceFromOrigin)
      ))
    ),

    directionFromOrigin: stream(
      gestures.pan.map(event => (
        event.detail.data[0].directionFromOrigin
      ))
    ),

    currentDirection: stream(
      gestures.pan.map(event => (
        event.detail.data[0].currentDirection
      ))
    )
  },

  rotate: {
    angle: stream(
      gestures.rotate.map(event => (
        -event.detail.angle
      ))
    ),

    distanceFromOrigin: stream(
      gestures.rotate.map(event => (
        event.detail.distanceFromOrigin
      ))
    ),

    distanceFromLast: stream(
      gestures.rotate.map(event => (
        event.detail.distanceFromLast
      ))
    )
  }

  // tap: stream(
  //   createGestureStream('tap', (emitter, event) => {
  //     emitter.emit(1)
  //     setTimeout(() => emitter.emit(0), event.detail.interval)
  //   })
  // ),

  // tap: options => stream(
  //   kefirStream(emitter => {
  //     getRegion().then(region => {
  //       const key = Math.random().toString()
  //       const gesture = new ZingTouch.Tap(options)
  //
  //       region.register(key, gesture)
  //       region.bind(document.body, key, event => {
  //         emitter.emit(1)
  //         setTimeout(() => emitter.emit(0), event.detail.interval)
  //       })
  //     })
  //   })
  // ),

  // tap: stream(
  //   createGestureStream(ZingTouch.Tap, null, (emitter, event) => {
  //     emitter.emit(1)
  //     setTimeout(() => emitter.emit(0), event.detail.interval)
  //   })
  // ),
  //
  // swipe: {
  //   velocity: stream(
  //     createGestureStream(ZingTouch.Swipe, null, (emitter, event) => {
  //       emitter.emit(1)
  //       setTimeout(() => emitter.emit(0), 100)
  //     })
  //   ),
  //
  //   velocity: stream(
  //     createGestureStream(ZingTouch.Swipe, null, (emitter, event) => {
  //       emitter.emit(1)
  //       setTimeout(() => emitter.emit(0), 100)
  //     })
  //   ),
  // }

  // swipe: options => stream(
  //   kefirStream(emitter => {
  //     getRegion().then(region => {
  //       const key = Math.random().toString()
  //
  //       region.register(key, new ZingTouch.Swipe(options))
  //       region.bind(document.body, key, event => {
  //         emitter.emit(1)
  //         setTimeout(() => emitter.emit(0), event.detail.interval)
  //       })
  //     })
  //   })
  // )

  // swipe: {
  //   velocity: stream(
  //
  //   )
  // }
  //
  // swipe: stream(
  //   createGestureStream('swipe', (emitter, event) => {
  //     emitter.emit(1)
  //     console.log('swipe', event)
  //   })
  // )

  // swipe: {
  //   velocity: stream(
  //     merge([
  //
  //     ])
  //   )
  // }

  // swipe: stream(
  //   createGestureStream('swipe', (emitter, event) => {
  //     emitter.emit(1)
  //     setTimeout(() => emitter.emit(0), event.detail.velocity)
  //   })
  // )
}
