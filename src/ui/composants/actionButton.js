import React, { useRef, useState } from "react";
import { Button } from "primereact/button";

function ActionButton({ rowData, handleDelete, handleEdit }) {
  const [isModalVisible, setIsModalVisible] = useState(false); // État pour afficher ou masquer la modal

  const onDeleteClick = () => {
    setIsModalVisible(true); // Affiche la modal
  };

  const onConfirmDelete = () => {
    handleDelete(rowData.id); // Supprime les données
    setIsModalVisible(false); // Ferme la modal après suppression
  };

  const onUpdateClick = () => {
    handleEdit(rowData); // Édite les données
  };

  const closeModal = () => {
    setIsModalVisible(false); // Ferme la modal
  };

  return (
    <div>
      <div className="flex">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          text
          severity="success"
          aria-label="Edit"
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

      {/* Modal pour confirmation de suppression */}
      {isModalVisible && (
        <div
          className="modal flex justify-center items-center z-[1000] fixed top-0 left-0 w-full h-full bg-transparent "
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div className="modal-content relative w-[30vw] bg-white p-9 rounded-lg text-center shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-1 right-0 pointer text-[19px] ring-1 bg-red-600 px-2 text-white ring-black  mx-5"
            >
              &times;
            </button>
            <p>Voulez-vous vraiment supprimer cet élément ?</p>
            <div
              className="flex items-center justify-center gap-x-4"
              style={{ marginTop: "20px" }}
            >
              <button
                onClick={onConfirmDelete}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Supprimer
              </button>
              <button
                onClick={closeModal}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionButton;
