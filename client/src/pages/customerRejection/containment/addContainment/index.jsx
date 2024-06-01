import React from 'react';
import './addContainmentPage.scss';
import { useParams } from 'react-router-dom';
import AddContainmentComp from '../../../../components/customerRejection/containment_actions/addContainment';

const AddContainmentPage = () => {
    const { invoice_id } = useParams();
  return (
    <>
        <div className="centroid_addContainmentPageWrapper">
                <div className="centroid_addContainmentPage_back">
                    <button className='centroid_DeleteButton' onClick={() => {window.history.back()}}>Back</button>
                </div>
                <h1>New Containment</h1>
                <AddContainmentComp invoice_id={invoice_id}/>
        </div>
    </>
  )
}

export default AddContainmentPage
