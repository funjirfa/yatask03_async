module.exports = function (Homework) {
  function asyncArrayLength(arr) {
    return new Promise(function(resolve) {
      arr.length(function(result) { resolve(result) })
    })
  }

  function asyncArrayGet(arr, index) {
    return new Promise(function(resolve) {
      arr.get(index, function(result) { resolve(result) })
    })
  }

  function asyncEqual(a, b) {
    return new Promise(function(resolve) {
      Homework.equal(a, b, function(result) { resolve(result) })
    })
  }

  function asyncLess(a, b) {
    return new Promise(function(resolve) {
      Homework.less(a, b, function(result) { resolve(result) })
    })
  }

  function asyncAdd(a, b) {
    return new Promise(function(resolve) {
      Homework.add(a, b, function(result) { resolve(result) })
    })
  }

  function asyncFunction(a, b, fn) {
    return new Promise(function(resolve) {
      fn(a, b, function(result) { resolve(result) })
    })
  }
  
  return async function (array, fn, initialValue, cb) {
    const len = await asyncArrayLength(array)
    let result = initialValue
    let index = 0
    let condition = await asyncLess(index, len)
    while (condition) {
      index = await asyncAdd(index, 1)
      condition = await asyncLess(index, len)
    }
    cb(result)
  }
}
