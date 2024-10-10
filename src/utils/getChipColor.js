const getChipColor = (status) => {
  switch (status) {
    case "enviada":
      return "success"; // Color verde
    case "cancelada":
      return "error"; // Color rojo
    default:
      return "default"; // Color gris por defecto
  }
};

export default getChipColor;
