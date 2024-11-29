let totalDistance = 0; 

const toggle = document.getElementById('toggle-btn');

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    // Dark mode colors
    document.body.style.backgroundColor = '#0f0f0f';
    document.body.style.color = '#e0e0e0'; // Light text color
    document.querySelectorAll('.div-container, .day-container').forEach((el) => {
      el.style.backgroundColor = '#1c1c1c';
      el.style.color = '#e0e0e0';
      el.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.8)';
    });
    document.querySelectorAll('input, button').forEach((el) => {
      el.style.backgroundColor = '#2a2a2a';
      el.style.borderColor = '#4a4a4a';
      el.style.color = '#e0e0e0';
    });
    document.querySelectorAll('.day-total').forEach((el) => {
      el.style.color = '#6be17f'; // Green for totals in dark mode
    });
    document.getElementById('add-item').style.backgroundColor = '#6be17f';
    document.getElementById('add-item').style.color = '#0f0f0f';
    document.getElementById('add-item').style.borderColor = '#4a4a4a';
  } else {
    // Light mode colors (default)
    document.body.style.backgroundColor = '#f0f8ff';
    document.body.style.color = '#333';
    document.querySelectorAll('.div-container, .day-container').forEach((el) => {
      el.style.backgroundColor = '#fff';
      el.style.color = '#333';
      el.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';
    });
    document.querySelectorAll('input, button').forEach((el) => {
      el.style.backgroundColor = '#fff';
      el.style.borderColor = '#1e90ff';
      el.style.color = '#333';
    });
    document.querySelectorAll('.day-total').forEach((el) => {
      el.style.color = '#32cd32'; // Green for totals in light mode
    });
    document.getElementById('add-item').style.backgroundColor = '#32cd32';
    document.getElementById('add-item').style.color = '#fff';
    document.getElementById('add-item').style.borderColor = '#1e90ff';
  }
});

// Handle Distance Calculation for each day
function calcdistance(event) {
  const parentDiv = event.target.closest('.day-container');
  const inputKm = parentDiv.querySelector('input[type="number"].km');
  const convertKm = parseFloat(inputKm.value);

  if (!isNaN(convertKm) && convertKm > 0) {
    const distanceDisplay = parentDiv.querySelector('.day-total');
    const previousDayTotal = parseFloat(distanceDisplay.textContent) || 0;
    const newDayTotal = previousDayTotal + convertKm;

    distanceDisplay.textContent = `${newDayTotal} KM`;
    totalDistance += convertKm;

    const totalDisplay = document.getElementById('total-distance');
    totalDisplay.textContent = `${totalDistance} KM`;

    const bikeNameInput = document.getElementById('bike-name').value;
    const bottomLine = document.getElementById('bottom-line-heading');
    bottomLine.textContent = `${bikeNameInput} travelled:`;

    inputKm.value = ''; // Clear input
  } else {
    alert("Please enter a valid number.");
  }
}

// Event listener to add new days dynamically
document.getElementById("add-item").addEventListener("click", () => {
  const newItem = document.createElement("div");
  newItem.classList.add("day-container");
  newItem.innerHTML = `
    DAY <input type="text" placeholder="Enter Day" class="day" /> : 
    KILOMETERS <input type="number" class="km" /> : 
    TOTAL DISTANCE <span class="day-total">0 KM</span>
    <button class="calculate">CALCULATE</button>
  `;
  document.getElementById("divconID").appendChild(newItem);
});

// Event delegation for dynamically added buttons
document.getElementById("divconID").addEventListener('click', (event) => {
  if (event.target.classList.contains('calculate')) {
    calcdistance(event);
  }
});

// Handle Enter Key Event
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const activeElement = document.activeElement;

    if (activeElement.id === "bike-name") {
      displayBikename();
    } else if (activeElement.classList.contains("km")) {
      // Simulate a button click for the active kilometer input
      const calcButton = activeElement.closest(".day-container").querySelector(".calculate");
      calcButton.click();
    }
  }
});

// Function to display bike name
function displayBikename() {
  const bikenameInput = document.getElementById("bike-name");
  const bikenameHeader = document.getElementById("bike-header");
  const editIcon = document.getElementById("edit-icon");

  if (bikenameInput.value.trim()) {
    bikenameHeader.textContent = bikenameInput.value.trim();
    bikenameInput.style.display = "none";
    bikenameHeader.style.display = "block";
    editIcon.style.display = "block";
  } else {
    alert("Please enter a bike name.");
  }
}

// Function to allow editing of bike name
document.getElementById("edit-icon").addEventListener("click", () => {
  const bikenameInput = document.getElementById("bike-name");
  const bikenameHeader = document.getElementById("bike-header");
  const editIcon = document.getElementById("edit-icon");

  bikenameInput.style.display = "block";
  bikenameInput.value = bikenameHeader.textContent;
  bikenameHeader.style.display = "none";
  editIcon.style.display = "none";
});
