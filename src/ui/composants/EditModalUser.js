import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { calculateRemainingDays } from "../utils/CalculateRemainDays";

function EditModalUser({ userData, isVisible, onClose, onSave }) {
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    storeName: "",
    contact: "",
    email: "",
    status: "",
    months: null,
    subscriptionDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        ...userData,
        subscriptionDate: userData.subscriptionDate
          ? new Date(userData.subscriptionDate)
          : null,
        endDate: userData.endDate ? new Date(userData.endDate) : null,
      });
    }
  }, [userData]);

  const monthsOptions = [
    { label: "2 Semaines", value: 0 },
    { label: "1 Mois", value: 1 },
    { label: "3 Mois", value: 3 },
    { label: "6 Mois", value: 6 },
    { label: "12 Mois", value: 12 },
  ];

  const abonnementOptions = [
    { label: "Standard", value: "standard" },
    { label: "Bronze", value: "bronze" },
    { label: "Argent", value: "argent" },
    { label: "Or", value: "or" },
  ];

  const calculateEndDate = (subscriptionDate, months) => {
    if (!(subscriptionDate instanceof Date) || isNaN(subscriptionDate))
      return null;
    const endDate = new Date(subscriptionDate);
    endDate.setMonth(endDate.getMonth() + months);
    return endDate;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (e) => {
    const selectedStatus = e.value;
    let updatedFormData = { ...formData, status: selectedStatus };

    if (selectedStatus === "standard") {
      const subscriptionDate = new Date(formData.subscriptionDate);
      const endDate = new Date(subscriptionDate);
      endDate.setDate(subscriptionDate.getDate() + 14); // Ajouter 14 jours

      updatedFormData = {
        ...updatedFormData,
        months: 0, // Forcer "2 Semaines"
        delay: 14,
        endDate,
      };
    } else {
      // Réinitialiser pour les autres abonnements
      updatedFormData = {
        ...updatedFormData,
        months: 1, // Par défaut à 1 mois
        delay: calculateRemainingDays(formData.createdAt, 1),
        endDate: calculateEndDate(formData.subscriptionDate, 1),
      };
    }

    setFormData(updatedFormData);
  };

  // Dynamique : options en fonction de l'abonnement
  const getFilteredMonthsOptions = () => {
    if (formData.status === "standard") {
      return monthsOptions; // Toutes les options disponibles
    }
    // Supprimer "2 Semaines" pour les autres abonnements
    return monthsOptions.filter((option) => option.value !== 0);
  };

  const handleMonthsChange = (e) => {
    const selectedMonths = e.value;
    setFormData({
      ...formData,
      months: selectedMonths,
      delay: calculateRemainingDays(formData.createdAt, selectedMonths),
      endDate: calculateEndDate(formData.subscriptionDate, selectedMonths),
    });
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

    let endDate;

    if (formData.status === "standard") {
      // Si abonnement Standard, 2 semaines
      endDate = new Date(subscriptionDate);
      endDate.setDate(subscriptionDate.getDate() + 14); // Ajouter 14 jours
    } else {
      // Autres abonnements, calcul en fonction de la durée (months)
      endDate = calculateEndDate(subscriptionDate, formData.months);
    }

    setFormData({
      ...formData,
      subscriptionDate,
      endDate,
    });
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        ...formData,
        subscriptionDate: formData.subscriptionDate.toISOString().split("T")[0],
        endDate: formData.endDate
          ? formData.endDate.toISOString().split("T")[0]
          : null,
      };

      await onSave(updatedData);
      toast.current?.show({
        severity: "success",
        summary: "Modification réussie",
        detail: "Les informations de l'utilisateur ont été mises à jour.",
      });
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.current?.show({
        severity: "error",
        summary: "Erreur",
        detail: "Une erreur est survenue lors de la mise à jour.",
      });
    }
  };

  return (
    <Dialog
      header="Modifier l'utilisateur"
      visible={isVisible}
      onHide={onClose}
      style={{ width: "30vw" }}
      className="dialog-form"
      breakpoints={{ "960px": "75vw", "640px": "90vw" }}
    >
      <Toast ref={toast} />
      <div className="p-fluid content-form">
        {/* Champs de formulaire */}
        <div className="field mb-4 md:mb-6">
          <label className="text-xl font-bold " htmlFor="name">
            Nom
          </label>
          <InputText
            id="name"
            name="name"
            value={formData.name} // Valeur du champ à partir de formData
            onChange={handleInputChange}
            placeholder="Nom"
            className="w-full"
          />
        </div>
        <div className="field mb-4 md:mb-6">
          <label className="text-xl font-bold " htmlFor="lastName">
            Prénom
          </label>
          <InputText
            id="lastName"
            name="lastName"
            value={formData.lastName} // Valeur du champ à partir de formData
            onChange={handleInputChange}
            placeholder="Prénom"
            className="w-full"
          />
        </div>
        <div className="field mb-4 md:mb-6">
          <label className="text-xl font-bold " htmlFor="storeName">
            Nom de la boutique
          </label>
          <InputText
            id="storeName"
            name="storeName"
            value={formData.storeName} // Valeur du champ à partir de formData
            onChange={handleInputChange}
            placeholder="Nom de la boutique"
            className="w-full"
          />
        </div>
        <div className="field mb-4 md:mb-6">
          <label className="text-xl font-bold " htmlFor="contact">
            Contact
          </label>
          <InputText
            id="contact"
            name="contact"
            value={formData.contact} // Valeur du champ à partir de formData
            onChange={handleInputChange}
            placeholder="Contact"
            className="w-full"
          />
        </div>
        <div className="field mb-4 md:mb-6">
          <label className="text-xl font-bold " htmlFor="email">
            Email
          </label>
          <InputText
            id="email"
            name="email"
            value={formData.email} // Valeur du champ à partir de formData
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full"
          />
        </div>
        <div className="field mb-4 md:mb-6">
          <label htmlFor="status">Abonnement</label>
          <Dropdown
            id="status"
            value={formData.status}
            options={abonnementOptions}
            onChange={handleDropdownChange}
            placeholder="Choisir un abonnement"
          />
        </div>
        <div className="field mb-4 md:mb-6">
          <label className="text-xl font-bold " htmlFor="months">
            Durée abonnement
          </label>
          <Dropdown
            id="months"
            value={formData.months}
            options={getFilteredMonthsOptions()} // Options filtrées dynamiquement
            onChange={handleMonthsChange}
            placeholder="Sélectionnez la durée"
            className="w-full"
            disabled={formData.status === "standard"} // Verrouiller pour "Standard"
          />
        </div>
        <div className="field mb-4 md:mb-6">
          <label htmlFor="subscriptionDate">Date de souscription</label>
          <Calendar
            id="subscriptionDate"
            value={new Date(formData.subscriptionDate)}
            onChange={handleDateChange} // Appel à la fonction mise à jour
            showIcon
            placeholder="Choisir une date"
            className="w-full"
          />
        </div>
        <div className="field mb-4 md:mb-6">
          <label htmlFor="endDate">Date de fin</label>
          <InputText
            id="endDate"
            value={
              formData.endDate
                ? formData.endDate.toLocaleDateString("fr-FR")
                : ""
            }
            readOnly
          />
        </div>
        <Button label="Modifier" onClick={handleSubmit} />
      </div>
    </Dialog>
  );
}

export default EditModalUser;
