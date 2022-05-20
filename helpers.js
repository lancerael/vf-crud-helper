import path from 'path'
import fs from 'fs/promises'

process.on('uncaughtException', (error) => {
  console.error(`Oops something went wrong: ${error}`)
  process.exit(1)
})

export const getPath = (fileName) => {
  if (!fileName) throw 'Missing filename!'
  return path.join('./', 'data', `${fileName}.csv`)
}

export const readFile = async (fileName) => {
  return fs.readFile(getPath(fileName), 'utf8')
}

export const writeFile = async (fileName, payload) => {
  return fs.writeFile(getPath(fileName), payload)
}

export const appendFile = async (fileName, item) => {
  if (!item) throw 'Missing item!'
  return fs.appendFile(getPath(fileName), item)
}