import size from 'filesize.js'
import { useCallback, useState } from 'react'
import Dropzone from '../components/Dropzone'
import download from '../utils/download'
import zipFiles from '../utils/zip'
import { ActionButton } from './../components/ActionButton'

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'ready' | 'loading' | 'success' | 'error'>('idle')
  const [files, setFiles] = useState<File[]>([])

  const totalSize = useCallback(() => {
    return size(
      files.reduce((acc, file) => acc + file.size, 0),
      1,
      'iec'
    )
  }, [files])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setStatus('ready')
      setFiles(acceptedFiles)
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }, [])

  const compressFiles = useCallback(async () => {
    console.log('Compressing files...')

    setStatus('loading')
    try {
      const zipArchive = await zipFiles(files)
      download(zipArchive)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
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

      <pre>{totalSize()}</pre>

      <ActionButton onClick={compressFiles} status={status} />
    </div>
  )
}

// Try with state
// try with ref
