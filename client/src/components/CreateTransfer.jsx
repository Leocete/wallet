import React, { useState } from 'react';
import { Button, Typography, TextField, Box } from '@mui/material';

function CreateTransfer({ createTransfer }) {
  const [transfer, setTransfer] = useState();

  const updateTransfer = (event, field) => {
    setTransfer({ ...transfer, [field]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    createTransfer(transfer);
  };

  return (
    <form
      onSubmit={submitForm}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        p={5}
        sx={{ border: 1, borderRadius: '4px' }}
        gap={2}
      >
        <Typography variant="subtitle1">Create transfer</Typography>
        <TextField
          required
          label="Amount"
          onChange={(event) => updateTransfer(event, 'amount')}
        />
        <TextField
          required
          label="To"
          onChange={(event) => updateTransfer(event, 'to')}
        />
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default CreateTransfer;
