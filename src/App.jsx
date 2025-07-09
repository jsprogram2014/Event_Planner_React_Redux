import React, { useState } from "react";
import "./App.css";
import EventDetails from "./components/EventDetails";
import AboutUs from "./components/AboutUs";

function App() {
  const [showVenue, setShowVenue] = useState(false);

  const handleGetStarted = () => {
    setShowVenue(true);
  };

  return (
    <>
      <header className="first_page">
        <div className="main_event">
          <div className="first_page_name_btn">
            <h1 className="budget_heading">PlanEase Event Planner</h1>
            <p className="budget_sentence"> Plan your Event with us at Great prices!</p>
            <div className="getstarted_btn">
              <button onClick={() => handleGetStarted()} className="get-started-btn">
                Get Started
              </button>
            </div>
          </div>
          <div className="aboutus_main">
            <AboutUs />
          </div>
        </div>
      </header>

      <div className={`event-list-container ${showVenue ? 'visible' : ''}`}>
        <EventDetails />
      </div>
    </>
  );
}

export default App;
