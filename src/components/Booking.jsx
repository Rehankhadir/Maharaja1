import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './LandingPage.css';
import './Booking.css';
import { setPageSEO } from '../utils/usePageSEO';

const TIME_SLOTS_UNTIL_0930 = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM',
  '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
];
const TIME_SLOTS_UNTIL_1030 = [
  ...TIME_SLOTS_UNTIL_0930,
  '10:00 PM', '10:30 PM',
];

const getTimeSlotsForDate = (dateStr) => {
  if (!dateStr) return TIME_SLOTS_UNTIL_0930;
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDay();
  return (day === 5 || day === 6) ? TIME_SLOTS_UNTIL_1030 : TIME_SLOTS_UNTIL_0930;
};

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const Booking = () => {
  const dateInputRef = useRef(null);
  const timeDropdownRef = useRef(null);
  const timeListRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

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

  useEffect(() => {
    if (selectedTime && !getTimeSlotsForDate(selectedDate).includes(selectedTime)) {
      setSelectedTime('');
    }
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    if (!timeDropdownOpen) return;
    const handleClickOutside = (e) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(e.target)) {
        setTimeDropdownOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setTimeDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [timeDropdownOpen]);

  useEffect(() => {
    if (timeDropdownOpen && selectedTime && timeListRef.current) {
      const active = timeListRef.current.querySelector('[data-selected="true"]');
      active?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [timeDropdownOpen, selectedTime]);

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

              <div className="booking-page-form-group booking-time-picker-wrap" ref={timeDropdownRef}>
                <label className="booking-page-label" id="booking-time-label">
                  <i className="fas fa-clock booking-page-label-icon" aria-hidden="true" />
                  Select Time
                </label>
                {!selectedDate ? (
                  <div className="booking-time-trigger booking-time-trigger--disabled" aria-disabled="true">
                    <span className="booking-time-trigger-text">Select a date first</span>
                    <i className="fas fa-chevron-down booking-time-trigger-icon" aria-hidden="true" />
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      name="bookingTime"
                      value={selectedTime}
                      readOnly
                      required
                      tabIndex={-1}
                      aria-hidden="true"
                      className="booking-time-hidden-input"
                    />
                    <button
                      type="button"
                      className={`booking-time-trigger ${timeDropdownOpen ? 'booking-time-trigger--open' : ''}`}
                      onClick={() => setTimeDropdownOpen((open) => !open)}
                      aria-haspopup="listbox"
                      aria-expanded={timeDropdownOpen}
                      aria-labelledby="booking-time-label"
                      id="booking-time-trigger"
                    >
                      <span className="booking-time-trigger-text">
                        {selectedTime || 'Choose time'}
                      </span>
                      <i className={`fas fa-chevron-down booking-time-trigger-icon ${timeDropdownOpen ? 'booking-time-trigger-icon--open' : ''}`} aria-hidden="true" />
                    </button>
                    {timeDropdownOpen && (
                      <div
                        className="booking-time-dropdown"
                        role="listbox"
                        aria-labelledby="booking-time-trigger"
                        ref={timeListRef}
                      >
                        {getTimeSlotsForDate(selectedDate).map((time) => (
                          <button
                            key={time}
                            type="button"
                            role="option"
                            aria-selected={selectedTime === time}
                            data-selected={selectedTime === time}
                            tabIndex={-1}
                            className={`booking-time-option ${selectedTime === time ? 'booking-time-option--selected' : ''}`}
                            onClick={() => {
                              setSelectedTime(time);
                              setTimeDropdownOpen(false);
                            }}
                          >
                            <span className="booking-time-option-label">{time}</span>
                            {selectedTime === time && (
                              <i className="fas fa-check booking-time-option-check" aria-hidden="true" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
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
