import React, { useState } from "react";

import './tableFilters.scss'

interface TableFilterProps {
   total: number;
   sizes: number[];
   page: number;
   currentSize: number;
   changePage: (page: number) => void;
   changeSize: (size: number) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
   total,
   sizes,
   page,
   currentSize,
   changePage,
   changeSize
}) => {
   const totalPages = Math.ceil(total / currentSize);
   const [paginationButtons, setPaginationButtons] = useState<number[]>([1,2,3]);

   const setButtons = (pageNumber: number, isNext: boolean) => {
      const lastIndex = paginationButtons.length - 1;
      const item = isNext ? paginationButtons[lastIndex] : paginationButtons[0];
      const newButtons: number[] = [];

      if (item < pageNumber + 1 && isNext && item !== totalPages) {
         new Array(3).fill(item).forEach((item, index) => {
            item + index <= totalPages &&  newButtons.push(item + index);
         })
         setPaginationButtons(newButtons);
      } else if (item > pageNumber && !isNext && item !== 1) {
         new Array(3).fill(item).forEach((item, index) => {
            item - index > 0 &&  newButtons.unshift(item - index);
         })
         setPaginationButtons(newButtons);
      }
   }

   const changeTablePage = (pageNumber: number) => {
      if (pageNumber === page || pageNumber < 0 || pageNumber === totalPages ) return;
      setButtons(pageNumber, pageNumber > page);
      changePage(pageNumber);
   }
   
   const changePageSize = (pageSize: number) => {
      if (Math.ceil(total / pageSize) < page) {
         const lastPage = Math.ceil(total / pageSize) - 1;
         changePage(lastPage);
         setPaginationButtons([lastPage - 1, lastPage, lastPage + 1]);
      }
      changeSize(pageSize)
   }

   return (
      <div className="filters-container">
         <div className="current">
            Showing {page * currentSize + 1} to {
            (page + 1) * currentSize > total ? total : (page + 1) * currentSize} of {
            total} page {page + 1} / {totalPages}
         </div>
         <div className="pagination-size">
            <div>
               <select
                  value={currentSize}
                  onChange={(event) => changePageSize(+event.target.value)}
               >
                  {sizes.map((size: number) => (
                     <option
                        key={size}
                        value={size}
                     >{size}</option>
                  ))}
               </select>
            </div>
            <div>
               <button
                  disabled={page - 1 < 0}
                  onClick={() => changeTablePage(page - 1)}
               >&lt;</button>
               {paginationButtons.map((button) => (
                  <button
                     className={`pagination-button ${button === page + 1 ? 'active' : ''}`}
                     key={button}
                     onClick={() => changeTablePage(button - 1)}
                  >{button}</button>
               ))}
               <button
                  disabled={page + 1 >= totalPages}
                  onClick={() => changeTablePage(page + 1)}
               >&gt;</button>
            </div>
            
         </div>
      </div>
   )
}

export default TableFilter;