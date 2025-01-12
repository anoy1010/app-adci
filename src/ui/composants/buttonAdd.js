// import React, { useState, useRef } from "react";
// import { SpeedDial } from "primereact/speeddial";
// import { Toast } from "primereact/toast";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import { Button } from "primereact/button";
// import { calculateRemainingDays } from "../utils/CalculateRemainDays";
// import { addUser, deleteUser, fetchData } from "../utils/fireStoreServices";
// import { Calendar } from "primereact/calendar";

// function ButtonAdd() {
//   const toast = useRef(null);
//   const [showDialog, setShowDialog] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     lastName: "",
//     storeName: "",
//     contact: "",
//     email: "",
//     status: "",
//     months: 1,
//     delay: 30,
//     createdAt: new Date().toISOString(),
//     subscriptionDate: new Date(), // Nouvelle date
//     endDate: null, // Date calculée
//   });

// const monthsOptions = [
//   { label: "2 Semaines", value: 0 },
//   { label: "1 Mois", value: 1 },
//   { label: "3 Mois", value: 3 },
//   { label: "6 Mois", value: 6 },
//   { label: "12 Mois", value: 12 },
// ];

//   const calculateEndDate = (subscriptionDate, months) => {
//     if (!(subscriptionDate instanceof Date) || isNaN(subscriptionDate))
//       return null; // Vérifie la validité de la date
//     const endDate = new Date(subscriptionDate);
//     endDate.setMonth(endDate.getMonth() + months);
//     return endDate; // Retourne une instance de Date valide
//   };

// const handleDateChange = (e) => {
//   const subscriptionDate = new Date(e.value);

//   if (isNaN(subscriptionDate)) {
//     toast.current.show({
//       severity: "error",
//       summary: "Erreur",
//       detail: "Date de souscription invalide.",
//     });
//     return;
//   }

//   let endDate;

//   if (formData.status === "standard") {
//     // Si abonnement Standard, 2 semaines
//     endDate = new Date(subscriptionDate);
//     endDate.setDate(subscriptionDate.getDate() + 14); // Ajouter 14 jours
//   } else {
//     // Autres abonnements, calcul en fonction de la durée (months)
//     endDate = calculateEndDate(subscriptionDate, formData.months);
//   }

//   setFormData({
//     ...formData,
//     subscriptionDate,
//     endDate,
//   });
// };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

// const handleMonthsChange = (e) => {
//   const selectedMonths = e.value;
//   setFormData({
//     ...formData,
//     months: selectedMonths,
//     delay: calculateRemainingDays(formData.createdAt, selectedMonths),
//   });
// };

//   const handleSubmit = async () => {
//     try {
//       const newData = {
//         ...formData,
//         subscriptionDate: formData.subscriptionDate.toISOString().split("T")[0], // Formate pour l'enregistrement
//         endDate: formData.endDate
//           ? formData.endDate.toISOString().split("T")[0]
//           : null, // Formate ou met à null si invalide
//       };

//       await addUser(newData);
//       toast.current.show({
//         severity: "success",
//         summary: "Ajout réussi",
//         detail: "L'utilisateur a été ajouté.",
//       });

//       // Réinitialisation du formulaire
//       setFormData({
//         name: "",
//         lastName: "",
//         storeName: "",
//         contact: "",
//         email: "",
//         status: "",
//         months: 1,
//         delay: 30,
//         subscriptionDate: new Date(),
//         endDate: null,
//       });

//       setShowDialog(false); // Fermer le dialog
//     } catch (error) {
//       console.error("Erreur :", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Erreur",
//         detail: "Une erreur est survenue.",
//       });
//     }
//   };

//   const abonnementOptions = [
//     { label: "Standard", value: "standard" },
//     { label: "Bronze", value: "bronze" },
//     { label: "Argent", value: "argent" },
//     { label: "Or", value: "or" },
//   ];

// const handleDropdownChange = (e) => {
//   const selectedStatus = e.value;
//   let updatedFormData = { ...formData, status: selectedStatus };

