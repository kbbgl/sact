import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Box,
  CardContent,
  Card,
} from "@mui/material";
import "./SearchModal.css";

const SearchModalContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Box mx="4px" my="16px">
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

const SearchModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <SearchModalContainer>
      <Dialog open={open}>
        <DialogTitle>sact</DialogTitle>
        <TextField
          autoFocus
          margin="dense"
          id="search"
          label="search-modal"
          type="text"
          fullWidth
          variant="standard"
        ></TextField>
      </Dialog>
    </SearchModalContainer>
  );
};

export default SearchModal;
