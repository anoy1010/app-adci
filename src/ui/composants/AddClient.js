import ButtonAdd from "./buttonAdd";

const clientFields = [
  { name: "name", label: "Nom", placeholder: "Nom", type: "text" },
  { name: "lastName", label: "Prénom", placeholder: "Prénom", type: "text" },
  {
    name: "contact",
    label: "Contact",
    placeholder: "Numéro de téléphone",
    type: "text",
  },
  { name: "email", label: "Adresse email", placeholder: "Email", type: "text" },
  {
    name: "registrationDate",
    label: "Date d'inscription",
    type: "date",
    defaultValue: new Date(),
  },
];

function AddClient() {
  const handleClientSubmit = async (formData) => {
    console.log("Client Data:", formData);
    // Ajoutez ici votre logique pour enregistrer un client (e.g., Firebase)
  };

  return (
    <ButtonAdd
      fields={clientFields}
      title="Ajouter un client"
      onSubmit={handleClientSubmit}
    />
  );
}

export default AddClient;
