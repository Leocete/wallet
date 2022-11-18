import React from 'react';

import { Box, Button, Typography, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function NoTransfersOverlay() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', height: '100%' }}
    >
      <Typography>No Transfers</Typography>
    </Box>
  );
}

function TransferList({ approveTransfer, transfers }) {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'amount', headerName: 'Amount', flex: 0.7 },
    {
      field: 'to',
      headerName: 'To',
      flex: 3,
      renderCell: (params) => (
        <Tooltip title={params.row.to}>
          <Typography
            variant="body"
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {params.row.to}
          </Typography>
        </Tooltip>
      ),
    },
    { field: 'approvals', headerName: 'Approvals', flex: 0.8 },
    { field: 'sent', headerName: 'Sent', flex: 0.5 },
    {
      field: 'approve',
      headerName: 'Approve?',
      flex: 1,
      renderCell: (params) => {
        return (
          <Button onClick={() => approveTransfer(params.row.id)}>
            Approve
          </Button>
        );
      },
    },
  ];

  const rows = transfers.map((transfer) => ({
    id: transfer.id,
    amount: transfer.amount,
    to: transfer.to,
    approvals: transfer.approvals,
    sent: transfer.sent ? 'Yes' : 'No',
  }));

  return (
    <Box sx={{ border: 1, borderRadius: '4px' }} p={5}>
      <Typography variant="subtitle1">Transfers</Typography>
      <DataGrid
        autoHeight
        disableSelectionOnClick
        components={{
          NoRowsOverlay: NoTransfersOverlay,
        }}
        // sx={{ borderColor: 'black' }}
        rows={rows}
        columns={columns}
      />
    </Box>
  );
}

export default TransferList;
