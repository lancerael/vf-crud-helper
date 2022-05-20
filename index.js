 // const fs = require('fs')
// used to resolve issues in different operating systems
// const path = require('path') 
// const helpers = require('./helpers')
// import { readFile } from 'fs'

// const fsPromises = require('fs').promises

/// read the file
// fs.readFile(path.join(__dirname, 'data', 'animals.csv'), 'utf8', (err, data) => {
//   if (err) throw err
//   console.log(data)
// })

// write the file
// fs.writeFile(path.join(__dirname, 'data', 'birds.csv'), 'budgie', (err) => {
//   if (err) throw err
//   console.log('Write complete')
// })

// append the file
// fs.appendFile(path.join(__dirname, 'data', 'sports.csv'), 'football\r\n', (err) => {
//   if (err) throw err
//   console.log('Append complete')
// })

import { failed, readFile, writeFile, appendFile } from './helpers.js'

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
  if (!targetItem) failed('Missing targetItem!')
  if (!newItem) failed('Missing new item!')
  const data = await readFile(fileName)
  const itemArray = data.split('\r\n')  
  const itemIndex = itemArray.indexOf(targetItem)
  if (itemIndex === -1) helpers.failed('Item not found!')
  itemArray[itemIndex] = newItem
  await writeFile(fileName, itemArray.join('\r\n'))
  return readFile(fileName)
}

export const deleteItems = async (fileName, targetItem) => {
  if (!targetItem) failed('Missing targetItem!')
  const data = await readFile(fileName)
  const itemArray = data.split('\r\n')
  const newItemArray = itemArray.filter(item => item !== targetItem)
  if (itemArray.length === newItemArray.length) failed('Item not found!')
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
