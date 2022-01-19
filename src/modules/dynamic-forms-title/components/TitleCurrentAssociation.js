import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { fetchTitleCurrentAssociation } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import utils from '../../../utils';
import { makeStyles, Components, I18n } from '../../../common/components';
const { Box, Tab, Tabs } = Components;
import PropTypes from 'prop-types';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay';
import i18n from '../../../i18n';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { lodashUtils: _ } = utils;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    MuiTabTextColorInherit: {
        color: 'black',
        opacity: '0.7'
    },
    tabWidth: {
        // width: '100%'
    }

}));

const getTableList = (CurrentAssociationList, filter) => {
    let table = [];
    if (filter === 'fragments') {
        _.forEach(CurrentAssociationList.fragments, item => {
            table.push(item);
        });
    } else if (filter === 'templates') {
        _.forEach(CurrentAssociationList.templates, item => {
            table.push(item);
        });
    } else if (filter === 'titles') {
        _.forEach(CurrentAssociationList.titles, item => {
            table.push(item);
        });
    } else if (filter === 'questions') {
        _.forEach(CurrentAssociationList.questions, item => {
            table.push(item);
        });
    }
    return table;
};

const options = {
    filter: false,
    print: false,
    download: false,
    viewColumns: false,
    selectableRows: 'none',
    rowsPerPage: 100
};
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
                    <div >{children}</div>
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

function TitleCurrentAssociation() {
    const columns = [
        {
            name: 'id',
            label: I18n.t('id')
        }, {
            name: 'name',
            label: I18n.t('name')
        },
        {
            name: 'label',
            label: I18n.t('label')
        }
    ];
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();
    const { id } = useParams();
    const initialValues = useSelector(state => state[STATE_REDUCER_KEY]);
    const { getTitleCurrentAssociation: { data: CurrentAssociationList = [], requestInProgress } = {} } = initialValues;
    useEffect(() => {
        dispatch(fetchTitleCurrentAssociation(id));
    }, []);
    return (

        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="Vertical tabs example" orientation='vertical' style={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={classes.tabs}>
                {
                    (hasAccessPermission(RESOURCE_MAPPING.TITLE_CURRENT_ASSOCIATION_FRAGMENT, ACTION_MAPPING.TITLE_CURRENT_ASSOCIATION_FRAGMENT.ACCESS_IN_TAB) || false) &&
                    < Tab label={i18n.t('fragments')} {...a11yProps(0)} />
                }
                {
                    (hasAccessPermission(RESOURCE_MAPPING.TITLE_CURRENT_ASSOCIATION_TEMPLATE, ACTION_MAPPING.TITLE_CURRENT_ASSOCIATION_TEMPLATE.ACCESS_IN_TAB) || false) &&
                    <Tab label={i18n.t('templates')} {...a11yProps(2)} />
                }
                {
                    (hasAccessPermission(RESOURCE_MAPPING.TITLE_CURRENT_ASSOCIATION_QUESTION, ACTION_MAPPING.TITLE_CURRENT_ASSOCIATION_QUESTION.ACCESS_IN_TAB) || false) &&
                    <Tab label={i18n.t('questions')} {...a11yProps(3)} />
                }

            </Tabs>
            <LoadingOverlay active={requestInProgress} >
                <TabPanel value={value} index={0} className={classes.tabWidth}>
                    <MUIDataTable
                        title=''
                        data={getTableList(CurrentAssociationList, 'fragments')}
                        columns={columns}
                        options={options}
                    ></MUIDataTable>
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabWidth}>
                    <MUIDataTable
                        title=''
                        data={getTableList(CurrentAssociationList, 'templates')}
                        columns={columns}
                        options={options}
                    ></MUIDataTable>
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.tabWidth}>
                    <MUIDataTable
                        title=''
                        data={getTableList(CurrentAssociationList, 'questions')}
                        columns={columns}
                        options={options}
                    ></MUIDataTable>
                </TabPanel>
            </LoadingOverlay>
        </div>

    );
}

export default TitleCurrentAssociation;

