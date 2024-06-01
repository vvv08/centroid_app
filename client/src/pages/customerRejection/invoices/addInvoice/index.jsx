import React from 'react';
import './addInvoicePage.scss';
import { useNavigate } from 'react-router-dom';
import AddInvoiceComp from '../../../../components/customerRejection/cust_invoices/addInvoice';

const AddInvoicePage = () => {
    const navigate = useNavigate();
  return (
    <>
        <div className="centroid_addInvoiceWrapper">
                <div className="centroid_addInvoice_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/invoice')}}>Back</button>
                </div>
                <h1>New Invoice</h1>
                <AddInvoiceComp/>
        </div>
    </>
  )
}

export default AddInvoicePage
