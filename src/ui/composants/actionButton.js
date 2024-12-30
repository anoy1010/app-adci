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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex flex-col items-center w-full max-w-md p-6 bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-xl text-white bg-red-600 rounded-full p-1.5 hover:bg-red-700"
            >
              &times;
            </button>
            <p className="text-center w-[70vw] text-lg font-medium text-gray-700">
              Voulez-vous vraiment supprimer cet élément ?
            </p>
            <div className="flex items-center justify-center mt-6 space-x-4">
              <button
                onClick={onConfirmDelete}
                className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Supprimer
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900"
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
