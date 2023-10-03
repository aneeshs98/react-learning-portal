import useGeneralizedCrudMethods from "./useGeneralizedCrudMethods";

const useTodosData = () => {
  const url = "/api/todo";
  const errorNotificationFn = (error) => {
    console.log("Error From useTodosData", error);
  };

  const {
    data, error, loadingStatus, createRecord, updateRecord, deleteRecord, reFetch, fetchNextPage, applyPlatformFilter, applySearchTextFilter
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

  async function fetchNextTodo(nextPage, platform, searchText) {
    await fetchNextPage(nextPage, platform, searchText);
  }

  async function applyPlatformTodo(platform, searchText) {
    await applyPlatformFilter(platform, searchText);
  }

  async function applySearchTextTodo(newSearchText, platform) {
    await applySearchTextFilter(newSearchText, platform);
  }

  return {
    todoList: data, loadingStatus, error, createTodo, updateTodo, deleteTodo, reFetch, fetchNextTodo, applyPlatformTodo, applySearchTextTodo
  };
};

export default useTodosData;
