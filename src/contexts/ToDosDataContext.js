import React, { createContext } from "react";
import useTodosData from "../hooks/useTodosData";

export const ToDosDataContext = createContext({
  todoList: [],
  createTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  fetchNextTodo: () => {},
  loadingStatus: "",
  applyPlatformTodo: () => {},
  applySearchTextTodo: () => {}
});

export const TodosDataProvider = ({ children }) => {
  const {
    todoList, createTodo, updateTodo, deleteTodo, loadingStatus, isPending, reFetch, fetchNextTodo, applyPlatformTodo, applySearchTextTodo
  } = useTodosData();

  const value = {
    todoList, createTodo, updateTodo, deleteTodo, loadingStatus, isPending, reFetch, fetchNextTodo, applyPlatformTodo, applySearchTextTodo
  };

  return (
    <ToDosDataContext.Provider value={value}>
      {children}
    </ToDosDataContext.Provider>
  );
};
