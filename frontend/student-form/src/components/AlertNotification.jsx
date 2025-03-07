import React, { useEffect } from "react";

const AlertNotification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification-container`}>
      <div className={`notification ${type}`}>{message}</div>
    </div>
  );
};

export default AlertNotification;
