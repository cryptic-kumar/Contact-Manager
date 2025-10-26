// src/app/features/contacts/contactService.js

import api from "../../../services/api"; // Our centralized API instance

// Create new contact
const createContact = async (contactData) => {
  const response = await api.post("/contacts", contactData);
  return response.data;
};

// Get user contacts
const getContacts = async (params) => {
  // Pass page, search, and group as query parameters
  const response = await api.get("/contacts", { params });
  return response.data;
};

// Update user contact
const updateContact = async (contactData) => {
  const response = await api.put(`/contacts/${contactData._id}`, contactData);
  return response.data;
};

// Delete user contact
const deleteContact = async (contactId) => {
  const response = await api.delete(`/contacts/${contactId}`);
  // We need to return the ID to our reducer
  return { id: contactId, ...response.data };
};

// Upload profile image
const uploadContactImage = async ({ id, formData }) => {
  // We send formData and must set the 'Content-Type' header
  // so the backend (Multer) understands it's a file upload.
  const response = await api.put(`/contacts/${id}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const contactService = {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
  uploadContactImage,
};

export default contactService;
