# SVoast changelog

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
