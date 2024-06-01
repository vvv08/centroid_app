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
import EditUser from './pages/users/editUser';
import DashboardPrintTable from './components/dashboard/printTableDash';
import RejectionEntry from './pages/rejectionEntry';
import AddRejectionEntryPage from './pages/rejectionEntry/addRejectionEntry';
import EditRejectionEntryPage from './pages/rejectionEntry/editRejectionEntry';
import CustomerMasterPage from './pages/customerRejection/customers';
import AddCustomerMaster from './pages/customerRejection/customers/addCustomer';
import EditCustomer from './pages/customerRejection/customers/editCustomer';
import InvoicePage from './pages/customerRejection/invoices/home';
import AddInvoicePage from './pages/customerRejection/invoices/addInvoice';
import EditInvoicePage from './pages/customerRejection/invoices/editInvoice';
import CustomerRejectionReport from './pages/customerRejection/rejectionReport';
import CustomerRejectionPage from './pages/customerRejection/home';
import AddIssuePage from './pages/customerRejection/issues/addIssue';
import EditIssuePage from './pages/customerRejection/issues/editIssue';
import AddContainmentPage from './pages/customerRejection/containment/addContainment';
import EditContainmentPage from './pages/customerRejection/containment/editContainment';
import AddCorrectivePage from './pages/customerRejection/corrective/addCorrective';
import EditCorrectivePage from './pages/customerRejection/corrective/editCorrective';
import AddRootCausePage from './pages/customerRejection/rootCause/addRootCause';
import EditRootCausePage from './pages/customerRejection/rootCause/editRootCause';
import AddPreventiveActionPage from './pages/customerRejection/preventive/addPreventive';
import EditPreventiveActionPage from './pages/customerRejection/preventive/editPreventive';

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
    },
    {
      path:"/editUser/:id/:type/:name",
      element:<EditUser/>
    },
    {
      path:"/print",
      element:<DashboardPrintTable/>
    },
    {
      path:"/rejectionEntry",
      element:<RejectionEntry/>
    },
    {
      path:"/addRejectionEntry/:id",
      element:<AddRejectionEntryPage/>
    },
    {
      path:"/editRejectionEntry/:id",
      element:<EditRejectionEntryPage/>
    },
    {
      path:"/customer",
      element:<CustomerRejectionPage/>
    },
    {
      path:"/customerMaster",
      element:<CustomerMasterPage/>
    },
    {
      path:"/addCustomerMaster",
      element:<AddCustomerMaster/>
    },
    {
      path:"/editCustomer/:id",
      element:<EditCustomer/>
    },
    {
      path:"/invoice",
      element:<InvoicePage/>
    },
    {
      path:"/addInvoice",
      element:<AddInvoicePage/>
    },
    {
      path:"/editInvoice/:id",
      element:<EditInvoicePage/>
    },
    {
      path:"/customerRejectionReport/:invoice_id/:number",
      element:<CustomerRejectionReport/>
    },
    {
      path:"/customer/addIssue/:invoice_id",
      element:<AddIssuePage/>
    },
    {
      path:"/customer/editIssue/:cust_rej_id",
      element:<EditIssuePage/>
    },
    {
      path:"/customer/addContainment/:invoice_id",
      element:<AddContainmentPage/>
    },
    {
      path:"/customer/editContainment/:containment_id",
      element:<EditContainmentPage/>
    },
    {
      path:"/customer/addCorrective/:invoice_id",
      element:<AddCorrectivePage/>
    },
    {
      path:"/customer/editCorrective/:corrective_id",
      element:<EditCorrectivePage/>
    },
    {
      path:"/customer/addRootCause/:invoice_id",
      element:<AddRootCausePage/>
    },
    {
      path:"/customer/editRootCause/:root_id",
      element:<EditRootCausePage/>
    },
    {
      path:"/customer/addPreventiveAction/:invoice_id",
      element:<AddPreventiveActionPage/>
    },
    {
      path:"/customer/editPreventiveAction/:preventive_id",
      element:<EditPreventiveActionPage/>
    }
  ])

  return <RouterProvider router = {router}/>
}

export default App
