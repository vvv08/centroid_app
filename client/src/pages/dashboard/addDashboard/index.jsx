import React from 'react';
import './addDashboard.scss';
import AddDashboardData from '../../../components/dashboard/addDashboardData';
import { useNavigate } from 'react-router-dom';

const AddDashboard = () => {
    const navigate = useNavigate();
  return (
    <>
        <div className="centroid_addDashboardWrapper">
                <div className="centroid_addDashboard_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/')}}>Back</button>
                </div>
                <h1>New Entry</h1>
            <AddDashboardData/>
        </div>
    </>
  )
}

export default AddDashboard
