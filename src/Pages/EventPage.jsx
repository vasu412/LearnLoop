import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    gapi.load("client:auth2", initClient);
  }, []);

  // Initialize the Google API client
  const initClient = () => {
    gapi.client
      .init({
        apiKey: "AIzaSyD8F8m8hH-cJIH4OF_smNLYnl4f9_SR_X0", // Replace with your API Key
        clientId:
          "249615346911-qq9dvtals0j64uj5dpqaie3r4eu90fr8.apps.googleusercontent.com", // Replace with your Client ID
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.readonly", // You can change the scope based on your needs
      })
      .then(() => {
        // Check if the user is authenticated
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          setIsAuthenticated(true);
          fetchEvents();
        } else {
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              setIsAuthenticated(true);
              fetchEvents();
            });
        }
      });
  };

  // Fetch events from the primary calendar
  const fetchEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: "primary", // Use "primary" for the main calendar
        timeMin: new Date().toISOString(), // Get events starting from now
        showDeleted: false,
        singleEvents: true,
        maxResults: 5, // Number of events to fetch
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        setEvents(events);
      });
  };

  return (
    <div>
      <h1>Google Calendar Events</h1>
      {!isAuthenticated ? (
        <button onClick={() => gapi.auth2.getAuthInstance().signIn()}>
          Sign in to Google
        </button>
      ) : (
        <ul>
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id}>
                <h3>{event.summary}</h3>
                <p>{event.start.dateTime || event.start.date}</p>
                <p>{event.description || "No description available"}</p>
              </li>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default CalendarEvents;
