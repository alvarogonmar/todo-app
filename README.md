# Todo App

A task management app I developed with React Native and Expo to practice components, state management, custom hooks, and navigation between screens.

## What does it do?

- Displays the initial tasks from `data/todos.js`.
- Lets users enter a task and add it with the **Add** button, located to the right of the text field.
- Rejects empty titles or titles containing only whitespace.
- Places new tasks at the top of the list and clears the field after adding them.
- Lets users mark a task as complete or incomplete by tapping its title. Completed tasks appear in gray with a strikethrough.
- Deletes a task when the trash icon is tapped.
- Opens a screen when a task title is pressed and held. This screen currently displays the task's identifier (`id`).

## How I built the app

### 1. Created the main screen

In `src/app/index.jsx`, I built the form using `TextInput` and `Pressable`. I used `useState` to store the entered text and `StyleSheet` to define the styles. I placed the field and button in the same row with `flexDirection: "row"` and gave the field `flex: 1` so it would fill the available space.

### 2. Defined the initial data

In `data/todos.js`, I stored an array of tasks. Each task has three properties:

```js
{ id: 1, title: "Do homework", completed: false }
```

The `id` identifies the task, `title` contains its title, and `completed` indicates whether it is finished. On initialization, I sorted the tasks by identifier in descending order.

### 3. Created a component for each task

In `components/TodoItem.jsx`, I separated the presentation of a task into a reusable component. It receives the task and the functions for toggling its completion status, deleting it, and opening its details screen.

On the main screen, I used `FlatList` to display the array. Its `renderItem` prop renders one `TodoItem` per task, and `keyExtractor` uses the identifier as the key.

### 4. Moved the logic into a hook

I created `hooks/useTodos.js` to manage the list's state and operations:

- `addTodo(title)`: validates the title, removes leading and trailing whitespace, assigns an identifier, and adds the task. It returns `true` if the task was added and `false` if the title was empty.
- `toggleTodo(id)`: uses `map` to change the selected task's `completed` value.
- `removeTodo(id)`: uses `filter` to remove the selected task.

The hook returns `todos` and these functions. The form's text stays in `Index`: the `handleAdd` function calls `addTodo(text)` and clears the field when it receives `true`.

### 5. Added navigation

I used Expo Router to open `/details/ID` from `handlePress` through `router.push`. I created the dynamic route `src/app/details/[id].jsx` and used `useLocalSearchParams` to read and display the received identifier.

In `src/app/_layout.tsx`, I configured the screens with `Stack` and the safe area provider with `SafeAreaProvider`.

## Main project structure

```text
components/
  TodoItem.jsx          # Presentation and interactions for each task
data/
  todos.js              # Initial tasks
hooks/
  useTodos.js           # List state and operations
src/app/
  _layout.tsx           # Navigation configuration
  index.jsx             # Task form and list
  details/
    [id].jsx            # Screen displaying the selected ID
```

## How to run it

From the project folder, install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

To open the web version directly:

```bash
npm run web
```

To test the app in Expo Go, its SDK version must match the project's version specified in `package.json`. The app can also run in a compatible mobile environment.

## Current scope

Tasks are kept in memory with `useState`. There is no database or persistent storage: restarting the app loads the tasks from `data/todos.js` again. Adding or deleting tasks through the interface does not modify that file.

The details screen only displays the ID; it does not yet support viewing or editing the task's other data.
