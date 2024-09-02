import { useState, createContext, useContext } from "react";
import { ToastNotification } from "@carbon/react";

export const NotificationContext = createContext(null);

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [title, setTitle] = useState("Error");
  return (
    <NotificationContext.Provider value={{ setNotification: setNotification , setTitle: setTitle }}>
      {children}
      {notification ? (
        <ToastNotification
          aria-label="Closes Notification."
          kind="error"
          onClose={function noRefCheck() {}}
          onCloseButtonClick={() => setNotification(null)}
          statusIconDescription="notification"
          subtitle={notification}
          className="notification g90"
          title={title}
        />
      ) : undefined}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
    return useContext(NotificationContext);
  };

export default NotificationProvider;
