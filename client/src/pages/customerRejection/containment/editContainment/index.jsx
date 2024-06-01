import React from 'react';
import './editContainmentPage.scss';
import { useParams } from 'react-router-dom';
import EditContainmentComp from '../../../../components/customerRejection/containment_actions/editContainment';

const EditContainmentPage = () => {
    const { containment_id } = useParams();
  return (
    <>
        <div className="centroid_editContainmentPageWrapper">
                <div className="centroid_editContainmentPage_back">
                    <button className='centroid_DeleteButton' onClick={() => {window.history.back()}}>Back</button>
                </div>
                <h1>Edit Containment</h1>
                <EditContainmentComp containment_id={containment_id}/>
        </div>
    </>
  )
}

export default EditContainmentPage
