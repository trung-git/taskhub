import { createContext, ReactNode } from 'react';

// project import
// import config from 'config';
import useLocalStorage from '../hooks/useLocalStorage';

// types
// import { CustomizationProps, FontFamily, I18n, PresetColor, ThemeDirection, ThemeMode } from 'types/config';

// initial state
const initialState = {
  // ...config,
  onChangeContainer: () => {},
  onChangeLocalization: (lang) => {},
  onChangeMode: (mode) => {},
  onChangePresetColor: (theme) => {},
  onChangeDirection: (direction) => {},
  onChangeMiniDrawer: (miniDrawer) => {},
  onChangeFontFamily: (fontFamily) => {},
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

function ConfigProvider({ children }) {
  const [config, setConfig] = useLocalStorage('th-page-config', initialState);

  const onChangeContainer = () => {
    setConfig({
      ...config,
      container: !config.container,
    });
  };

  const onChangeLocalization = (lang) => {
    setConfig({
      ...config,
      i18n: lang,
    });
  };

  const onChangeMode = (mode) => {
    setConfig({
      ...config,
      mode,
    });
  };

  const onChangePresetColor = (theme) => {
    setConfig({
      ...config,
      presetColor: theme,
    });
  };

  const onChangeDirection = (direction) => {
    setConfig({
      ...config,
      themeDirection: direction,
    });
  };

  const onChangeMiniDrawer = (miniDrawer) => {
    setConfig({
      ...config,
      miniDrawer,
    });
  };

  const onChangeFontFamily = (fontFamily) => {
    setConfig({
      ...config,
      fontFamily,
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeContainer,
        onChangeLocalization,
        onChangeMode,
        onChangePresetColor,
        onChangeDirection,
        onChangeMiniDrawer,
        onChangeFontFamily,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
