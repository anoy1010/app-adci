import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/pages/api/firebase";

// Fonction pour récupérer des données triées par "order"
export const fetchData = async () => {
  const snapshot = await getDocs(
    query(collection(db, "userArtisans"), orderBy("order", "asc"))
  );
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fonction pour ajouter un utilisateur avec un "order"
// Fonction pour ajouter un utilisateur avec un "order" et les dates
export const addUser = async (userData) => {
  const snapshot = await getDocs(collection(db, "userArtisans"));
  const maxOrder = snapshot.docs.reduce((max, doc) => {
    const data = doc.data();
    return data.order > max ? data.order : max;
  }, 0);

  // Calcul de la date de fin de souscription
  const subscriptionDate = new Date(userData.subscriptionDate);
  const endDate = new Date(subscriptionDate);
  endDate.setMonth(subscriptionDate.getMonth() + userData.months);

  const newUser = {
    ...userData,
    order: maxOrder + 1,
    createdAt: new Date(),
    endDate: endDate.toISOString(), // Enregistrer la date de fin
  };

  await addDoc(collection(db, "userArtisans"), newUser);
};

// Fonction pour supprimer un utilisateur et réorganiser les ordres
export const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, "userArtisans", id));
    console.log(`User with id ${id} deleted successfully`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Propager l'erreur pour la gérer dans le composant
  }
};

// Fonction pour réorganiser les ordres
export const reorderDocuments = async () => {
  const snapshot = await getDocs(
    query(collection(db, "userArtisans"), orderBy("order", "asc"))
  );

  const batch = writeBatch(db);
  snapshot.docs.forEach((doc, index) => {
    batch.update(doc.ref, { order: index + 1 });
  });
  await batch.commit();
};
