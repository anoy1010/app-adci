// utils/calculateRemainingDays.js

export const calculateRemainingDays = (endDate) => {
  if (!endDate) return 0; // Si endDate est null ou non défini
  try {
    const today = new Date();
    const end = new Date(endDate);
    const timeDifference = end - today; // Différence en millisecondes
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convertir en jours
    return remainingDays > 0 ? remainingDays : 0; // Si expiré, retourne 0
  } catch (error) {
    console.error("Erreur lors du calcul des jours restants :", error);
    return 0; // Retourne 0 en cas d'erreur
  }
};
