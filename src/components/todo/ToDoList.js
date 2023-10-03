import ToDo from "./ToDo";

const ToDoList = ({
  displayStatus,
  toDoList,
  important,
  searchText,
  handleToggle,
  handleDelete,
  handleEdit,
  idUpdating,
}) => {
  return (
    <div className="tasks">
      {toDoList
        .filter((todo) => {
          if (important === true) {
            return todo.important === true;
          } else {
            return true;
          }
        })
        .filter((todo) => {
          if (searchText?.length > 0) {
            return todo.courseName
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase());
          } else {
            return true;
          }
        })
        .map((todo) => {
          return (
            <ToDo
              key={todo.id}
              todoItem={todo}
              handleToggleCompleted={handleToggle}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              idUpdating={idUpdating}
            />
          );
        })}
    </div>
  );
};

export default ToDoList;
