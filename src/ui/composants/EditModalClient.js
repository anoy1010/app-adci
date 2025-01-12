import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useState, useEffect, useRef } from "react";
function EditModalClient({ userData, isVisible, onClose, onSave }) {
  const toast = useRef(null);
  const [formData, setFormData] = useState({
    Name: "",
    firstName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        ...userData,
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { Name, value } = e.target;
    setFormData({ ...formData, [Name]: value });
  };

  const handleSubmitClient = async () => {
    try {
      const newData = {
        ...formData,
      };

      console.log("Données envoyées :", newData);

      await onSave(updateData);
      toast.current.show({
        severity: "success",
        summary: "modification réussi",
        detail: "Les informations clients ont été mises a jour.",
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
            id="Name"
            name="Name"
            value={formData.Name} // Valeur du champ à partir de formData
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
            id="firstName"
            name="firststName"
            value={formData.firstName} // Valeur du champ à partir de formData
            onChange={handleInputChange}
            placeholder="Prénom"
            className="w-full"
          />
        </div>
        <div className="field mb-4 md:mb-6">
          <label className="text-xl font-bold " htmlFor="contact">
            Contact
          </label>
          <InputText
            id="phone"
            name="phone"
            value={formData.phone} // Valeur du champ à partir de formData
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
        <Button label="Modifier" onClick={handleSubmitClient} />
      </div>
    </Dialog>
  );
}

export default EditModalClient;
