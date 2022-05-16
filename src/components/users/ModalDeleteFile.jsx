import React from "react";
import { useState } from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { styled } from "@mui/material/styles";
import ListOfItemsToDelete from "./ListOfItemsToDelete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function ModalDeleteFile({email, urlArr}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpen} sx={{ml: 2}} variant="outlined" color="error">
        Удалить документ
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Avatar with text and icon
              </Typography>
              <Demo>
                <List>
                    {urlArr.map((item, index) => {
                        return (
                            <ListOfItemsToDelete key={index} index = {index} item = {item} urlArr = {urlArr} email = {email}/>
                        )
                    })}
                    
                </List>
              </Demo>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalDeleteFile;
