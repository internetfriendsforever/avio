import { combine } from 'kefir'
import createRegl from 'regl'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import groupBy from 'lodash/groupBy'
import flatten from 'lodash/flatten'
import triangleShape from './shapes/triangle'
import circleShape from './shapes/circle'
import raf from './raf'

const regl = createRegl({
  attributes: {
    alpha: true,
    premultipliedAlpha: true
  }
})

const shapes = {}

let renderStream

function onValue (properties) {
  regl.poll()

  regl.clear({
    color: [0, 0, 0, 1]
  })

  forEach(properties, (properties, type) => {
    shapes[type].render(properties)
  })
}

function add (shape) {
  const instance = shape.createInstance()
  const type = instance.type

  if (!shapes[type]) {
    shapes[type] = {
      render: shape.createRenderer(regl),
      instances: []
    }
  }

  shapes[type].instances.push(instance)

  if (renderStream) {
    renderStream.offValue(onValue)
  }

  const kefirProperties = flatten(map(shapes, ({ instances }) => (
    map(instances, instance => instance.kefirProperty)
  )))

  renderStream = raf(combine(kefirProperties, (...properties) => (
    groupBy(properties, property => property.type)
  ))).onValue(onValue)

  return instance
}

function createShapeCreator (shape) {
  return {
    create () {
      return add(shape)
    }
  }
}

export default {
  triangle: createShapeCreator(triangleShape),
  circle: createShapeCreator(circleShape)
}
