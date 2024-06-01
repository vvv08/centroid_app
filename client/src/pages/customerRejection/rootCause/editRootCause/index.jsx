import React from 'react';
import './editRootCasuePage.scss';
import { useParams } from 'react-router-dom';
import EditRootCauseComp from '../../../../components/customerRejection/root_causes/editRootCause';

const EditRootCausePage = () => {
    const { root_id } = useParams();
  return (
    <>
        <div className="centroid_editRootCausePageWrapper">
                <div className="centroid_editRootCausePage_back">
                    <button className='centroid_DeleteButton' onClick={() => {window.history.back()}}>Back</button>
                </div>
                <h1>Edit Root cause</h1>
                <EditRootCauseComp root_id = {root_id}/>
        </div>
    </>
  )
}

export default EditRootCausePage
