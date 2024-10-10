import axios from "axios";
const BASE_HOST = import.meta.env.VITE_BASE_URL;

export const getInvoices = async () => {
  const response = await axios.get(`${BASE_HOST}/api/v4/cfdi/list`);
  return response.data;
};

export const sendEmail = async (UID) => {
  const response = await axios.get(`${BASE_HOST}/api/v4/cfdi40/${UID}/email`);
  return response.data;
};

export const getCustomers = async () => {
  const response = await axios.get(`${BASE_HOST}/api/v1/clients`);
  return response.data;
};

export const sendInvoice = async (invoiceData) => {
  const response = await axios.post(
    `${BASE_HOST}/api/v4/cfdi40/create`,
    invoiceData
  );
  return response.data;
};
