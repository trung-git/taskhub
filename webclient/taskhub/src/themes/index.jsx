import { ReactNode, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  Theme,
  TypographyVariantsOptions,
} from '@mui/material/styles';

// project import
import useConfig from '../hooks/useConfig';
import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';

// types
// import { CustomShadowProps } from 'types/theme';

//

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({ children }) {
  const { themeDirection, mode, presetColor, fontFamily } = useConfig();

  const theme = useMemo(() => Palette(mode, presetColor), [mode, presetColor]);

  const themeTypography = useMemo(
    () => Typography(mode, fontFamily, theme),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, fontFamily]
  );
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}