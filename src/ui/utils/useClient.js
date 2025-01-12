import { useState, useEffect } from "react";
import { db } from "@/pages/api/firebase";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

export const useClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "userClient"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(data);
    });

    return () => unsub();
  }, []);

  return clients;
};

export const addClient = async (userData) => {
  const snapshot = await getDocs(collection(db, "userClient"));
  const maxOrder = snapshot.docs.reduce((max, doc) => {
    const data = doc.data();
    return data.order > max ? data.order : max;
  }, 0);

  const newUser = {
    ...userData,
    order: maxOrder + 1,
    createdAt: new Date(),
    // Enregistrer la date de fin
  };

  await addDoc(collection(db, "userClient"), newUser);
};

export const fetchData = async () => {
  const snapshot = await getDocs(
    query(collection(db, "userClient"), orderBy("order", "asc"))
  );
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
