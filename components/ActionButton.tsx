import clsx from 'clsx'
import React from 'react'
import { CheckIcon } from './svg/CheckIcon'
import CrossIcon from './svg/CrossIcon'
import LoaderIcon from './svg/LoaderIcon'
import ZipIcon from './svg/ZipIcon'

interface ActionButtonProps {
  onClick: () => void
  status: 'idle' | 'ready' | 'loading' | 'success' | 'error'
}

export function ActionButton({ onClick, status }: ActionButtonProps) {
  return (
    <div className="mt-6 flex items-center justify-center space-x-2">
      <button
        onClick={onClick}
        disabled={status !== 'ready' && status !== 'success' && status !== 'error'}
        className={clsx(
          'appear-scale-opacityduration-1000 flex shadow-lg  cursor-pointer items-center space-x-2 rounded-full px-4 py-2 font-medium text-white disabled:cursor-auto ',
          status == 'idle' && 'shadow-gray-500/30 bg-gray-600',
          status == 'ready' && 'shadow-blue-500/30 bg-blue-600',
          status == 'loading' && 'shadow-orange-500/30 bg-orange-500',
          status == 'success' && 'shadow-green-500/30 bg-green-500',
          status == 'error' && 'shadow-red-500/30 bg-red-500'
        )}
      >
        <span>
          {status == 'idle' && 'Upload your files then zip it'}
          {status == 'ready' && 'Zip these files'}
          {status == 'loading' && 'Zipping... these files'}
          {status == 'success' && 'Zipped these files'}
          {status == 'error' && 'Error while zipping'}
        </span>
        {(status == 'idle' || status == 'ready') && <ZipIcon className="appear-scale-opacity h-6 w-6" />}
        {status == 'loading' && <LoaderIcon className="appear-scale-opacity h-6 w-6 " />}
        {status == 'success' && <CheckIcon className="appear-scale-opacity h-6 w-6 " />}
        {status == 'error' && <CrossIcon className="appear-scale-opacity h-6 w-6 " />}
      </button>
    </div>
  )
}
