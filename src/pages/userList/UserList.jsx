import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
//import { userRows } from "../../dummyData";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getdevelopers } from "../../redux/apiCalls";
import userdp from "../../images/user.png";

export default function UserList() {
  const dispatch = useDispatch();
  const developers=useSelector((state) => state.developer.developers);
  
  useEffect(() => {
    getdevelopers(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "fullname", headerName: "Full Name", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img || userdp} alt="user image" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "birthday",
      headerName: "Birthday",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 180,
    },

  ];

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="userList">
          <DataGrid
            rows={developers}
            disableSelectionOnClick
             columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
