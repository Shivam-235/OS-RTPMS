let cpuData = [];
let memoryData = [];
let cpuChart, memoryPieChart;
let isUpdating = true;
let processes = [];
let sortDirection = {};

// Initialize charts and fetch data on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize CPU chart (Line Chart)
    const cpuCtx = document.getElementById('cpu-chart').getContext('2d');
    cpuChart = new Chart(cpuCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'CPU Usage (%)',
                data: [],
                borderColor: '#3B82F6', // Tailwind's blue-500
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true
            }]
        },
        options: {
            scales: {
                x: { type: 'time', time: { unit: 'second' } },
                y: { beginAtZero: true, max: 100 }
            }
        }
    });

    // Initialize Memory Pie Chart
    const memoryPieCtx = document.getElementById('memory-pie-chart').getContext('2d');
    memoryPieChart = new Chart(memoryPieCtx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                label: 'Memory Usage (%)',
                data: [],
                backgroundColor: [
                    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', // Tailwind colors
                    '#EC4899', '#6B7280', '#14B8A6', '#F97316', '#6366F1'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });

    // Refresh toggle button
    const refreshToggle = document.getElementById('refresh-toggle');
    refreshToggle.addEventListener('click', () => {
        isUpdating = !isUpdating;
        refreshToggle.textContent = isUpdating ? 'Pause Updates' : 'Resume Updates';
        refreshToggle.classList.toggle('bg-blue-500', isUpdating);
        refreshToggle.classList.toggle('bg-gray-500', !isUpdating);
        if (isUpdating) {
            fetchAndUpdate();
        }
    });

    // Function to fetch and update data
    const fetchAndUpdate = async () => {
        if (!isUpdating) return;

        try {
            const response = await fetch('/api/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched Data:', data);
            processes = data.processes; // Store processes for sorting
            updateTable(data.processes);
            updateUsage(data.cpu_usage, data.memory_usage);
            updateCharts(data.cpu_usage, data.processes);
        } catch (error) {
            console.error('Error fetching data:', error);
            const tbody = document.querySelector('#process-table tbody');
            tbody.innerHTML = '<tr><td colspan="6">Error fetching data</td></tr>';
        }

        // Schedule the next update if still updating
        if (isUpdating) {
            setTimeout(fetchAndUpdate, 2000); // Poll every 2 seconds
        }
    };

    // Initial fetch
    fetchAndUpdate();
});
function updateTable(processes) {
    const tbody = document.querySelector('#process-table tbody');
    tbody.innerHTML = '';
    if (!processes || !processes.length) {
        tbody.innerHTML = '<tr><td colspan="6">No processes found</td></tr>';
        return;
    }
    processes.forEach(proc => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'hover:bg-gray-50');
        row.innerHTML = `
            <td class="py-3 px-4">${proc.pid}</td>
            <td class="py-3 px-4">${proc.name}</td>
            <td class="py-3 px-4">${proc.status}</td>
            <td class="py-3 px-4">${proc.cpu_percent.toFixed(1)}</td>
            <td class="py-3 px-4">${proc.memory_percent.toFixed(1)}</td>
            <td class="py-3 px-4">
                <button onclick="killProcess(${proc.pid})" class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Kill</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to update CPU and memory usage percentages
function updateUsage(cpu, memory) {
    document.getElementById('cpu-usage').textContent = cpu.toFixed(1);
    document.getElementById('memory-usage').textContent = memory.toFixed(1);
}

// Function to update charts
function updateCharts(cpu, processes) {
    const now = new Date();
    cpuData.push({ x: now, y: cpu });

    // Keep last 60 data points (5 minutes at 2-second intervals)
    if (cpuData.length > 150) cpuData.shift();

    cpuChart.data.labels = cpuData.map(d => d.x);
    cpuChart.data.datasets[0].data = cpuData.map(d => d.y);
    cpuChart.update();

    // Update Memory Pie Chart
    const topProcesses = processes.slice(0, 10); // Show top 10 processes by memory usage
    memoryPieChart.data.labels = topProcesses.map(proc => proc.name);
    memoryPieChart.data.datasets[0].data = topProcesses.map(proc => proc.memory_percent);
    memoryPieChart.update();
}

// Function to kill a process
async function killProcess(pid) {
    if (!confirm(`Are you sure you want to terminate process ${pid}?`)) return;

    try {
        const response = await fetch(`/kill/${pid}`, { method: 'POST' });
        const result = await response.json();
        if (result.success) {
            alert(result.message);
            // Refresh the table immediately
            const fetchResponse = await fetch('/api/data');
            const data = await fetchResponse.json();
            processes = data.processes;
            updateTable(data.processes);
            updateUsage(data.cpu_usage, data.memory_usage);
            updateCharts(data.cpu_usage, data.processes);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error terminating process:', error);
        alert('Failed to terminate process');
    }
}

// Function to sort the table
function sortTable(key) {
    sortDirection[key] = !sortDirection[key] ? 'asc' : sortDirection[key] === 'asc' ? 'desc' : 'asc';
    const direction = sortDirection[key] === 'asc' ? 1 : -1;

    processes.sort((a, b) => {
        let valA = a[key];
        let valB = b[key];

        if (key === 'name' || key === 'status') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
            return direction * valA.localeCompare(valB);
        } else {
            return direction * (valA - valB);
        }
    });

    updateTable(processes);
}
