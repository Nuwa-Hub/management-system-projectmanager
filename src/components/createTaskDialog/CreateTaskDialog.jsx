import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import "./createTaskDialog.css";
import Select from "react-select";
import Stack from "@mui/material/Stack";
import TextField from "../textField/TextField";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/apiCalls";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const CreateTaskDialog = (props) => {
  const { onClose, selectedValue, open, projectId } = props;

  //get all users
  const developers = useSelector((state) => state.developer.developers);
  const [developerId, setdeveloperId] = React.useState(null);
  const [inputs, setInputs] = useState({});

  //select options
  const options = developers.map((developer) => ({
    value: developer._id,
    label: developer.username,
  }));

  //close dialog
  const handleClose = () => {
    onClose(selectedValue);
  };

  //get current user id
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser._id);

  //create task and add to database
  const handleClick = (e, { resetForm }) => {

    const task = {
      ...e,
      managerId: userId,
      developerId: developerId.value,
      projectId: projectId,
    };
  
    addTask(task, dispatch);
    resetForm();
  };

  //validate
  const validate = Yup.object({
    Taskname: Yup.string()
      .max(25, "Must be 25 characters or less!")
      .required("Requered!"),
    duedate: Yup.string().required("Requered!"),
    description: Yup.string()
      .max(25, "Must be 25 characters or less!")
      .required("Requered!"),
  });

  return (
    <Dialog onClose={handleClose} open={open} className="taskcreateDialog">
      <div className="taskCreatewrapper">
        <div className="taskCreate">
          <Formik
            initialValues={{
              Taskname: "",
              duedate: "",
              descripion:"",
            }}
            validationSchema={validate}
            onSubmit={handleClick}
          >
            {({ values, isValid, dirty }) => (
              <>
                <div className="taskCreateFormtop">
                  <span className="taskCreateTitle">Create Task</span>
                  <CancelPresentationIcon
                    className="cancelIcon"
                    onClick={handleClose}
                  />
                </div>

                <Form className="taskCreateForm">
                  <div className="taskCreateLeft">
                    <TextField
                      label="Task Name"
                      name="Taskname"
                      type="text"
                      className1="taskCreateItem"
                      className2="taskCreateInput"
                    />
                    <TextField
                      label="Task Description"
                      name="description"
                      type="text"
                      className1="taskCreateItem"
                      className2="taskCreateInput"
                    />
                    <TextField
                      label="Due Date"
                      name="duedate"
                      type="date"
                      className1="taskCreateItem"
                      className2="taskCreateInput"
                    />
                    <button className="taskCreateButton" onClick={handleClick}>
                      Create
                    </button>
                  </div>
                  <div className="taskCreateRight">
                    <Select
                      options={options}
                      placeholder="Select Collaborator..."
                      className="createtaskuserselector"
                      onChange={setdeveloperId}
                    />
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateTaskDialog;
