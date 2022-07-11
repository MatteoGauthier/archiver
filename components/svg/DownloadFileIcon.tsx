import { SVGProps } from "react";

export default function DownloadFileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path fill="#888888" d="M208 88h-56V32Z" opacity=".2"></path>
      <path
        fill="currentColor"
        d="m213.7 82.3l-56-56A8.1 8.1 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8.1 8.1 0 0 0-2.3-5.7Zm-53.7-31L188.7 80H160ZM200 216H56V40h88v48a8 8 0 0 0 8 8h48v120Zm-38.3-65.7a8.1 8.1 0 0 1 0 11.4l-28 28a8.2 8.2 0 0 1-11.4 0l-28-28a8.1 8.1 0 0 1 11.4-11.4l14.3 14.4V120a8 8 0 0 1 16 0v44.7l14.3-14.4a8.1 8.1 0 0 1 11.4 0Z"
      ></path>
    </svg>
  )
}
