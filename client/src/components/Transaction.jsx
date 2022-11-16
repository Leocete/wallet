import React from 'react';

import { Box, Typography } from '@mui/material';

function Transaction({ approvers, quorum }) {
  return (
    <Box>
      <Typography color="primary" variant="h6">
        Approvers: {approvers.join(', ')}
      </Typography>
      <Typography color="primary" variant="h6">
        Quorum: {quorum}
      </Typography>
    </Box>
  );
}

export default Transaction;
