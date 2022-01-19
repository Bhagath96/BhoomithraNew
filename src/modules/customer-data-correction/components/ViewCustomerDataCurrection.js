/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constant';
import { customerViewDetailsWithEnrollmentId, customerViewDetailsWithConflictId } from '../actions';
import { parseDiff, Diff, Hunk } from 'react-diff-view';
import { diffLines, formatLines } from 'unidiff';
import tokenize from './tokenize';
import { Components, I18n } from '../../../common/components';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import 'react-diff-view/style/index.css';
import { withStyles } from '@material-ui/core/styles';
const { Typography, Colors, LoadingOverlay } = Components;
import { useParams } from 'react-router-dom';

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


const renderToken = (token, defaultRender, i) => {
    if (token.type === 'searchResult') {
        return (
            <span key={i} className="search-result">
                {token.children && token.children.map((tokens, index) => renderToken(tokens, defaultRender, index))}
            </span>
        );
    }

    return defaultRender(token, i);
};
const EMPTY_HUNKS = [];
function ViewCustomerDataCurrection() {
    const { customerEnrollmentId: urlEnrollmentId, customerConlictId: urlconflictId, customerTemplateTypeId: customerTempTypeId, conflictCustomerTemplateTypeId: conflictTempTypeId } = useParams();
    const { customerConflictDetails: { data: customerConflictDetailsData }, customerEnrollmentDetails: { data: customerEnrollmentDetailsData, noDifferenceMessage, requestInProgress = false } } = useSelector(state => state[STATE_REDUCER_KEY]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(customerViewDetailsWithEnrollmentId({ customerId: urlEnrollmentId, templateTypeId: customerTempTypeId }));
        dispatch(customerViewDetailsWithConflictId({ customerId: urlconflictId, templateTypeId: conflictTempTypeId }));
    }, []);

    let formattedcustomerConflictDetailsData = customerConflictDetailsData[1] || {};
    let formattedcustomerEnrollmentDetailsData = customerEnrollmentDetailsData[1] || {};
    const customerEnrollmentCorrection = JSON.stringify(formattedcustomerConflictDetailsData, null, 1)?.replace('{\n', '').replace('\n}', '').replace(',\n', '\n').replace(/\"/g, '');
    const customerConflictCorrection = JSON.stringify(formattedcustomerEnrollmentDetailsData, null, 1).replace('{\n', '')?.replace('\n}', '').replace(',\n', '\n').replace(/\"/g, '');
    const [{ type, hunks }, setDiff] = React.useState('');
    useEffect(() => {
        const diffText = formatLines(diffLines(customerEnrollmentCorrection, customerConflictCorrection), { context: 3 });
        const [diff] = parseDiff(diffText, { nearbySequences: 'zip' });
        setDiff(diff);
    }, [formattedcustomerConflictDetailsData, formattedcustomerEnrollmentDetailsData]);
    const tokens = useMemo(() => tokenize(hunks), [hunks]);
    return (
        <LoadingOverlay active={requestInProgress}>
            <div>
                <main>

                    {hunks && hunks.length > 0 ? (
                        <Accordion expanded={true} className='homeSurveyAccordion' container spacing={1} style={{ padding: '20px', width: '100%' }} direction='column'>
                            <AccordionSummary>
                                <Diff viewType="split" diffType={type} hunks={hunks || EMPTY_HUNKS} tokens={tokens}
                                    renderToken={renderToken}>
                                    {newHunks =>
                                        newHunks.map(hunk => (
                                            <Hunk key={hunk.content} hunk={hunk} />
                                        ))
                                    }
                                </Diff>
                            </AccordionSummary>
                        </Accordion>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <Accordion expanded={true} className='homeSurveyAccordion' container spacing={1} style={{ padding: '20px', width: '100%' }} direction='column'>
                                <AccordionSummary>
                                    <Typography ><h3 style={{ textAlign: 'center' }}>{noDifferenceMessage?.length > 0 && requestInProgress === true && I18n.t('nothing_to_compare_both_datas_are_similar')}
                                    </h3></Typography>
                                </AccordionSummary>

                            </Accordion>
                        </div>
                    )
                    }
                    <div>

                    </div>
                </main>

            </div>
        </LoadingOverlay>
    );
}

export default ViewCustomerDataCurrection;
