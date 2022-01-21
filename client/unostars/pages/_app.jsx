import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
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
    fontFamily: "Oswald",
  },
});

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />;
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
