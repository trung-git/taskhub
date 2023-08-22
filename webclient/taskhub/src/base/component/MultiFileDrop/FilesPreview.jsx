import { useTheme } from '@mui/material/styles';
import { List, ListItemText, ListItem, IconButton } from '@mui/material';
import getDropzoneData from '../../../utils/getDropzoneData';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function FilesPreview({ showList = false, files, onRemove }) {
  const theme = useTheme();
  const hasFile = files.length > 0;

  return (
    <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
      {files.map((file, index) => {
        const { key, name, size, preview, type } = getDropzoneData(file, index);
        console.log(type);
        if (showList) {
          return (
            <ListItem
              key={key}
              sx={{
                p: 0,
                m: 0.5,
                width: 80,
                height: 80,
                borderRadius: 1.25,
                position: 'relative',
                display: 'inline-flex',
                verticalAlign: 'text-top',
                border: `solid 1px ${theme.palette.divider}`,
              }}
            >
              {type?.includes('image') && (
                <img
                  alt="preview"
                  src={preview}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              )}
              {!type?.includes('image') && (
                <InsertDriveFileIcon
                  style={{ width: '100%', fontSize: '1.5rem' }}
                />
              )}

              {onRemove && (
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() => onRemove(file)}
                  sx={{
                    top: -10,
                    right: -10,
                    position: 'absolute',
                  }}
                >
                  <CloseIcon style={{ fontSize: '1.15rem' }} />
                </IconButton>
              )}
            </ListItem>
          );
        }

        return (
          <ListItem
            key={key}
            sx={{
              my: 1,
              px: 2,
              py: 0.75,
              borderRadius: 0.75,
              border: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <InsertDriveFileIcon
              style={{
                width: '30px',
                height: '30px',
                fontSize: '1.15rem',
                marginRight: 4,
              }}
            />

            <ListItemText
              primary={typeof file === 'string' ? file : name}
              secondary={typeof file === 'string' ? '' : size}
              primaryTypographyProps={{ variant: 'subtitle2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />

            {onRemove && (
              <IconButton
                edge="end"
                size="small"
                onClick={() => onRemove(file)}
              >
                <CloseIcon style={{ fontSize: '1.15rem' }} />
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
