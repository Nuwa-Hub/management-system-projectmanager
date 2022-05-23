import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./editProject.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dp from "../../images/project.jpg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/textField/TextField";
import { updateProject } from "../../redux/apiCalls";

const EditProject = () => {
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];
  const dispatch=useDispatch();
  //get project by id
  const project = useSelector((state) =>
    state.project.projects.find((project) => project._id === projectId)
  );
  
  const handleClick = (e, { resetForm }) => {
    const project = { ...e };
    Object.keys(project).forEach(key => {
      if (project[key] === '') {
        delete project[key];
      }
    });
    updateProject(dispatch,project,projectId);
    //console.log(project);
    resetForm();
  };

  //validate
  const validate = Yup.object({
    projectname: Yup.string().max(20, "Must be 20 characters or less!"),
    companyname: Yup.string().max(15, "Must be 25 characters or less!"),
    duedate: Yup.string(),
  });

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />

        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit Project</h1>
            <Link to="/createproject">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img src={dp} alt="" className="userShowImg" />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">
                    {project.projectname}
                  </span>
                  <span className="userShowUserTitle">
                    {project.companyname}
                  </span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Project Details</span>
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
                  <span className="userShowInfoTitle">{project.duedate}</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <Formik
                initialValues={{
                  projectname: "",
                  companyname: "",
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

                        <button className="userUpdateButton">Update</button>
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

export default EditProject;
