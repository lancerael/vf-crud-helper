import path from 'path'
import fs from 'fs/promises'
const __dirname = new URL('.', import.meta.url).pathname;

const getPath = (fileName) => {
  if (!fileName) throw 'Missing filename!'
  return path.join(__dirname, 'data', `${fileName}.csv`)
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