import shape from '../render/shape'

export default shape({
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
    const { x, y, size, rotation, hue, saturation, lightness, alpha } = props

    context.translate(x, y)
    aspect()
    context.rotate(rotation * Math.PI / 180)
    context.translate(-size / 2, -size / 2)
    context.beginPath()
    context.moveTo(size / 2, 0)
    context.lineTo(size, size)
    context.lineTo(0, size)
    context.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`
    context.fill()
  }
})
