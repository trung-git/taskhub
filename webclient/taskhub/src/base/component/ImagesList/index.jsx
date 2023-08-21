// material-ui
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  Avatar,
  Dialog,
  ImageList,
  ImageListItem,
} from '@mui/material';

const ImagesList = ({ imagesList }) => {
  const theme = useTheme();
  const [openPostModal, setOpenPostModal] = useState(false);

  console.log('imagesList', imagesList);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container sx={{ width: '100%' }} spacing={2}>
        {imagesList?.length > 0 &&
          imagesList?.map((image, index) => {
            return (
              <Grid
                item
                key={index}
                xs={3}
                sx={{ display: index >= 4 ? 'none' : undefined }}
              >
                <Avatar
                  src={image}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: theme.shape.borderRadius,
                  }}
                  alt="tasker-working-image"
                  variant="square"
                  onClick={() => setOpenPostModal(true)}
                />
              </Grid>
            );
          })}
      </Grid>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={() => setOpenPostModal(false)}
        open={openPostModal}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        {openPostModal && (
          <ImageList
            sx={{ width: '100%', height: 450 }}
            cols={3}
            rowHeight={164}
          >
            {imagesList.map((item, index) => (
              <ImageListItem key={index}>
                <img src={item} loading="lazy" alt="tasker-working" />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Dialog>
    </Box>
  );
};

export default ImagesList;
