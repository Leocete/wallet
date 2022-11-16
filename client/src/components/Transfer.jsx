import React, { useState } from 'react';
import { Button, Typography, TextField } from '@mui/material';

function Transfer({ createTransfer }) {
  const [transfer, setTransfer] = useState();

  const updateTransfer = (event, field) => {
    setTransfer({ ...transfer, [field]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    createTransfer(transfer);
  };

  return (
    <form onSubmit={submitForm}>
      <Typography color="primary" variant="subtitle1">
        Create transfer
      </Typography>
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
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Transfer;
