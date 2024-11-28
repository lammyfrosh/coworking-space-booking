const app = document.getElementById("app");
const revenueElement = document.getElementById("revenue");
const membershipSelector = document.getElementById("membership");
const hoursInput = document.getElementById("hours");

const desks = Array(15).fill(false); // 15 desks: false means available
const deskTypes = [...Array(10).fill("Individual"), ...Array(5).fill("Team")]; // First 10 individual, last 5 team
const pricing = { Basic: 10, Premium: 15, Executive: 20, Team: 25 }; // Pricing per hour
let totalRevenue = 0;

// Render desks dynamically
const renderDesks = () => {
    app.innerHTML = "";
    desks.forEach((booked, index) => {
        const deskDiv = document.createElement("div");
        deskDiv.className = booked ? "desk booked" : "desk available";
        deskDiv.textContent = `${deskTypes[index]} Desk ${index + 1}`;
        deskDiv.onclick = () => bookDesk(index);
        if (booked) deskDiv.onclick = null; // Disable clicking on booked desks
        app.appendChild(deskDiv);
    });
};

// Booking logic
const bookDesk = (index) => {
    if (!desks[index]) {
        const hours = parseInt(hoursInput.value, 10);
        const tier = membershipSelector.value;

        if (!hours || hours < 1 || hours > 12) {
            alert("Please enter a valid number of hours (1-12).");
            return;
        }

        let rate = deskTypes[index] === "Team" ? pricing.Team : pricing[tier];
        let total = rate * hours;

        // Apply discount for bookings longer than 3 hours
        if (hours > 3) {
            total *= 0.9; // Apply 10% discount
        }

        desks[index] = true; // Mark desk as booked
        totalRevenue += total; // Update revenue
        alert(`You booked Desk ${index + 1} for $${total.toFixed(2)}`);

        updateRevenue();
        renderDesks();
    }
};

// Update revenue display
const updateRevenue = () => {
    revenueElement.textContent = `Total Revenue: $${totalRevenue.toFixed(2)}`;
};

// Initial render
renderDesks();
