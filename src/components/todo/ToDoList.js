import ToDo from "./ToDo";

const ToDoList = ({
  displayStatus,
  toDoList,
  handleToggle,
  handleDelete,
  handleEdit,
  idUpdating,
}) => {
  return (
    <div className="tasks">
      {toDoList
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
