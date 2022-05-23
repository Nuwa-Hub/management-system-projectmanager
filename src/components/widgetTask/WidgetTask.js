import React from "react";
import "./widgetTask.css";
import BookIcon from "@mui/icons-material/Book";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import userdp from "../../images/user.png";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTask } from "../../redux/apiCalls";

const WidgetTask = ({ task }) => {
  const dispatch = useDispatch();

  //get developer relevent to tha specific task
  const developer = useSelector((state) =>
    state.developer.developers.find(
      (developer) => developer._id === task.developerId
    )
  );
 
  return (
    <div className="widgetTask">
      <div className="widgetTaskwrapper">
        <div className="widgetTasktop">
          <h3 className="widgetTasktitle">{task.Taskname}</h3>
          <div className="projectaction">
            <DeleteIcon
              className="projectdeleticon"
              onClick={(e) => {
                console.log("dsdf")
                deleteTask(task._id, dispatch);
              }}
            />
            <Link className="link" to={"/task/" + task._id}>
              <Button className="taskviewbutton" variant="outlined">
                <RemoveRedEyeIcon className="taskviewbuttonicon" />
                <h1 className="taskviewbuttontext">display</h1>
              </Button>
            </Link>
          </div>
        </div>
        <div className="widgetTaskbottom">
          <div className="widgetTaskleft">
            <span className="projectShowTitle">Project Detail</span>
            <div className="projectShowInfo">
              <BookIcon className="projectShowIcon" />
              <span className="userShowInfoTitle">{task.Taskname}</span>
            </div>
            <div className="projectShowInfo">
              <BookIcon className="projectShowIcon" />
              <span className="userShowInfoTitle">{task.description}</span>
            </div>
            <div className="projectShowInfo">
              <BookIcon className="projectShowIcon" />
              <span className="userShowInfoTitle">test</span>
            </div>
          </div>
          <div className="widgetTaskright">
            <span className="projectShowTitle">Contributor</span>
            <div className="userShowInfo">
              <img
                className="taskcontributorImg"
                src={ developer.img || userdp }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetTask;
