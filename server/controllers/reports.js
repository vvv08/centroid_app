import { db } from '../../server/config/connection.js'
//To get cumulative reports
export const getReports = ({from,to}) => {
    return new Promise(async (resolve,reject) => {
        try{
            const [res_month] = await db.query(`select sum(production_qty) as production, sum(rejection_qty) as rejection, (sum(production_qty) - sum(rejection_qty)) as production_loss, time_format(sum(timediff(idle_time_to , idle_time_from)),'%H') as total_down_time , date_format(date, '%m-%Y') as month from rejection_dashboard  where r.date between "${from}" and "${to}" group by date_format(date, '%m-%Y') order by date_format(date, '%m-%Y') asc;`);

            const [res_machine] = await db.query(`select sum(r.production_qty) as production, sum(r.rejection_qty) as rejection, (sum(r.production_qty) - sum(r.rejection_qty)) as production_loss, time_format(sum(timediff(r.production_to , r.production_from)),'%H') as total_production_time ,time_format(sum(timediff(r.idle_time_to , r.idle_time_from)),'%H') as total_down_time , m.name as machine from rejection_dashboard r right join machines m on r.machine_id = m.machine_id where r.date between "${from}" and "${to}" group by r.machine_id;`);

            const [res_operator] = await db.query(`select sum(r.production_qty) as production, sum(r.rejection_qty) as rejection, (sum(r.production_qty) - sum(r.rejection_qty)) as production_loss , o.name as operator, r.part_number as part_number from rejection_dashboard r right join operators o on r.operator_id = o.operator_id where r.date between "${from}" and "${to}" group by r.operator_id , r.part_number;`);

            const [res_operation] = await db.query(`select sum(r.production_qty) as production, sum(r.rejection_qty) as rejection, (sum(r.production_qty) - sum(r.rejection_qty)) as production_loss , o.operation_description as operation from rejection_dashboard r right join operations o on r.operation_id = o.operation_id where r.date between "${from}" and "${to}" group by r.operation_id;`);

            const [res_defect] = await db.query(`select sum(r.production_qty) as production, sum(r.rejection_qty) as rejection, (sum(r.production_qty) - sum(r.rejection_qty)) as production_loss , d.description as defect from rejection_dashboard r right join defects d on r.defect_id = d.defect_id where r.date between "${from}" and "${to}" group by r.defect_id;`);

            const [res_loss_reason] = await db.query(`select m.description as reason , time_format(sum(timediff(r.idle_time_to , r.idle_time_from)),'%H') as total_down_time  from rejection_dashboard r right join machine_loss m on r.machine_loss_id = m.machine_loss_id where r.date between "${from}" and "${to}" group by m.machine_loss_id;`);

            resolve({
                month_wise : res_month,
                operator_wise : res_operator,
                operation_wise : res_operation,
                defect_wise : res_defect,
                machine_wise : res_machine,
                loss_reason : res_loss_reason
            })

        }catch(err){
            reject(err)
        }
    })
}