import React, { useState, useRef } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { calculateRemainingDays } from "../utils/CalculateRemainDays";
import { addUser, deleteUser, fetchData } from "../utils/fireStoreServices";
import { Calendar } from "primereact/calendar";

function ButtonAdd() {
  const toast = useRef(null);
  const [showDialog, setShowDialog] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    storeName: "",
    contact: "",
    email: "",
    status: "",
    months: 1,
    delay: 30,
    createdAt: new Date().toISOString(),
    subscriptionDate: new Date(), // Nouvelle date
    endDate: null, // Date calculée
  });

  const monthsOptions = [
    { label: "1 Mois", value: 1 },
    { label: "3 Mois", value: 3 },
    { label: "6 Mois", value: 6 },
    { label: "12 Mois", value: 12 },
  ];

  const calculateEndDate = (subscriptionDate, months) => {
    if (!(subscriptionDate instanceof Date) || isNaN(subscriptionDate))
      return null; // Vérifie la validité de la date
    const endDate = new Date(subscriptionDate);
    endDate.setMonth(endDate.getMonth() + months);
    return endDate; // Retourne une instance de Date valide
  };

  const handleDateChange = (e) => {
    const subscriptionDate = new Date(e.value);
    if (isNaN(subscriptionDate)) {
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail: "Date de souscription invalide.",
      });
      return;
    }

    const endDate = calculateEndDate(subscriptionDate, formData.months);
    setFormData({ ...formData, subscriptionDate, endDate });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMonthsChange = (e) => {
    const selectedMonths = e.value;
    setFormData({
      ...formData,
      months: selectedMonths,
      delay: calculateRemainingDays(formData.createdAt, selectedMonths),
    });
  };

  const handleSubmit = async () => {
    try {
      const newData = {
        ...formData,
        subscriptionDate: formData.subscriptionDate.toISOString().split("T")[0], // Formate pour l'enregistrement
        endDate: formData.endDate
          ? formData.endDate.toISOString().split("T")[0]
          : null, // Formate ou met à null si invalide
      };

      await addUser(newData);
      toast.current.show({
        severity: "success",
        summary: "Ajout réussi",
        detail: "L'utilisateur a été ajouté.",
      });

      // Réinitialisation du formulaire
      setFormData({
        name: "",
        lastName: "",
        storeName: "",
        contact: "",
        email: "",
        status: "",
        months: 1,
        delay: 30,
        subscriptionDate: new Date(),
        endDate: null,
      });

      setShowDialog(false); // Fermer le dialog
    } catch (error) {
      console.error("Erreur :", error);
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail: "Une erreur est survenue.",
      });
    }
  };

  const abonnementOptions = [
    { label: "Standard", value: "standard" },
    { label: "Bronze", value: "bronze" },
    { label: "Argent", value: "argent" },
    { label: "Or", value: "or" },
  ];

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, status: e.value });
  };

  const items = [
    {
      label: "Add",
      icon: "pi pi-plus",
      command: () => {
        setShowDialog(true); // Ouvrir le dialog lors de l'ajout
      },
    },
    {
      label: "Update",
      icon: "pi pi-refresh",
      command: () => {
        toast.current.show({
          severity: "success",
          summary: "Update",
          detail: "Data Updated",
        });
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        toast.current.show({
          severity: "error",
          summary: "Delete",
          detail: "Data Deleted",
        });
      },
    },
  ];

  return (
    <div>
      <Toast ref={toast} />
      <SpeedDial
        mask
        model={items}
        radius={120}
        direction="up"
        transitionDelay={80}
        showIcon="pi pi-bars"
        hideIcon="pi pi-times"
        style={{ right: 0, bottom: 0, padding: "50px" }}
        buttonClassName="p-button-warning"
      />

      <Dialog
        header="Ajouter un utilisateur"
        visible={showDialog}
        style={{ width: "30vw" }} // Largeur par défaut pour les grands écrans
        onHide={() => setShowDialog(false)} // Fermer le dialog
        className="dialog-form"
        breakpoints={{ "960px": "75vw", "640px": "90vw" }}
      >
        <div className="p-fluid content-form">
          <div className="field mb-4 md:mb-6">
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nom"
              className="w-full"
            />
          </div>
          <div className="field mb-4 md:mb-6">
            <InputText
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Prenom"
              className="w-full"
            />
          </div>
          <div className="field mb-4 md:mb-6">
            <InputText
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="Nom de la boutique"
              className="w-full"
            />
          </div>
          <div className="field mb-4 md:mb-6">
            <InputText
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Contact"
              className="w-full"
            />
          </div>
          <div className="field mb-4 md:mb-6">
            <InputText
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full"
            />
          </div>
          <div className="field mb-4 md:mb-6">
            <label className="block mb-2" htmlFor="status">
              Abonnement
            </label>
            <Dropdown
              id="status"
              value={formData.status}
              options={abonnementOptions}
              onChange={handleDropdownChange}
              placeholder="Choisir un abonnement"
              className="w-full"
            />
          </div>
          <div className="field mb-4 md:mb-6">
            <label htmlFor="months">Durée abonnement (mois)</label>
            <Dropdown
              id="months"
              value={formData.months}
              options={monthsOptions}
              onChange={handleMonthsChange}
              placeholder="Sélectionnez la durée"
              className="w-full"
            />
          </div>
          {/* <div className="field">
            <InputText
              id="delay"
              name="delay"
              value={formData.delay}
              readOnly
              placeholder="Jours restants"
            />
          </div> */}
          <div className="field  mb-4 md:mb-6">
            <label htmlFor="months">Date de souscription</label>
            <Calendar
              id="subscriptionDate"
              value={new Date(formData.subscriptionDate)} // Convertissez en Date si nécessaire
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subscriptionDate: e.value, // Met à jour avec une instance valide de Date
                  endDate: calculateEndDate(e.value, formData.months), // Calcule la date de fin
                })
              }
              showIcon
              placeholder="Choisir une date"
              className="w-full"
            />
          </div>
          <div className="field  mb-4 md:mb-6">
            <label htmlFor="months">Date de fin de souscription</label>
            <InputText
              id="endDate"
              value={
                formData.endDate
                  ? formData.endDate.toLocaleDateString("fr-FR") // Format lisible en français
                  : ""
              }
              placeholder="Date de fin de souscription"
              readOnly
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            className="button-form"
            label="Ajouter"
            icon="pi pi-check"
            onClick={handleSubmit}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default ButtonAdd;
