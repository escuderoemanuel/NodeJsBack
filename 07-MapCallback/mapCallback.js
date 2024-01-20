let array = [1, 2, 3, 4, 5]

const myMapFunction = (array, callback) => {
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    let value = callback(array[i])
    newArray.push(value)

  }
  return newArray;
}

console.log(myMapFunction(array, (value) => value * 2))