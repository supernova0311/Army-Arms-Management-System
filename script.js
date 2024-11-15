const form = document.querySelector('form');
const submitButton = document.querySelector('#submit');
const weaponDataDiv = document.querySelector('#weapon-data');
const weaponIdInput = document.querySelector('#weapon-id');
const nameInput = document.querySelector('#name');
const typeInput = document.querySelector('#type');
const caliberInput = document.querySelector('#caliber');
const manufacturerInput = document.querySelector('#manufacturer');
const acquisitionDateInput = document.querySelector('#acquisition-date');
const statusInput = document.querySelector('#status');
const tableRows = document.querySelectorAll('#weaponsTable tr');

function createWeaponData() {
  return {
    weaponId: weaponIdInput.value,
    name: nameInput.value,
    type: typeInput.value,
    caliber: caliberInput.value,
    manufacturer: manufacturerInput.value,
    acquisitionDate: acquisitionDateInput.value,
    status: statusInput.value
  };
}

// Single event listener for the submit button
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const weaponData = createWeaponData();

  // Send data to server-side script to store in database
  fetch('/store-weapon-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(weaponData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Clear form fields
    form.reset();
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// Add event listener to submit button
document.querySelector('#submit').addEventListener('click', function() {
  // Get input values
  var weapon_Id = document.querySelector('#weapon-id').value;
  var name = document.querySelector('#name').value;
  var type = document.querySelector('#type').value;
  var caliber = document.querySelector('#caliber').value;
  var manufacturer = document.querySelector('#manufacturer').value;
  var acquisitionDate = document.querySelector('#acquisition-date').value;
  var status = document.querySelector('#status').value;

  // Create table row
  var row = document.createElement('tr');
  row.innerHTML = `
      <td>${weapon_Id}</td>
      <td>${name}</td>
      <td>${type}</td>
      <td>${caliber}</td>
      <td>${manufacturer}</td>
      <td>${acquisitionDate}</td>
      <td>${status}</td>
      <td>
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
      </td>
  `;

  // Add row to table
  document.querySelector('#table-body').appendChild(row);

  // Clear input fields
  document.querySelector('#weapon-id').value = '';
  document.querySelector('#name').value = '';
  document.querySelector('#type').value = '';
  document.querySelector('#caliber').value = '';
  document.querySelector('#manufacturer').value = '';
  document.querySelector('#acquisition-date').value = '';
  document.querySelector('#status').value = '';

  // Hide add form container
  document.querySelector('.add-form-container').style.display = 'none';
});

// Add event listener to search button
document.querySelector('#search-button').addEventListener('click', function() {
  var searchInput = document.querySelector('#search-input').value;
  var rows = document.querySelectorAll('#weaponsTable tr');

  rows.forEach(function(row) {
      var cells = row.querySelectorAll('td');
      var found = false;

      cells.forEach(function(cell) {
          if (cell.textContent.toLowerCase().includes(searchInput.toLowerCase())) {
              found = true;
          }
      });

      if (found) {
          row.style.display = 'table-row';
      } else {
          row.style.display = 'none';
      }
  });
});

// Add event listener to filter type dropdown
document.querySelectorAll('.dropdown-content a').forEach(function(link) {
  link.addEventListener('click', function() {
      var filterType = link.textContent;
      var rows = document.querySelectorAll('#weaponsTable tr');

      rows.forEach(function(row) {
          var cells = row.querySelectorAll('td');
          var found = false;

          cells.forEach(function(cell) {
              if (cell.textContent === filterType) {
                  found = true;
              }
          });

          if (found || filterType === 'Show All') {
              row.style.display = 'table-row';
          } else {
              row.style.display = 'none';
          }
      });
  });
});

// Add event listener to filter status dropdown
document.querySelectorAll('.dropdown-content a').forEach(function(link) {
  link.addEventListener('click', function() {
      var filterStatus = link.textContent;
      var rows = document.querySelectorAll('#weaponsTable tr');

      rows.forEach(function(row) {
          var cells = row.querySelectorAll('td');
          var found = false;

          cells.forEach(function(cell) {
              if (cell.textContent === filterStatus) {
                  found = true;
              }
          });

          if (found || filterStatus === 'Show All') {
              row.style.display = 'table-row';
          } else {
              row.style.display = 'none';
          }
      });
  });
});

fetch('weapon_data.php')
  .then(response => response.json())
  .then(data => {
      const tableBody = document.querySelector('#table-body');
      data.forEach(row => {
          const tableRow = document.createElement('tr');
          tableRow.innerHTML = `
              <td>${row.Weapon_ID}</td>
              <td>${row.Name}</td>
              <td>${row.Type}</td>
              <td>${row.Caliber}</td>
              <td>${row.Manufacturer}</td>
              <td>${row.Acquisition_Date}</td>
              <td>${row.Status}</td>
              <td>Actions</td>
          `;
          tableBody.appendChild(tableRow);
      });
  })
  .catch(error => console.error('Error:', error));

  // Single event listener for the search button
searchButton.addEventListener('click', (e) => {
e.preventDefault();
const searchQuery = searchInput.value;

// Send search query to server-side script to retrieve data
fetch('/search-weapon-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ searchQuery })
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  // Display search results in the weaponDataDiv
  weaponDataDiv.innerHTML = '';
  data.forEach(weapon => {
    const weaponHTML = `
      <p>Weapon ID: ${weapon.weaponId}</p>
      <p>Name: ${weapon.name}</p>
      <p>Type: ${weapon.type}</p>
      <p>Caliber: ${weapon.caliber}</p>
      <p>Manufacturer: ${weapon.manufacturer}</p>
      <p>Acquisition Date: ${weapon.acquisitionDate}</p>
      <p>Status: ${weapon.status}</p>
    `;
    weaponDataDiv.innerHTML += weaponHTML;
  });
})
.catch(error => {
  console.error('Error:', error);
});
});

