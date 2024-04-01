# Hive Take Home

## Setup

### Install Dependencies

- In the directory, run `yarn install` or `npm install` to install the client dependencies.

### Start the Client

- In the  directory, start the client by running `yarn start` or `npm start`.

## Design

### Requirements

- A user is be able to open and close the dropdown menu.
- The component supports a single selected & multi select dropdown list
- User is able to select and deselect all options at once.
- The selected option or options are be visible when the dropdown is closed.


### Component Api

The DropDown component is a reusable dropdown menu that supports single and multi-select functionality. It also includes an option to select/deselect all options at once.

Props

| Prop            | Type     | Required | Default Value | Description                                                  |
| --------------- | -------- | -------- | ------------- | ------------------------------------------------------------ |
| `data`          | `Array`  | Yes      | -             | An array of objects representing the dropdown options. Each object should have an `id` and a `name` property. |
| `multiSelect`   | `boolean` | No       | `false`       | Determines whether the dropdown supports multi-select behavior. |
| `label`         | `string` | No       | `''`          | The label to be displayed for the dropdown.                  |
| `dropDownWidth` | `number` | No       | `280`         | The width of the dropdown container in pixels.               |
| `menuHeight`    | `number` | No       | `320`         | The height of the dropdown menu in pixels.                   |
| `optionHeight`  | `number` | No       | `40`          | The height of each option in the dropdown menu in pixels.    |
| `onChangeFunc`  | `function` | No       | `() => {}`    | A callback function that will be called when the selection changes. The function receives the updated `selectedList` as an argument. 
|


### Performance

The component should render large lists efficiently using a Virtualized list
