import React from 'react';
import './editPreventiveAction.scss';
import { useParams } from 'react-router-dom';
import EditPreventiveActionComp from '../../../../components/customerRejection/preventive_actions/editPreventiveAction';

const EditPreventiveActionPage = () => {
    const { preventive_id } = useParams();
  return (
    <>
        <div className="centroid_editPreventiveActionPageWrapper">
                <div className="centroid_editPreventiveActionPage_back">
                    <button className='centroid_DeleteButton' onClick={() => {window.history.back()}}>Back</button>
                </div>
                <h1>Edit Preventive Action</h1>
                <EditPreventiveActionComp preventive_id={preventive_id}/>
        </div>
    </>
  )
}

export default EditPreventiveActionPage
