import { stream, combine } from 'kefir'
import createRegl from 'regl'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import groupBy from 'lodash/groupBy'
import flatten from 'lodash/flatten'
import raf from './raf'

const regl = createRegl({
  attributes: {
    alpha: true,
    premultipliedAlpha: true
  }
})

const renderers = {}
const instances = {}

let renderStream

function onValue (properties) {
  regl.poll()

  regl.clear({
    color: [0, 0, 0, 1]
  })

  forEach(properties, (properties, type) => {
    renderers[type](properties)
  })
}

function add (instance) {
  const type = instance.type

  instances[type].push(instance)

  if (renderStream) {
    renderStream.offValue(onValue)
  }

  const kefirProperties = flatten(map(instances, typeInstances => (
    map(typeInstances, instance => instance.kefirProperty)
  )))

  renderStream = raf(combine(kefirProperties, (...properties) => (
    groupBy(properties, property => property.type)
  ))).onValue(onValue)

  return instance
}

export default function create ({ type, props, render }) {
  instances[type] = []
  renderers[type] = render(regl)

  return {
    create () {
      let emitter

      const instanceProps = Object.assign({}, props)

      const instance = {}

      Object.keys(instanceProps).forEach(key => {
        Object.defineProperty(instance, key, {
          configurable: false,
          enumerable: false,
          writable: false,
          value (value) {
            instanceProps[key] = value

            if (emitter) {
              emitter.emit(instanceProps)
            }

            return instance
          }
        })
      })

      const kefirProperty = stream(e => {
        emitter = e
      }).toProperty(() => instanceProps)

      Object.defineProperty(instance, 'kefirProperty', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: kefirProperty
      })

      Object.defineProperty(instanceProps, 'type', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: type
      })

      Object.defineProperty(instance, 'type', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: type
      })

      return add(instance)
    }
  }
}
