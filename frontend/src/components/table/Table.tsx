import React, { useMemo, useState } from "react";

import TableFilter from "../filters/TableFilter";
import { TableOptions } from "../../shared/models/tableOptions";

import './table.scss'

interface TabelProps {
   payments: Record<string, any>[];
   sizes: number[];
   tableOptions: TableOptions[];
   total: number;
}

const Table: React.FC<TabelProps> = ({
   payments,
   sizes,
   tableOptions,
   total
}) => {
   const [page, setPage] = useState<number>(0);
   const [currentSize, setCurrentSize] = useState<number>(sizes[0]);

   const changeSize = (newSize: number) => {
      setCurrentSize(newSize);
   };

   const changePage = (newPage: number) => {
      setPage(newPage);
   };

   const items = useMemo(() => {
      return [...payments.slice(currentSize * page, currentSize * page + currentSize)]
      .map((item: Record<string, any>, index: number) => {
         return {
            ...item,
            id: index + 1
         };
      })
   }, [payments, page, currentSize]);

   return (
      <div className="table-container">
         <TableFilter
            page={page}
            sizes={sizes}
            total={total}
            currentSize={currentSize}
            changePage={changePage}
            changeSize={changeSize}
         />
         <table>
            <thead>
               <tr>
                  {tableOptions.map((option: TableOptions) => (
                     <th key={option.id}>{option.title}</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {items.map((item: Record<string, any>) => (
                  <tr key={item.id}>
                     {tableOptions.map((option: TableOptions) => (
                        <td key={option.id}>{item[option.selector]}</td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

export default Table;