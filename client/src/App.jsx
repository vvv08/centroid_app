import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Reports from './pages/reports';
import Login from './pages/login';
import Maintenance from './components/maintenance';
import AddDashboard from './pages/dashboard/addDashboard';
import EditDashboard from './pages/dashboard/editDashboard';
import MasterData from './pages/master';
import AddMaster from './pages/master/addMaster';
import EditMaster from './pages/master/editMaster';
import UserList from './pages/users';
import AddUser from './pages/users/addUser';
import Graphs from './pages/graphs';
import AddDowntime from './pages/downtimeDashboard/addDowntime';
import DowntimeDashboardHome from './pages/downtimeDashboard/home';
import EditDowntime from './pages/downtimeDashboard/editDowntimeDashboard';

function App() {
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/reports",
      element:<Reports/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/maintenance",
      element:<Maintenance/>
    },
    {
      path:"/addEntry",
      element:<AddDashboard/>
    },
    {
      path:"/editEntry/:id",
      element:<EditDashboard/>
    },
    {
      path:"/masterData",
      element:<MasterData/>
    },
    {
      path:"/addMasterData/:type",
      element:<AddMaster/>
    },
    {
      path:"/editMasterData/:type/:id",
      element:<EditMaster/>
    },
    {
      path:"/userList",
      element:<UserList/>
    },
    {
      path:"/addUser",
      element:<AddUser/>
    },
    {
      path:"/graphs",
      element:<Graphs/>
    },
    {
      path:"/addDowntime",
      element:<AddDowntime/>
    },
    {
      path:"/downtimeDashboard",
      element:<DowntimeDashboardHome/>
    },
    {
      path:"/editDowntime/:id",
      element:<EditDowntime/>
    }
  ])

  return <RouterProvider router = {router}/>
}

export default App