//   if (selectedStatus === "standard") {
//     const subscriptionDate = new Date(formData.subscriptionDate);
//     const endDate = new Date(subscriptionDate);
//     endDate.setDate(subscriptionDate.getDate() + 14); // Ajouter 14 jours

//     updatedFormData = {
//       ...updatedFormData,
//       months: 0, // Forcer "2 Semaines"
//       delay: 14,
//       endDate,
//     };
//   } else {
//     // Réinitialiser pour les autres abonnements
//     updatedFormData = {
//       ...updatedFormData,
//       months: 1, // Par défaut à 1 mois
//       delay: calculateRemainingDays(formData.createdAt, 1),
//       endDate: calculateEndDate(formData.subscriptionDate, 1),
//     };
//   }

//   setFormData(updatedFormData);
// };

//   // Dynamique : options en fonction de l'abonnement
// const getFilteredMonthsOptions = () => {
//   if (formData.status === "standard") {
//     return monthsOptions; // Toutes les options disponibles
//   }
//   // Supprimer "2 Semaines" pour les autres abonnements
//   return monthsOptions.filter((option) => option.value !== 0);
// };

//   const items = [
//     {
//       label: "Add",
//       icon: "pi pi-plus",
//       command: () => {
//         setShowDialog(true); // Ouvrir le dialog lors de l'ajout
//       },
//     },
//     {
//       label: "Update",
//       icon: "pi pi-refresh",
//       command: () => {
//         toast.current.show({
//           severity: "success",
//           summary: "Update",
//           detail: "Data Updated",
//         });
//       },
//     },
//     {
//       label: "Delete",
//       icon: "pi pi-trash",
//       command: () => {
//         toast.current.show({
//           severity: "error",
//           summary: "Delete",
//           detail: "Data Deleted",
//         });
//       },
//     },
//   ];

//   return (
//     <div>
//       <Toast ref={toast} />
//       <SpeedDial
//         mask
//         model={items}
//         radius={120}
//         direction="up"
//         transitionDelay={80}
//         showIcon="pi pi-bars"
//         hideIcon="pi pi-times"
//         style={{ right: 0, bottom: 0, padding: "50px" }}
//         buttonClassName="p-button-warning"
//       />

//       <Dialog
//         header="Ajouter un utilisateur"
//         visible={showDialog}
//         style={{ width: "30vw" }} // Largeur par défaut pour les grands écrans
//         onHide={() => setShowDialog(false)} // Fermer le dialog
//         className="dialog-form"
//         breakpoints={{ "960px": "75vw", "640px": "90vw" }}
//       >
// <div className="p-fluid content-form">
//   <div className="field mb-4 md:mb-6">
//     <InputText
//       id="name"
//       name="name"
//       value={formData.name}
//       onChange={handleInputChange}
//       placeholder="Nom"
//       className="w-full"
//     />
//   </div>
//   <div className="field mb-4 md:mb-6">
//     <InputText
//       id="lastName"
//       name="lastName"
//       value={formData.lastName}
//       onChange={handleInputChange}
//       placeholder="Prenom"
//       className="w-full"
//     />
//   </div>
//   <div className="field mb-4 md:mb-6">
//     <InputText
//       id="storeName"
//       name="storeName"
//       value={formData.storeName}
//       onChange={handleInputChange}
//       placeholder="Nom de la boutique"
//       className="w-full"
//     />
//   </div>
//   <div className="field mb-4 md:mb-6">
//     <InputText
//       id="contact"
//       name="contact"
//       value={formData.contact}
//       onChange={handleInputChange}
//       placeholder="Contact"
//       className="w-full"
//     />
//   </div>
//   <div className="field mb-4 md:mb-6">
//     <InputText
//       id="email"
//       name="email"
//       value={formData.email}
//       onChange={handleInputChange}
//       placeholder="Email"
//       className="w-full"
//     />
//   </div>
//   <div className="field mb-4 md:mb-6">
//     <label className="block mb-2" htmlFor="status">
//       Abonnement
//     </label>
//     <Dropdown
//       id="status"
//       value={formData.status}
//       options={abonnementOptions}
//       onChange={handleDropdownChange}
//       placeholder="Choisir un abonnement"
//       className="w-full"
//     />
//   </div>
//   <div className="field mb-4 md:mb-6">
//     <label htmlFor="months">Durée abonnement (mois)</label>
//     <Dropdown
//       id="months"
//       value={formData.months}
//       onChange={handleMonthsChange}
//       options={getFilteredMonthsOptions()} // Options filtrées dynamiquement
//       placeholder="Sélectionnez la durée"
//       className="w-full"
//       disabled={formData.status === "standard"}
//     />
//   </div>
//   {/* <div className="field">
//     <InputText
//       id="delay"
//       name="delay"
//       value={formData.delay}
//       readOnly
//       placeholder="Jours restants"
//     />
//   </div> */}
//   <div className="field  mb-4 md:mb-6">
//     <label htmlFor="months">Date de souscription</label>
//     <Calendar
//       id="subscriptionDate"
//       value={new Date(formData.subscriptionDate)}
//       onChange={handleDateChange} // Appel à la fonction mise à jour
//       showIcon
//       placeholder="Choisir une date"
//       className="w-full"
//     />
//   </div>
//   <div className="field  mb-4 md:mb-6">
//     <label htmlFor="months">Date de fin de souscription</label>
//     <InputText
//       id="endDate"
//       value={
//         formData.endDate
//           ? formData.endDate.toLocaleDateString("fr-FR") // Format lisible en français
//           : ""
//       }
//       placeholder="Date de fin de souscription"
//       readOnly
//       className="w-full"
//     />
//   </div>
// </div>
// <div className="flex justify-center mt-6">
//   <Button
//     className="button-form"
//     label="Ajouter"
//     icon="pi pi-check"
//     onClick={handleSubmit}
//   />
// </div>
//       </Dialog>
//     </div>
//   );
// }

