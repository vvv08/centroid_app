import { db } from "../config/connection.js";

//TO get data for graphs
export const getGraphData = ({ from, to }) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Total mix, Production and Rejection per day
      const [res_total_prod_summary] =
        await db.query(`select result.date as name , SUM(result.total_mix) as 'Total mix', sum(result.production_qty) as Production, sum(result.rejection_qty) as Rejection from (SELECT
                r.Id as Id, 
                date_format(r.date,'%Y-%m-%d') as date,
                r.production_qty as production_qty,
                w.total_mix as total_mix,
                SUM(rs.rejection_qty) AS rejection_qty,
                round(SUM(rs.rejection_qty) * p.part_cost) AS total_cost
            FROM 
                rejection_dashboard r
            LEFT JOIN 
                rejections rs ON r.work_order_id = rs.work_order_id
            LEFT JOIN 
                defects d ON d.defect_id = rs.defect_id
            LEFT JOIN 
                work_orders w ON r.work_order_id = w.work_order_id
            LEFT JOIN 
                machines m ON rs.machine_id = m.machine_id
            LEFT JOIN 
                operators o ON rs.operator_id = o.operator_id
            LEFT JOIN 
                operations os ON rs.operation_id = os.operation_id
            LEFT JOIN 
                shifts s ON r.shift_id = s.shift_id
            LEFT JOIN 
                inspectors i ON r.inspector_id = i.inspector_id
            LEFT JOIN 
                  part_numbers p ON w.part_number_id = p.part_number_id
            WHERE
                date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}"
            GROUP BY 
                r.date, s.description, i.name, r.remarks, r.production_qty, r.production_from, r.production_to, w.work_order,p.part_number_id
                )  result group by result.date;`);

      //Operation + reason total
      const [res_operation_reason] = await db.query(`SELECT
            rs.rejection_id as id,    
            concat(d.description, ' & ' ,
            os.operation_description) as label,
            SUM(rs.rejection_qty) AS value
        FROM 
            rejections rs
        LEFT JOIN 
            defects d ON rs.defect_id = d.defect_id
        LEFT JOIN 
            operations os ON rs.operation_id = os.operation_id
        WHERE
            date_format(rs.created_date,'%Y-%m-%d') between "${from}" and "${to}"
        GROUP BY 
            rs.operation_id,rs.defect_id
            ;`);

      //Machine + reason total
      const [res_machine_reason] = await db.query(
        `SELECT
            rs.rejection_id as id,    
            concat(d.description, ' & ' ,
            m.name) as label,
            SUM(rs.rejection_qty) AS value
        FROM 
            rejections rs
        LEFT JOIN 
            defects d ON rs.defect_id = d.defect_id
        LEFT JOIN 
            machines m ON rs.machine_id = m.machine_id
        WHERE
            date_format(rs.created_date,'%Y-%m-%d') between "${from}" and "${to}"
        GROUP BY 
            rs.machine_id,rs.defect_id
            ;`
      );

      //Operator + reason total
      const [res_operator_reason] = await db.query(
        `SELECT
            rs.rejection_id as id,    
            concat(d.description, ' & ' ,
            o.name) as label,
            SUM(rs.rejection_qty) AS value
        FROM 
            rejections rs
        LEFT JOIN 
            defects d ON rs.defect_id = d.defect_id
        LEFT JOIN 
            operators o ON rs.operator_id = o.operator_id
        WHERE
            date_format(rs.created_date,'%Y-%m-%d') between "${from}" and "${to}"
        GROUP BY 
            rs.operator_id,rs.defect_id
            ;`
      );

      //Machine + machine_loss reason total
      const [res_machine_time_loss] = await db.query(
        `select d.downtime_id as id, concat(m.name,' & ',ml.description) as label,time_format(sum(timediff(d.idle_to , d.idle_from)),'%H') as value from downtime_dashboard d inner join machine_loss ml on d.machine_loss_id = ml.machine_loss_id inner join machines m on d.machine_id = m.machine_id where date_format(d.date,'%Y-%m-%d') between "${from}" and "${to}" group by d.machine_id , d.machine_loss_id;`
      );

      resolve({
        total_prod_summary: res_total_prod_summary,
        operation_reason: res_operation_reason,
        machine_reason: res_machine_reason,
        operator_reason: res_operator_reason,
        machine_time_loss_reason: res_machine_time_loss,
      });
    } catch (err) {
      reject(err);
    }
  });
};
