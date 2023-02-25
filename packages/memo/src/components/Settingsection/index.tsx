import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { memo, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AccountCircle, Groups2, Notifications, Wallet } from '@mui/icons-material';
import { Container, Divider, Grid, Paper, TextField, IconButton, Avatar } from '@mui/material';
import { AuthUser } from 'recoil/authUserState';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{
        width: '100%',
        height: '100%'
      }}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const SettingSection = () => {
  const [value, setValue] = useState(0);
  const [authUser, setAuthUser] = useRecoilState(AuthUser);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box borderRadius={10 / 2}
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 3, borderColor: 'divider', width: '20%'
        }}
      >
        <Tab sx={{ alignSelf: 'flex-start', marginX: '5%' }} icon={<Groups2 color='disabled' />} iconPosition="start" label="Teams" {...a11yProps(0)} />
        <Tab sx={{ alignSelf: 'flex-start', marginX: '5%' }} icon={<Notifications color='disabled' />} iconPosition="start" label="Notification" {...a11yProps(1)} />
        <Tab sx={{ alignSelf: 'flex-start', marginX: '5%' }} icon={<Wallet color='disabled' />} iconPosition="start" label="Subscription" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Box padding={2} height='100%' width='100%'>
          <Paper sx={{ paddingY: 3, backgroundColor: 'seashell', width: '100%', height: '100%' }} elevation={10} >

          </Paper>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box padding={2} height='100%' width='100%'>
          <Paper sx={{ paddingY: 3, backgroundColor: 'seashell', width: '100%', height: '100%' }} elevation={10} >

          </Paper>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box padding={2} height='100%' width='100%'>
          <Paper sx={{ paddingY: 3, backgroundColor: 'seashell', width: '100%', height: '100%' }} elevation={10} >

          </Paper>
        </Box>
      </TabPanel>
    </Box>
  );
}

export default SettingSection;