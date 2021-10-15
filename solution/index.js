module.exports = function (Homework) {
  function asyncArrayLength(arr) {
    return new Promise((resolve) => {
      arr.length((result) => resolve(result))
    })
  }

  function asyncArrayGet(arr, index) {
    return new Promise((resolve) => {
      arr.get(index, (result) => resolve(result))
    })
  }

  function asyncEqual(a, b) {
    return new Promise((resolve) => {
      Homework.equal(a, b, (result) => resolve(result))
    })
  }

  function asyncLess(a, b) {
    return new Promise((resolve) => {
      Homework.less(a, b, (result) => resolve(result))
    })
  }

  function asyncAdd(a, b) {
    return new Promise((resolve) => {
      Homework.add(a, b, (result) => resolve(result))
    })
  }

  function asyncFunction(a, b, fn) {
    return new Promise((resolve) => {
      fn(a, b, (result) => resolve(result))
    })
  }
  
  return (array, fn, initialValue, cb) => {
    (async () => {
      const len = await asyncArrayLength(array)
      const empty = await asyncEqual(len, 0)
      if (empty) {
        return initialValue
      }

      let result = initialValue
      let index = 0
      let condition = await asyncLess(index, len)
      while (condition) {
        const value = await asyncArrayGet(array, index)
        result = await asyncFunction(result, value, fn)

        index = await asyncAdd(index, 1)
        condition = await asyncLess(index, len)
      }

      return result
    })().then((result) => {cb(result)})
  }
}
