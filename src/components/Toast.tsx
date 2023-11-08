//Material UI
import { Snackbar, Alert } from "@mui/material";

//Types
import { ToastType } from "@/types/ToastType"

const Loading = (toast:ToastType) => {
    return (
        <Snackbar open={toast.open} autoHideDuration={1000}>
            <Alert
              severity={
                  toast.type == "success"
                  ? "success"
                  : toast.type == "error"
                  ? "error"
                  : "info"
              }
              sx={{ width: "100%" }}
              >
              {toast.message}
            </Alert>
        </Snackbar>
    );
}

export default Loading;