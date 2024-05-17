import { db } from '../../server/config/connection.js'
//To get cumulative reports
export const getReports = ({from,to}) => {
    return new Promise(async (resolve,reject) => {
        try{
            //Date wise rejection report summary
            const [res_date_prod] = await db.query(`select sum(production_qty) as production, sum(rejection_qty) as rejection,sum(total_mix) as total_mix , date_format(date, '%Y-%m-%d') as date, (sum(total_mix) - sum(production_qty)) as material_loss from rejection_dashboard  where date_format(date,'%Y-%m-%d') between "${from}" and "${to}" group by date_format(date, '%Y-%m-%d') order by date_format(date, '%Y-%m-%d') asc;`);

            const [[res_date_prod_sum]] = await db.query(`select sum(production_qty) as production, sum(rejection_qty) as rejection,sum(total_mix) as total_mix ,(sum(total_mix) - sum(production_qty)) as material_loss from rejection_dashboard  where date_format(date,'%Y-%m-%d') between "${from}" and "${to}";`)

            //Down time date wise summary
            const [res_loss_time_date] = await db.query(`select date_format(d.date,'%Y-%m-%d') as date, time_format(sum(timediff(d.idle_to , d.idle_from)),'%H') as time_loss, ml.description as reason from downtime_dashboard d inner join machine_loss ml on d.machine_loss_id = ml.machine_loss_id where date_format(d.date,'%Y-%m-%d') between "${from}" and "${to}" group by date_format(d.date,'%Y-%m-%d') , d.machine_loss_id;`);

            const [[res_loss_time_date_sum]] = await db.query(`select time_format(sum(timediff(idle_to , idle_from)),'%H') as time_loss from downtime_dashboard where date_format(date,'%Y-%m-%d') between "${from}" and "${to}";`)

            //Part + Defect rejection summary
             const [res_part_defect] = await db.query(`select sum(r.production_qty) as production, sum(r.rejection_qty) as rejection,sum(r.total_mix) as total_mix , r.part_number as part, (sum(r.total_mix) - sum(r.production_qty)) as material_loss, d.description as reason from rejection_dashboard r inner join defects d on r.defect_id = d.defect_id where date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}" group by r.part_number,r.defect_id;`);

             //Part + Operation rejection summary
             const [res_part_operation] = await db.query(`select sum(r.production_qty) as production, sum(r.rejection_qty) as rejection,sum(r.total_mix) as total_mix , r.part_number as part, (sum(r.total_mix) - sum(r.production_qty)) as material_loss, o.operation_description as operation from rejection_dashboard r inner join operations o on r.operation_id = o.operation_id where date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}" group by r.part_number,r.operation_id;`);

             //Operation + Defect rejection summary
             const [res_operation_defect] = await db.query(`select sum(r.production_qty) as production, sum(r.rejection_qty) as rejection,sum(r.total_mix) as total_mix , d.description as reason, (sum(r.total_mix) - sum(r.production_qty)) as material_loss, o.operation_description as operation from rejection_dashboard r inner join operations o on r.operation_id = o.operation_id inner join defects d on r.defect_id = d.defect_id where date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}" group by r.defect_id,r.operation_id;`);

             //Machine rejection summary
             const [res_machine_rejection] = await db.query(`select sum(r.production_qty) as production, sum(r.rejection_qty) as rejection,sum(r.total_mix) as total_mix , (sum(r.total_mix) - sum(r.production_qty)) as material_loss, m.name as machine from rejection_dashboard r inner join machines m on r.machine_id = m.machine_id where date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}" group by r.machine_id;`);

             //Operator + Operation rejection summary
             const [res_operator_operation] = await db.query(`select sum(r.production_qty) as production, sum(r.rejection_qty) as rejection,sum(r.total_mix) as total_mix , s.name as operator, (sum(r.total_mix) - sum(r.production_qty)) as material_loss, o.operation_description as operation from rejection_dashboard r inner join operations o on r.operation_id = o.operation_id inner join operators s on r.operator_id = s.operator_id where date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}" group by r.operator_id,r.operation_id;`);

             //Machine + Reason downtime
             const [res_machine_downtime] = await db.query(`select time_format(sum(timediff(d.idle_to , d.idle_from)),'%H') as time_loss, ml.description as reason, m.name as machine from downtime_dashboard d inner join machine_loss ml on d.machine_loss_id = ml.machine_loss_id inner join machines m on d.machine_id = m.machine_id where date_format(d.date,'%Y-%m-%d') between "${from}" and "${to}" group by d.machine_id , d.machine_loss_id;`);

             //Shift + Machine rejection
             const [res_shift_machine] = await db.query(`select sum(r.production_qty) as production, sum(r.rejection_qty) as rejection,sum(r.total_mix) as total_mix , m.name as machine, s.description as shift , (sum(r.total_mix) - sum(r.production_qty)) as material_loss from rejection_dashboard r inner join shifts s on r.shift_id = s.shift_id inner join machines m on r.machine_id = m.machine_id where date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}" group by r.shift_id,r.machine_id;`)

            resolve({
                date_wise : res_date_prod,
                date_wise_total : res_date_prod_sum,
                date_downtime : res_loss_time_date,
                date_downtime_sum : res_loss_time_date_sum,
                part_rejection : res_part_defect,
                part_operation_rejection : res_part_operation,
                operation_reason  : res_operation_defect,
                machine_wise : res_machine_rejection,
                operator_wise : res_operator_operation,
                machine_downtime : res_machine_downtime,
                shift_machine : res_shift_machine 
            })

        }catch(err){
            reject(err)
        }
    })
}