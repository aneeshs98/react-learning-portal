import { useState } from "react";
import ToDoListWithToolbar from "./components/todo/ToDoListWithToolbar";
import { TodosDataProvider } from "./contexts/ToDosDataContext";
import ToDoManager from "./components/todo/ToDoManager";
import Layout from "./components/layout/Layout";

const App = () => {
  const [displayStatus, setDisplayStatus] = useState("all"); // all, udemy, pluralsight
  const [searchText, setSearchText] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);
  const [nextPage, setNextPage] = useState(2);
  const toggleTheme = () => setDarkTheme(!darkTheme);
  return (
    <TodosDataProvider>
      <Layout toggleTheme={toggleTheme} darkTheme={darkTheme}>
        <ToDoListWithToolbar
          displayStatus={displayStatus} setDisplayStatus={setDisplayStatus}
          searchText={searchText} setSearchText={setSearchText}
          setNextPage={setNextPage}
        >
          <ToDoManager
            displayStatus={displayStatus}
            searchText={searchText} darkTheme={darkTheme}
            nextPage={nextPage} setNextPage={setNextPage}
          />
        </ToDoListWithToolbar>
      </Layout>
    </TodosDataProvider>
  );
};
export default App;
