alert("Js is loaded and running")
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("employeeForm");
    const tableBody = document.getElementById("employeeTableBody");

    
    function renderTable() {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        tableBody.innerHTML = ""; 
        employees.forEach((emp, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.phone}</td>
                <td>${emp.department}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    
    renderTable();

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const department = document.getElementById("department").value;

            const employee = { name, email, phone, department };

            let employees = JSON.parse(localStorage.getItem("employees")) || [];
            employees.push(employee);
            localStorage.setItem("employees", JSON.stringify(employees));

            alert("Employee saved successfully!");
            form.reset();

            renderTable(); 
        });
    }
});