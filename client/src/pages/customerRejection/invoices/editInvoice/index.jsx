import React from 'react';
import './editInvoicePage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import EditInvoiceComp from '../../../../components/customerRejection/cust_invoices/editInvoice';

const EditInvoicePage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
  return (
    <>
        <div className="centroid_editInvoicePageWrapper">
                <div className="centroid_editInvoicePage_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/invoice')}}>Back</button>
                </div>
                <h1>Edit Invoice</h1>
                <EditInvoiceComp id = {id}/>
        </div>
    </>
  )
}

export default EditInvoicePage
