import React from 'react';
import './editCustomer.scss';
import { useNavigate, useParams } from 'react-router-dom';
import EditCustomerComp from '../../../../components/customerRejection/cust_customers/editCustomer';

const EditCustomer = () => {
    const navigate = useNavigate();
    const {id} = useParams();
  return (
    <>
        <div className="centroid_editCustomerPageWrapper">
                <div className="centroid_editCustomerPage_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/customerMaster')}}>Back</button>
                </div>
                <h1>Edit Entry</h1>
                <EditCustomerComp id = {id}/>
        </div>
    </>
  )
}

export default EditCustomer
