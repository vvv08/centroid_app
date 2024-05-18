import { db } from "../config/connection.js";

//TO get data for graphs
export const getGraphData = ({from,to}) => {
    return new Promise(async (resolve,reject) => {
        try{        
            //Total mix, Production and Rejection per day
            const [res_total_prod_summary] = await db.query(`select date_format(date,'%d-%m-%Y') as name ,sum(total_mix) as 'Total mix' ,sum(production_qty) as Production,sum(rejection_qty) as Rejection from rejection_dashboard where date_format(date,'%Y-%m-%d') between "${from}" and "${to}" group by date_format(date,'%d-%m-%Y') order by date_format(date,'%d-%m-%Y') asc;`);

            //Operation + reason total
            const [res_operation_reason] = await db.query(`select r.Id as id, sum(r.rejection_qty) as value, concat(o.operation_description, ' & ' , d.description) as label from rejection_dashboard r inner join operations o on r.operation_id = o.operation_id inner join defects d on r.defect_id = d.defect_id where date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}" group by r.operation_id , r.defect_id;`);

            //Machine + reason total
            const [res_machine_reason] = await db.query(`select r.Id as id, sum(r.rejection_qty) as value, concat(m.name, ' & ' , d.description) as label from rejection_dashboard r inner join machines m on r.machine_id = m.machine_id inner join defects d on r.defect_id = d.defect_id where date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}" group by r.machine_id , r.defect_id;`);

            //Operator + reason total
            const [res_operator_reason] = await db.query(`select r.Id as id, sum(r.rejection_qty) as value, concat(o.name, ' & ' , d.description) as label from rejection_dashboard r inner join operators o on r.operator_id = o.operator_id inner join defects d on r.defect_id = d.defect_id where date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}" group by r.operator_id , r.defect_id;`);

            //Machine + machine_loss reason total
            const [res_machine_time_loss] = await db.query(`select d.downtime_id as id, concat(m.name,' & ',ml.description) as label,time_format(sum(timediff(d.idle_to , d.idle_from)),'%H') as value from downtime_dashboard d inner join machine_loss ml on d.machine_loss_id = ml.machine_loss_id inner join machines m on d.machine_id = m.machine_id where date_format(d.date,'%Y-%m-%d') between "${from}" and "${to}" group by d.machine_id , d.machine_loss_id;`);

            resolve({
                total_prod_summary : res_total_prod_summary,
                operation_reason : res_operation_reason,
                machine_reason : res_machine_reason,
                operator_reason : res_operator_reason,
                machine_time_loss_reason : res_machine_time_loss
            })
        }catch(err){
            reject(err)
        }
    })
}
