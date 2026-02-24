const tableBody = document.querySelector("#studentTable tbody");
const deptFilter = document.getElementById("deptFilter");
const countSection = document.getElementById("countSection");

// DISPLAY TABLE
function renderTable(data) {
    tableBody.innerHTML = "";

    data.forEach(student => {
        const row = `
        <tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.dept}</td>
            <td>${student.DOB.split('T')[0]}</td>
        </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// LOAD ALL STUDENTS
function loadStudents() {
    fetch('http://localhost:3000/students')
    .then(res => res.json())
    .then(data => renderTable(data.data));
}

// SORT NAME
function sortByName() {
    fetch('http://localhost:3000/students/sort/name')
    .then(res => res.json())
    .then(data => renderTable(data.data));
}

// SORT DOB
function sortByDate() {
    fetch('http://localhost:3000/students/sort/dob')
    .then(res => res.json())
    .then(data => renderTable(data.data));
}

// FILTER
deptFilter.addEventListener("change", () => {
    if (deptFilter.value === "all") return loadStudents();

    fetch(`http://localhost:3000/students/filter/${deptFilter.value}`)
    .then(res => res.json())
    .then(data => renderTable(data.data));
});

// COUNT
function loadCount() {
    fetch('http://localhost:3000/students/count')
    .then(res => res.json())
    .then(data => {
        countSection.innerHTML = "<b>Student Count:</b><br>";
        data.data.forEach(item => {
            countSection.innerHTML += `${item.dept} : ${item.total}<br>`;
        });
    });
}

// AUTO LOAD
window.onload = () => {
    loadStudents();
    loadCount();
};
