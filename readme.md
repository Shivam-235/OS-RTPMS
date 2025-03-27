# **Real-Time Process Monitoring Dashboard

Monitor system processes and resource usage in real-time with a sleek, user-friendly dashboard.

##Overview

The Real-Time Process Monitoring Dashboard is a web-based application built to provide system administrators with real-time insights into system processes and resource usage. It displays a sortable table of running processes (including PID, name, status, CPU%, and memory%) and visualizes system-wide CPU and memory usage through interactive charts. The dashboard updates every 2 seconds, ensuring up-to-date information, and includes features like process termination, a refresh toggle, and a memory usage breakdown by process.

This project was developed as part of an academic task at Lovely Professional University, focusing on modular development, real-time data visualization, and user-friendly design.

## Features

- Real-Time Monitoring: Updates process and system data every 2 seconds.
- Process Table: Displays a sortable table with columns for PID, Name, Status, CPU Percent, and Memory Percent.
- Process Termination: Includes a "Kill" button to terminate processes directly from the dashboard.
- Refresh Toggle: Pause or resume real-time updates to analyze specific data points.
- CPU Usage Chart: A line chart showing CPU usage over time.
- Memory Usage Breakdown: A pie chart displaying memory usage by the top 10 processes.
- Responsive Design: Built with Tailwind CSS for a modern, responsive UI that works on both desktop and mobile devices.
- Error Handling: Logs errors (e.g., permission denied) to a `process_monitor.log` file for debugging.


## Prerequisites

Before running the project, ensure you have the following installed:
- Python 3.6+: For running the Flask backend.
- pip: For installing Python dependencies.
- Git: For cloning the repository.
- A modern web browser (e.g., Chrome, Firefox) to view the dashboard.

## Setup Instructions

Follow these steps to set up and run the project locally:

1. Clone the Repository:
   ```bash
   git clone https://github.com/yourusername/RealTimeProcessMonitoringDashboard.git
   cd RealTimeProcessMonitoringDashboard
   ```

2. Install Dependencies:
   Install the required Python packages using pip:
   ```bash
   pip install flask psutil
   ```

3. Run the Application:
   Start the Flask server:
   ```bash
   python app.py
   ```
   The application will run on `http://127.0.0.1:5000/`.

4. Access the Dashboard:
   Open your browser and navigate to:
   ```
   http://127.0.0.1:5000/
   ```
   You should see the dashboard with real-time process data and charts.

## Project Structure

```
RealTimeProcessMonitoringDashboard/
├── app.py                    # Flask backend with data collection and API endpoints
├── static/
│   └── js/
│       └── main.js           # JavaScript for dynamic updates, charts, and user interactions
├── templates/
│   └── index.html            # HTML template for the dashboard (styled with Tailwind CSS)
├── process_monitor.log       # Log file for error messages
├── screenshots/              # Folder for dashboard screenshots (add your own)
└── README.md                 # This README file
```

## Usage

- View Process Data: The table displays all running processes with their PID, name, status, CPU usage, and memory usage. Click on column headers to sort by that column (e.g., sort by CPU% to identify high-CPU processes).
- Monitor Resource Usage: The CPU usage line chart and memory usage pie chart update every 2 seconds to show trends and breakdowns.
- Terminate Processes: Click the "Kill" button next to a process to terminate it. A confirmation prompt will appear to prevent accidental termination.
- Pause/Resume Updates: Use the "Pause Updates" button in the sidebar to freeze the dashboard and analyze data. Click "Resume Updates" to continue real-time monitoring.

#Technologies Used

- Backend:
  - Python: Core language for the backend.
  - Flask: Lightweight web framework for serving the API and frontend.
  - psutil: Library for retrieving system and process information.
- Frontend:
  - JavaScript: For dynamic updates and user interactions.
  - Chart.js: For creating interactive CPU and memory usage charts.
  - Tailwind CSS: Utility-first CSS framework for a modern, responsive design.
- Version Control:
  - GitHub: For revision tracking and collaboration.

## Troubleshooting

- Dashboard Not Loading: Ensure the Flask server is running (`python app.py`) and you’re accessing `http://127.0.0.1:5000/`. Check the terminal for error messages.
- Charts Not Updating: Open the browser’s developer tools (F12 > Console) to check for JavaScript errors. Ensure Chart.js is loaded correctly.
- Permission Denied for Killing Processes: Some system processes require elevated permissions. Run the application as an administrator, or check `process_monitor.log` for error details.
- Table Not Sorting: Verify that the `sortTable` function in `main.js` is working correctly. Check the browser console for errors.
- Data Not Updating: Ensure the `/api/data` endpoint is returning valid JSON. Check the Network tab in developer tools for failed requests.

## Contributing

	[Shivam](https://github.com/Shivam-235)
	[Lanka Vikram Kumar](https://github.com/vikramkumar18)
	[Bala Vardhan Utla](https://github.com/Vardhan-12)

## Acknowledgments

- Developed as part of an academic task at Lovely Professional University.
- Thanks to the open-source community for providing tools like Flask, psutil, Chart.js, and Tailwind CSS.

## Contact
	[Shivam](https://github.com/Shivam-235)
	[Lanka Vikram Kumar](https://github.com/vikramkumar18)
	[Bala Vardhan Utla](https://github.com/Vardhan-12)
