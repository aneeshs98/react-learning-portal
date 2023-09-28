import { useState, useEffect } from "react";

const CourseForm = ({ mode, courseData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseUrl: "",
    courseType: "",
    platform: 0
  });

  useEffect(() => {
    // If in "edit" mode, populate the form with the courseData
    if (mode === "edit" && courseData) {
      setFormData(courseData);
    }
  }, [mode, courseData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Perform validation here if needed

    // Call the onSave callback with the form data
    onSave(formData);

    // Reset the form data
    setFormData({
      courseName: "",
      courseUrl: "",
      courseType: "",
      platform: 0,
    });
  };
  
  const handleCancel = () => {
    setFormData({
      courseName: "",
      courseUrl: "",
      courseType: "",
      platform: 0
    });
    onCancel();
  };

  return (
    <div>
      <div className="input-group add-course-mrg">
        <div className="form-floating">
          <input
            name="courseName"
            value={formData.courseName}
            checked={true}
            onChange={handleInputChange}
            placeholder="Enter Course Name"
            className="form-control"
            id="courseName"
          />
          <label htmlFor="courseName">Enter Course Name</label>
        </div>
      </div>
      <div className="input-group add-course-mrg">
        <div className="form-floating">
          <input
            name="courseUrl" 
            value={formData.courseUrl}
            checked={true}
            onChange={handleInputChange}
            placeholder="Enter Course Url"
            className="form-control"
            id="courseUrl"
          />
          <label htmlFor="courseUrl">Enter Course Url</label>
        </div>
      </div>
      <div className="input-group add-course-mrg">
        <div className="form-floating">
          <input
            name="courseType"
            value={formData.courseType}
            checked={true}
            onChange={handleInputChange}
            placeholder="Enter Course Type"
            className="form-control"
            id="courseType"
          />
          <label htmlFor="courseType">Enter Course Type</label>
        </div>
      </div>
      <div className="task-modifier">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="platform"
            value={1}
            id="udemyRadio"
            checked = {formData.platform == 1}
            onChange={handleInputChange}
          />
          <label
            className="form-check-label"
            htmlFor="udemyRadio"
          >
            Udemy
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="platform"
            value={2}
            id="pluralsightRadio"
            checked = {formData.platform == 2}
            onChange={handleInputChange}
          />
          <label
            className="form-check-label"
            htmlFor="pluralsightRadio"
          >
            Pluralsight
          </label>
        </div>
      </div>
      <div className="input-group add-course-btn">
      <button
          disabled={!formData.courseName || !formData.courseUrl || !formData.courseType || !formData.platform}
          className="btn btn-theme-primary update-course-btn"
          id="push"
          onClick={handleSubmit}
        >
          <i className="fas fa-plus"></i> {mode === "add" ? "Add Course" : "Update Course"}
        </button>
        {mode === 'edit' && (
        <button
          className="btn btn-theme-primary add-course-btn"
          id="push"
          onClick={handleCancel}
        >
          Cancel
        </button>
        )}
        </div>
    </div>
  );
};

export default CourseForm;
