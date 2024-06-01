import React from 'react';
import './addCorrectivePage.scss';
import { useParams } from 'react-router-dom';
import AddCorrectiveComp from '../../../../components/customerRejection/corrective_actions/addCorrective';

const AddCorrectivePage = () => {
    const { invoice_id } = useParams();
  return (
    <>
        <div className="centroid_addCorrectivePageWrapper">
                <div className="centroid_addCorrectivePage_back">
                    <button className='centroid_DeleteButton' onClick={() => {window.history.back()}}>Back</button>
                </div>
                <h1>New Corrective Action</h1>
                <AddCorrectiveComp invoice_id={invoice_id}/>
        </div>
    </>
  )
}

export default AddCorrectivePage
