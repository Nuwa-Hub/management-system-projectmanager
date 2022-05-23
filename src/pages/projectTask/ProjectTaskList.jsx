import React from 'react'
import { Link } from 'react-router-dom';
import "./projectTaskList.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { userRows } from '../../dummyData';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

const ProjectTaskList = () => {

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
          field: "user",
          headerName: "User",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="taskList">
                <img className="userListImg" src={params.row.avatar} alt="" />
                {params.row.username}
              </div>
            );
          },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
          field: "status",
          headerName: "Status",
          width: 120,
        },
        {
          field: "transaction",
          headerName: "Transaction Volume",
          width: 160,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/tasks/" + params.row.id}>
                  <button className="taskListEdit">Edit</button>
                </Link>
                <DeleteIcon
                  className="taskListDelete"
                  
                />
              </>
            );
          },
        },
      ];

  return (
    <>
    <Topbar />
    <div className="container">
      <Sidebar />
     <div className="taskList">
      <DataGrid
        rows={userRows}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </div>
    </>
  )
}

export default ProjectTaskList