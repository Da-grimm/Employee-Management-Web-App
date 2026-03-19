document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("employeeForm");
    const tableBody = document.getElementById("employeeTableBody");

    // Helper functions
    function loadEmployees() {
        return JSON.parse(localStorage.getItem("employees")) || [];
    }

    function saveEmployees(emps) {
        localStorage.setItem("employees", JSON.stringify(emps));
    }

    function renderTable() {
        if (!tableBody) return;   // safe on new-contact.html

        let employees = loadEmployees();
        tableBody.innerHTML = "";

        employees.forEach((emp, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.phone}</td>
                <td>${emp.department}</td>
                <td class="actions">
                    <button onclick="showDetails(${index})" class="btn details">👁️ Details</button>
                    <button onclick="editEmployee(${index})" class="btn edit">✏️ Edit</button>
                    <button onclick="deleteEmployee(${index})" class="btn delete">🗑️ Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Button functions (global so onclick works)
    window.showDetails = function (index) {
        let employees = loadEmployees();
        const emp = employees[index];
        alert(
            `Name: ${emp.name}\n` +
            `Email: ${emp.email}\n` +
            `Phone: ${emp.phone}\n` +
            `Department: ${emp.department}`
        );
    };

    window.editEmployee = function (index) {
        let employees = loadEmployees();
        const emp = employees[index];

        const newName = prompt("Edit Name:", emp.name);
        if (newName === null) return;
        const newEmail = prompt("Edit Email:", emp.email);
        const newPhone = prompt("Edit Phone:", emp.phone);
        const newDept = prompt("Edit Department:", emp.department);

        if (newName) emp.name = newName.trim();
        if (newEmail) emp.email = newEmail.trim();
        if (newPhone) emp.phone = newPhone.trim();
        if (newDept) emp.department = newDept.trim();

        saveEmployees(employees);
        renderTable();
        alert("✅ Employee updated successfully!");
    };

    window.deleteEmployee = function (index) {
        if (confirm("Are you sure you want to delete this employee?")) {
            let employees = loadEmployees();
            employees.splice(index, 1);
            saveEmployees(employees);
            renderTable();
        }
    };

    // Form submit handler (only runs if form exists)
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const department = document.getElementById("department").value.trim();

            if (!name || !email) {
                alert("Name and Email are required!");
                return;
            }

            const employee = { name, email, phone, department };

            let employees = loadEmployees();
            employees.push(employee);
            saveEmployees(employees);

            alert("✅ Employee saved successfully!");
            form.reset();
            renderTable();   // does nothing on form page
        });
    }

    // Initial render (only on view page)
    renderTable();
});