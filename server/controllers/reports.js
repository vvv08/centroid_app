import { db } from "../../server/config/connection.js";
//To get cumulative reports
export const getReports = ({ from, to }) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Date wise rejection report summary
      const [res_date_prod] = await db.query(`select result.date , SUM(result.total_mix) as total_mix, sum(result.production_qty) as production, sum(result.rejection_qty) as rejection , round(sum(result.total_mix - result.production_qty),2) as material_loss from (SELECT
      r.Id as Id, 
      date_format(r.date,'%Y-%m-%d') as date,
      s.description AS shift,
      i.name AS inspector,
      r.remarks,
      r.production_qty as production_qty,
      date_format(r.production_from,'%Y-%m-%d') as production_from,
      date_format(r.production_to,'%Y-%m-%d') as production_to,
      JSON_ARRAYAGG( d.description) AS reasons,
      w.work_order,
      w.total_mix as total_mix,
      p.part_number,
      SUM(rs.rejection_qty) AS rejection_qty,
      round(SUM(rs.rejection_qty) * p.part_cost) AS total_cost,
      JSON_ARRAYAGG( m.name) AS machines,
      JSON_ARRAYAGG( o.name) AS operators,
      JSON_ARRAYAGG( os.operation_description) AS operations
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

      const [[res_date_prod_sum]] = await db.query(
        `SELECT
        SUM(r.production_qty) as production,
        SUM(w.total_mix) as total_mix
    FROM 
        rejection_dashboard r
    LEFT JOIN 
        work_orders w ON r.work_order_id = w.work_order_id
    WHERE
        date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}"
        ;`
      );

      const [[res_date_rej_sum]] = await db.query(
        `SELECT
        SUM(rejection_qty) as rejection
    FROM 
        rejection_dashboard r
    LEFT JOIN 
        rejections rs ON r.work_order_id = rs.work_order_id    
    WHERE
        date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}"
        ;`
      );

      //Down time date wise summary
      const [res_loss_time_date] =
        await db.query(`select date_format(d.date,'%Y-%m-%d') as date, concat(
                floor(sum(time_to_sec(timediff(d.idle_to, d.idle_from))) / 3600), ' hours, ', 
                floor((sum(time_to_sec(timediff(d.idle_to, d.idle_from))) % 3600) / 60), ' minutes'
            ) as time_loss, ml.description as reason from downtime_dashboard d inner join machine_loss ml on d.machine_loss_id = ml.machine_loss_id where date_format(d.date,'%Y-%m-%d') between "${from}" and "${to}" group by date_format(d.date,'%Y-%m-%d') , d.machine_loss_id;`);

      const [[res_loss_time_date_sum]] = await db.query(`select concat(
                floor(sum(time_to_sec(timediff(idle_to, idle_from))) / 3600), ' hours, ', 
                floor((sum(time_to_sec(timediff(idle_to, idle_from))) % 3600) / 60), ' minutes'
            ) as time_loss from downtime_dashboard where date_format(date,'%Y-%m-%d') between "${from}" and "${to}";`);

      //Part + Defect rejection summary
      const [res_part_defect] = await db.query(
        `SELECT
        d.description AS reason,
        p.part_number as part,
        SUM(rs.rejection_qty) AS rejection
    FROM 
        rejection_dashboard r
    LEFT JOIN 
        rejections rs ON r.work_order_id = rs.work_order_id
    LEFT JOIN 
        defects d ON d.defect_id = rs.defect_id
    LEFT JOIN 
        work_orders w ON r.work_order_id = w.work_order_id
    LEFT JOIN 
	      part_numbers p ON w.part_number_id = p.part_number_id
    WHERE
        date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}"
    GROUP BY 
        w.part_number_id, rs.defect_id
        ;`
      );

      //Part + Operation rejection summary
      const [res_part_operation] = await db.query(
        `SELECT
        p.part_number as part,
        SUM(rs.rejection_qty) as rejection,
        os.operation_description AS operation
    FROM 
        rejection_dashboard r
    LEFT JOIN 
        rejections rs ON r.work_order_id = rs.work_order_id
    LEFT JOIN 
        work_orders w ON r.work_order_id = w.work_order_id
    LEFT JOIN 
        operations os ON rs.operation_id = os.operation_id
    LEFT JOIN 
	      part_numbers p ON w.part_number_id = p.part_number_id
    WHERE
        date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}"
    GROUP BY 
        w.part_number_id,rs.operation_id
        ;`
      );

      //Operation + Defect rejection summary
      const [res_operation_defect] = await db.query(
        `SELECT
        d.description AS reason,
        os.operation_description as operation,
        SUM(rs.rejection_qty) AS rejection
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
        ;`
      );

      //Machine rejection summary
      const [res_machine_rejection] = await db.query(
        `SELECT
        SUM(rs.rejection_qty) AS rejection,
        m.name AS machine
    FROM 
        rejections rs
    LEFT JOIN 
        machines m ON rs.machine_id = m.machine_id
    WHERE
        date_format(rs.created_date,'%Y-%m-%d') between "${from}" and "${to}"
    GROUP BY 
        rs.machine_id
        ;`
      );

      //Operator + Operation rejection summary
      const [res_operator_operation] = await db.query(
        `SELECT
        SUM(rs.rejection_qty) AS rejection,
        o.name AS operator,
        os.operation_description AS operation
    FROM 
        rejections rs
    LEFT JOIN 
        operators o ON rs.operator_id = o.operator_id
    LEFT JOIN 
        operations os ON rs.operation_id = os.operation_id
    WHERE
        date_format(rs.created_date,'%Y-%m-%d') between "${from}" and "${to}"
    GROUP BY 
        rs.operator_id,rs.operation_id
        ;`
      );

      //Machine + Reason downtime
      const [res_machine_downtime] = await db.query(`select concat(
                floor(sum(time_to_sec(timediff(d.idle_to, d.idle_from))) / 3600), ' hours, ', 
                floor((sum(time_to_sec(timediff(d.idle_to, d.idle_from))) % 3600) / 60), ' minutes'
            ) as time_loss, ml.description as reason, m.name as machine from downtime_dashboard d inner join machine_loss ml on d.machine_loss_id = ml.machine_loss_id inner join machines m on d.machine_id = m.machine_id where date_format(d.date,'%Y-%m-%d') between "${from}" and "${to}" group by d.machine_id , d.machine_loss_id;`);

      //Shift + Machine rejection
      const [res_shift_machine] = await db.query(
        `SELECT
        s.description AS shift,
        SUM(rs.rejection_qty) AS rejection,
        m.name AS machine
    FROM 
        rejection_dashboard r
    LEFT JOIN 
        rejections rs ON r.work_order_id = rs.work_order_id
    LEFT JOIN 
        machines m ON rs.machine_id = m.machine_id
    LEFT JOIN 
        shifts s ON r.shift_id = s.shift_id
    WHERE
        date_format(r.date,'%Y-%m-%d') between "${from}" and "${to}"
    GROUP BY 
        r.shift_id,rs.machine_id
        ;`
      );

      resolve({
        date_wise: res_date_prod,
        date_wise_total: {
            total_mix : res_date_prod_sum.total_mix,
            production : res_date_prod_sum.production,
            rejection  :  res_date_rej_sum.rejection
        },
        date_downtime: res_loss_time_date,
        date_downtime_sum: res_loss_time_date_sum,
        part_rejection: res_part_defect,
        part_operation_rejection: res_part_operation,
        operation_reason: res_operation_defect,
        machine_wise: res_machine_rejection,
        operator_wise: res_operator_operation,
        machine_downtime: res_machine_downtime,
        shift_machine: res_shift_machine,
      });
    } catch (err) {
      reject(err);
    }
  });
};
