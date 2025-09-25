// src/TaskContext.js
import { createContext } from "react";

const TaskContext = createContext({
  listState: [],
  setListState: () => {}
});

export default TaskContext;
