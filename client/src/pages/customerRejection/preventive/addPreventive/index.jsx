import React from 'react';
import './addPreventiveActionPage.scss';
import { useParams } from 'react-router-dom';
import AddPreventiveActionComp from '../../../../components/customerRejection/preventive_actions/addPreventiveAction';

const AddPreventiveActionPage = () => {
    const { invoice_id } = useParams();
  return (
    <>
        <div className="centroid_addPreventiveActionPageWrapper">
                <div className="centroid_addPreventiveActionPage_back">
                    <button className='centroid_DeleteButton' onClick={() => {window.history.back()}}>Back</button>
                </div>
                <h1>New Preventive Action</h1>
                <AddPreventiveActionComp invoice_id={invoice_id}/>
        </div>
    </>
  )
}

export default AddPreventiveActionPage
