import tap from 'tap'
import { pick, pickTruthy, pickFalsy, omit } from './index.js'

const truthyObj = {
  a: true,
  b: 5,
  c: 'string',
  d: new Date(),
  e: BigInt(100),
  f: -5,
  g: 3.14,
  h: Infinity,
  i: [],
  j: {}
}
const falsyObj = {
  one: 0,
  two: -0,
  three: BigInt(0),
  four: '',
  five: null,
  six: undefined,
  seven: NaN 
}

const booleanTestObj = Object.assign({}, truthyObj, falsyObj)

tap.test('pick()', (tap) => {

  tap.test('returns an object with specified props', (tap) => {
    const obj = { a: 1, b: 2, c: 3 }
    const actual = pick(obj, ['a', 'b'])
    const expected = { a: 1, b: 2 }

    tap.strictSame(actual, expected)
    tap.end()  
  })

  tap.test('Returns object with specified props when props contains extra key', (tap) => {
    const obj = { a: 1, b: 2, c: 3 }
    const actual = pick(obj, ['a', 'b', 'd'])
    const expected = { a: 1, b: 2 }

    tap.strictSame(actual, expected)
    tap.end()
  })

  tap.test('Returns empty object if obj is empty', (tap) => {
    const obj = {}
    const actual = pick(obj, ['a', 'b', 'c'])
    const expected = {}

    tap.strictSame(actual, expected)
    tap.end()
  })

  tap.test('Returns empty object if props is empty', (tap) => {
    const obj = { a: 1, b: 2, c: 3 }
    const actual = pick(obj, [])

    tap.strictSame(actual, obj)
    tap.end()
  })

  tap.end()
})

tap.test('pickTruthy():', (tap) => {
  tap.test('Returns truthy props:', (tap) => {
    const actual = pickTruthy(booleanTestObj)

    tap.strictSame(actual, truthyObj)
    tap.strictNotSame(actual, falsyObj)
    tap.end()
  })

  tap.test('Returns empty object when obj is empty: ', (tap) => {
    const actual = pickTruthy({})

    tap.type(actual, 'object')
    tap.equal(Object.keys(actual).length, 0)
    tap.end()
  })

  tap.end()
})

tap.test('pickFalsy():', (tap) => {
  tap.test('Returns falsy props:', (tap) => {
    const actual = pickFalsy(booleanTestObj)

    tap.strictSame(actual, falsyObj)
    tap.strictNotSame(actual, truthyObj)
    tap.end()
  })

  tap.test('Returns empty object when obj is empty: ', (tap) => {
    const actual = pickFalsy({})

    tap.type(actual, 'object')
    tap.equal(Object.keys(actual).length, 0)
    tap.end()
  })

  tap.end()
})

tap.test('omit():', (tap) => {
  tap.test('Returns an object without specified props.', (tap) => {
    const obj = { a: 1, b: 2, c: 3 }
    const actual = omit(obj, ['a', 'b'])
    const expected = { c: 3 }

    tap.strictSame(actual, expected)
    tap.end()  
  })

  tap.test('Returns object withouth specified props when props contains extra keys', (tap) => {
    const obj = { a: 1, b: 2, c: 3 }
    const actual = omit(obj, ['a', 'b', 'd'])
    const expected = { c: 3 }

    tap.strictSame(actual, expected)
    tap.end()
  })

  tap.test('Returns empty object if obj is emptly', (tap) => {
    const actual = omit({}, ['a'])
    tap.strictSame(actual, {})
    tap.end()
  })

  tap.test('Returns empty object if props is emptly', (tap) => {
    const actual = omit({}, [])
    tap.strictSame(actual, {})
    tap.end()
  })

  tap.end()
})
