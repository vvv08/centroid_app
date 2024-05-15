import React from 'react';
import './addDowntime.scss';
import { useNavigate } from 'react-router-dom';
import AddDowntimeComp from '../../../components/downtime/addDowntime';

const AddDowntime = () => {
    const navigate = useNavigate();
  return (
    <>
        <div className="centroid_addDowntimeWrapper">
                <div className="centroid_addDowntime_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/downtimeDashboard')}}>Back</button>
                </div>
                <h1>New Entry</h1>
                <AddDowntimeComp/>
        </div>
    </>
  )
}

export default AddDowntime
