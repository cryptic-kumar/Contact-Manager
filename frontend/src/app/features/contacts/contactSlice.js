// src/app/features/contacts/contactSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
  contacts: [],
  total: 0,
  page: 1,
  pages: 1,
  isLoading: false,
  error: null,
};

// Create new contact
export const createContact = createAsyncThunk(
  "contacts/create",
  async (contactData, thunkAPI) => {
    try {
      return await contactService.createContact(contactData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.response.data.msg ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user contacts
export const getContacts = createAsyncThunk(
  "contacts/getAll",
  async (params, thunkAPI) => {
    try {
      return await contactService.getContacts(params);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update contact
export const updateContact = createAsyncThunk(
  "contacts/update",
  async (contactData, thunkAPI) => {
    try {
      return await contactService.updateContact(contactData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.response.data.msg ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete contact
export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (id, thunkAPI) => {
    try {
      return await contactService.deleteContact(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Upload contact image
export const uploadContactImage = createAsyncThunk(
  "contacts/uploadImage",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await contactService.uploadContactImage({ id, formData });
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.response.data.msg ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // We can add a reducer to reset state if needed
    resetContacts: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // --- Get Contacts ---
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload.contacts;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.error = null;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.contacts = [];
        state.total = 0;
        state.page = 1;
        state.pages = 1;
      })
      // --- Create Contact ---
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add new contact to the beginning of the list
        state.contacts = [action.payload, ...state.contacts];
        state.error = null;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // --- Update Contact ---
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        // Find and update the contact in the array
        state.contacts = state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        );
        state.error = null;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // --- Delete Contact ---
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        // Filter out the deleted contact
        state.contacts = state.contacts.filter(
          (contact) => contact._id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // --- Upload Image ---  <-- THIS IS THE NEWLY ADDED BLOCK ---
      .addCase(uploadContactImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadContactImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Find and update the contact with the new image URL
        state.contacts = state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        );
        state.error = null;
      })
      .addCase(uploadContactImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetContacts } = contactSlice.actions;
export default contactSlice.reducer;
