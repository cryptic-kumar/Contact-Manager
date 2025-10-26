// src/pages/Contacts.jsx

import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContacts } from "../app/features/contacts/contactSlice";
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Button,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import ContactItem from "../components/ContactItem";
import ContactForm from "../components/ContactForm";
import AddIcon from "@mui/icons-material/Add";

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const Contacts = () => {
  const dispatch = useDispatch();

  // Get data from Redux store
  const { contacts, isLoading, error, page, pages, total } = useSelector(
    (state) => state.contacts
  );

  // --- Local State for UI ---
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  // API Query State
  const [currentPage, setCurrentPage] = useState(1);
  const [group, setGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce the search term to avoid API calls on every keystroke
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // --- End Local State ---

  // --- Data Fetching Effect ---
  // This effect re-runs whenever the page, debounced search, or group changes
  useEffect(() => {
    dispatch(
      getContacts({ page: currentPage, search: debouncedSearchTerm, group })
    );
  }, [dispatch, currentPage, debouncedSearchTerm, group]);

  // --- Event Handlers ---
  const handleOpenCreateModal = () => {
    setCurrentContact(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (contact) => {
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
    setCurrentPage(1); // Reset to page 1 on filter
  };
  // --- End Event Handlers ---

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          My Contacts ({total})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateModal}
        >
          New Contact
        </Button>
      </Box>

      {/* --- Filters and Search --- */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search Contacts"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="group-filter-label">Group</InputLabel>
          <Select
            labelId="group-filter-label"
            label="Group"
            value={group}
            onChange={handleGroupChange}
          >
            <MenuItem value="">
              <em>All Groups</em>
            </MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Friends">Friends</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* --- End Filters and Search --- */}

      {/* Display Errors */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {Array.isArray(error)
            ? error.map((err) => err.msg).join(", ")
            : error}
        </Alert>
      )}

      {/* Display Loading or Contact List */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : contacts.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {contacts.map((contact) => (
              <Grid item xs={12} sm={6} md={4} key={contact._id}>
                <ContactItem contact={contact} onEdit={handleOpenEditModal} />
              </Grid>
            ))}
          </Grid>

          {/* --- Pagination --- */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={pages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
          {/* --- End Pagination --- */}
        </>
      ) : (
        <Typography>
          No contacts found. Try adjusting your filters or create a new contact!
        </Typography>
      )}

      {/* The Create/Edit Modal */}
      <ContactForm
        open={isModalOpen}
        handleClose={handleCloseModal}
        contactToEdit={currentContact}
      />
    </Box>
  );
};

export default Contacts;