// export default ButtonAdd;

// import React, { useState, useRef } from "react";
// import { SpeedDial } from "primereact/speeddial";
// import { Toast } from "primereact/toast";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Calendar } from "primereact/calendar";

// // function ButtonAdd({ fields, title, onSubmit }) {
// //   const toast = useRef(null);
// //   const [showDialog, setShowDialog] = useState(false);

// //   const initialFormData = fields.reduce((acc, field) => {
// //     acc[field.name] = field.defaultValue || "";
// //     return acc;
// //   }, {});

// //   const [formData, setFormData] = useState(initialFormData);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// const handleSubmit = async () => {
//   try {
//     await onSubmit(formData);
//     toast.current.show({
//       severity: "success",
//       summary: "Ajout réussi",
//       detail: "L'utilisateur a été ajouté.",
//     });
//     setFormData(initialFormData);
//     setShowDialog(false);
//   } catch (error) {
//     console.error("Erreur :", error);
//     toast.current.show({
//       severity: "error",
//       summary: "Erreur",
//       detail: "Une erreur est survenue.",
//     });
//   }
// };

// //   return (
// //     <div>
// //       <Toast ref={toast} />
// //       <SpeedDial
// //         mask
// //         model={[
// //           {
// //             label: "Add",
// //             icon: "pi pi-plus",
// //             command: () => setShowDialog(true),
// //           },
// //         ]}
// //         direction="up"
// //         style={{ right: 0, bottom: 0 }}
// //       />
// //       <Dialog
// //         header={title}
// //         visible={showDialog}
// //         style={{ width: "30vw" }}
// //         onHide={() => setShowDialog(false)}
// //       >
// //         <div className="p-fluid">
// //           {fields.map((field) => (
// //             <div key={field.name} className="field mb-4">
// //               <label htmlFor={field.name}>{field.label}</label>
// //               {field.type === "date" ? (
// //                 <Calendar
// //                   id={field.name}
// //                   name={field.name}
// //                   value={formData[field.name]}
// //                   onChange={(e) =>
// //                     setFormData({
// //                       ...formData,
// //                       [field.name]: e.value,
// //                     })
// //                   }
// //                   showIcon
// //                   className="w-full"
// //                 />
// //               ) : (
// //                 <InputText
// //                   id={field.name}
// //                   name={field.name}
// //                   value={formData[field.name]}
// //                   onChange={handleInputChange}
// //                   placeholder={field.placeholder}
// //                   className="w-full"
// //                 />
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //         <Button
// //           label="Ajouter"
// //           icon="pi pi-check"
// //           onClick={handleSubmit}
// //           className="mt-4"
// //         />
// //       </Dialog>
// //     </div>
// //   );
// // }

