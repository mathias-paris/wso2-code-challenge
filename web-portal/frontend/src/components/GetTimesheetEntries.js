import React, { useEffect, useState } from 'react';
import { getTimesheetEntries } from '../services/timesheetService';
import { services } from '../serviceData';
import { TableContainer, Table, TableHead, Typography, Paper, TableRow, TableCell, TableBody } from '@mui/material';
import { format } from 'date-fns';

// Convert service values to labels for display
const getServiceLabel = (serviceValue) => {
    const service = services.find(s => s.value === serviceValue);
    return service ? service.label : serviceValue; // Fallback to the value if not found
};

const GetTimesheetEntries = ({ username, triggerRefresh }) => {
    const [timesheetEntries, setTimesheetEntries] = useState([]);

    const fetchTimesheetEntries = async () => {
        try {
            const entries = await getTimesheetEntries();
            setTimesheetEntries(entries);
        } catch (error){
            console.error('Failed to fetch entries:', error);
        }
    };

    useEffect(() => {
        fetchTimesheetEntries();
    }, [username, triggerRefresh]);

    if (timesheetEntries.length === 0) {
        return (
            <Typography variant="subtitle1" style={{ marginTop: 20, textAlign: 'center' }}>
                No Entries - strart adding Entries.
            </Typography>
        );
    }

    return (
        <Paper elevation={3} style={{ marginTop: 20, padding: '20px' }}>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
                My Entries
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Project</TableCell>
                            <TableCell>Worklog</TableCell>
                            <TableCell>Duration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timesheetEntries.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>{format(new Date(entry.date.year, entry.date.month - 1, entry.date.day), 'MMMM d, yyyy')}</TableCell>
                                <TableCell>{entry.project}</TableCell>
                                <TableCell>{entry.worklog}</TableCell>
                                <TableCell>{entry.duration}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default GetTimesheetEntries;
