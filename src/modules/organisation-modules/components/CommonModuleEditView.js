import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components } from '../../../common/components';
import ModuleDetailsView from './ModuleDetailsView';
import ModulePermission from './ModulePermission';
import AssignOrganisation from './AssignOrganisation';


const { Box, Typography, Tab, Tabs, AppBar } = Components;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(() => ({
  colorPrimary: {
    color: '#634646',
    backgroundColor: '#039123'

  }
}));
function CommonmoduleEditView() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.colorPrimary}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Detail" {...a11yProps(0)} />
          <Tab label="Define Permission" {...a11yProps(1)} />
          <Tab label="Assign Organisation" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ModuleDetailsView />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ModulePermission />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AssignOrganisation />
      </TabPanel>
    </div>

  );
}

export default CommonmoduleEditView;
