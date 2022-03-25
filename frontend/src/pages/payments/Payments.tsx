import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "../../components/table/Table";
import TotalInfo from "../../components/TotalInfo/TotalInfo";
import { loadPyments } from "../../redux/actions";
import { GlobalState } from "../../shared/models/globalStateModel";
import { TableOptions } from "../../shared/models/tableOptions";

import './payment.scss'

const Payment: React.FC = () => {
   const dispatch = useDispatch();
   const { payments, tenants } = useSelector((state: GlobalState) => state.payment);
   const tableOptions: TableOptions[] = [
      {
         id: 1,
         title: 'date',
         width: 'auto',
         selector: 'payment_date',
      },
      {
         id: 2,
         title: 'tenant30802',
         width: 'auto',
         selector: 'tenant_30802'
      },
      {
         id: 3,
         title: 'tenant30841',
         width: 'auto',
         selector: 'tenant_30841'
      },
      {
         id: 4,
         title: 'tenant30846',
         width: 'auto',
         selector: 'tenant_30846'
      },
      {
         id: 5,
         title: 'tenant30875',
         width: 'auto',
         selector: 'tenant_30875'
      },
      {
         id: 6,
         title: 'tenant31144',
         width: 'auto',
         selector: 'tenant_31144'
      },
      {
         id: 7,
         title: 'tenant31155',
         width: 'auto',
         selector: 'tenant_31155'
      },
   ]

   const loadAllPayments = () => {
      dispatch(loadPyments())
   }

   useEffect(() => {
      if (!payments.length) loadAllPayments();
      const intervalInfon = setInterval(() => {
         loadAllPayments();
      }, 30000)
      return () => {
         clearInterval(intervalInfon);
      }
   }, []);

   return (
      <div className="payment-container">
         <Table
            payments={payments}
            sizes={[10,15,20]}
            total={payments.length}
            tableOptions={tableOptions}
         />
         <TotalInfo
            payments={payments}
            tenants={tenants}  
         />
      </div>
   )
}

export default Payment;