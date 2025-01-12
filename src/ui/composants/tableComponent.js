import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ActionButton from "./actionButton";

function TableComponent({ data, columns, onEdit, handleDelete }) {
  return (
    <div className="table-container overflow-x-auto">
      <DataTable
        value={data}
        scrollable
        scrollHeight="400px"
        className="custom-table"
        responsiveLayout="scroll"
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={(rowData) =>
              col.field.includes("Date")
                ? new Date(rowData[col.field]).toLocaleDateString()
                : rowData[col.field]
            }
            className="p-2 md:p-3 text-xs sm:text-sm lg:text-base"
            style={{ minWidth: "100px" }}
          />
        ))}
        <Column
          field="action"
          header="Action"
          body={(rowData) => (
            <ActionButton
              rowData={rowData}
              handleEdit={() => onEdit(rowData)}
              handleDelete={() => handleDelete(rowData.id)}
            />
          )}
          className="text-center"
          style={{ minWidth: "150px" }}
        />
      </DataTable>
    </div>
  );
}

export default TableComponent;
