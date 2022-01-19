import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCustomerDetailsBySurveyId } from '../actions';
import { STATE_REDUCER_KEY, QUESTION_TYPES, BASE64_APPEND } from '../constants';
import utils from '../../../utils';
import { Components, makeStyles } from '../../../common/components';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { liteBoxShadow } from '../../../assets/css/bhoom';
const { Grid, Typography, Colors } = Components;
const { dateUtils: { convertToLocal } } = utils;
import QRCode from 'react-qr-code';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';
import _, { isArray } from 'lodash';

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
        textOverflow: 'wrap',
        overflow: 'hidden'
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

const ViewCustomerDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { customerDetails: { data = [], requestInProgress = false } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    useEffect(() => {
        dispatch(fetchCustomerDetailsBySurveyId(id));
    }, []);

    const renderAccordingToType = (dynamicDatas) => {
        let currentType = dynamicDatas.type;
        let answer;
        switch (currentType) {
            case QUESTION_TYPES.LOCATION: {
                answer = <iframe src={`https://maps.google.com/maps?q=${_.get(dynamicDatas.answer, 'latitude', 0)},${_.get(dynamicDatas.answer, 'longitude', 0)}&hl=es;z=14&output=embed`} />;
                break;
            }
            case QUESTION_TYPES.IMAGE: {
                answer = <img width="250" height="200" src={`${BASE64_APPEND}${dynamicDatas.answer || ''}`} />;
                break;
            }
            case QUESTION_TYPES.DATE_TIME: {
                answer = convertToLocal(dynamicDatas.answer);
                break;
            }
            case QUESTION_TYPES.DATE: {
                answer = convertToLocal(dynamicDatas.answer);
                break;
            }
            case QUESTION_TYPES.QR_CODE: {
                answer = <div>
                    <div style={{ textAlign: 'center' }}>
                        {dynamicDatas.answer}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        {dynamicDatas?.answer && <QRCode value={dynamicDatas.answer} />}
                    </div>
                </div>;
                break;
            }
            default: {
                answer = '';
                let type = typeof dynamicDatas?.answer;
                switch (type) {
                    case 'string':
                        answer = _.get(dynamicDatas, 'answer', '');
                        break;
                    case 'object':
                        if (isArray(dynamicDatas?.answer)) {
                            dynamicDatas?.answer.forEach(element => {
                                answer += element.name + ',';
                            });
                        } else {
                            answer = _.get(dynamicDatas, 'answer.name', '');
                        }
                        break;
                    default:
                        answer = '';
                        break;
                }
                break;
            }
        }
        return <Grid container direction='row' className={classes.questionAnswer} >
            <Grid item xs={8} className={classes.customerFlatQuestion}>
                <Typography className={classes.question}>{dynamicDatas.question}</Typography>
            </Grid>
            <Grid item xs={4} className={classes.customerFlatAnswer}>
                {answer}
            </Grid>
        </Grid>;

    };
    const getDynamicAnswers = (answers) => {
        let response = [];
        if (answers.length > 0) {
            response = _.get(answers[0], 'dynamicAnswers', []);
        }
        return response === null ? [] : response;
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
                            let formatedData = Object.entries(customer).map(item => {
                                return {
                                    question: item[0],
                                    answer: _.get(item, '1.name', item[1])
                                };
                            });
                            return <Grid key={key} className={classes.flatDetails} item xs={12}>

                                {
                                    formatedData.map((details, k) => {
                                        return <Grid key={k} item xs={12}>
                                            {renderAccordingToType(details)}
                                        </Grid>;
                                    })
                                }

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
                <Typography>{'Customer'}</Typography>
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

                        <Grid item xs={12} style={{ width: '100%' }} className='homeSurvey'>
                            {renderDynamicAnswers(getDynamicAnswers(data))}
                        </Grid>
                    </Grid>
                </Grid>
            </LoadingCustomOverlay>
        </Grid>
    );
};
export default ViewCustomerDetails;
