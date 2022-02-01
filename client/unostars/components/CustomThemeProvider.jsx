import { Fragment } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

const CustomThemeProvider = (props) => {
  const isDarkModeActive = useSelector((state) => state.ui.darkMode);
  const theme = createTheme({
    palette: {
      mode: isDarkModeActive ? "dark" : "light",
      primary: {
        main: "#304FF3",
      },
      secondary: {
        main: "#191919",
      },
      info: {
        main: "#0098CE",
      },
    },
    typography: {
      fontFamily: "Oswald",
    },
  });

  return (
    <Fragment>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </Fragment>
  );
};

export default CustomThemeProvider;
