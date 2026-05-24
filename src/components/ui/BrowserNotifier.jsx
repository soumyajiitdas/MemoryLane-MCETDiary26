import { useEffect } from 'react';
import { peopleData } from '../../data/cast';

const BrowserNotifier = () => {
  useEffect(() => {
    // Check if browser supports notifications
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notification");
      return;
    }

    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayString = `${mm}-${dd}`;
    const todayFullDate = today.toDateString(); // e.g., "Mon Aug 30 2026"

    const bdayPeople = peopleData
      .filter(person => person.birthday === todayString)
      .map(p => p.name.split(' ')[0]);

    if (bdayPeople.length === 0) return;

    // Use comma separated names if multiple
    const namesString = bdayPeople.join(', ');

    // Check if we've already shown the notification today to prevent spamming on refresh
    const lastNotified = localStorage.getItem('lastBirthdayNotificationDate');
    if (lastNotified === todayFullDate) {
      return; 
    }

    const sendNotification = async () => {
      const title = bdayPeople.length > 1 ? "🎉 Birthdays Today!" : "🎉 Birthday Today!";
      const options = {
        body: `Happy Birthday to ${namesString}! Wish them a great day.`,
        icon: '/images/assets/rose.png', // Assuming this exists as a public asset
        tag: 'birthday-notification', // Prevents duplicate notifications stacking
      };

      try {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.register('/sw.js');
          await navigator.serviceWorker.ready;
          await registration.showNotification(title, options);
        } else {
          new Notification(title, options);
        }
        localStorage.setItem('lastBirthdayNotificationDate', todayFullDate);
      } catch (error) {
        console.error("Error triggering notification", error);
        // Fallback to basic notification if SW fails
        try {
          new Notification(title, options);
          localStorage.setItem('lastBirthdayNotificationDate', todayFullDate);
        } catch (e) {
          console.error("Fallback notification also failed", e);
        }
      }
    };

    if (Notification.permission === "granted") {
      sendNotification();
    } else if (Notification.permission !== "denied") {
      // Browsers often block notification requests unless triggered by a user gesture.
      // We attach a one-time click listener to the document to request permission on first interaction.
      const requestAndNotify = () => {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            sendNotification();
          }
        });
        document.removeEventListener('click', requestAndNotify);
      };
      document.addEventListener('click', requestAndNotify);
      
      return () => document.removeEventListener('click', requestAndNotify);
    }
  }, []);

  return null; // Purely functional component, no UI
};

export default BrowserNotifier;
