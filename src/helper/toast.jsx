import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const onayMesaj = (mesaj) => {
    toast.success(mesaj, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
};

export const bilgiMesaj = (mesaj) => {
    toast.info(mesaj, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}

export const olumsuzMesaj = (mesaj) => {
    toast.error(mesaj, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}