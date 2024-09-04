document.addEventListener("DOMContentLoaded", function () {
    const submissionList = document.getElementById('submissionList');
    const allUsersBtn = document.getElementById('allUsersBtn');
    const submittedUsersBtn = document.getElementById('submittedUsersBtn');
    const unsubmittedUsersBtn = document.getElementById('unsubmittedUsersBtn');
    
    let submissions = [
        { name: 'Sachin', email: 'sachin@example.com', rating: '5', feedback: 'Great!', submitted: true },
        { name: 'Dhoni', email: 'dhoni@example.com', rating: '4', feedback: 'Good.', submitted: true },
        { name: 'Virat', email: 'virat@example.com', rating: '', feedback: '', submitted: false },
        { name: 'Hardhik', email: 'hardhik@example.com', rating: '3', feedback: 'Average', submitted: true },
        { name: 'Shubhman', email: 'shubhman@example.com', rating: '', feedback: '', submitted: false },
        { name: 'Rahul', email: 'rahul@example.com', rating: '2', feedback: 'Could be better', submitted: true },
        { name: 'Yashaswi', email: 'yashaswi@example.com', rating: '', feedback: '', submitted: false },
        { name: 'Shami', email: 'shami@example.com', rating: '', feedback: '', submitted: false },
        { name: 'Siraj', email: 'siraj@example.com', rating: '5', feedback: 'Excellent', submitted: true },
        { name: 'Bumrah', email: 'bumrah@example.com', rating: '5', feedback: 'Amazing', submitted: true },
        // Add more users here
    ];

    // Chart setup
const submissionCtx = document.getElementById('submissionChart').getContext('2d');
const statusCtx = document.getElementById('statusChart').getContext('2d');

const submissionChart = new Chart(submissionCtx, {
    type: 'pie',
    data: {
        labels: ['Submitted', 'Not Submitted'],
        datasets: [{
            data: [0, 0],
            backgroundColor: ['#007bff', '#f4f4f4']
        }]
    },
    options: {
        responsive: true
    }
});

const statusChart = new Chart(statusCtx, {
    type: 'bar',
    data: {
        labels: ['Submitted', 'Unsubmitted'],
        datasets: [{
            data: [0, 0],
            backgroundColor: ['#28a745', '#dc3545']
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateCharts() {
    const submittedCount = submissions.filter(user => user.submitted).length;
    const unsubmittedCount = submissions.length - submittedCount;

    submissionChart.data.datasets[0].data = [submittedCount, unsubmittedCount];
    statusChart.data.datasets[0].data = [submittedCount, unsubmittedCount];

    submissionChart.update();
    statusChart.update();
}

// Call updateCharts after creating the table
createTable();
updateCharts(); // Ensure this line is still here to update the charts
displayUsers('all');



    function createTable() {
        const table = document.createElement('table');
        table.classList.add('submission-table');

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Feedback</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        tbody.id = 'submissionTableBody';
        table.appendChild(tbody);

        submissionList.innerHTML = '';
        submissionList.appendChild(table);
    }

    function populateTable(filteredUsers) {
        const tbody = document.getElementById('submissionTableBody');
        tbody.innerHTML = ''; // Clear existing rows

        filteredUsers.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.rating}</td>
                <td>${user.feedback}</td>
            `;
            tbody.appendChild(row);
        });
    }



    function displayUsers(filter) {
        let filteredUsers = [];

        if (filter === 'all') {
            filteredUsers = submissions;
        } else if (filter === 'submitted') {
            filteredUsers = submissions.filter(user => user.submitted);
        } else if (filter === 'unsubmitted') {
            filteredUsers = submissions.filter(user => !user.submitted);
        }

        populateTable(filteredUsers);
    }

    allUsersBtn.addEventListener('click', function () {
        displayUsers('all');
    });

    submittedUsersBtn.addEventListener('click', function () {
        displayUsers('submitted');
    });

    unsubmittedUsersBtn.addEventListener('click', function () {
        displayUsers('unsubmitted');
    });

    // Initialize the table and display all users by default
    createTable();
    displayUsers('all');
});
