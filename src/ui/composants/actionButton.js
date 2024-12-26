import React from "react";
import { Button } from "primereact/button";

function ActionButton({ rowData, handleDelete }) {
  const onDeleteClick = () => {
    handleDelete(rowData.id); // Appeler handleDelete avec l'id de l'utilisateur
  };

  return (
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
  );
}

export default ActionButton;
