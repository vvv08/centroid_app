import React from 'react';
import './editCorrectivePage.scss';
import { useParams } from 'react-router-dom';
import EditCorrectiveComp from '../../../../components/customerRejection/corrective_actions/editCorrective';

const EditCorrectivePage = () => {
    const { corrective_id } = useParams();
  return (
    <>
        <div className="centroid_editCorrectivePageWrapper">
                <div className="centroid_editCorrectivePage_back">
                    <button className='centroid_DeleteButton' onClick={() => {window.history.back()}}>Back</button>
                </div>
                <h1>Edit Corrective Action</h1>
                <EditCorrectiveComp corrective_id = {corrective_id}/>
        </div>
    </>
  )
}

export default EditCorrectivePage
