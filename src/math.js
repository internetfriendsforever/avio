import { combine } from 'kefir'
import math from 'mathjs'

export const multiply = (...streams) => combine(streams, math.multiply)
export const pow = (...streams) => combine(streams, math.pow)
