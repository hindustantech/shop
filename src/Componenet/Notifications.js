import React, { useState, useEffect } from 'react';
import Headers from './Headers';
import axios from 'axios';

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [notifications, setNotifications] = useState([

  ]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const fetchNotifications = async () => {
    try {
      const id = localStorage.getItem('id');  // Get ID from localStorage
      if (!id) {
        throw new Error("ID not found in localStorage");
      }

      // Fetch notification data from API
      const response = await axios.get(`${apiBaseUrl}/logs/${id}`);
      setNotifications(response.data);  // Set the notifications state with response data
     
    } catch (err) {
      setError(err.message);  // Set the error if the request fails

    } finally {
      setLoading(false);  // Set loading to false once request is complete
    }
  };

  useEffect(() => {
    fetchNotifications();  // Fetch notifications when the component mounts
  }, []);


  // Function to determine if a notification is from today
  const isToday = (dateString) => {
    const today = new Date();
    const notificationDate = new Date(dateString);
    return (
      today.getDate() === notificationDate.getDate() &&
      today.getMonth() === notificationDate.getMonth() &&
      today.getFullYear() === notificationDate.getFullYear()
    );
  };

  // Function to determine if a notification is from previous days
  const isPrevious = (dateString) => {
    const today = new Date();
    const notificationDate = new Date(dateString);
    return notificationDate < today && !isToday(dateString);
  };

  // Filter notifications based on the selected filter
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'Today') return isToday(notification.date);
    if (filter === 'Previous') return isPrevious(notification.date);
    return true; // For 'All', return all notifications
  });


  const todayNotificationsCount = notifications.filter((notification) => isToday(notification.date)).length;
  return (
    <>
      <Headers Name="Notifications" />
      <i className='fa fa-bold-setting'></i>
      <div className="main-notificatin">

        <div className="list-Notificatin">
          <ul className='  d-flex justify-content-around aling-item-center px-3   '>
            <li
              className={`list-notify ${filter === 'All' ? 'active' : ''}`}
              onClick={() => setFilter('All')}
            >
              All  <p className='count-n-a'> {filter === 'Today' ? todayNotificationsCount : filteredNotifications.length}</p>
            </li>
            <li
              className={`list-notify ${filter === 'Today' ? 'active' : ''}`}
              onClick={() => setFilter('Today')}
            >
              Today <p className='count-n-t'>{filter === 'Today' ? todayNotificationsCount : filteredNotifications.length}</p>
            </li>
            <li
              className={`list-notify ${filter === 'Previous' ? 'active' : ''}`}
              onClick={() => setFilter('Previous')}
            >
              Previous <p className='count-n-p'>{filter === 'Today' ? todayNotificationsCount : filteredNotifications.length}</p>
            </li>
          </ul>

        </div>
        {filteredNotifications.map((notification, index) => (
          isToday(notification.date) ? (
            <div key={index} className="card-ntification px-2 pt-2 mt-2  mx-2">
              <p className='notification-text'>{notification.heading}</p>
              <p className='notification-text'>{notification.message} </p>
              <div className="date-notification d-flex justify-content-end ">
                <p className='mb-2' >{notification.date}</p>
              </div>
            </div>
          ) : (
            <div className="card-ntification-read px-2 pt-2 mt-2  mx-2">
              <p className='notification-text-read '> {notification.heading} </p>
              <p className='notification-text-read '>{notification.message}</p>
              <div className="date-notification-read  d-flex justify-content-end ">
                <p className='mb-2 ' >{notification.date}</p>
              </div>
            </div>
          )))}

        {filteredNotifications.length === 0 && (
          <div className="no-notifications text-center">
            <p>No notifications available</p>
          </div>
        )}

      </div>
    </>
  )
}

export default Notifications