import React, { useEffect } from "react";
import "./dashboard.scss";
import { useNavigate } from "react-router-dom";
import { deletedEntry } from "../../repository/dashboardRepository";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Dashboard = ({ data }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if(confirm("Are you sure?")){
      deletedEntry(id).then((result) => {
        alert("Deleted successfully")
        navigate('/')
      }).catch((err) => {
        if(err.response.data.status === "authenticationError"){
          alert(err.response.data.message)
          navigate('/login')
        }else{
          alert("Internal server error")
          navigate('/maintenance')
        }
      })
    }
  }

  useEffect(() => {
    //new DataTable("#example");
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  return (
    <>
      <div className="centroid_DashboardWrapper">
        <div className="centroid_DashboardContainer">
          <div className="centroid_DashboardHeader">
            <h2>Dashboard</h2>
            <div className="centroid_DashboardUpdates">
              <p>Last Updated: </p>
              {data[0] && <p>{data.latest[0].latest_update}</p>}
            </div>
            <div className="centroid_DasboardAdd">
              <button className="centroid_AddButton" onClick={() => {navigate('/addEntry')}}>Add entry</button>
            </div>
          </div>
          <div className="centroid_DashboardContent">
            <table id="example" className="display" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Entry date</th>
                  <th>Shift</th>
                  <th>Production start</th>
                  <th>Production end</th>
                  <th>Machine</th>
                  <th>Machine idle from</th>
                  <th>Machine idle till</th>
                  <th>Idle time reason</th>
                  <th>Operation</th>
                  <th>Part No.</th>
                  <th>Operator</th>
                  <th>Inspector</th>
                  <th>Batch No.</th>
                  <th>Defect</th>
                  <th>Production Qty</th>
                  <th>Rejection Qty</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data[0] && data.dashboard.map((obj) => {
                  return (
                    <tr key={obj.Id}>
                      <td>{obj.date}</td>
                      <td>{obj.description}</td>
                      <td>{obj.production_from}</td>
                      <td>{obj.production_to}</td>
                      <td>{obj.machine}</td>
                      <td>{obj.idle_time_from}</td>
                      <td>{obj.idle_time_to}</td>
                      <td>{obj.machine_loss}</td>
                      <td>{obj.operation}</td>
                      <td>{obj.part_number}</td>
                      <td>{obj.operator}</td>
                      <td>{obj.inspector}</td>
                      <td>{obj.batch_number}</td>
                      <td>{obj.defect}</td>
                      <td>{obj.production_qty}</td>
                      <td>{obj.rejection_qty}</td>
                      <td>
                        {/* <button className="centroid_EditButton" onClick={() => {navigate(`/editEntry/${obj.Id}`)}}>Edit</button> */}
                        <EditIcon style={{"fontSize":"22px","cursor":"pointer"}} onClick={() => {navigate(`/editEntry/${obj.Id}`)}}/>
                      </td>
                      <td>
                        {/* <button className="centroid_DeleteButton" onClick={() => {handleDelete(obj.Id)}}>Delete</button> */}
                        <DeleteIcon style={{"color":"var(--centroidDeleteRed)","fontSize":"22px","cursor":"pointer"}} onClick={() => {handleDelete(obj.Id)}}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
