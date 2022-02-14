import * as fflate from 'fflate'
import type { AsyncZippable, Zippable } from 'fflate'
import { readFileU8AsyncAlt } from './filereader'
import { FileWithPath } from 'react-dropzone'

const pathMapperReducer = async (acc: any, key: any) => {
  try {
    let data = await readFileU8AsyncAlt(key)
    return { ...(await acc), [key.path]: data }
  } catch (error) {
    return { ...(await acc), [key.path]: { error } }
  }
}

export default async function zipFiles(files: FileWithPath[]): Promise<Uint8Array> {
  return new Promise(async (resolve, reject) => {
    const result: AsyncZippable = await files.reduce<any>(pathMapperReducer, {})

    const zipped = fflate.zipSync(result, {})

    console.log('Zipped', zipped.length)
    resolve(zipped)
  })
}
