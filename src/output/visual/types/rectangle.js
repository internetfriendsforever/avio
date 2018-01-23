import shape from '../render/shape'

export default shape({
  type: 'rectangle',

  props: {
    x: 0.5,
    y: 0.5,
    width: 1,
    height: 1,
    rotation: 0,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: context => (props, aspect) => {
    const { x, y, width, height, hue, saturation, lightness, alpha } = props

    context.translate(x, y)
    context.translate(-width / 2, -height / 2)
    context.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`
    context.fillRect(0, 0, width, height)
  }
})
