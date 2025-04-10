'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import Notification from '@/components/Notification';
import NotificationContainer from '@/components/NotificationContainer';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<{
    id: number;
    message: string;
    type: NotificationType;
  }[]>([]);

  const showNotification = (message: string, type: NotificationType = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notifications.length > 0 && (
        <NotificationContainer>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </NotificationContainer>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
} 