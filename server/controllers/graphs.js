import { db } from "../config/connection.js";

//TO get data for graphs
export const getGraphData = ({from,to}) => {
    return new Promise(async (resolve,reject) => {
        try{
            
            const [res_operation] = await db.query(`select r.operation_id as id, sum(r.rejection_qty) as value, o.operation_description as label from rejection_dashboard r right join operations o on r.operation_id = o.operation_id where r.date between "${from}" and "${to}" group by r.operation_id;`);

            const [res_machine_rejection] = await db.query(`select m.machine_id as id, sum(r.rejection_qty) as value, m.name as label from rejection_dashboard r right join machines m on r.machine_id = m.machine_id where r.date between "${from}" and "${to}" group by r.machine_id;`);

            const [res_operator_rejection] = await db.query(`select o.operator_id as id,sum(r.rejection_qty) as value, o.name as label from rejection_dashboard r right join operators o on r.operator_id = o.operator_id where r.date between "${from}" and "${to}" group by r.operator_id;`);

            resolve({
                operation_wise : res_operation,
                machine_rejection : res_machine_rejection,
                operator_rejection: res_operator_rejection
            })
        }catch(err){
            reject(err)
        }
    })
}
