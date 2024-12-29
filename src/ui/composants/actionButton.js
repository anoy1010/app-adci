import React from "react";
import { Button } from "primereact/button";

function ActionButton({ rowData, handleDelete, handleEdit }) {
  const onDeleteClick = () => {
    handleDelete(rowData.id); // Appeler handleDelete avec l'id de l'utilisateur
  };
  const onUpdateClick = () => {
    handleEdit(rowData); // Appeler handleEdit avec les données de la ligne
  };
  return (
    <div className="flex">
      <Button
        icon="pi pi-pencil"
        rounded
        outlined
        text
        severity="success"
        aria-label="Trash"
        style={{ color: "green", zIndex: 1 }}
        onClick={onUpdateClick}
      />
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        text
        severity="danger"
        aria-label="Trash"
        style={{ color: "red", zIndex: 1 }}
        onClick={onDeleteClick}
      />
    </div>
  );
}

export default ActionButton;
