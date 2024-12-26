import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ActionButton from "./actionButton";
import { db } from "@/pages/api/firebase";
import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import ButtonAdd from "./buttonAdd";
import useArtisans from "../utils/useArtisan";

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

  // Calculer les jours restants
  const calculateRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const timeDifference = end - today;
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return remainingDays > 0 ? remainingDays : 0;
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Supprimer de Firestore
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      await addUser(newUser); // Ajouter à Firestore
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
            className="p-2 md:p-3 text-xs sm:text-sm lg:text-base" // Réactivité sur les tailles de texte
            style={{ minWidth: "150px" }} // Assurer que les colonnes aient une largeur minimale
          />
        ))}
        <Column
          field="action"
          header="Action"
          body={(rowData) => (
            <ActionButton rowData={rowData} handleDelete={handleDelete} />
          )}
          className="text-center"
          style={{ minWidth: "100px" }} // Largeur minimale pour l'action
        />
      </DataTable>
    </div>
  );
}

export default TableComposant;
