import axios from 'axios';

// Replace `TIMESHEET_SERVICE_URL` with the actual URL of your entries service
const TIMESHEET_SERVICE_URL = window.configs.apiUrl;

export const getTimesheetEntries = async () => {
  try {
    const response = await axios.get(`${TIMESHEET_SERVICE_URL}/entries`, {});
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming entries:', error);
    throw error; // Rethrowing the error so it can be caught and handled in the component
  }
};

export const postTimesheetEntry = async (entryDetails) => {
  try {
    const response = await fetch(`${TIMESHEET_SERVICE_URL}/entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryDetails),
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    throw error;
  };
};