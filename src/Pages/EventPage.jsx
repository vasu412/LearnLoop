import React, { useEffect, useState } from "react";

const EventPage = ({ darkMode }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = "Delhi"; // Change this to the desired location

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const apiKey = "	O7NFJ59FvR2y58EUNw04HAJHbddBpf8b";
      const city = "Los Angeles"; // You can change this based on location.

      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Inspect the data to see the events
        setEvents(data.page.embedded.events);
      } catch (error) {
        console.error("Error fetching events from Ticketmaster:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div
      className={`flex flex-col w-[calc(100vw-660px)] p-6 space-y-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}>
      <h2 className="text-2xl font-bold">Events in {location}</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg shadow-md ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-100 border-gray-300"
              }`}>
              <h3 className="text-xl font-semibold">{event.name}</h3>
              {event.logo && (
                <img
                  src={event.logo.url}
                  alt={event.name.text}
                  className="rounded-md w-full"
                />
              )}
              {/* <p>{event.description.text.slice(0, 150)}...</p> */}
              {/* <p className="text-sm text-gray-600">Date: {event.start.local}</p>
              <p className="text-sm text-gray-600">
                Location: {event.venue ? event.venue.name : "Online"}
              </p> */}
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 block">
                View Event
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventPage;