function deleteRow(button) {
var row = button.parentNode.parentNode;
row.parentNode.removeChild(row);
}

function editRow(button) {
var row = button.parentNode.parentNode;
var cells = row.getElementsByTagName('td');
for (var i = 0; i < cells.length - 2; i++) {
var cell = cells[i];
if (cell.children.length === 0) {
var input = document.createElement('input');
input.type = 'text';
input.value = cell.innerText;
cell.innerText = '';
cell.appendChild(input);
}
}
var typeCell = cells[2];
if (typeCell.children.length === 0) {
var typeInput = document.createElement('select');
var typeOptions = ['Rifle', 'Pistol', 'Machine Gun'];
typeOptions.forEach(function(option) {
var opt = document.createElement('option');
opt.value = option;
opt.text = option;
if (typeCell.innerText === option) {
    opt.selected = true;
}
typeInput.appendChild(opt);
});
typeCell.innerText = '';
typeCell.appendChild(typeInput);
}
var dateCell = cells[5];
if (dateCell.children.length === 0) {
var dateInput = document.createElement('input');
dateInput.type = 'date';
dateInput.value = cell.innerText;
dateCell.innerText = '';
dateCell.appendChild(dateInput);
} else {
// Enable the date picker
dateCell.children[0].type = 'date';
}
var statusCell = cells[6];
if (statusCell.children.length === 0) {
var statusInput = document.createElement('select');
var statusOptions = ['In Service', 'Under Maintenance', 'Decommissioned'];
statusOptions.forEach(function(option) {
var opt = document.createElement('option');
opt.value = option;
opt.text = option;
if (statusCell.innerText === option) {
    opt.selected = true;
}
statusInput.appendChild(opt);
});
statusCell.innerText = '';
statusCell.appendChild(statusInput);
}
button.innerHTML = '<i class="fas fa-save"></i>';
button.onclick = function() {
saveRow(button);
};
}

function saveRow(button) {
var row = button.parentNode.parentNode;
var cells = row.getElementsByTagName('td');
for (var i = 0; i < cells.length - 2; i++) {
var cell = cells[i];
if (cell.children.length > 0) {
var input = cell.children[0];
cell.innerText = input.value;
}
}
var typeCell = cells[2];
if (typeCell.children.length > 0) {
var typeInput = typeCell.children[0];
typeCell.innerText = typeInput.value;
}
var dateCell = cells[5];
if (dateCell.children.length > 0) {
var dateInput = dateCell.children[0];
dateCell.innerText = dateInput.value;
// Convert the date picker back to a normal date display
dateInput.type = 'text';
}
var statusCell = cells[6];
if (statusCell.children.length > 0) {
var statusInput = statusCell.children[0];
statusCell.innerText = statusInput.value;
}
button.innerHTML = '<i class="fas fa-pencil-alt"></i>';
button.onclick = function() {
editRow(button);
};
}

