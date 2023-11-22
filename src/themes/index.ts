import { createTheme } from "@mui/material/styles";

import components from "./components";
import palette from "./palette";

const theme = createTheme({
  palette,
  components,
});

export default theme;
