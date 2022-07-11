import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import size from 'filesize.js'

// const supportsInputDirs = 'webkitdirectory' in HTMLInputElement.prototype
// // const supportsInputDirs = 'webkitdirectory' in document.createElement('input')
// const supportsRelativePath = 'webkitRelativePath' in File.prototype
// const supportsDirs = typeof DataTransferItem != 'undefined' && 'webkitGetAsEntry' in DataTransferItem.prototype

interface DropZoneProps {
  onDrop: (acceptedFiles: File[]) => void
}

export default function Dropzone({ onDrop }: DropZoneProps) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop, noClick:true })
  const dirInputRef = useRef<HTMLInputElement>(null)

  // if (!(supportsInputDirs && supportsRelativePath && supportsDirs)) return <h1>NO</h1>
  return (
    <>
      <span className="block text-sm font-medium text-gray-700 dark:text-gray-100"> Upload zone </span>
      <label
        className="mt-2 flex justify-center rounded-md border-2 border-dashed dark:bg-black/20 border-gray-300 dark:border-opacity-25 px-6 pt-5 pb-6"
        {...getRootProps({
          htmlFor:"file-upload"
        })}
      >
        <div className="flex flex-col items-center space-y-1 text-center">
          <svg width="1em" className="h-10 w-10 text-gray-300" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <path d="M17 8l-5-5l-5 5"></path>
              <path d="M12 3v12"></path>
            </g>
          </svg>
          <div className="flex flex-col text-sm text-gray-600 md:flex-row">
            <div
              
              className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload your files / folders</span>
              <input
                {...getInputProps({
                  multiple: false,
                  id: 'file-upload',
                  name: 'file-upload',
                  ref: dirInputRef,
                })}
                // type="file"
                // className="sr-only"
              />
            </div>
            <p className="pl-1 text-gray-400">or drag and drop them</p>
          </div>
          <p className="text-xs text-gray-500">Recommended up to 500Mib</p>
        </div>
      </label>
    </>
  )
}
