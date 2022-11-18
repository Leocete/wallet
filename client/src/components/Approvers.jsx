import React from 'react';

import { Box, Typography } from '@mui/material';

function Approvers({ approvers, quorum }) {
  return (
    <Box
      mb={5}
      p={5}
      sx={{ border: 1, borderRadius: '4px' }}
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" flexDirection="row">
        <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
          Approvers:
        </Typography>
        <Box>
          <Typography variant="body">{approvers.join(', ')}</Typography>
        </Box>
      </Box>

      <Typography variant="subtitle1">Quorum: {quorum}</Typography>
    </Box>
  );
}

export default Approvers;
