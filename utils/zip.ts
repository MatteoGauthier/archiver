import * as fflate from 'fflate'
import type { AsyncZippable } from 'fflate'

const fileToU8 = (file: File, cb: (out: Uint8Array) => void) => {
  const fr = new FileReader()
  fr.onloadend = () => {
    cb(new Uint8Array(fr.result as ArrayBuffer))
  }
  fr.readAsArrayBuffer(file)
}

export default function zipFiles(files: File[]): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    // fflate's ZIP API is asynchronous and parallelized (multithreaded)
    let left = files.length
    let zipObj = {} as AsyncZippable
    // prettier-ignore
    let ALREADY_COMPRESSED = [
      'zip', 'gz', 'png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx', 'ppt', 'pptx',
      'xls', 'xlsx', 'heic', 'heif', '7z', 'bz2', 'rar', 'gif', 'webp', 'webm',
      'mp4', 'mov', 'mp3', 'aifc'
    ];

    // Yet again, this is necessary for parallelization.
    let processFile = function (i: number) {
      let file = files[i]
      let ext = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
      fileToU8(file, function (buf) {
        // With fflate, we can choose which files we want to compress
        zipObj[file.name] = [
          buf,
          {
            level: ALREADY_COMPRESSED.indexOf(ext) == -1 ? 6 : 0,
          },
        ]

        // If we didn't want to specify options:
        // zipObj[file.name] = buf;

        if (!--left) {
          fflate.zip(
            zipObj,
            {
              // If you want to control options for every file, you can do so here
              // They are merged with the per-file options (if they exist)
              // mem: 9
            },
            function (err, out) {
              if (err) reject(err)
              else {
                // You may want to try downloading to see that fflate actually works:
                // download(out, 'fflate-demo.zip');
                console.log('Zipped', out.length)
                resolve(out)
              }
            }
          )
        }
      })
    }
    for (let i = 0; i < files.length; ++i) {
      processFile(i)
    }
  })
}
