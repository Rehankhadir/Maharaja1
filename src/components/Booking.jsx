import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './LandingPage.css';
import './Booking.css';
import { setPageSEO } from '../utils/usePageSEO';

const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00',
  '13:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30', '21:00'
];

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const Booking = () => {
  const dateInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPageSEO({
      title: 'Book a Table | SangEat Restaurant',
      description: 'Reserve a table at SangEat – authentic Indian restaurant in Champaign. Book online for dine-in.'
    });
    return () => setPageSEO({});
  }, []);

  const [selectedTime, setSelectedTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openDatePicker = () => {
    const el = dateInputRef.current;
    if (el) {
      if (typeof el.showPicker === 'function') {
        el.showPicker();
      } else {
        el.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleMakeAnotherBooking = () => {
    setShowConfirmation(false);
    setSelectedDate('');
    setSelectedTime('');
    setNumberOfGuests(2);
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setSpecialRequests('');
  };

  return (
    <>
      <Header cart={[]} />
      <div className="booking-page">
        <div className="booking-page-bg" />
        <div className="booking-page-content">
          {showConfirmation ? (
            <div className="booking-confirmation-card">
              <div className="booking-confirmation-icon-wrap">
                <i className="fas fa-check booking-confirmation-icon" aria-hidden="true" />
              </div>
              <h2 className="booking-confirmation-title">Booking Confirmed!</h2>
              <p className="booking-confirmation-message">
                Your table reservation has been confirmed. We look forward to serving you!
              </p>
              <div className="booking-confirmation-details">
                <div className="booking-confirmation-row">
                  <span className="booking-confirmation-label">Date:</span>
                  <span className="booking-confirmation-value">{formatDisplayDate(selectedDate)}</span>
                </div>
                <div className="booking-confirmation-row">
                  <span className="booking-confirmation-label">Time:</span>
                  <span className="booking-confirmation-value">{selectedTime}</span>
                </div>
                <div className="booking-confirmation-row">
                  <span className="booking-confirmation-label">Guests:</span>
                  <span className="booking-confirmation-value">{numberOfGuests}</span>
                </div>
                <div className="booking-confirmation-row">
                  <span className="booking-confirmation-label">Name:</span>
                  <span className="booking-confirmation-value">{fullName}</span>
                </div>
              </div>
              <button type="button" className="booking-confirmation-btn" onClick={handleMakeAnotherBooking}>
                Make Another Booking
              </button>
            </div>
          ) : (
            <>
              <h1 className="booking-page-title">Book a Table</h1>
              <p className="booking-page-subtitle">
                Reserve your table for an unforgettable dining experience
              </p>

              <div className="booking-card">
                <form className="booking-page-form" onSubmit={handleSubmit}>
              <div className="booking-page-form-group">
                <label className="booking-page-label">
                  <i className="fas fa-calendar-alt booking-page-label-icon" aria-hidden="true" />
                  Select Date
                </label>
                <div className="booking-page-input-wrap" onClick={openDatePicker}>
                  <input
                    ref={dateInputRef}
                    type="date"
                    className="booking-page-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    aria-label="Select date"
                  />
                  <i className="fas fa-calendar-alt booking-page-input-icon" aria-hidden="true" />
                </div>
              </div>

              <div className="booking-page-form-group">
                <label className="booking-page-label">
                  <i className="fas fa-clock booking-page-label-icon" aria-hidden="true" />
                  Select Time
                </label>
                <div className="booking-page-time-grid">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`booking-page-time-btn ${selectedTime === time ? 'active' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking-page-form-group">
                <label className="booking-page-label">
                  <i className="fas fa-users booking-page-label-icon" aria-hidden="true" />
                  Number of Guests
                </label>
                <input
                  type="number"
                  className="booking-page-input"
                  min="1"
                  max="20"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(parseInt(e.target.value, 10) || 1)}
                  required
                />
              </div>

              <div className="booking-page-form-row">
                <div className="booking-page-form-group">
                  <label className="booking-page-label">Full Name</label>
                  <input
                    type="text"
                    className="booking-page-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="booking-page-form-group">
                  <label className="booking-page-label">Email</label>
                  <input
                    type="email"
                    className="booking-page-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="booking-page-form-group">
                <label className="booking-page-label">Phone Number</label>
                <input
                  type="tel"
                  className="booking-page-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <div className="booking-page-form-group">
                <label className="booking-page-label">Special Requests (Optional)</label>
                <textarea
                  className="booking-page-textarea"
                  rows="4"
                  placeholder="Any dietary restrictions, allergies, or special occasions?"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>

              <button type="submit" className="booking-page-submit">
                Confirm Booking
              </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
