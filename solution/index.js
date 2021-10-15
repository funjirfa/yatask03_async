module.exports = function (Homework) {
  const asyncArrayLength = (arr) => {
    return new Promise((resolve) => {
      arr.length((result) => resolve(result))
    })
  }

  const asyncArrayGet = (arr, index) => {
    return new Promise((resolve) => {
      arr.get(index, (result) => resolve(result))
    })
  }

  const asyncEqual = (a, b) => {
    return new Promise((resolve) => {
      Homework.equal(a, b, (result) => resolve(result))
    })
  }

  const asyncLess = (a, b) => {
    return new Promise((resolve) => {
      Homework.less(a, b, (result) => resolve(result))
    })
  }

  const asyncAdd = (a, b) => {
    return new Promise((resolve) => {
      Homework.add(a, b, (result) => resolve(result))
    })
  }

  const asyncFunction = (a, b, fn) => {
    return new Promise((resolve) => {
      fn(a, b, (result) => resolve(result))
    })
  }

  const reducer = async (asyncArray, fn, initialValue) => {
    const len = await asyncArrayLength(asyncArray)
    const empty = await asyncEqual(len, 0)
    if (empty) {
      return initialValue
    }

    let result = initialValue
    let index = 0
    let condition = await asyncLess(index, len)
    while (condition) {
      const value = await asyncArrayGet(asyncArray, index)
      result = await asyncFunction(result, value, fn)

      index = await asyncAdd(index, 1)
      condition = await asyncLess(index, len)
    }

    return result
  }

  return (array, fn, initialValue, cb) => {
    reducer(array, fn, initialValue).then((result) => {
      cb(result)
    })
  }
}
