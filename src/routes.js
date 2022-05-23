import ChangePassword from "./pages/changePassword/ChangePassword"
import CreateProject from "./pages/createproject/CreateProject"
import EditProfile from "./pages/editProfile/EditProfile"
import EditProject from "./pages/editProject/EditProject"
import EditTask from "./pages/editTask/EditTask"
import Home from "./pages/home/Home"
import ManagerList from "./pages/manangerList/ManagerList"
import Project from "./pages/project/Project"
import ProjectList from "./pages/projectList/ProjectList"
import ProjectTaskList from "./pages/projectTask/ProjectTaskList"
import Task from "./pages/task/Task"
import Timeline from "./pages/timeLine/Timeline"
import User from "./pages/user/User"
import UserList from "./pages/userList/UserList"


export const routes = [
    {
      name: 'home',
      element: <Home />,
      path: '/',
    },
    {
        name: 'projects',
        element: <ProjectList />,
        path: '/projects',
      },
      {
        name: 'users',
        element: <UserList />,
        path: '/users',
      },
      {
        name: 'project',
        element: <Project />,
        path: '/project/:id',
      },
      {
        name: 'tasks',
        element: <ProjectTaskList />,
        path: '/tasks',
      },
      {
        name: 'user',
        element: <User />,
        path: '/user',
      },
      {
        name: 'task',
        element: <Task />,
        path: '/task/:id',
      },
      {
        name: 'timeline',
        element: <Timeline />,
        path: '/timeline',
      },
      {
        name: 'createproject',
        element: <CreateProject />,
        path: '/createproject',
      },
      {
        name: 'editproject',
        element: <EditProject />,
        path: '/editproject/:id',
      },
      {
        name: 'edittask',
        element: <EditTask />,
        path: '/edittask/:id',
      },
      {
        name: 'managers',
        element: <ManagerList />,
        path: '/managers',
      },
      {
        name: 'changepassword',
        element: <ChangePassword />,
        path: '/changepassword',
      },
      {
        name: 'editprofile',
        element: <EditProfile />,
        path: '/editprofile',
      },
]

