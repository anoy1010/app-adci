import ButtonAdd from "./buttonAdd";

const artisanFields = [
  { name: "name", label: "Nom", placeholder: "Nom", type: "text" },
  { name: "lastName", label: "Prénom", placeholder: "Prénom", type: "text" },
  { name: "storeName", label: "Nom de la boutique", placeholder: "Nom de la boutique", type: "text" },
  { name: "contact", label: "Contact", placeholder: "Numéro de téléphone", type: "text" },
  { name: "email", label: "Adresse email", placeholder: "Email", type: "text" },
  { name: "subscriptionDate", label: "Date de souscription", type: "date", defaultValue: new Date() },
];

function AddArtisan() {
  const handleArtisanSubmit = async (formData) => {
    console.log("Artisan Data:", formData);
    // Ajoutez ici votre logique pour enregistrer un artisan (e.g., Firebase)
  };

  return (
    <ButtonAdd
      fields={artisanFields}
      title="Ajouter un artisan"
      onSubmit={handleArtisanSubmit}
    />
  );
}

export default AddArtisan;
