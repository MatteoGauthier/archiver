import { SVGProps } from 'react'

export default function FileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path
        fill="currentColor"
        d="M21.89 4H7.83A1.88 1.88 0 0 0 6 5.91v24.18A1.88 1.88 0 0 0 7.83 32h20.34A1.88 1.88 0 0 0 30 30.09V11.92Zm-.3 2.49l6 5.9h-6ZM8 30V6h12v8h8v16Z"
      ></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  )
}
