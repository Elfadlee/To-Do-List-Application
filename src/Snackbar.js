import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function SnackbarName({ open, textMsg }) {

          const handleClose = (
              event,
              reason,
          ) => {
              if (reason === 'clickaway') {
              return;
              }

            
          };

          return (
              <div>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                  <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                  sx={{ width: '100%' }}
                  >
                    {textMsg}
                    </Alert>
                </Snackbar>
                </div>
  );
}

