import Head from 'next/head'
import { useCallback, useState } from 'react'
import Dropzone from '../components/Dropzone'
import download from '../utils/download'
import zipFiles from '../utils/zip'

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      // let filesDropped: File[] = []
      // for (let currentFile = 0; currentFile < acceptedFiles.length; currentFile++) {
      //   const file = acceptedFiles[currentFile]
      //   const fileBuffer = await readFileAsync(file)
      //   filesDropped.push(fileBuffer)
      // }
      // setFiles(filesDropped)
      console.log(acceptedFiles)

      setFiles(acceptedFiles)
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }, [])

  const compressFiles = useCallback(async () => {
    const zipArchive = await zipFiles(files)
    download(zipArchive)
    console.log(zipArchive)
  }, [files])

  return (
    <div className="mx-auto max-w-screen-sm">
      <h1>Archiver</h1>
      <p>Just a small website that make archive / zip for your files.</p>
      <hr />

      <div>
        <label className="block text-sm font-medium text-gray-700"> Cover photo </label>

        <Dropzone onDrop={onDrop} />
      </div>

      <div className="mt-6 flex items-center justify-center space-x-2">
        <button onClick={compressFiles} className="rounded-full bg-amber-600 px-4 py-2 font-medium text-white">
          Zip these files
        </button>
        <button
          className="rounded-full bg-amber-600 px-4 py-2 font-medium text-white disabled:opacity-30 disabled:grayscale disabled:filter"
          disabled={status !== 'success'}
        >
          Download the archive
        </button>
      </div>
    </div>
  )
}

// Try with state
// try with ref
