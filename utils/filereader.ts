export function readFileAsync(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = reject

    reader.readAsArrayBuffer(file)
  })
}
export function readFileU8Async(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => {
      resolve(new Uint8Array(reader.result as ArrayBuffer))
    }

    reader.onerror = reject

    reader.readAsArrayBuffer(file)
  })
}
