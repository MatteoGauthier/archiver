import { SVGProps } from 'react'

export default function LoaderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props} className="animate-spin">
      <path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z"></path>
    </svg>
  )
}
