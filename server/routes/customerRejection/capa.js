import express from 'express';
import { addContainment, addCorrective, addIssue, addPreventiveAction, addRootCause, deleteContainment, deleteCorrectiveAction, deletePreventiveAction, deleteRootCause, editContainment, editCorrective, editIssue, editPreventiveAction, editRootCause, getCAPADetails, getContainmentDetails, getCorrectiveDetails, getInspectorsCAPA, getInvoices, getIssueForEdit, getIssuesByInvoice, getPreventiveActionDetail, getRootCausesDetails, getUOMs } from '../../controllers/customerRejections/capa.js';
import { verifyToken } from '../../config/verify.js';

const router = express.Router();

//To get CAPA details of a invoice
router.get('/',[verifyToken],(req,res) => {
    let invoice = {
        id:Number(req.query.id)
    }
    getCAPADetails(invoice).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get invoice details
router.get('/invoices',[verifyToken],(req,res) => {
    getInvoices().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get active UOMs
router.get('/ActiveUOM',[verifyToken],(req,res) => {
    getUOMs().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add an issue
router.post('/issue/add',[verifyToken],(req,res) => {
    let issue = {
        invoice:Number(req.body.invoice_id),
        description : req.body.description,
        rejected_qty: parseFloat(req.body.rejected_qty),
        uom:Number(req.body.uom)
    }
    addIssue(issue).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get issue details for edit
router.get('/issueDetails',[verifyToken],(req,res) => {
    let issue = {
        cust_rej_id :  Number(req.query.cust_rej_id)
    }
    getIssueForEdit(issue).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a issue
router.post('/editIssue',[verifyToken],(req,res) => {
    let issue = {
        cust_rej_id : Number(req.body.cust_rej_id),
        description : req.body.description,
        rejected_qty : parseFloat(req.body.rejected_qty),
        uom:Number(req.body.uom)
    }
    editIssue(issue).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get all issues for each invoice
router.get('/invoiceIssue',[verifyToken],(req,res) => {
    let invoice = {
        invoice_id : Number(req.query.invoice_id)
    }
    getIssuesByInvoice(invoice).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a containment
router.post('/addContainment',[verifyToken],(req,res) => {
    let containment = {
        issue:Number(req.body.issue),
        stock_check_supplier:req.body.stock_check_supplier,
        supplier_date:req.body.supplier_date,
        stock_check_customer:req.body.stock_check_customer,
        customer_date:req.body.customer_date,
        stock_check_production:req.body.stock_check_production,
        production_date:req.body.production_date,
        stock_check_transit:req.body.stock_check_transit,
        transit_date:req.body.transit_date,
        remarks:req.body.remarks
    }
    console.log(containment)
    addContainment(containment).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get containment details for edit
router.get('/containmentDetails',[verifyToken],(req,res) => {
    let containment = {
        containment_id:Number(req.query.containment_id)
    }
    getContainmentDetails(containment).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a containment
router.post('/editContainment',[verifyToken],(req,res) => {
    let containment = {
        containment_id : Number(req.body.containment_id),
        stock_check_supplier:req.body.stock_check_supplier,
        supplier_date:req.body.supplier_date,
        stock_check_customer:req.body.stock_check_customer,
        customer_date:req.body.customer_date,
        stock_check_production:req.body.stock_check_production,
        production_date:req.body.production_date,
        stock_check_transit:req.body.stock_check_transit,
        transit_date:req.body.transit_date,
        remarks:req.body.remarks
    }
    editContainment(containment).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To delete a containment
router.post('/deleteContainment',[verifyToken],(req,res) => {
    let containment = {
        containment_id:Number(req.body.containment_id)
    }
    deleteContainment(containment).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get Inspectors
router.get('/inspectors',[verifyToken],(req,res) => {
    getInspectorsCAPA().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a corrective action
router.post('/addCorrective',[verifyToken],(req,res) => {
    let corrective = {
        issue:Number(req.body.issue),
        inspector:Number(req.body.inspector),
        remarks:req.body.remarks,
        description:req.body.description
    }
    addCorrective(corrective).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get corrective action details for edit
router.get('/correctiveDetail',[verifyToken],(req,res) => {
    let corrective = {
        corrective_id:Number(req.query.corrective_id)
    }
    getCorrectiveDetails(corrective).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a corrective action
router.post('/editCorrective',[verifyToken],(req,res) => {
    let corrective = {
        corrective_id:Number(req.body.corrective_id),
        description:req.body.description,
        remarks:req.body.remarks,
        inspector:Number(req.body.inspector)
    }
    editCorrective(corrective).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To delete a corrective action
router.post('/deleteCorrective',[verifyToken],(req,res) => {
    let corrective = {
        corrective_id :Number(req.body.corrective_id)
    }
    deleteCorrectiveAction(corrective).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To create root cause
router.post('/addRootCause',[verifyToken],(req,res) => {
    let rootCause = {
        description:req.body.description,
        issue:Number(req.body.issue),
        remarks:req.body.remarks
    }
    addRootCause(rootCause).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get root cause details
router.get('/rootCauseDetails',[verifyToken],(req,res) => {
    let root_cause = {
        root_id:Number(req.query.root_id)
    }
    getRootCausesDetails(root_cause).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a root cause
router.post('/editRootCause',[verifyToken],(req,res) => {
    let root_cause = {
        root_id:Number(req.body.root_id),
        description:req.body.description,
        remarks:req.body.remarks
    }
    editRootCause(root_cause).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//TO delete a root cause
router.post('/deleteRootCause',[verifyToken],(req,res) => {
    let root_cause = {
        root_id:Number(req.body.root_id)
    }
    deleteRootCause(root_cause).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To add a preventive action
router.post('/addPreventiveAction',[verifyToken],(req,res) => {
    let preventive_action = {
        issue:Number(req.body.issue),
        description:req.body.description,
        remarks:req.body.remarks,
        inspector:Number(req.body.inspector)
    }
    addPreventiveAction(preventive_action).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To get preventive action for edit
router.get('/getPreventiveAction',[verifyToken],(req,res) => {
    let preventive_action = {
        preventive_id : Number(req.query.preventive_id)
    }
    getPreventiveActionDetail(preventive_action).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To edit a preventive action
router.post('/editPreventiveAction',[verifyToken],(req,res) => {
    let preventive_action = {
        preventive_id:Number(req.body.preventive_id),
        description:req.body.description,
        remarks:req.body.remarks,
        inspector:Number(req.body.inspector)
    }
    editPreventiveAction(preventive_action).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//To delete preventive action
router.post('/deletePreventiveAction',[verifyToken],(req,res) => {
    let preventive_action = {
        preventive_id:Number(req.body.preventive_id)
    }
    deletePreventiveAction(preventive_action).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

export default router ;