function filterType(type) {
var rows = document.querySelectorAll('#weaponsTable tr');
rows.forEach(function(row) {
    if (type === '' || row.getAttribute('data-type') === type) {
        row.style.display = '';
    } else {
        row.style.display = 'none';
    }
});
}

function filterStatus(status) {
var rows = document.querySelectorAll('#weaponsTable tr');
rows.forEach(function(row) {
    if (status === '' || row.getAttribute('data-status') === status) {
        row.style.display = '';
    } else {
        row.style.display = 'none';
    }
});
}

// Function to delete a row
function deleteRow(button) {
var row = button.parentNode.parentNode;
row.parentNode.removeChild(row);
}

// Function to edit a row
function editRow(button) {
var row = button.parentNode.parentNode;
var cells = row.getElementsByTagName('td');
for (var i = 0; i < cells.length - 2; i++) {
    var cell = cells[i];
    if (cell.children.length === 0) {
        var input = document.createElement('input');
        input.type = 'text';
        input.value = cell.innerText;
        cell.innerText = '';
        cell.appendChild(input);
    }
}
var typeCell = cells[2];
if (typeCell.children.length === 0) {
    var typeInput = document.createElement('select');
    var typeOptions = ['Rifle', 'Pistol', 'Machine Gun'];
    typeOptions.forEach(function(option) {
        var opt = document.createElement('option');
        opt.value = option;
        opt.text = option;
        if (typeCell.innerText === option) {
            opt.selected = true;
        }
        typeInput.appendChild(opt);
    });
    typeCell.innerText = '';
    typeCell.appendChild(typeInput);
}
var dateCell = cells[5];
if (dateCell.children.length === 0) {
    var dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = cell.innerText;
    dateCell.innerText = '';
    dateCell.appendChild(dateInput);
} else {
    // Enable the date picker
    dateCell.children[0].type = 'date';
}
var statusCell = cells[6];
if (statusCell.children.length === 0) {
    var statusInput = document.createElement('select');
    var statusOptions = ['In Service', 'Under Maintenance', 'Decommissioned'];
    statusOptions.forEach(function(option) {
        var opt = document.createElement('option');
        opt.value = option;
        opt.text = option;
        if (statusCell.innerText === option) {
            opt.selected = true;
        }
        statusInput.appendChild(opt);
    });
    statusCell.innerText = '';
    statusCell.appendChild(statusInput);
}
button.innerHTML = '<i class="fas fa-save"></i>';
button.onclick = function() {
    saveRow(button);
};
}

// Function to save a row
function saveRow(button) {
var row = button.parentNode.parentNode;
var cells = row.getElementsByTagName('td');
for (var i = 0; i < cells.length - 2; i++) {
    var cell = cells[i];
    if (cell.children.length > 0) {
        var input = cell.children[0];
        cell.innerText = input.value;
    }
}
var typeCell = cells[2];
if (typeCell.children.length > 0) {
    var typeInput = typeCell.children[0];
    typeCell.innerText = typeInput.value;
}
var dateCell = cells[5];
if (dateCell.children.length > 0) {
    var dateInput = dateCell.children[0];
    dateCell.innerText = dateInput.value;
    // Convert the date picker back to a normal date display
    dateInput.type = 'text';
}
var statusCell = cells[6];
if (statusCell.children.length > 0) {
    var statusInput = statusCell.children[0];
    statusCell.innerText = statusInput.value;
}
button.innerHTML = '<i class="fas fa-pencil-alt"></i>';
button.onclick = function() {
    editRow(button);
};
}

// Function to filter by type
function filterType(type) {
var rows = document.querySelectorAll('#weaponsTable tr');
rows.forEach(function(row) {
    if (type === '' || row.getAttribute('data-type') === type) {
        row.style.display = '';
    } else {
        row.style.display = 'none';
    }
});
}


  