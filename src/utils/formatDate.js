export const formatDate = (date) => {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  let dia = date.getDate();
  let mes = meses[date.getMonth()];
  let año = date.getFullYear();
  let horas = date.getHours();
  let minutos = date.getMinutes().toString().padStart(2, "0");
  let ampm = horas >= 12 ? "pm" : "am";
  horas = horas % 12 || 12;

  return `${dia} de ${mes} del ${año} ${horas}:${minutos}${ampm}`;
};
