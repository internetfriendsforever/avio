import shape from '../render/shape'

export default shape({
  type: 'circle',

  props: {
    x: 0.5,
    y: 0.5,
    radius: 0.5,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: context => (props, aspect) => {
    const { x, y, radius, hue, saturation, lightness, alpha } = props

    context.translate(x, y)
    aspect()
    context.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`
    context.beginPath()
    context.arc(0, 0, radius, 0, Math.PI * 2)
    context.closePath()
    context.fill()
  }
})
