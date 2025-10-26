// src/components/ContactForm.jsx

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createContact,
  updateContact,
} from "../app/features/contacts/contactSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// 'contactToEdit' will be null for 'create' and have data for 'edit'
const ContactForm = ({ open, handleClose, contactToEdit }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset, // We'll use this to populate the form for editing
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      group: "Personal",
    },
  });

  // Check if we are in 'edit' mode
  const isEditMode = Boolean(contactToEdit);

  // If contactToEdit changes (i.e., we click 'edit'),
  // populate the form with that contact's data
  useEffect(() => {
    if (isEditMode) {
      reset(contactToEdit);
    } else {
      // If we're opening to create, reset to default
      reset({
        name: "",
        email: "",
        phone: "",
        group: "Personal",
      });
    }
  }, [contactToEdit, isEditMode, reset]);

  const onSubmit = (data) => {
    if (isEditMode) {
      dispatch(updateContact({ ...data, _id: contactToEdit._id }));
    } else {
      dispatch(createContact(data));
    }
    handleClose(); // Close the modal
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEditMode ? "Edit Contact" : "Create New Contact"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {/* Name Field */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Phone Field */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
          />

          {/* Group Field */}
          <Controller
            name="group"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="group-label">Group</InputLabel>
                <Select {...field} labelId="group-label" label="Group">
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Friends">Friends</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {isEditMode ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ContactForm;