// // export default ButtonAdd;

// function ButtonAdd({ fields = [], title, onSubmit }) {
//   const toast = useRef(null);
//   const [showDialog, setShowDialog] = useState(false);

//   const initialFormData = fields.reduce((acc, field) => {
//     acc[field.name] = field.defaultValue || "";
//     return acc;
//   }, {});

//   const [formData, setFormData] = useState(initialFormData);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await onSubmit(formData);
//       toast.current.show({
//         severity: "success",
//         summary: "Ajout réussi",
//         detail: "L'utilisateur a été ajouté.",
//       });
//       setFormData(initialFormData);
//       setShowDialog(false);
//     } catch (error) {
//       console.error("Erreur :", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Erreur",
//         detail: "Une erreur est survenue.",
//       });
//     }
//   };

//   return (
//     <div className="">
//       <Toast ref={toast} />
//       <SpeedDial
//         radius={120}
//         transitionDelay={80}
//         style={{ right: 0, bottom: 0, padding: "50px" }}
//         buttonClassName="p-button-warning"
//         model={[
//           {
//             label: "Add",
//             icon: "pi pi-plus",
//             command: () => setShowDialog(true),
//           },
//         ]}
//         direction="up"
//         className="mx-10"
//       />
//       <Dialog
//         header={title}
//         visible={showDialog}
//         style={{ width: "30vw" }}
//         onHide={() => setShowDialog(false)}
//       >
//         <div className="p-fluid mx-8">
//           {fields.map((field) => (
//             <div key={field.name} className="field mb-4">
//               <label htmlFor={field.name}>{field.label}</label>
//               {field.type === "date" ? (
//                 <Calendar
//                   id={field.name}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       [field.name]: e.value,
//                     })
//                   }
//                   showIcon
//                   className="w-full"
//                 />
//               ) : (
//                 <InputText
//                   id={field.name}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleInputChange}
//                   placeholder={field.placeholder}
//                   className="w-full"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//         <Button
//           label="Ajouter"
//           icon="pi pi-check"
//           onClick={handleSubmit}
//           className="mt-4"
//         />
//       </Dialog>
//     </div>
//   );
// }

// export default ButtonAdd;

// import React, { useState, useRef } from "react";
// import { SpeedDial } from "primereact/speeddial";
// import { Toast } from "primereact/toast";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";

// function ButtonAdd() {
//   const toast = useRef(null);
//   const [showDialog, setShowDialog] = useState(false);
//   const [formType, setFormType] = useState(null); // "artisan" ou "client"
//   const [artisanData, setArtisanData] = useState({
//     name: "",
//     lastName: "",
//     storeName: "",
//     contact: "",
//   });

//   const [clientData, setClientData] = useState({
//     firstName: "",
//     email: "",
//     phone: "",
//   });

//   const handleArtisanInputChange = (e) => {
//     const { name, value } = e.target;
//     setArtisanData({ ...artisanData, [name]: value });
//   };

//   const handleClientInputChange = (e) => {
//     const { name, value } = e.target;
//     setClientData({ ...clientData, [name]: value });
//   };

//   const handleFormSubmit = () => {
//     if (formType === "artisan") {
//       console.log("Artisan Data:", artisanData);
//       toast.current.show({
//         severity: "success",
//         summary: "Artisan ajouté",
//         detail: "Les données de l'artisan ont été enregistrées.",
//       });
//     } else if (formType === "client") {
//       console.log("Client Data:", clientData);
//       toast.current.show({
//         severity: "success",
//         summary: "Client ajouté",
//         detail: "Les données du client ont été enregistrées.",
//       });
//     }
//     setShowDialog(false);
//     setFormType(null);
//   };

