import React, { useEffect, useState } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Paper, Typography } from '@mui/material';
import Papa from 'papaparse';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DataServicesIcon from '@mui/icons-material/DesignServices';
import ITReportIcon from '@mui/icons-material/BugReport';
import PerformanceIcon from '@mui/icons-material/Campaign';

const icons = {
  Engineering: <EngineeringIcon />,
  Data: <DataServicesIcon />,
  IT: <ITReportIcon />,
  Performance: <PerformanceIcon />,
};

const TimelineComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Papa.parse('/roadmap.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setEvents(result.data);
      },
      error: (error) => {
        console.error('Error fetching CSV:', error);
      }
    });
  }, []);

  return (
    <Timeline position="alternate">
      {events.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {event.date}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              {icons[event.team] || <EngineeringIcon />}
            </TimelineDot>
            {index < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" component="h1">
                {event.deliverable}
              </Typography>
              <Typography>{event.description}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineComponent;
