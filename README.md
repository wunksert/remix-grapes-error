# remix-grapes-error
reproduces a grapesJS error with clean installs of remix and basic implementation of grapesJS

## File structure
- `root.jsx` is the top-level layout
- `grapes.jsx` is the page with Grapes.js implemented
- `lib/grapes/editor` is the initialization

## Get started
1. Run server with yarn dev
2. visit /grapes

### Errors:
1. on page load <img width="738" alt="Screenshot 2023-05-11 at 8 08 52 AM" src="https://github.com/wunksert/remix-grapes-error/assets/12617956/9b1066f2-1fde-4f2d-8574-701b87b4e2bc">
2. Code export exports boilerplate <img width="754" alt="Screenshot 2023-05-11 at 8 09 17 AM" src="https://github.com/wunksert/remix-grapes-error/assets/12617956/589a5989-e72b-4e86-bbe7-e92639bfaf4a">
3. Plugins don't work
4. Drag & drop doesn't work

I think these symptoms are likely all related to the same error

