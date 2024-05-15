import React from 'react';
import './editDowntimeDashboard.scss';
import { useNavigate, useParams } from 'react-router-dom';
import EditDowntimeData from '../../../components/downtime/editDowntime';

const EditDowntime = () => {
    const navigate = useNavigate();
    const {id} = useParams();
  return (
    <>
        <div className="centroid_editDowntimeWrapper">
                <div className="centroid_editDowntime_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/downtimeDashboard')}}>Back</button>
                </div>
                <h1>Edit Entry</h1>
                <EditDowntimeData id = {id}/>
        </div>
    </>
  )
}

export default EditDowntime
