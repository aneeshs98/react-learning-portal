import useGeneralizedCrudMethods from "./useGeneralizedCrudMethods";

const useTodosData = () => {
  const url = "/api/todo";
  const errorNotificationFn = (error) => {
    console.log("Error From useTodosData", error);
  };

  const {
    data, error, loadingStatus, createRecord, updateRecord, deleteRecord, reFetch, fetchNextPage, applyPlatformFilter
  } = useGeneralizedCrudMethods(url, errorNotificationFn);

  function createTodo(rec, callbackDone) {
    createRecord(rec, callbackDone);
  }

  function updateTodo(rec, callbackDone) {
    updateRecord(rec, callbackDone);
  }

  function deleteTodo(id, callbackDone) {
    deleteRecord(id, callbackDone);
  }

  async function fetchNextTodo(nextPage) {
    await fetchNextPage(nextPage);
  }

  async function applyPlatformTodo(platform) {
    await applyPlatformFilter(platform);
  }

  return {
    todoList: data, loadingStatus, error, createTodo, updateTodo, deleteTodo, reFetch, fetchNextTodo, applyPlatformTodo
  };
};

export default useTodosData;
