import {Modal, Box, Typography, Stack, Button} from '@mui/material';
import  AddLocationIcon from '@mui/icons-material/AddLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 200,
  bgcolor: 'background.paper',
  outline: "none",
  borderRadius: 2,
  // boxShadow: 24,
  p: 2,
};
const btnColor = {
    width: 250,
    color:'white',
    backgroundColor: "#ff2300",
    "&:hover": {
      backgroundColor: "#e81100",
    },
};
const btnOutline = {
  width: 250,
  color: "#ff2300",          // text color
  borderColor: "#ff2300",    // outline color
  "&:hover": {
    borderColor: "#e81100",
    color: "#e81100",
    backgroundColor: "transparent",
  }
};

const iconStyle = { 
  fill: '#ff2300',
  width: 50,
  height: 50
};

export function LocationPermissionDialog({
  isOpen,
  onClose,
  locationCallback,
}: {
  isOpen: boolean;
  onClose: () => void;
  locationCallback: (value: boolean) => void;
}) {
  return (
   <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            {/* <div className='clear-icon' onClick={onClose}>x</div> */}
            <Box sx={{textAlign: 'center'}}><LocationOnIcon sx={iconStyle} /></Box>
            <Typography sx={{textAlign: 'center', fontWeight: 'bold'}}>Enable Location Sevices</Typography>
              {/* <Stack direction="row" spacing={5}> */}
              <div className='align-center padding-bottom'>
                <Button variant="contained" sx={btnColor} onClick={() => locationCallback(true)}>
                  Allow
                </Button>
              </div>
              <div className='align-center'>
                <Button variant="outlined"  sx={btnOutline} onClick={() => locationCallback(false)}>Not now</Button>
              </div>
              {/* </Stack> */}
          </Box>
        
        {/* <Modal.Header>
          <Modal.Title>Location Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This app requires access to your location.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Allow</Button>
          <Button onClick={onClose}>Deny</Button>
        </Modal.Footer> */}
    </Modal>

  );
}
