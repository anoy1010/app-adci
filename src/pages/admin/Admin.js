import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { motion } from "framer-motion";
import TableComponent from "@/ui/composants/tableComponent";
import useArtisans from "@/ui/utils/useArtisan";
import { useClients } from "@/ui/utils/useClient";
import ButtonAdd from "@/ui/composants/buttonAdd";
import AddArtisan from "@/ui/composants/AddArtisan";
import AddClient from "@/ui/composants/AddClient";
import EditModalUser from "@/ui/composants/EditModalUser";
import EditModalClient from "@/ui/composants/EditModalClient";
import { db } from "@/pages/api/firebase";
import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  updateDoc, // Ajout pour mettre à jour Firestore
} from "firebase/firestore";

function AdminPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isEditModalClientVisible, setIsEditModalClientVisible] =
    useState(false);

  const userArtisans = useArtisans();
  const userClients = useClients();

  const items = [
    { label: "Artisans", icon: "pi pi-user" },
    { label: "Clients", icon: "pi pi-users" },
  ];

  const artisanColumns = [
    { field: "order", header: "Order" },
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

  const clientColumns = [
    { field: "order", header: "Order" },
    { field: "Name", header: "Nom" },
    { field: "firstName", header: "Prenom" },
    { field: "phone", header: "Contact" },
    { field: "email", header: "Email" },
  ];

  const updateUser = async (id, updatedData) => {
    try {
      const userDoc = doc(db, "userArtisans", id);
      await updateDoc(userDoc, updatedData);
      console.log("Utilisateur mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    }
  };
  const updateUserClient = async (id, updatedData) => {
    try {
      const userDoc = doc(db, "userClient", id);
      await updateDoc(userDoc, updatedData);
      console.log("Client mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client:", error);
    }
  };
  const handleEdit = (user) => {
    setSelectedUser(user); // Définit l'artisan à modifier
    setIsEditModalVisible(true); // Ouvre le modal
  };
  const handleEditClient = (user) => {
    setSelectedUser(user); // Définit le client à modifier
    setIsEditModalClientVisible(true); // Ouvre le modal
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
  const handleSaveEditClient = async (updatedUser) => {
    try {
      await updateUserClient(updated.id, updatedUser); // Met à jour dans Firestore
      console.log("Mise à jour réussie !");
      handleCloseEditModalClient(); // Ferme le modal après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };
  const handleCloseEditModal = () => {
    setSelectedUser(null); // Réinitialise l'utilisateur sélectionné
    setIsEditModalVisible(false); // Ferme le modal
  };
  const handleCloseEditModalClient = () => {
    setSelectedUser(null); // Réinitialise l'utilisateur sélectionné
    setIsEditModalClientVisible(false); // Ferme le modal
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "userArtisans", id));
      console.log(`Utilisateur avec l'id ${id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    }
  };
  const deleteUserClient = async (id) => {
    try {
      await deleteDoc(doc(db, "userClient", id));
      console.log(`Utilisateur avec l'id ${id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Supprime de Firestore
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };
  const handleDeleteClient = async (id) => {
    try {
      await deleteUserClient(id); // Supprime de Firestore
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  return (
    <div className="admin-page">
      <div className="card flex items-center justify-center py-4 z-50">
        <TabMenu
          className="text-black"
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        key={activeIndex}
      >
        {activeIndex === 1 && (
          <div className="z-20">
            <TableComponent
              data={userClients}
              columns={clientColumns}
              onEdit={handleEditClient}
              handleDelete={handleDeleteClient}
            />
            <EditModalClient
              userData={selectedUser} // Passez selectedUser à la prop userData
              isVisible={isEditModalClientVisible} // Passez isEditModalVisible pour la visibilité
              onClose={handleCloseEditModalClient}
              onSave={handleSaveEditClient} // Passez handleSaveEdit à la prop onSave
            />
          </div>
        )}
        {activeIndex === 0 && (
          <div className="z-20">
            <TableComponent
              data={userArtisans}
              columns={artisanColumns}
              onEdit={handleEdit}
              handleDelete={handleDelete}
            />
            <EditModalUser
              userData={selectedUser} // Passez selectedUser à la prop userData
              isVisible={isEditModalVisible} // Passez isEditModalVisible pour la visibilité
              onClose={handleCloseEditModal}
              onSave={handleSaveEdit} // Passez handleSaveEdit à la prop onSave
            />
          </div>
        )}
      </motion.div>
      <div className="flex flex-col items-end p-4">
        <ButtonAdd
          style={{
            position: "relative", // ou "static" si nécessaire
            zIndex: 10,
            marginTop: "20px",
          }}
          fields={[
            { name: "name", label: "Nom", placeholder: "Nom", type: "text" },
          ]}
          title="Ajouter un élément"
          onSubmit={(data) => console.log(data)}
        />
      </div>
    </div>
  );
}

export default AdminPage;
