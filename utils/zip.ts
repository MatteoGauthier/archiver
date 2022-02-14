import * as fflate from 'fflate'
import type { AsyncZippable } from 'fflate'
import { readFileU8AsyncAlt } from './filereader'

export default async function zipFiles(files: File[]): Promise<Uint8Array> {
  return new Promise(async (resolve, reject) => {
    // fflate's ZIP API is asynchronous and parallelized (multithreaded)
    let left = files.length
    let zipObj = {} as AsyncZippable
    // prettier-ignore
    let ALREADY_COMPRESSED = [
      'zip', 'gz', 'png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx', 'ppt', 'pptx',
      'xls', 'xlsx', 'heic', 'heif', '7z', 'bz2', 'rar', 'gif', 'webp', 'webm',
      'mp4', 'mov', 'mp3', 'aifc'
    ];

    console.log(files)

    const reducer = async (acc: any, key: any) => {
      try {
        let data = await readFileU8AsyncAlt(key)
        return { ...(await acc), [key.path]: data }
      } catch (error) {
        return { ...(await acc), [key.path]: { error } }
      }
    }
    const result: any = await files.reduce<any>(reducer, {})

    console.log(await result)

    /*

    const zipObjecttt = await nestPathsIntoObject(files)
    console.log(zipObjecttt)
    console.log(JSON.stringify(zipObjecttt))

    // const fakeObj = { 'hey.jpg': fflate.strToU8(JSON.stringify(files[0])) }
    // console.log(fakeObj)
    // console.log(JSON.stringify(fakeObj))

    */

    const zipped = fflate.zipSync(result, {
      // If you want to control options for every file, you can do so here
      // They are merged with the per-file options (if they exist)
      // mem: 9
      
    })

    console.log('Zipped', zipped.length)
    resolve(zipped)

    /* 

     function (err, out) {
        if (err) {
          console.error(err)

          reject(err)
        } else {
          // You may want to try downloading to see that fflate actually works:
          // download(out, 'fflate-demo.zip');
          console.log('Zipped', out.length)
          resolve(out)
        }
      }

      */

    // Yet again, this is necessary for parallelization.

    // let processFile = async function (i: number) {
    //   let file = files[i]
    //   let ext = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
    //   zipObj[file.name] = [
    //     bufferedFile,
    //     {
    //       level: ALREADY_COMPRESSED.indexOf(ext) == -1 ? 6 : 0,
    //     },
    //   ]
  })
}
