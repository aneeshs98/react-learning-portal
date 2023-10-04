import React from "react";
import ToDoFilterToolbar from "./ToDoFilterToolbar";

const ToDoListWithToolbar = ({
  displayStatus,
  setDisplayStatus,
  searchText,
  setSearchText,
  setNextPage,
  children,
}) => (
  <div>
    <ToDoFilterToolbar
      displayStatus={displayStatus}
      setDisplayStatus={setDisplayStatus}
      searchText={searchText}
      setSearchText={setSearchText}
      setNextPage={setNextPage}
    />
    {children}
  </div>
);
export default ToDoListWithToolbar;
