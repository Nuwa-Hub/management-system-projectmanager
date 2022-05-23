import React, { useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import WorkIcon from "@mui/icons-material/Work";
import "./timeline.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/apiCalls";

const Timeline = () => {
  const dispatch = useDispatch();
  var count = 0;
  const projects = useSelector((state) => state.project.projects);
  const user=useSelector((state) => state.user.currentUser);

  useEffect(() => {
    getProjects(dispatch,user._id);
  }, [dispatch]);
 
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="timeline">
          <>
            <VerticalTimeline>
              {projects.map((project) => (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date={`${project.createdAt.slice(0,7)} - present`}
                  iconStyle={
                    count++ % 2
                      ? { background: "rgb(33, 150, 243)", color: "#fff" }
                      : { background: "rgb(233, 30, 99)", color: "#fff" }
                  }
                  icon={<WorkIcon />}
                >
                  <h3 className="vertical-timeline-element-title">
                    {project.projectname}
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    {project.companyname}
                  </h4>
                  <p>
                    {project.description}
                  </p>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </>
        </div>
      </div>
    </>
  );
};

export default Timeline;
