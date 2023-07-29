import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';

const minDistance = 10;
const PriceSlider = ({ value, onChange }) => {
  const [price, setPrice] = useState([1, 100]);

  const marks = [
    {
      value: 1,
      label: '$ 1',
    },
    {
      value: 999,
      label: '$ 999',
    },
  ];

  useEffect(() => {
    if (value) {
      setPrice(value);
    } else {
      setPrice([1, 100]);
    }
  }, [value]);

  const handlePriceChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setPrice([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPrice([clamped - minDistance, clamped]);
      }
    } else {
      setPrice(newValue);
    }
  };

  const handleOnChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        onChange && onChange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        onChange && onChange([clamped - minDistance, clamped]);
      }
    } else {
      onChange && onChange(newValue);
    }
  };

  return (
    <Slider
      value={price}
      onChange={handlePriceChange}
      onChangeCommitted={handleOnChange}
      min={1}
      step={1}
      max={999}
      marks={marks}
      valueLabelDisplay="auto"
      disableSwap
      sx={{
        color: '#52af77',
        height: 8,
        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-thumb': {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiSlider-valueLabel': {
          lineHeight: 1.2,
          fontSize: 12,
          background: 'unset',
          padding: 0,
          width: 32,
          height: 32,
          borderRadius: '50% 50% 50% 0',
          backgroundColor: '#52af77',
          transformOrigin: 'bottom left',
          transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
          '&:before': { display: 'none' },
          '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
          },
          '& > *': {
            transform: 'rotate(45deg)',
          },
        },
      }}
    />
  );
};

export default PriceSlider;
