import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./createproject.css";
import TextField from "../../components/textField/TextField";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../redux/apiCalls";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CreateProject = () => {
  //get task by projectID
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser._id);

  const handleClick = (e, { resetForm }) => {
    const project = { ...e, managerId: userId };
    //console.log(project);
    addProject(project, dispatch);
    resetForm();
  };

  //validate
  const validate = Yup.object({
    projectname: Yup.string()
      .max(25, "Must be 25 characters or less!")
      .required("Requered!"),
    companyname: Yup.string()
      .max(25, "Must be 25 characters or less!")
      .required("Requered!"),
    duedate: Yup.string().required("Requered!"),
    description: Yup.string()
      .max(50, "Must be 50 characters or less!")
      .required("Requered!"),
  });

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="createproject">
          <div className="createprojectwrapper">
            <Formik
              initialValues={{
                projectname: "",
                companyname: "",
                duedate: "",
                description:"",
              }}
              validationSchema={validate}
              onSubmit={handleClick}
            >
              {({ values, isValid, dirty }) => (
                <>
                  <h1 className="newProjectTitle">New Project</h1>
                  <Form className="newProjectForm">
                    <TextField
                      label="Project Name"
                      name="projectname"
                      type="text"
                      className1="newProjectItem"
                    />
                    <TextField
                      label="Company Name"
                      name="companyname"
                      type="text"
                      className1="newProjectItem"
                    />
                    <TextField
                      label="Due Date"
                      name="duedate"
                      type="date"
                      className1="newProjectItem"
                    />
                    <TextField
                      label="Description"
                      name="description"
                      type="text"
                      className1="newProjectItem"
                    />
                    <button
                      variant="contained"
                      type="submit"
                      className="newProjectButton"
                    >
                      Create
                    </button>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
