import { AsyncZippable, strToU8 } from 'fflate'
import { readFileU8Async } from './filereader'

// TODO: Type those functions
export function updateObjProp(obj: any, value: any, propPath: string): any {
  const [head, ...rest] = propPath.replace(/^\/|\/$/g, '').split('/')

  return !rest.length ? (obj[head] = value) : updateObjProp(obj[head], value, rest.join('/'))
}

// TODO: use callback to check level of compression outside this function and readFileU8Async

function readFile(file: File) {
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      resolve(new Uint8Array(reader.result as ArrayBuffer))
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

export async function nestPathsIntoObject(files: any) {
  let obj: AsyncZippable = {}

  await files.forEach(async (file: any) => {
    file.path
      .replace(/^\/|\/$/g, '')
      .split('/')
      .reduce(function (r: any, e: any, idx: any, arr: any) {
        // return r[e] || (r[e] = {}) // previous version with {} insides

        // (arr.length - 1 == idx ?((r[e] = undefined)) : (r[e] = {}))
        return r[e] || (r[e] = {})
      }, obj)

    // in fileAsString place file as string

    obj = await updateObjProp(
      obj,

      await readFile(file),
      file.path
    )
  })

  console.log('object from nested files', obj)

  return obj
}
