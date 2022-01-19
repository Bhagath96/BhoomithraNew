import React, { useEffect } from 'react';
import _ from 'lodash';
import { Components, I18n } from '../../../common/components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import DataAccessPermissionLevelSelector from './DataAccessPermissionLevelSelector';

const { Button, LoadingOverlay, Grid, Colors } = Components;

function DataAccessPermission(props) {
    const { data = [], requestInProgress = false, onRemove, onAdd, onCancel, onSubmit } = props;
    const [isOpenDialog, setIsOpenDialog] = React.useState(null);
    const [selectedComponentDetails, setSelectedComponentDetails] = React.useState({});

    const generateTable = ({ itemId, component }) => {
        let { id: componentId, name,
            multiData = false,
            noOfData = 1, data: { data: componentData = [] } = {} } = component;
        let showAddButton = componentData.length < noOfData || (multiData && noOfData === 0);
        return <Grid item xs={6}>
            <Grid container >
                <Grid item xs={10} style={{ textAlign: 'center' }}>
                    {name || '----'}
                </Grid>
                {showAddButton && <Grid item xs={2} style={{ textAlign: 'center' }}>
                    <IconButton aria-label="add" onClick={() => {
                        setSelectedComponentDetails({ accordionId: itemId, componentId, name, multiData, noOfData, componentData });
                        setIsOpenDialog(true);
                    }}>
                        <AddIcon />
                    </IconButton>
                </Grid>}
            </Grid>
            <TableContainer component={Paper}>
                <Table sx aria-label={name || 'table'} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{I18n.t('name')}</TableCell>
                            <TableCell align="center">...</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            componentData.length > 0 && componentData.map(item => <TableRow
                                key={1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{item.name || '- - -'}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete" onClick={() => onRemove({ id: itemId, componentId, itemId: item.id })}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>)
                        }
                        {
                            componentData.length === 0 && <TableRow
                                key={1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    {/* {I18n.t('no_records')} */}
                                </Grid>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>;
    };

    const generateDetails = ({ id, details = [] }) => {
        let response = [];
        _.forEach(details, (item) => {
            response.push(generateTable({ itemId: id, component: item }));
        });
        return <Grid container spacing={1}>
            {response}
        </Grid>;
    };

    const submit = (values) => {
        onAdd(values);
    };

    const onCancelClick = () => {
        onCancel(true);
    };
    useEffect(() => {
    }, [selectedComponentDetails]);
    return (
        <>
            <LoadingOverlay active={requestInProgress}>
                {_.map(data, item => {
                    return <>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${item.details.id}-content`}
                                id={`${item.details.id}-header`}
                                style={{ backgroundColor: Colors['color-primary-200'] }}
                            >
                                <Typography>{item.details.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ backgroundColor: Colors['color-primary-100'] }}>
                                {
                                    generateDetails({ id: item.details.id, details: item.componentDetails })
                                }
                            </AccordionDetails>
                        </Accordion>
                    </>;
                }
                )}
                <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1} >
                    <Button style={{ textAlign: 'center' }} onClick={onSubmit}>{I18n.t('submit')}</Button>
                    <Button style={{ textAlign: 'center' }} onClick={onCancelClick}>{I18n.t('cancel')}</Button>
                </Stack>
            </LoadingOverlay>

            <DataAccessPermissionLevelSelector isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} dialogSubmit={submit} componentDetails={selectedComponentDetails} />
        </>
    );
}

export default DataAccessPermission;
