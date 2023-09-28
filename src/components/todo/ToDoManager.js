import { useContext, useState } from "react";
import { ToDosDataContext } from "../../contexts/ToDosDataContext";
import ToDoList from "./ToDoList";
import CourseForm from "./CourseForm";

const ToDoManager = ({
  displayStatus,
  important,
  searchText,
  darkTheme,
}) => {
  const { todoList, updateTodo, createTodo, deleteTodo } =
    useContext(ToDosDataContext);

  const [todoRecord, setTodoRecord] = useState({
    courseName: "",
    courseUrl: "",
    courseType: "",
    platform: 0
  });
  const [idUpdating, setIdUpdating] = useState(0);
  const [addOrEdit, setAddOrEdit] = useState("add"); // "add" or "edit"
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggle = (id) => {
    const rec = todoList.find((rec) => rec.id === id);
    // const recUpdated = {
    //   ...rec,
    //   completed: !rec.completed,
    // };
    // setIdUpdating(rec.id);
    // updateTodo(recUpdated, () => {
    //   setIdUpdating(0);
    // });
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleSubmit = (formData) => {
    if(addOrEdit == "add")
    {
      createTodo(formData);
    }
    else if(addOrEdit == "edit")
    {
      setIdUpdating(todoRecord.id);
      setAddOrEdit("add");
      updateTodo(formData, () => {
        setIdUpdating(0);
      });
    }
    setTodoRecord({
      courseName: "",
      courseUrl: "",
      courseType: "",
      platform: ""
    });
  };

  const handleEdit = (todoItem) => {
    setAddOrEdit("edit");
    setTodoRecord(todoItem);
  };

  const handleCancel = () => {
    setAddOrEdit("add");
    setTodoRecord({
      courseName: "",
      courseUrl: "",
      courseType: "",
      platform: ""
    });
  };

  if (!todoList) {
    return <div className="loading-state-canvas">Loading...</div>;
  }

  return (
    <>
      <div className="form">
        <CourseForm
          mode={addOrEdit}  onSave={handleSubmit}  courseData={todoRecord}
          onCancel={handleCancel}
        />
      </div>

      <ToDoList
        displayStatus={displayStatus} important={important} searchText={searchText}
        toDoList={todoList} handleToggle={handleToggle} handleDelete={handleDelete}
        handleEdit={handleEdit} idUpdating={idUpdating} darkTheme={darkTheme}
      />
    </>
  );
};
export default ToDoManager;
