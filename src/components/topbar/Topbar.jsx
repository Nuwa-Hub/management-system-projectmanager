import React, { useEffect, useState } from "react";
import "./topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../redux/apiCalls";
import userdp from "../../images/user.png"

export default function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  //get notifivcaions
  useEffect(() => {
    getNotifications(dispatch,user._id);
  }, [dispatch]);

  let notificationset = useSelector((state) => state.notification.notifications);
  

  const displayNotification = ({ title,_id }) => {
    return (
      <div className="notifywrap" key={_id}>
        <NotificationsActiveIcon className="notifyicon" />
        <span className="notifySpan">
          {title}
        </span>
      </div>
    );
  };

  function toggleMenu() {
    const notifymenu = document.getElementById("notifications");
    notifymenu.classList.toggle("isOpen");
   
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">RedMine(Project Manager)</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer" onClick={() => toggleMenu()}>
            <NotificationsNoneIcon />
            <span className="topIconBadge">{notificationset.length}</span>
          </div>
          <img
            src={user.img || userdp}
            alt=""
            className="topAvatar"
          />

          <div id="notifications" className="notifications">
            <div className="notificationswrapper">
              {notificationset.map((n) => displayNotification(n))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
