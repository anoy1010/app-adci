import { differenceInDays, addMonths } from "date-fns";

// Fonction pour calculer les jours restants
export const CalculateRemainingDays = (createdAt, months) => {
  const startDate = new Date(createdAt);
  const endDate = addMonths(startDate, months);
  return differenceInDays(endDate, new Date());
};
