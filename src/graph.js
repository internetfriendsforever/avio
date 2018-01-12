import { combine, interval } from 'kefir'
import spark from 'sparkly'

export default (title = '', stream, timing = 20, count = 10) => {
  combine([
    interval(timing),
    stream
  ], (a, b) => b).slidingWindow(20, 20).observe(value => {
    console.log(Date.now(), title, spark(value, { min: 0, max: 1 }))
  })
}
