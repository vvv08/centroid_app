import React from 'react';
import './addCustomer.scss';
import { useNavigate } from 'react-router-dom';
import AddCustomerComp from '../../../../components/customerRejection/cust_customers/addCustomer';

const AddCustomerMaster = () => {
    const navigate = useNavigate();
  return (
    <>
        <div className="centroid_addCustomerMasterWrapper">
                <div className="centroid_addCustomerMaster_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/customerMaster')}}>Back</button>
                </div>
                <h1>New Customer</h1>
                <AddCustomerComp/>
        </div>
    </>
  )
}

export default AddCustomerMaster
