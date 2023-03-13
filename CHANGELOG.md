# SVoast changelog

## 1.3.0

- Added `rich` option to allow for rich HTML content in the message.
- Added `onMount` and `onRemove` life cycle hooks.
- `removeById` checks if ID exists in store before removing.

## 1.2.1

- Added `removeAll` method.
- Made `removeById` and `removeByIndex` synchronous.

## 1.2.0

- Added `infinite` prop.
- Renamed `remove` to `removeById` to provide better clairity.
- Added `removeByIndex` which will, remove the toast by the given index.

## 1.1.0

- Rewrite of internal code.
  - This doesn't change anything user side but makes it much easier to maintain.
- `opts` passed prop has been replaced by extracting both options to their own separate prop.
  - `export let opts`, `opts.duration` > `export let duration`, `duration`.
- The `component` option is no longer passed to the toast component.

## 1.0.0

- Allowed the use of custom components.
  - Read the [Docs](https://svoast.vercel.app/#custom-components) to learn more.

## 0.1.1

- Exported all used icons.

## 0.1.0

- Added icon to match the type of toast.
- Fixed smaller toasts stretching to the the width of larger toasts.

## 0.0.1

- Hmmmm toast....
