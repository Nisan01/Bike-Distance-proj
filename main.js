let totalDistance = 0; 


function calcdistance(event) {
  // console.log(event.target);
  // Get the parent div of the clicked button
  const parentDiv = event.target.closest('.day-container');
  
  // Get the kilometers input field and its value
  const inputKm = parentDiv.querySelector('input[type="number"].km');
  const convertKm = parseFloat(inputKm.value); // Convert the entered km to a number

  if (!isNaN(convertKm) && convertKm > 0) {
    // Get the day total span to update
    const distanceDisplay = parentDiv.querySelector('.day-total');
    const previousDayTotal = parseFloat(distanceDisplay.textContent);

    // Add the current day's distance to the total for that day
    const newDayTotal = previousDayTotal + convertKm;
    distanceDisplay.textContent = `${newDayTotal} KM`; // Update the total for that day

    // Add the current day's distance to the global total
    totalDistance += convertKm;

    // Update the overall total distance display at the bottom
    const totalDisplay = document.getElementById('total-distance');
    totalDisplay.textContent = `${totalDistance} KM`;
const bikenameInput=document.getElementById('bike-name').value;
const bottomline=document.getElementById('bottom-line-heading');
bottomline.textContent=` ${bikenameInput} travelled:`;
    // Clear the input field for the next entry
    inputKm.value = '';
  } else {
    alert("Please enter a valid number"); // Alert if the input is invalid
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



window.onkeydown = (e) => {
if (e.key === 'Enter') {
e.preventDefault();

// Check if the active input is the bike name input or a kilometer input
const activeElement = document.activeElement;
if (activeElement.id === 'bike-name') {
displayBikename();
} else if (activeElement.classList.contains('km')) {
calcdistance(e); // Pass the event for calculating distance
}
}
};


function displayBikename() {
const bikenameinput = document.getElementById('bike-name').value;
const bikenameheader = document.getElementById('bike-header');

if (bikenameinput) {
bikenameheader.textContent = `${bikenameinput}`;
document.getElementById('bike-name').style.display = 'none';
document.getElementById('bike-header').style.display='block';
document.getElementById('edit-icon').style.display='block';
} else {
alert("Please enter a bike name.");
}
}
