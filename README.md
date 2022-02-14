# Archiver

## Actual problem

Nothing in the archive, it make folder

## Todo's

- [ ] Handle the case webkitdirectory / folder + files is not supported (on mobile)
  - [ ] Polyfill for `webkitdirectory`
- [ ] Find a way to handle directory, create an object backed with path and content (ex. bottom)
```js
let obj = {
  parent_folder: {
    mockup: {
      "demo.png": 'File buffer as Uint8Array',
      "hey.jpg": 'File buffer as Uint8Array',
    
    },
  },
}
```
- [ ] Explore fflate code source in order to understand `fltn` function
- [ ] Don't compress files that are already compressed 
- [ ] Move to `.zip` method instead of `.zipSync`
