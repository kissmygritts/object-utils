const isObject = (obj) => obj !== null && typeof obj === 'object' && Array.isArray(obj) === false

/**
 * Return a new object with the specified `props`.
 * @param {Object} obj - The source object to be picked.
 * @param {string[]} props - An array of the props to be picked
 * @returns {Object} A new object with only the props specified in props
 */
const pick = (obj, props) => {
  if (!props.length) return obj

  const keys = Object.keys(obj)

  return Object.assign({}, ...props.map(prop => {
    if (keys.includes(prop)) return { [prop]: obj[prop] }
  }))
}

/**
 * Create a new object from an object with only truthy values.
 * @param {Object} obj - The source object to be picked.
 * @returns {Object} A new object with only truthy props.
 */
const pickTruthy = (obj) => Object.keys(obj)
  .reduce((acc, key) => !obj[key] ? { ...acc } : { ...acc, [key]: obj[key] }, {})

/**
 * Create a new object from an object with only falsey values.
 * @param {Object} obj - The source object to be picked.
 * @returns {Object} A new object with only falsey props.
 */
const pickFalsy = (obj) => Object.keys(obj)
  .reduce((acc, key) => !!obj[key] ? { ...acc } : { ...acc, [key]: obj[key] }, {})

/**
 * Create a new object from an object with the specified props omitted.
 * @param {Object} obj - The source object to have props omitted.
 * @param {string[]} props - An array of props to omit from the source object.
 * @returns {Object} A new object with the specified props omitted.
 */
const omit = (obj, props) => Object.keys(obj)
  .reduce((acc, key) => props.includes(key) ? { ...acc } : { ...acc, [key]: obj[key] }, {})

export {
  pick,
  pickTruthy,
  pickFalsy,
  omit
}
