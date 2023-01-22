import { useDispatch } from "react-redux";
import Axios from "axios";
import { toast } from "react-toastify";
import {
  fetchArchieved,
  fetchDamaged,
  fetchRepaired,
  fetchStock,
  fetchStolen,
  fetchWorking,
} from "src/actions/app";

//custom dispatcher hook
export const useLoadBasicData = () => {
  const dispatch = useDispatch();
  return (payload) => {
    dispatch(fetchStock());
    dispatch(fetchDamaged());
    dispatch(fetchRepaired());
    dispatch(fetchStolen());
    dispatch(fetchArchieved());
    dispatch(fetchWorking());
  };
};

export const handleAuthError = (error) => {
  if (error?.response?.status == 401) {
    window.location = "/logout";
  }
};

export const randomNumber = () => {
  const max = 99999;
  const min = 11111;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const uploadImage = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("file", file, file.name);
    Axios.post(process.env.REACT_APP_BACKEND_FILE_UPLOAD_URL, formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.type == "success") {
          resolve({ data: { fileName: res.data.fileName } });
        } else {
          reject(res.data.msg);
        }
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

export const toastMessage = (type, message) => {
  if (type == "info") {
    toast.info(message);
  }
  if (type == "error") {
    toast.error(message);
  }
  if (type == "success") {
    toast.success(message);
  }
};

export const errorHandler = (error) => {
  if (error?.response?.data?.error?.message) {
    toastMessage("error", error.response.data.error.message);
  } else if (error?.response?.data?.error) {
    toastMessage("error", error.response.data.error);
  } else {
    toastMessage("error", error.message);
  }
  handleAuthError(error);
};
