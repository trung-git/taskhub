import React from 'react';
import _ from 'lodash';

// third-party
import Slider from 'react-slick';

// mui
import {
  ChevronLeft,
  ChevronRight,
  DeleteOutline,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { Box, styled, useMediaQuery, useTheme, Avatar } from '@mui/material';

const ImageStyle = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer',
  bgcolor: theme.palette.grey[0],
  border: `1px solid ${theme.palette.grey[200]}`,
  '& .Remove-cover': {
    display: 'none',
    position: 'absolute',
    background: '#101010bf',
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  '&:hover': {
    '& .Remove-cover': {
      display: 'flex',
    },
  },
  '& img': {
    objectFit: 'cover',
  },
}));

const ImagesSlider = (props) => {
  const { images } = props;

  const theme = useTheme();
  const matchUpLG = useMediaQuery(theme.breakpoints.up('lg'));

  const vertical = false;

  const ArrowUp = (props) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'transparent' },
        bgcolor: theme.palette.grey[0],
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0,
        // ...(vertical && { mb: 1.25 }),
        lineHeight: 0,
        '&:after': { boxShadow: 'none' },
      }}
    >
      {vertical ? (
        <ExpandLess
          fontSize="small"
          sx={{ color: theme.palette.secondary.light }}
        />
      ) : (
        <ChevronLeft
          fontSize="small"
          sx={{ color: theme.palette.secondary.light }}
        />
      )}
    </Box>
  );

  const ArrowDown = (props) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'transparent' },
        bgcolor: theme.palette.grey[0],
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0,
        // ...(vertical && { mt: 1.25 }),
        lineHeight: 0,
        '&:after': { boxShadow: 'none' },
      }}
    >
      {vertical ? (
        <ExpandMore
          fontSize="small"
          sx={{ color: theme.palette.secondary.light }}
        />
      ) : (
        <ChevronRight
          fontSize="small"
          sx={{ color: theme.palette.secondary.light }}
        />
      )}
    </Box>
  );

  const settings = {
    rows: 1,
    vertical: vertical,
    verticalSwiping: vertical,
    dots: false,
    speed: 500,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
    slidesToShow: 5,
    prevArrow: <ArrowUp />,
    nextArrow: <ArrowDown />,
  };

  return (
    <Box
      sx={{
        '& .slick-slider': {
          display: 'flex',
          alignItems: 'center',
          mt: vertical ? 2 : 1,
          '& .slick-list': {
            width: '100%',
          },
        },
      }}
    >
      {images?.length ? (
        <Slider {...settings}>
          {images?.map((item, index) => {
            return (
              <Box key={index}>
                <ImageStyle src={item} sizes="xl" variant="rounded">
                  {/* <Box
                      component={'img'}
                      src={item}
                      className="rounded"
                      alt=""
                      sx={{ width: '100%', height: '100%' }}
                    /> */}
                </ImageStyle>
              </Box>
            );
          })}
        </Slider>
      ) : null}
    </Box>
  );
};

export default ImagesSlider;
