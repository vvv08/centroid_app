import React from 'react';
import './addRootCausePage.scss';
import { useParams } from 'react-router-dom';
import AddRootCauseComp from '../../../../components/customerRejection/root_causes/addRootCause';

const AddRootCausePage = () => {
    const { invoice_id } = useParams();
  return (
    <>
        <div className="centroid_addRootCausePageWrapper">
                <div className="centroid_addRootCausePage_back">
                    <button className='centroid_DeleteButton' onClick={() => {window.history.back()}}>Back</button>
                </div>
                <h1>New Root cause</h1>
                <AddRootCauseComp invoice_id={invoice_id}/>
        </div>
    </>
  )
}

export default AddRootCausePage
