import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const setNotificationMessage  = (notification) => {
    setNotification(notification);
  }

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotificationMessage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
