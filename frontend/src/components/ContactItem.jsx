// src/components/ContactItem.jsx

import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Avatar, // <-- ADDED
  IconButton, // <-- ADDED
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import UploadIcon from "@mui/icons-material/Upload"; // <-- ADDED
import {
  deleteContact,
  uploadContactImage, // <-- ADDED
} from "../app/features/contacts/contactSlice";

// We'll pass in the contact data and an 'onEdit' function
const ContactItem = ({ contact, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(contact._id));
    }
  };

  // --- NEW UPLOAD HANDLER ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file); // 'profileImage' must match backend

    dispatch(uploadContactImage({ id: contact._id, formData }));
  };
  // --- END NEW HANDLER ---

  const getGroupChipColor = (group) => {
    switch (group) {
      case "Work":
        return "primary";
      case "Family":
        return "success";
      case "Friends":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    // Added flex properties to ensure footer buttons align
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Added flexGrow to make content area fill available space */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2} // Added margin bottom
        >
          {/* --- NEW AVATAR --- */}
          <Avatar
            src={contact.profileImage} // Cloudinary URL
            sx={{ width: 56, height: 56, mr: 2 }}
          >
            {/* Fallback if no image: show first initial */}
            {contact.name[0]}
          </Avatar>
          {/* --- END AVATAR --- */}

          <Box flexGrow={1}>
            <Typography variant="h5" component="div">
              {contact.name}
            </Typography>
            <Chip
              label={contact.group}
              color={getGroupChipColor(contact.group)}
              size="small"
            />
          </Box>
        </Box>

        {contact.email && (
          <Box display="flex" alignItems="center" mt={2}>
            <EmailIcon
              fontSize="small"
              sx={{ mr: 1, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              {contact.email}
            </Typography>
          </Box>
        )}

        {contact.phone && (
          <Box display="flex" alignItems="center" mt={1}>
            <PhoneIcon
              fontSize="small"
              sx={{ mr: 1, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              {contact.phone}
            </Typography>
          </Box>
        )}
      </CardContent>
      {/* Updated CardActions to space buttons */}
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button size="small" onClick={() => onEdit(contact)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>

        {/* --- NEW UPLOAD BUTTON --- */}
        <IconButton component="label" size="small" title="Upload Image">
          <UploadIcon />
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
          />
        </IconButton>
        {/* --- END UPLOAD BUTTON --- */}
      </CardActions>
    </Card>
  );
};

export default ContactItem;
