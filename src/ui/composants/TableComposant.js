import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ActionButton from "./actionButton";
import { db } from "@/pages/api/firebase";
import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  updateDoc, // Ajout pour mettre à jour Firestore
} from "firebase/firestore";
import ButtonAdd from "./buttonAdd";
import useArtisans from "../utils/useArtisan";
import EditModalUser from "./EditModalUser"; // Import du modal pour modifier l'utilisateur

// Fonction pour mettre à jour un utilisateur dans Firestore
const updateUser = async (id, updatedData) => {
  try {
    const userDoc = doc(db, "userArtisans", id);
    await updateDoc(userDoc, updatedData);
    console.log("Utilisateur mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
  }
};

// Fonction pour ajouter un utilisateur dans Firestore
const addUser = async (newUser) => {
  try {
    await addDoc(collection(db, "userArtisans"), newUser);
    console.log("Utilisateur ajouté avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", error);
  }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, "userArtisans", id));
    console.log(`Utilisateur avec l'id ${id} supprimé avec succès`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    throw error;
  }
};

function TableComposant() {
  const userArtisans = useArtisans();

  // États pour la gestion du modal d'édition
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const columns = [
    { field: "order", header: "Order" },
    { field: "pict", header: "" },
    { field: "name", header: "Nom" },
    { field: "lastName", header: "Prenom" },
    { field: "storeName", header: "Boutique" },
    { field: "contact", header: "Contact" },
    { field: "email", header: "Email" },
    { field: "status", header: "Abonnement" },
    { field: "delay", header: "J-restant" },
    { field: "subscriptionDate", header: "Date de souscription" },
    { field: "endDate", header: "Date de fin de souscription" },
  ];

  // Gestion de l'édition d'un utilisateur
  const handleEdit = (user) => {
    setSelectedUser(user); // Définit l'utilisateur à modifier
    setIsEditModalVisible(true); // Ouvre le modal
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null); // Réinitialise l'utilisateur sélectionné
    setIsEditModalVisible(false); // Ferme le modal
  };

  const handleSaveEdit = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, updatedUser); // Met à jour dans Firestore
      console.log("Mise à jour réussie !");
      handleCloseEditModal(); // Ferme le modal après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Supprime de Firestore
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      await addUser(newUser); // Ajoute à Firestore
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    }
  };

  return (
    <div className="table-container overflow-x-auto">
      <ButtonAdd onAdd={handleAddUser} />
      <DataTable
        value={userArtisans}
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
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
          className="text-center"
          style={{ minWidth: "150px" }}
        />
      </DataTable>

      {/* Modal d'édition */}
      <EditModalUser
        userData={selectedUser} // Passez selectedUser à la prop userData
        isVisible={isEditModalVisible} // Passez isEditModalVisible pour la visibilité
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit} // Passez handleSaveEdit à la prop onSave
      />
    </div>
  );
}

export default TableComposant;
