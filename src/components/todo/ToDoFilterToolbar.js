import React from "react";
import { useState, useContext } from "react";
import { ToDosDataContext } from "../../contexts/ToDosDataContext";

const ToDoFilterToolbar = ({
  displayStatus,
  setDisplayStatus,
  important,
  setImportant,
  searchText,
  setSearchText,
}) => {

  const { applyPlatformTodo, applySearchTextTodo } =
    useContext(ToDosDataContext);
  const [isLoading, setIsLoading] = useState(false);

  // Function to load more data when scrolling to the bottom
  const loadPlatformFilter = async (newDisplayStatus) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      let platform;
      if (newDisplayStatus === "all") {
        platform = 0;
      } else if (newDisplayStatus === "udemy") {
        platform = 1;
      } else if (newDisplayStatus === "pluralsight") {
        platform = 2;
      }
      await applyPlatformTodo(platform, searchText);
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSearchTextFilter = async (newSearchText) => {
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
      await applySearchTextTodo(newSearchText, platform);
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDisplayStatusChange = (newDisplayStatus) => {
    loadPlatformFilter(newDisplayStatus);
  };

  const onSearchTextChange = (newSearchText) => {
    loadSearchTextFilter(newSearchText)
  };

  return (
    <nav className="navbar navbar-expand">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <div className="filters">
            <li className="nav-item">
              <input
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                  onSearchTextChange(event.target.value);
                }}
                type="text"
                className="form-search-text"
                placeholder="Search"
              />
            </li>
            <li className="nav-item">
              <a
                className={
                  displayStatus === "all"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() =>{ 
                  setDisplayStatus("all");
                  onDisplayStatusChange("all");
                }}
                href="#"
              >
                All
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  displayStatus === "udemy"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() => { 
                  setDisplayStatus("udemy");
                  onDisplayStatusChange("udemy");
                }}
                href="#"
              >
                Udemy
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  displayStatus === "pluralsight"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() => {
                  setDisplayStatus("pluralsight");
                  onDisplayStatusChange("pluralsight");
                }}
                href="#"
              >
                Pluralsight
              </a>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};
export default ToDoFilterToolbar;
