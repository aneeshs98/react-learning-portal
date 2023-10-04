import { useContext, useState, useEffect } from "react";
import { ToDosDataContext } from "../../contexts/ToDosDataContext";
import ToDoList from "./ToDoList";
import CourseForm from "./CourseForm";
import debounce from "lodash/debounce";

const ToDoManager = ({
  displayStatus,
  searchText,
  darkTheme,
  nextPage,
  setNextPage
}) => {
  const { todoList, updateTodo, createTodo, deleteTodo, fetchNextTodo } =
    useContext(ToDosDataContext);

  const [todoRecord, setTodoRecord] = useState({
    courseName: "",
    courseUrl: "",
    courseType: "",
    platform: 0
  });
  const [idUpdating, setIdUpdating] = useState(0);
  const [addOrEdit, setAddOrEdit] = useState("add"); // "add" or "edit"
  //const [nextPage, setNextPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);

  const handleToggle = (id) => {
    const rec = todoList.find((rec) => rec.id === id);
    if (rec && rec.courseUrl) {
      window.open(rec.courseUrl, '_blank');
    }
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

// Function to load more data when scrolling to the bottom
const loadMoreData = async () => {
  if (isLoading) {
    return;
  }
  setIsLoading(true);
  try {
    let platform;
    if (displayStatus === "all") {
      platform = 0;
    } else if (displayStatus === "udemy") {
      platform = 1;
    } else if (displayStatus === "pluralsight") {
      platform = 2;
    }
    await fetchNextTodo(nextPage, platform, searchText);
    setNextPage(nextPage + 1);
  } catch (error) {
    console.error("Error loading more data:", error);
  } finally {
    setIsLoading(false);
  }
};

// Function to handle scroll event and check if the user reached the bottom
const handleScroll = debounce(() => {
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Check if the user has scrolled to the bottom of the page
  if (scrollY + windowHeight >= documentHeight - 200) {
    setReachedBottom(true);
  } else {
    setReachedBottom(false);
  }
}, 200); // Adjust the debounce delay as needed

// Attach scroll event listener to window only when todoList is not empty
useEffect(() => {
  if (todoList && todoList.length > 0) {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }
}, [todoList]); // Only add/remove listener when todoList changes

// Load more data when the user reaches the bottom
useEffect(() => {
  if (reachedBottom) {
    loadMoreData();
  }
}, [reachedBottom]);


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
        displayStatus={displayStatus} searchText={searchText}
        toDoList={todoList} handleToggle={handleToggle} handleDelete={handleDelete}
        handleEdit={handleEdit} idUpdating={idUpdating} darkTheme={darkTheme}
      />
    </>
  );
};
export default ToDoManager;
