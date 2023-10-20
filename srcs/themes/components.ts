import { ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
        },
      },
    },
  },
};

export default themeOptions.components;
