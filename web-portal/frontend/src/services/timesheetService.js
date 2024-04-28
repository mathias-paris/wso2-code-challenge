import axios from 'axios';

// Replace `TIMESHEET_SERVICE_URL` with the actual URL of your entries service
const TIMESHEET_SERVICE_URL = window.configs.apiUrl;

export const getTimesheetEntries = async (email) => {
  try {
    const response = await axios.get(`${TIMESHEET_SERVICE_URL}/entries`, {});
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming entries:', error);
    throw error; // Rethrowing the error so it can be caught and handled in the component
  }
};