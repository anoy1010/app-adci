import { useEffect, useState } from "react";
import { db } from "@/pages/api/firebase"; // Assurez-vous que db est correctement importé
import { collection, onSnapshot } from "firebase/firestore";

function useArtisans() {
  const [userArtisans, setUserArtisans] = useState([]);

  useEffect(() => {
    // Fonction pour calculer les jours restants
    const calculateRemainingDays = (endDate) => {
      const currentDate = new Date();
      const end = new Date(endDate);
      const timeDiff = end.getTime() - currentDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Retourne le nombre de jours restants
    };

    const unsubscribe = onSnapshot(
      collection(db, "userArtisans"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            delay: calculateRemainingDays(docData.endDate), // Calcul des jours restants
          };
        });

        // Trier les données par ordre croissant en fonction de la colonne "order"
        const sortedData = data.sort((a, b) => a.order - b.order);

        // Mise à jour de l'état avec les données triées et le délai calculé
        setUserArtisans(sortedData);
      }
    );

    // Nettoyage de l'abonnement lors du démontage du composant
    return () => unsubscribe();
  }, []);

  return userArtisans;
}

export default useArtisans;
