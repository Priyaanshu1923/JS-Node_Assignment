const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

let employeesData = [
    { Name: "Mr. Mihir Kapoor", Area: "Ahmedabad", ContactNo: "9999999999", ExperienceYear: 15 },
    { Name: "Ms. Kinjal Sharma", Area: "Surat", ContactNo: "9888888888", ExperienceYear: 10 },
    { Name: "Mr. Tejashree Verma", Area: "Vadodara", ContactNo: "9777777777", ExperienceYear: 8 },
    { Name: "Mr. Mayur Sharma", Area: "Rajkot", ContactNo: "9666666666", ExperienceYear: 17 },
    { Name: "Mr. Hardik Kewat", Area: "Gandhinagar", ContactNo: "9555555555", ExperienceYear: 3 },
    // ... other employees
];

app.get('/api/employees', (req, res) => {
    res.json(employeesData);
});

app.put('/api/employees/:name', (req, res) => {
    const name = req.params.name;
    const updatedEmployee = req.body;

    const index = employeesData.findIndex(employee => employee.Name === name);
    if (index !== -1) {
        employeesData[index] = updatedEmployee;
        res.json(updatedEmployee);
    } else {
        res.status(404).send('Employee not found');
    }
});

app.delete('/api/employees/:name', (req, res) => {
    const name = req.params.name;

    employeesData = employeesData.filter(employee => employee.Name !== name);
    res.send('Employee deleted successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
