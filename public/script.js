const tableBody = document.getElementById('employeeTableBody');
const detailName = document.getElementById('detailName');
const detailArea = document.getElementById('detailArea');
const detailContactNo = document.getElementById('detailContactNo');
const detailExperience = document.getElementById('detailExperience');
const employeeList = document.getElementById('employeeList');
const employeeDetails = document.getElementById('employeeDetails');
const editForm = document.getElementById('editForm');
const deletePopup = document.getElementById('deletePopup');

function displayEmployeeList() {
    fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            updateTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function updateTable(data) {
    tableBody.innerHTML = '';
    data.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.Name}</td>
            <td>${employee.Area}</td>
            <td>${employee.ContactNo}</td>
            <td>${employee.ExperienceYear}</td>
        `;

        if (employee.ExperienceYear >= 15) {
            row.classList.add('yellow-bg');
        } else if (employee.ExperienceYear < 5) {
            row.classList.add('light-red-bg');
        }

        row.addEventListener('click', () => showEmployeeDetails(employee));
        tableBody.appendChild(row);
    });
}

function showEmployeeDetails(employee) {
    detailName.textContent = employee.Name;
    detailArea.textContent = employee.Area;
    detailContactNo.textContent = employee.ContactNo;
    detailExperience.textContent = employee.ExperienceYear;
    employeeList.style.display = 'none';
    employeeDetails.style.display = 'block';
}

function editEmployee() {
    editForm.style.display = 'block';
    employeeDetails.style.display = 'none';
    document.getElementById('editName').value = detailName.textContent;
    document.getElementById('editArea').value = detailArea.textContent;
    document.getElementById('editContactNo').value = detailContactNo.textContent;
    document.getElementById('editExperience').value = detailExperience.textContent;
}

function saveEmployee() {
    const editedEmployee = {
        Name: document.getElementById('editName').value,
        Area: document.getElementById('editArea').value,
        ContactNo: document.getElementById('editContactNo').value,
        ExperienceYear: parseInt(document.getElementById('editExperience').value),
    };

    fetch(`/api/employees/${detailName.textContent}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEmployee),
    })
        .then(response => response.json())
        .then(() => {
            displayEmployeeList();
            editForm.style.display = 'none';
            employeeList.style.display = 'block';
        })
        .catch(error => console.error('Error updating data:', error));
}

function cancelEdit() {
    editForm.style.display = 'none';
    employeeDetails.style.display = 'block';
}

function deleteEmployee() {
    deletePopup.style.display = 'block';
}

function confirmDelete() {
    fetch(`/api/employees/${detailName.textContent}`, {
        method: 'DELETE',
    })
        .then(() => {
            displayEmployeeList();
            deletePopup.style.display = 'none';
            employeeDetails.style.display = 'none';
            employeeList.style.display = 'block';
        })
        .catch(error => console.error('Error deleting data:', error));
}

function cancelDelete() {
    deletePopup.style.display = 'none';
}

displayEmployeeList();
