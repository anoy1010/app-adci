import { Button } from "primereact/button";
import { Geist, Geist_Mono } from "next/font/google";
import React, { useState, useEffect } from "react";
import { fetchData } from "@/ui/utils/fireStoreServices"; // Correctement en minuscule
import { calculateRemainingDays } from "@/ui/utils/CalculateRemainDays";
import { SpeedDial } from "primereact/speeddial";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import TableComposant from "@/ui/composants/TableComposant";
import ActionButton from "@/ui/composants/actionButton";
import ButtonAdd from "@/ui/composants/buttonAdd";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./api/firebase";

export default function Home() {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState(1);

  useEffect(() => {
    const unsubscribe = fetchData(setData);
    return () => unsubscribe(); // Nettoyage de l'abonnement à la lecture en temps réel
  }, []);

  const addRow = async (formData) => {
    const remainingDays = calculateRemainingDays(formData.createdAt);

    const newRow = {
      order: order,
      ...formData,
      delay: remainingDays,
      createdAt: new Date().toISOString(),
    };

    try {
      // Ajout dans Firestore
      await addDoc(collection(db, "userArtisans"), newRow);
      setData([...data, newRow]); // Mise à jour du tableau local
      setOrder(order + 1); // Incrémente l'ID de l'ordre
    } catch (error) {
      console.error("Erreur lors de l'ajout des données : ", error);
    }
  };

  return (
    <div className="body">
      <div className="flex items-center justify-center">
        <TableComposant products={data} />
      </div>
      <ButtonAdd addRow={addRow} />
    </div>
  );
}
