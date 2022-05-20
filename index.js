import { readFile, writeFile, appendFile } from './helpers.js'

export const createItems = async (fileName, item) => {
  await appendFile(fileName, `${item}\r\n`)
  return readFile(fileName)
}

export const readItems = async (fileName, index) => {
  const data = await readFile(fileName)
  if (index) return data.split('\r\n')[index]
  else return data
}

export const updateItems = async (fileName, targetItem, newItem) => {
  if (!targetItem) throw 'Missing targetItem!'
  if (!newItem) throw 'Missing new item!'
  const data = await readFile(fileName)
  const itemArray = data.split('\r\n')  
  const itemIndex = itemArray.indexOf(targetItem)
  if (itemIndex === -1) throw 'Item not found!'
  itemArray[itemIndex] = newItem
  await writeFile(fileName, itemArray.join('\r\n'))
  return readFile(fileName)
}

export const deleteItems = async (fileName, targetItem) => {
  if (!targetItem) throw 'Missing targetItem!'
  const data = await readFile(fileName)
  const itemArray = data.split('\r\n')
  const newItemArray = itemArray.filter(item => item !== targetItem)
  if (itemArray.length === newItemArray.length) throw 'Item not found!'
  await writeFile(fileName, newItemArray.join('\r\n'))
  return readFile(fileName)
}

const actions = [
  createItems,
  readItems,
  updateItems,
  deleteItems
]

// console.log(await actions[process.argv[2]](process.argv[3], process.argv[4], process.argv[5]))
