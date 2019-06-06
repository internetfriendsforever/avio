export default stream => {
  let previous

  return stream.withHandler((emitter, event) => {
    if (event.type === 'value') {
      if (previous) {
        emitter.emit(event.value - previous)
      }

      previous = event.value
    }
  })
}
