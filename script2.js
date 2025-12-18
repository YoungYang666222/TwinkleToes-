// booking-script.js

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const dateInput = document.getElementById('dateSelect');
    const timeSelect = document.getElementById('timeSelect');

    // -----------------------------------
    // WORKING HOURS CONFIGURATION
    // -----------------------------------
    const WORKING_HOURS = {
        weekday: { open: 10, close: 20 }, // Mon–Fri: 10AM–8PM
        saturday: { open: 10, close: 18 }, // Sat: 10AM–6PM
        sunday: null // Closed
    };

    // -----------------------------------
    // DATE CHANGE → UPDATE TIME OPTIONS
    // -----------------------------------
    dateInput.addEventListener('change', () => {
        updateAvailableTimes(dateInput.value);
    });

    // -----------------------------------
    // FORM SUBMISSION
    // -----------------------------------
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const serviceSelect = document.getElementById('serviceSelect');
        const serviceTextWithPrice = serviceSelect.value;

        const technicianSelect = document.getElementById('technicianSelect');
        const technician = technicianSelect.value;

        const date = dateInput.value;
        const time = timeSelect.value;
        const email = document.getElementById('clientEmail').value;
        const clientName = document.getElementById('clientName').value;

        if (!serviceTextWithPrice) {
            alert("Please select a service before confirming your booking.");
            return;
        }

        if (!isWithinWorkingHours(date, time)) {
            alert("Selected time is outside our working hours. Please choose another time.");
            return;
        }

        // -----------------------------------
        // SIMULATE SERVER RESPONSE
        // -----------------------------------
        setTimeout(() => {

            bookingForm.style.display = 'none';

            const subtitle = document.querySelector('.booking-wrapper p.subtitle');
            if (subtitle) subtitle.style.display = 'none';

            confirmationMessage.style.display = 'block';

            const appointmentData = {
                service: serviceTextWithPrice,
                date: formatDate(date),
                time: formatTime(time),
                technician:
                    (technician === "No Preference" || technician === "")
                        ? "Any Available Technician"
                        : technician,
                clientName: clientName,
                clientEmail: email,
                id: Date.now()
            };

            // Save to Session Storage
            sessionStorage.setItem(
                'latestAppointment',
                JSON.stringify(appointmentData)
            );

            // Populate confirmation
            document.getElementById('confirmService').textContent = appointmentData.service;
            document.getElementById('confirmDate').textContent = appointmentData.date;
            document.getElementById('confirmTime').textContent = appointmentData.time;
            document.getElementById('confirmTechnician').textContent = appointmentData.technician;
            document.getElementById('confirmEmail').textContent = appointmentData.clientEmail;

        }, 1500);
    });

    // -----------------------------------
    // WORKING HOURS CHECK
    // -----------------------------------
    function isWithinWorkingHours(dateString, timeString) {
        if (!dateString || !timeString) return false;

        const date = new Date(dateString + 'T00:00:00');
        const day = date.getDay(); // 0 = Sunday

        if (day === 0) return false;

        const [hour, minute] = timeString.split(':').map(Number);
        const selectedMinutes = hour * 60 + minute;

        let hours;

        if (day === 6) {
            hours = WORKING_HOURS.saturday;
        } else {
            hours = WORKING_HOURS.weekday;
        }

        const openMinutes = hours.open * 60;
        const closeMinutes = hours.close * 60;

        return selectedMinutes >= openMinutes && selectedMinutes <= closeMinutes;
    }

    // -----------------------------------
    // DISABLE INVALID TIMES BASED ON DATE
    // -----------------------------------
    function updateAvailableTimes(dateString) {
        if (!dateString) return;

        const date = new Date(dateString + 'T00:00:00');
        const day = date.getDay();

        Array.from(timeSelect.options).forEach(option => {
            if (!option.value) return;

            option.disabled = false;

            if (day === 0) {
                option.disabled = true;
                return;
            }

            const [hour, minute] = option.value.split(':').map(Number);
            const minutes = hour * 60 + minute;

            let hours = (day === 6)
                ? WORKING_HOURS.saturday
                : WORKING_HOURS.weekday;

            const openMinutes = hours.open * 60;
            const closeMinutes = hours.close * 60;

            if (minutes < openMinutes || minutes > closeMinutes) {
                option.disabled = true;
            }
        });

        timeSelect.value = "";
    }

    // -----------------------------------
    // FORMAT HELPERS
    // -----------------------------------
    function formatDate(dateString) {
        const dateObj = new Date(dateString + 'T00:00:00');
        return dateObj.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function formatTime(timeString) {
        const [hour, minute] = timeString.split(':');
        const date = new Date();
        date.setHours(hour, minute);
        return date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
});
