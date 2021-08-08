export const done = (res, status, data) => {
  res.set('Access-Control-Allow-Origin', '*')
  if (status === 200 || status === 201) {
    return res.status(status).send(data)
  } else {
    return res.status(status).send({ error: data })
  }
}

export const filterData = (arr = [], obj) => {
  let filtered = {}

  for (key in obj) {
    if (arr.includes(key)) filtered[key] = obj[key]
  }

  return filtered
}

export const checkRequiredField = arr => {
  let hasAllRequiredData = true

  for (el of arr) {
    if (
      !el ||
      el.length === 0 ||
      el === '' ||
      el === null ||
      el === undefined
    ) {
      hasAllRequiredData = false
      break // and break
    }
  }

  if (hasAllRequiredData === false) {
    return false
  } else {
    return true
  }
}

export const getOneItemFromArray = (arr, id) => {
  const index = arr.findIndex(item => item.id === id)
  const data = arr[index]
  return data
}
