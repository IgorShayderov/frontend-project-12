import React, { createContext, useContext, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const toastId = useRef(null);
  const notify = (message) => {
    if ((!toast.isActive(toastId.current))) {
      toastId.current = toast.success(message);
    }
  };
  const warn = (message) => {
    if ((!toast.isActive(toastId.current))) {
      toastId.current = toast.error(message);
    }
  };

  return (
    <ToastContext.Provider value={{ notify, warn }}>
      { children }

      <ToastContainer />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
