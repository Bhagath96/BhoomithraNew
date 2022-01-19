import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchServiceHistoryDetailsById } from '../actions';
import { STATE_REDUCER_KEY, EMPTY_VALUE, DROPDOWN_TYPES, QUESTION_TYPES, IMAGE_TYPES } from '../constant';
import utils from '../../../utils';
import { Components, makeStyles, I18n } from '../../../common/components';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { liteBoxShadow } from '../../../assets/css/bhoom';
const { Grid, Typography, Colors } = Components;
const { lodashUtils: _, dateUtils: { convertToLocal } } = utils;
import QRCode from 'react-qr-code';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';

const returnEmptyIfNull = (value) => value === null ? EMPTY_VALUE : value;
const useStyles = makeStyles(() => ({
    questionAnswer: {
        marginBottom: '12px',
        backgroundColor: Colors['color-primary-100'],
        padding: '5px',
        borderRadius: '10px'
    },
    customerFlatQuestion: {
    },
    question: {
        fontWeight: '600'
    },
    customerFlatAnswer: {
        // paddingLeft: '25px',
    },
    flatDetails: {
        marginTop: '8px',
        padding: '10px',
        borderRadius: '10px',
        ...liteBoxShadow
    }

}));
const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: 'auto'
        }
    },
    expanded: {}
})(MuiAccordion);
const AccordionSummary = withStyles({
    root: {
        backgroundColor: Colors['color-primary-100'],
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0'
        }
    },
    expanded: {}
})(MuiAccordionSummary);


const getTableList = (data) => {
    let table = [];
    _.forEach(data, item => {
        _.forEach(item.answers, answer => {
            table.push(answer);
        });
    });
    return table;
};

const ServiceHistory = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { surveyIds, templateTypeId } = useParams();
    const { listServiceHistoryById: { data = [], requestInProgress = false } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    useEffect(() => {
        dispatch(fetchServiceHistoryDetailsById({ surveyIds, templateTypeId }));
    }, []);
    const renderAccordingToType = (dynamicDatas) => {
        if (!('type' in dynamicDatas)) {
            return Object.entries(dynamicDatas).map(dynamicData => {
                let type = typeof dynamicData[1];
                switch (type) {
                    case 'string':
                        return <Grid container direction='row' className={classes.questionAnswer} >
                            <Grid item xs={8} className={classes.customerFlatQuestion}>
                                <Typography className={classes.question}>{dynamicData[0]}</Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.customerFlatAnswer}>
                                <Typography>{dynamicData[1]}</Typography>
                            </Grid>
                        </Grid>;
                    case 'object':
                        return <>
                            <Grid container direction='row' className={classes.questionAnswer} >
                                <Grid item xs={8} className={classes.customerFlatQuestion}>
                                    <Typography className={classes.question}>{dynamicData[0]}</Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.customerFlatAnswer}>
                                    <Typography>{dynamicData[1].name}</Typography>
                                </Grid>
                            </Grid>
                            {/* <Grid container spacing={1} justify='space-between' direction='column'>
                            {Object.entries(dynamicData[1]).map((derivedData, index) => <Typography key={index}>{`${derivedData[1]}`}</Typography>)}}
                </Grid> */}
                        </>;
                    default:
                        return <div></div>;
                }
            });
        } else {
            let currentType = dynamicDatas.type;
            let answer;
            if (DROPDOWN_TYPES.includes(currentType)) {
                answer = returnEmptyIfNull(_.get(dynamicDatas.answer, 'name', null));
            } else if (currentType === QUESTION_TYPES.LOCATION) {
                answer = <iframe src={`https://maps.google.com/maps?q=${_.get(dynamicDatas.answer, 'latitude', 0)},${_.get(dynamicDatas.answer, 'longitude', 0)}&hl=es;z=14&output=embed`} />;
            } else if (IMAGE_TYPES.includes(currentType)) {
                answer = <img width="250" height="200" src={`data:image/png;base64,${dynamicDatas.answer || ''}`} />;
            } else if (currentType === QUESTION_TYPES.DATE_TIME) {
                answer = convertToLocal(dynamicDatas.answer);
            } else if (currentType === QUESTION_TYPES.QR_CODE) {
                answer = <div>
                    <div style={{ textAlign: 'center' }}>
                        {dynamicDatas.answer}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        {dynamicDatas?.answer && <QRCode value={dynamicDatas.answer} />}
                    </div>
                </div>;
            } else {
                answer = dynamicDatas.answer || '';
            }
            return <Grid container direction='row' className={classes.questionAnswer} >
                <Grid item xs={8} className={classes.customerFlatQuestion}>
                    <Typography className={classes.question}>{dynamicDatas.question}</Typography>
                </Grid>
                <Grid item xs={4} className={classes.customerFlatAnswer}>
                    <Typography>{answer}</Typography>
                </Grid>
            </Grid>;
        }
    };

    const renderDynamicAnswers = (dynamicDataa = []) => {

        return dynamicDataa.map((dynamicAnswer, index) => {
            let Data = dynamicAnswer.data;
            return <Accordion expanded={true} className='homeSurveyAccordion' key={index} container spacing={1} style={{ padding: '20px', width: '100%' }} direction='column'>
                <AccordionSummary>
                    <Typography>{dynamicAnswer.label}</Typography>
                </AccordionSummary>
                <Grid container wrap spacing={1} justify='space-between'>
                    {
                        Data.map((customer, key) => {
                            return <Grid key={key} item xs={12}>
                                <Grid className={classes.flatDetails} item xs={12}>
                                    {renderAccordingToType(customer)}
                                </Grid>
                            </Grid>;
                        })
                    }
                </Grid>
            </Accordion>;
        });
    };
    const renderAnswers = (answers = []) => {
        return <Accordion expanded={true} className='homeSurveyAccordion' container spacing={1} style={{ padding: '20px', width: '100%' }} direction='column'>
            <AccordionSummary>
                <Typography>{[I18n.t('service_history')]}</Typography>
            </AccordionSummary>
            <Grid container wrap spacing={1} justify='space-between' className={classes.flatDetails}>
                {
                    answers.map((answer, index) => {
                        return <Grid key={index} container direction='row' >
                            <Grid item xs={12}>
                                {renderAccordingToType(answer)}
                            </Grid>
                        </Grid>;
                    })
                }
            </Grid>
        </Accordion>;
    };
    return (
        <Grid container spacing={1}>
            <LoadingCustomOverlay active={requestInProgress}>
                <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '50px', padding: '20px !important', width: '100%' }}>
                    <Grid container spacing={2} alignContent='center' justify='center' >
                        <Grid item xs={12} style={{ width: '100%' }}>
                            {renderAnswers(getTableList(data))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '50px', padding: '20px !important', width: '100%' }}>
                    <Grid container spacing={2} alignContent='center' justify='center'>

                        {_.get(data, '0.dynamicAnswers', false) && <Grid item xs={12} style={{ width: '100%' }} className='homeSurvey'>
                            {renderDynamicAnswers(_.get(data, '0.dynamicAnswers', []))}
                        </Grid>}
                    </Grid>
                </Grid>
            </LoadingCustomOverlay>
        </Grid>
    );

};

export default ServiceHistory;
