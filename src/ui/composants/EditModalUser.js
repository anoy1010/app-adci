import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { calculateRemainingDays } from "../utils/CalculateRemainDays"; // Assurez-vous que cette fonction existe dans votre projet

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
  }, [userData]); // Met à jour formData chaque fois que userData change

  const monthsOptions = [
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
    setFormData({ ...formData, [name]: value }); // Met à jour la donnée dans formData
  };

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, status: e.value }); // Met à jour l'abonnement
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
    setFormData({
      ...formData,
      subscriptionDate,
      endDate: calculateEndDate(subscriptionDate, formData.months),
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
    >
      <Toast ref={toast} />
      <div className="p-fluid">
        <div className="field">
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
        <div className="field">
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
        <div className="field">
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
        <div className="field">
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
        <div className="field">
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
        <div className="field">
          <label className="text-xl font-bold " htmlFor="status">
            Abonnement
          </label>
          <Dropdown
            id="status"
            value={formData.status} // Valeur du champ à partir de formData
            options={abonnementOptions}
            onChange={handleDropdownChange}
            placeholder="Choisir un abonnement"
            className="w-full"
          />
        </div>
        <div className="field">
          <label className="text-xl font-bold " htmlFor="months">
            Durée abonnement (mois)
          </label>
          <Dropdown
            id="months"
            value={formData.months} // Valeur du champ à partir de formData
            options={monthsOptions}
            onChange={handleMonthsChange}
            placeholder="Sélectionnez la durée"
            className="w-full"
          />
        </div>
        <div className="field">
          <label className="text-xl font-bold " htmlFor="subscriptionDate">
            Date de souscription
          </label>
          <Calendar
            id="subscriptionDate"
            value={formData.subscriptionDate} // Valeur du champ à partir de formData
            onChange={handleDateChange}
            showIcon
            placeholder="Choisir une date"
            className="w-full"
          />
        </div>
        <div className="field">
          <label className="text-xl font-bold " htmlFor="endDate">
            Date de fin de souscription
          </label>
          <InputText
            id="endDate"
            value={
              formData.endDate
                ? formData.endDate.toLocaleDateString("fr-FR")
                : ""
            } // Afficher la date de fin
            readOnly
            className="w-full"
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button
            label="Modifier"
            icon="pi pi-check"
            onClick={handleSubmit}
            className="button-form"
          />
        </div>
      </div>
    </Dialog>
  );
}

export default EditModalUser;