//   const items = [
//     {
//       label: "Artisan",
//       icon: "pi pi-user-edit",
//       command: () => {
//         setFormType("artisan");
//         setShowDialog(true);
//       },
//     },
//     {
//       label: "Client",
//       icon: "pi pi-user-plus",
//       command: () => {
//         setFormType("client");
//         setShowDialog(true);
//       },
//     },
//   ];

//   return (
//     <div>
//       <Toast ref={toast} />x{" "}
//       <SpeedDial
//         model={items}
//         direction="up"
//         showIcon="pi pi-bars"
//         hideIcon="pi pi-times"
//         style={{ right: 0, bottom: 0, padding: "50px" }}
//         buttonClassName="p-button-warning"
//       />
//       <Dialog
//         header={
//           formType === "artisan" ? "Ajouter un artisan" : "Ajouter un client"
//         }
//         visible={showDialog}
//         style={{ width: "30vw" }}
//         onHide={() => setShowDialog(false)}
//       >
//         {formType === "artisan" && (
//           <div className="p-fluid">
//             <div className="field">
//               <InputText
//                 name="name"
//                 value={artisanData.name}
//                 onChange={handleArtisanInputChange}
//                 placeholder="Nom"
//               />
//             </div>
//             <div className="field">
//               <InputText
//                 name="lastName"
//                 value={artisanData.lastName}
//                 onChange={handleArtisanInputChange}
//                 placeholder="Prénom"
//               />
//             </div>
//             <div className="field">
//               <InputText
//                 name="storeName"
//                 value={artisanData.storeName}
//                 onChange={handleArtisanInputChange}
//                 placeholder="Nom de la boutique"
//               />
//             </div>
//             <div className="field">
//               <InputText
//                 name="contact"
//                 value={artisanData.contact}
//                 onChange={handleArtisanInputChange}
//                 placeholder="Contact"
//               />
//             </div>
//           </div>
//         )}

//         {formType === "client" && (
//           <div className="p-fluid">
//             <div className="field">
//               <InputText
//                 name="firstName"
//                 value={clientData.firstName}
//                 onChange={handleClientInputChange}
//                 placeholder="Prénom"
//               />
//             </div>
//             <div className="field">
//               <InputText
//                 name="email"
//                 value={clientData.email}
//                 onChange={handleClientInputChange}
//                 placeholder="Email"
//               />
//             </div>
//             <div className="field">
//               <InputText
//                 name="phone"
//                 value={clientData.phone}
//                 onChange={handleClientInputChange}
//                 placeholder="Téléphone"
//               />
//             </div>
//           </div>
//         )}

//         <div className="flex justify-center mt-4">
//           <Button
//             label="Enregistrer"
//             icon="pi pi-check"
//             onClick={handleFormSubmit}
//           />
//         </div>
//       </Dialog>
//     </div>
//   );
// }

// export default ButtonAdd;

//  mise a jour pour ajouter du texte
import React, { useState, useRef } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { calculateRemainingDays } from "../utils/CalculateRemainDays";
import { addUser, deleteUser, fetchData } from "../utils/fireStoreServices";
import { addClient } from "../utils/useClient";

