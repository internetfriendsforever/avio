import createRegl from 'regl'
import triangleShape from './shapes/triangle'
import raf from './raf'

const regl = createRegl()
const shapes = []

raf.onValue(() => {
  regl.poll()

  regl.clear({
    color: [0, 0, 0, 1]
  })

  shapes.forEach(({ render, instances }) => {
    render(instances.map(instance => instance.props()))
  })
})

function createShapeCreator (shape) {
  const instances = []
  const render = shape.createRenderer(regl)

  shapes.push({
    render,
    instances
  })

  return {
    create () {
      const instance = shape.createInstance()
      instances.push(instance)
      return instance
    }
  }
}

export default {
  triangle: createShapeCreator(triangleShape)
}
