import { FileWithPath } from 'react-dropzone'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({
  log: true,
  corePath: '/ffmpeg/ffmpeg-core.js',
})

// const doTranscode = async () => {
//   await ffmpeg.load();
//   ffmpeg.FS('writeFile', 'test.avi', await fetchFile('/flame.avi'));
//   await ffmpeg.run('-i', 'test.avi', 'test.mp4');
//   const data = ffmpeg.FS('readFile', 'test.mp4');
//   setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
// };

export default async function transcode(files: FileWithPath[]): Promise<Uint8Array> {
  console.log(files)
  return new Promise(async (resolve, reject) => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load()
    }
    ffmpeg.FS('writeFile', 'input.mov', await fetchFile(files[0]))
    await ffmpeg.run(
      '-i',
      'input.mov',
      '-movflags',
      'faststart',
      '-pix_fmt',
      'yuv420p',
      '-tune',
      'stillimage',
      '-crf',
      '30',
      '-vf',
      "'scale=trunc(iw/2)*2:trunc(ih/2)*2'",
      '-vcodec',
      'h264',
      '-an',
      'output.mp4'
    )
    const data = ffmpeg.FS('readFile', 'output.mp4')
    resolve(data)
  })
}

// ffmpeg -i "$inFile" -movflags faststart -pix_fmt yuv420p -tune stillimage -crf 30 -vf 'scale=trunc(iw/2)*2:trunc(ih/2)*2' -vcodec h264 -an "$filename".mp4
