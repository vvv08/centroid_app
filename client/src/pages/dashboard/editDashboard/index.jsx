import React from 'react';
import './editDashboard.scss';
import { useNavigate, useParams } from 'react-router-dom';
import EditDashboardData from '../../../components/dashboard/editDashboardData';


const EditDashboard = () => {
    const navigate = useNavigate();
    const {id} = useParams();
  return (
    <>
        <div className="centroid_editDashboardWrapper">
                <div className="centroid_editDashboard_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/')}}>Back</button>
                </div>
                <h1>Edit Entry</h1>
                <EditDashboardData id = {id}/>
        </div>
    </>
  )
}

export default EditDashboard
