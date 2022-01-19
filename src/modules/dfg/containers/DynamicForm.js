import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withFormik } from 'formik';
import * as yup from 'yup';
import DynamicFormView from '../components/DynamicFormView';
import * as Actions from '../actions';
import { getRender, getInitializer, getResumeModal } from '../selectors';
import { VALIDATION_TYPES } from '../constants';
// import { useHistory } from 'react-router-dom';

// const history = useHistory();
// const navigateBack = () => history.goBack();

class DynamicForm extends Component {

    componentDidMount() {
        this.props.startSurvey();
    }

    render() {
        return (
            <DynamicFormView {...this.props} />
        );
    }

}

const mapStateToProps = createStructuredSelector({
    renderData: getRender,
    showResumeModal: getResumeModal
});

const mapDispatchToProps = dispatch => ({
    navigateBack: () => { },
    startSurvey: () => dispatch(Actions.startSurvey()),
    resetSurvey: () => dispatch(Actions.resetSurvey()),
    doResume: () => dispatch(Actions.doResume()),
    dontResume: () => dispatch(Actions.dontResume()),
    clearMessages: () => dispatch(Actions.clearMessages()),
    processConnectedQuestions: (data) => dispatch(Actions.processConnectedQuestions(data)),
    clearConnectedQuestionsToShow: () => dispatch(Actions.clearConnectedQuestionsToShow()),
    setInfoMessage: (data) => dispatch(Actions.setInfoMessage(data)),
    setErrorMessage: (data) => dispatch(Actions.setErrorMessage(data)),
    nextButton: (values) => dispatch(Actions.nextButton(values)),
    previousButton: () => dispatch(Actions.previousButton()),
    setDataSource: (data) => dispatch(Actions.setDataSource(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => props.renderData.previousAnswers,
    validationSchema: (props) => {
        const { validationSchema: { defaultQuestions, connectedQuestions }, connectedQuestionsToShow = [] } = props.renderData;
        const validationSchema = { ...defaultQuestions };
        Object.keys(connectedQuestions).forEach(connectedQuestion => {
            if (connectedQuestionsToShow.includes(connectedQuestion)) {
                validationSchema[connectedQuestion] = connectedQuestions[connectedQuestion];
            }
        });
        return yup.object().shape(validationSchema);
    },
    handleSubmit: (values, { props, setFieldError }) => {
        // Handle validations for Yup excluded question here
        let hasAdditionalErrors = false;
        const { renderData: { yupExcludedQuestions, questionsWithFilterCriteria } } = props;
        if (yupExcludedQuestions) {
            Object.keys(yupExcludedQuestions).forEach(questionId => {
                const item = yupExcludedQuestions[questionId];
                const { validations = [] } = item;
                validations.forEach(validation => {
                    switch (validation.type) {
                        case VALIDATION_TYPES.IS_MANDATORY:
                            if (values[questionId] === undefined) {
                                setFieldError(questionId, validation.errorMsg);
                                hasAdditionalErrors = true;
                                break;
                            }
                            // Question which can take multiple values as answer (eg. checkbox)
                            // needs more checking
                            if (Array.isArray(values[questionId])) {
                                const result = _.intersectionWith(questionsWithFilterCriteria?.[questionId]?.options, values[questionId], (o, id) => o.id === id);
                                const compactedValues = _.compact(values[questionId]);
                                if (compactedValues.length === 0 || result == 0) {
                                    setFieldError(questionId, validation.errorMsg);
                                    hasAdditionalErrors = true;
                                }
                            }
                            break;
                    }
                });
            });
        }
        !hasAdditionalErrors && props.nextButton(values);
    },
    displayName: 'DynamicForm'
})(DynamicForm));