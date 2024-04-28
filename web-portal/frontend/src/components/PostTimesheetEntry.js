import React, { useState} from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { postTimesheetEntry } from '../services/timesheetService';

const PostTimesheetEntry = ({ userDetails, handleOpenSnackbar, onPostingSuccess }) => {
    const [user_id, setName] = useState(userDetails.name || userDetails.username);
    const [date, setDate] = useState('');
    const [project, setProject] = useState('');
    const [worklog, setWorklog] = useState('');
    const [duration, setDuration] = useState('');
    const [errors, setErrors] = useState({
        user_id: '',
        date: '',
        project: '',
        worklog: '',
        duration: '',
    });

    const [isPosting, setIsPosting] = useState(false);

    const validateForm = () => {
        let tempErrors = { date: '', project: '', worklog: '', duration: '' };
        let isValid = true;

        if (!date) {
            tempErrors.date = 'Date is required.';
            isValid = false;
        }

        if (!project) {
            tempErrors.project = 'Project is required.';
            isValid = false;
        }

        if (!worklog) {
            tempErrors.worklog = 'Worklog is required.';
            isValid = false;
        }

        if (!duration) {
            tempErrors.duration = 'Duration is required.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsPosting(true); // Start loading

        const timesheetEntry = {
            user_id,
            date,
            project,
            worklog,
            duration,
        };

        try {
            await postTimesheetEntry(timesheetEntry);
            handleOpenSnackbar('Timesheet entry posted successfully!');

            onPostingSuccess(); // Add this line. You need to pass this prop from App.js

            // Reset form fields
            setName('');
            setDate('');
            setProject('');
            setWorklog('');
            setDuration('');
        } catch (error) {
            console.error('Posting timesheet entry failed:', error);
            handleOpenSnackbar('Failed to post the timesheet entry. Please try again.');
        } finally {
            setIsPosting(false); // Stop loading regardless of the outcome
        }
    };
    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                error={!!errors.date}
                helperText={errors.date}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                error={!!errors.project}
                helperText={errors.project}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Worklog"
                value={worklog}
                onChange={(e) => setWorklog(e.target.value)}
                error={!!errors.worklog}
                helperText={errors.worklog}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                error={!!errors.duration}
                helperText={errors.duration}
                fullWidth
                margin="normal"
                variant="outlined"
                type="number"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20, position: 'relative' }} disabled={isPosting}>
                Post Timesheet Entry
                {isPosting && (
                    <CircularProgress
                        size={24}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -12,
                            marginLeft: -12,
                        }}
                    />
                )}
            </Button>
        </form>
    );
};

export default PostTimesheetEntry;