import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./editTask.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import dp from "../../images/project.jpg";
import { useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/textField/TextField";
import { updateTask } from "../../redux/apiCalls";

const EditTask = () => {
  const location = useLocation();
  const taskId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  //get task by id
  const task = useSelector((state) =>
    state.task.tasks.find((task) => task._id === taskId)
  );

  //for select
  const developers = useSelector((state) => state.developer.developers);
  const [developerId, setdeveloperId] = React.useState("");
  //select options
  const options = developers.map((developer) => ({
    value: developer._id,
    label: developer.username,
  }));

  
  //validate and upadate
  const handleClick = (e, { resetForm }) => {
    const task = { ...e,developerId:developerId.value };
    console.log(task);
    Object.keys(task).forEach((key) => {
      if (task[key] === "" || task[key] === null) {
        delete task[key];
      }
    });
    
    updateTask(dispatch,task,taskId)
    
    resetForm();
  };

  //validate
  const validate = Yup.object({
    Taskname: Yup.string().max(15, "Must be 15 characters or less!"),
    duedate: Yup.string(),
  });

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit Task</h1>
            <div></div>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img src={dp} alt="" className="userShowImg" />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{task.Taskname}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <CalendarTodayIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">annabeck99</span>
                </div>
                <div className="userShowInfo">
                  <CalendarTodayIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">10.12.1999</span>
                </div>
                <span className="userShowTitle">Due Date</span>
                <div className="userShowInfo">
                  <CalendarTodayIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">{task.duedate}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarTodayIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    annabeck99@gmail.com
                  </span>
                </div>
                <div className="userShowInfo">
                  <CalendarTodayIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">New York | USA</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <Formik
                initialValues={{
                  Taskname: "",
                  developerId: "",
                  duedate: "",
                }}
                validationSchema={validate}
                onSubmit={handleClick}
              >
                {({ values, isValid, dirty }) => (
                  <>
                    <span className="userUpdateTitle">Edit</span>
                    <Form className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <TextField
                          label="Task Name"
                          name="Taskname"
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
                        <button type="submit" className="userUpdateButton">Update</button>
                      </div>
                      <div className="userUpdateRight">
                        <Select
                          options={options}
                          placeholder="Select Collaborator..."
                          className="edittaskuserselector"
                          onChange={setdeveloperId}
                        />
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTask;