function ButtonAdd() {
  const toast = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    type: null, // "artisan" ou "client"
    name: "",
    lastName: "",
    storeName: "",
    contact: "",
    firstName: "",
    email: "",
    phone: "",
  });
  const [formData1, setFormData1] = useState({
    type: null, // "artisan" ou "client"
    name: "",
    firstName: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormData1({ ...formData1, [name]: value });
  };

  // const handleSubmit = async () => {
  //   try {
  //     await onSubmit(formData);
  //     toast.current.show({
  //       severity: "success",
  //       summary: "Ajout réussi",
  //       detail: "L'utilisateur a été ajouté.",
  //     });
  //     setFormData(initialFormData);
  //     setShowDialog(false);
  //   } catch (error) {
  //     console.error("Erreur :", error);
  //     toast.current.show({
  //       severity: "error",
  //       summary: "Erreur",
  //       detail: "Une erreur est survenue.",
  //     });
  //   }
  // };

  const handleSubmitClient = async () => {
    try {
      const newData = {
        ...formData1,
      };

      console.log("Données envoyées :", newData);

      await addClient(newData);
      toast.current.show({
        severity: "success",
        summary: "Ajout réussi",
        detail: "Le client a été ajouté.",
      });

      setFormData1({
        name: "",
        lastName: "",
        contact: "",
        email: "",
      });

      setShowDialog(false);
    } catch (error) {
      console.error("Erreur :", error);
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail: "Une erreur est survenue.",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const newData = {
        ...formData,
        subscriptionDate: formData.subscriptionDate.toISOString().split("T")[0], // Formate pour l'enregistrement
        endDate: formData.endDate
          ? formData.endDate.toISOString().split("T")[0]
          : null, // Formate
        // ou met à null si invalide
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

  const handleMonthsChange = (e) => {
    const selectedMonths = e.value;
    setFormData({
      ...formData,
      months: selectedMonths,
      delay: calculateRemainingDays(formData.createdAt, selectedMonths),
    });
  };

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

  const handleFormSubmit = () => {
    if (formData.type === "artisan") {
      console.log("Artisan Data:", formData);
      toast.current.show({
        severity: "success",
        summary: "Artisan ajouté",
        detail: "Les données de l'artisan ont été enregistrées.",
      });
    } else if (formData.type === "client") {
      console.log("Client Data:", formData);
      toast.current.show({
        severity: "success",
        summary: "Client ajouté",
        detail: "Les données du client ont été enregistrées.",
      });
    }
    setShowDialog(false);
    setFormData({
      type: null,
      name: "",
      lastName: "",
      storeName: "",
      contact: "",
      firstName: "",
      email: "",
      phone: "",
    });
  };

  const getFilteredMonthsOptions = () => {
    if (formData.status === "standard") {
      return monthsOptions; // Toutes les options disponibles
    }
    // Supprimer "2 Semaines" pour les autres abonnements
    return monthsOptions.filter((option) => option.value !== 0);
  };

  const abonnementOptions = [
    { label: "Standard", value: "standard" },
    { label: "Bronze", value: "bronze" },
    { label: "Argent", value: "argent" },
    { label: "Or", value: "or" },
  ];

  const monthsOptions = [
    { label: "2 Semaines", value: 0 },
    { label: "1 Mois", value: 1 },
    { label: "3 Mois", value: 3 },
    { label: "6 Mois", value: 6 },
    { label: "12 Mois", value: 12 },
  ];

  const items = [
    {
      label: "Artisan",
      icon: "pi pi-user-edit",
      command: () => {
        setFormData({ ...formData, type: "artisan" });
        setShowDialog(true);
      },
    },
    {
      label: "Client",
      icon: "pi pi-user-plus",
      command: () => {
        setFormData({ ...formData, type: "client" });
        setShowDialog(true);
      },
    },
  ];

  return (
    <div>
      <Toast ref={toast} />{" "}
      <SpeedDial
        model={items}
        direction="up"
        showIcon="pi pi-bars"
        hideIcon="pi pi-times"
        style={{ right: 0, bottom: 0, padding: "50px" }}
        buttonClassName="p-button-warning"
      />
      <Dialog
        header={
          formData.type === "artisan"
            ? "Ajouter un artisan"
            : "Ajouter un client"
        }
        visible={showDialog}
        style={{ width: "30vw" }}
        onHide={() => setShowDialog(false)}
      >
        <div className="p-fluid">
          {formData.type === "artisan" && (
            <>
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
                    onChange={handleMonthsChange}
                    options={getFilteredMonthsOptions()} // Options filtrées dynamiquement
                    placeholder="Sélectionnez la durée"
                    className="w-full"
                    disabled={formData.status === "standard"}
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
                    value={new Date(formData.subscriptionDate)}
                    onChange={handleDateChange} // Appel à la fonction mise à jour
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
            </>
          )}
          {formData.type === "client" && (
            <>
              <div className="field  mb-4 md:mb-6">
                <InputText
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  placeholder="Nom"
                  className="w-full"
                />
              </div>
              <div className="field  mb-4 md:mb-6">
                <InputText
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Prénom"
                  className="w-full"
                />
              </div>
              <div className="field  mb-4 md:mb-6">
                <InputText
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full"
                />
              </div>
              <div className="field  mb-4 md:mb-6">
                <InputText
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Téléphone"
                  className="w-full"
                />
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  className="button-form"
                  label="Ajouter"
                  icon="pi pi-check"
                  onClick={handleSubmitClient}
                />
              </div>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default ButtonAdd;

// import React, { useState } from "react";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import { Calendar } from "primereact/calendar";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";

// // Fonction pour calculer la date de fin de souscription
// const calculateEndDate = (subscriptionDate, months) => {
//   if (!(subscriptionDate instanceof Date) || isNaN(subscriptionDate)) {
//     return null;
//   }
//   const endDate = new Date(subscriptionDate);
//   endDate.setMonth(endDate.getMonth() + months);
//   return endDate;
// };

// // Fonction pour calculer les jours restants avant la fin de l'abonnement
// const calculateRemainingDays = (createdAt, months) => {
//   const currentDate = new Date();
//   const endDate = calculateEndDate(new Date(createdAt), months);
//   if (!endDate) return 0;
//   const timeDiff = endDate - currentDate;
//   return Math.max(Math.ceil(timeDiff / (1000 * 3600 * 24)), 0);
// };

// const ButtonAdd = ({ addUser, setShowDialog, showDialog }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     lastName: "",
//     storeName: "",
//     contact: "",
//     email: "",
//     status: "",
//     months: 1,
//     delay: 30,
//     createdAt: new Date().toISOString(),
//     subscriptionDate: new Date(),
//     endDate: null,
//   });

//   const toast = React.useRef(null);

//   const abonnementOptions = [
//     { label: "Standard", value: "standard" },
//     { label: "Bronze", value: "bronze" },
//     { label: "Argent", value: "argent" },
//     { label: "Or", value: "or" },
//   ];

//   const monthsOptions = [
//     { label: "1 mois", value: 1 },
//     { label: "3 mois", value: 3 },
//     { label: "6 mois", value: 6 },
//     { label: "12 mois", value: 12 },
//     { label: "24 mois", value: 24 },
//   ];

//   const handleDateChange = (e) => {
//     const subscriptionDate = new Date(e.value);

//     if (isNaN(subscriptionDate)) {
//       toast.current.show({
//         severity: "error",
//         summary: "Erreur",
//         detail: "Date de souscription invalide.",
//       });
//       return;
//     }

//     let endDate;

//     if (formData.status === "standard") {
//       endDate = new Date(subscriptionDate);
//       endDate.setDate(subscriptionDate.getDate() + 14); // Ajouter 14 jours pour un abonnement standard
//     } else {
//       endDate = calculateEndDate(subscriptionDate, formData.months);
//     }

//     setFormData({
//       ...formData,
//       subscriptionDate,
//       endDate,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleMonthsChange = (e) => {
//     const selectedMonths = e.value;
//     setFormData({
//       ...formData,
//       months: selectedMonths,
//       delay: calculateRemainingDays(formData.createdAt, selectedMonths),
//     });
//   };

//   const handleDropdownChange = (e) => {
//     const selectedStatus = e.value;
//     let updatedFormData = { ...formData, status: selectedStatus };

//     if (selectedStatus === "standard") {
//       const subscriptionDate = new Date(formData.subscriptionDate);
//       const endDate = new Date(subscriptionDate);
//       endDate.setDate(subscriptionDate.getDate() + 14); // Ajouter 14 jours

//       updatedFormData = {
//         ...updatedFormData,
//         months: 0, // Forcer "2 Semaines"
//         delay: 14,
//         endDate,
//       };
//     } else {
//       updatedFormData = {
//         ...updatedFormData,
//         months: 1, // Par défaut à 1 mois
//         delay: calculateRemainingDays(formData.createdAt, 1),
//         endDate: calculateEndDate(formData.subscriptionDate, 1),
//       };
//     }

//     setFormData(updatedFormData);
//   };

//   const handleSubmit = async () => {
//     try {
//       const newData = {
//         ...formData,
//         subscriptionDate: formData.subscriptionDate.toISOString().split("T")[0], // Formate pour l'enregistrement
//         endDate: formData.endDate
//           ? formData.endDate.toISOString().split("T")[0]
//           : null,
//       };

//       await addUser(newData); // Fonction pour ajouter un artisan à la base de données
//       toast.current.show({
//         severity: "success",
//         summary: "Ajout réussi",
//         detail: "L'artisan a été ajouté.",
//       });

//       // Réinitialisation du formulaire après ajout
//       setFormData({
//         name: "",
//         lastName: "",
//         storeName: "",
//         contact: "",
//         email: "",
//         status: "",
//         months: 1,
//         delay: 30,
//         subscriptionDate: new Date(),
//         endDate: null,
//       });

//       setShowDialog(false); // Fermer la fenêtre de dialogue
//     } catch (error) {
//       console.error("Erreur :", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Erreur",
//         detail: "Une erreur est survenue.",
//       });
//     }
//   };

//   const getFilteredMonthsOptions = () => {
//     if (formData.status === "standard") {
//       return monthsOptions; // Toutes les options disponibles
//     }
//     // Supprimer "2 Semaines" pour les autres abonnements
//     return monthsOptions.filter((option) => option.value !== 0);
//   };

//   return (
//     <>
//       <Toast ref={toast} />
//       <Dialog
//         header="Ajouter un artisan"
//         visible={showDialog}
//         style={{ width: "30vw" }}
//         onHide={() => setShowDialog(false)}
//       >
//         <div className="p-fluid content-form">
//           <div className="field mb-4">
//             <InputText
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               placeholder="Nom"
//               className="w-full"
//             />
//           </div>
//           <div className="field mb-4">
//             <InputText
//               id="lastName"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               placeholder="Prénom"
//               className="w-full"
//             />
//           </div>
//           <div className="field mb-4">
//             <InputText
//               id="storeName"
//               name="storeName"
//               value={formData.storeName}
//               onChange={handleInputChange}
//               placeholder="Nom de la boutique"
//               className="w-full"
//             />
//           </div>
//           <div className="field mb-4">
//             <InputText
//               id="contact"
//               name="contact"
//               value={formData.contact}
//               onChange={handleInputChange}
//               placeholder="Contact"
//               className="w-full"
//             />
//           </div>
//           <div className="field mb-4">
//             <InputText
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Email"
//               className="w-full"
//             />
//           </div>
//           <div className="field mb-4">
//             <label htmlFor="status">Abonnement</label>
//             <Dropdown
//               id="status"
//               value={formData.status}
//               options={abonnementOptions}
//               onChange={handleDropdownChange}
//               placeholder="Choisir un abonnement"
//               className="w-full"
//             />
//           </div>
//           <div className="field mb-4">
//             <label htmlFor="months">Durée abonnement (mois)</label>
//             <Dropdown
//               id="months"
//               value={formData.months}
//               onChange={handleMonthsChange}
//               options={getFilteredMonthsOptions()}
//               placeholder="Sélectionnez la durée"
//               className="w-full"
//               disabled={formData.status === "standard"}
//             />
//           </div>
//           <div className="field mb-4">
//             <label htmlFor="subscriptionDate">Date de souscription</label>
//             <Calendar
//               id="subscriptionDate"
//               value={new Date(formData.subscriptionDate)}
//               onChange={handleDateChange}
//               showIcon
//               placeholder="Choisir une date"
//               className="w-full"
//             />
//           </div>
//           <div className="field mb-4">
//             <label htmlFor="endDate">Date de fin de souscription</label>
//             <InputText
//               id="endDate"
//               value={formData.endDate ? formData.endDate.toLocaleDateString("fr-FR") : ""}
//               placeholder="Date de fin"
//               readOnly
//               className="w-full"
//             />
//           </div>
//         </div>
//         <div className="flex justify-center mt-6">
//           <Button
//             label="Ajouter"
//             icon="pi pi-check"
//             onClick={handleSubmit}
//             className="p-button-primary"
//           />
//         </div>
//       </Dialog>
//     </>
//   );
// };

// export default ButtonAdd;
