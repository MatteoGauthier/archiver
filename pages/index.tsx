import size from 'filesize.js'
import Head from 'next/head'
import { useCallback, useMemo, useState } from 'react'
import { FileWithPath } from 'react-dropzone'
import Dropzone from '../components/Dropzone'
import HeaderSEO from '../components/HeaderSEO'
import DeleteIcon from '../components/svg/DeleteIcon'
import FileIcon from '../components/svg/FIleIcon'
import download from '../utils/download'
import transcode from '../utils/ffmpeg'
import { sendGAEvent } from '../utils/gtag'
import SEO from '../utils/seo'
import zipFiles from '../utils/zip'
import { ActionButton } from './../components/ActionButton'

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'ready' | 'loading' | 'success' | 'error'>('idle')
  const [files, setFiles] = useState<FileWithPath[]>([])

  const totalSize = useCallback(() => {
    return size(
      files.reduce((acc, file) => acc + file.size, 0),
      1,
      'iec'
    )
  }, [files])

  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    try {
      console.log('acceptedFiles', acceptedFiles)

      if (acceptedFileItems.length >= 0) {
        setFiles([...files, ...acceptedFiles])
        setStatus('ready')
      }
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }, [])

  const convertFile = useCallback(async () => {
    console.log('Convert files...')

    setStatus('loading')
    try {
      const mp4File = await transcode(files)
      download(mp4File, files[0].name)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }, [files])

  const removeFile = useCallback((path) => {
    setFiles((files) => files.filter((file) => file.path !== path))
  }, [])

  const acceptedFileItems = useMemo(
    () =>
      files.map((file: FileWithPath) => (
        <li
          className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-100 px-2 py-2 shadow-lg shadow-slate-400/20"
          key={file.path}
        >
          <div className="flex items-center  text-sm ">
            <div className="mr-2 flex h-9  w-9 items-center justify-center rounded bg-slate-300 shadow-inner">
              <FileIcon className="h-6 w-6" />
            </div>
            <div>
              <span className="line block max-w-[180px] overflow-hidden text-ellipsis break-all leading-4 text-zinc-700 line-clamp-1 md:max-w-sm">
                {file.path}
              </span>
              <span className="leading-none">{size(file.size, 1, 'iec')}</span>
            </div>
          </div>
          <button onClick={() => removeFile(file.path)} className="mx-2">
            <DeleteIcon className="h-5 w-5 text-red-500" />
          </button>
        </li>
      )),
    [files]
  )

  return (
    <div className="">
      <HeaderSEO />
      <main className="mx-auto max-w-screen-sm px-4 pt-12 md:px-6">
        <h1 className="text-5xl font-bold text-indigo-400">MOV to MP4</h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Just a small website that convert .mov file to .mp4
        </p>
        <hr className="my-8 w-3/4 border-gray-200 dark:border-gray-700 md:my-12" />

        <div>
          <Dropzone onDrop={onDrop} />
        </div>

        <ul className="mt-4 flex flex-col space-y-2">{acceptedFileItems}</ul>

        <pre className="mt-4 inline-block rounded-lg border border-slate-700/10 bg-slate-50 p-1 text-sm">
          {totalSize()}
        </pre>
      </main>

      <footer className="mt-20 mb-3 text-center text-slate-300 dark:text-slate-600">
        Made with love by squale.agency
      </footer>

      <div className="fixed bottom-10  flex w-full justify-center">
        <ActionButton onClick={convertFile} status={status} />
      </div>
    </div>
  )
}

// Try with state
// try with ref
