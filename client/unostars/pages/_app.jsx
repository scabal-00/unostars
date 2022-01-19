import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
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
    fontFamily: "Lato",
  },
});

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;
