import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { Components, makeStyles } from '../../../common/components';
import { renderSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getTitleBasedOnFragment, getQuestionsBasedOnTitleId, getAllFragments, getFragmentQuestionLoopById, sentFragmentTitleQuestionLoop } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import { useParams } from 'react-router-dom';
import { liteBoxShadow } from '../../../assets/css/bhoom';
import * as Action from '../../common/actions';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';
import i18n from '../../../i18n';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const { Grid, Button, CardComponent } = Components;
const validate = (values) => {
    const errors = {};
    if (!values.questionId) {
        errors.questionId = 'Question is Required';
    }
    if (!values.fragmentId) {
        errors.fragmentId = 'Fragment is Required';
    }
    if (!values.titleId) {
        errors.titleId = 'Title is Required';
    }
    return errors;
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    }
}));


function FragmentQsLoop(props) {
    const classes = useStyles();

    const { id } = useParams();
    const dispatch = useDispatch();
    const { handleSubmit, submitting } = props;
    const fragmentDetails = useSelector(state => state[STATE_REDUCER_KEY]);
    const { titleBasedOnFragmentId, questionsBasedOnTitleId, getAllFragmentsForDropDown, getFragmentQuestionLoop } = fragmentDetails;

    const { data: { title } = {}, requestInProgress = false } = getFragmentQuestionLoop;

    useEffect(() => {

        dispatch(getTitleBasedOnFragment(id));

        if (id) {
            dispatch(getFragmentQuestionLoopById(id));
        }
        if (title?.id) {
            dispatch(getQuestionsBasedOnTitleId(title?.id));
        }
        dispatch(getAllFragments());

    }, []);
    const submit = (values) => {
        let obj = {
            questionId: values.question?.id,
            titleId: values.title?.id,
            fragmentId: values.fragment?.id
        };
        dispatch(sentFragmentTitleQuestionLoop(id, obj));
        dispatch(Action.resetFormChange());
    };
    const readOnly = hasAccessPermission(RESOURCE_MAPPING.FRAGMENT_QUESTION_FRAGMENT_LOOP, ACTION_MAPPING.FRAGMENT_QUESTION_FRAGMENT_LOOP.READ_ONLY);

    return (
        <CardComponent>
            <LoadingCustomOverlay active={requestInProgress}>
                <Form onSubmit={handleSubmit(submit)}>
                    <Grid style={liteBoxShadow} container spacing={2} padding={3} direction='column' justify='space-between'>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="title" label={i18n.t('title')} disabled={readOnly} component={renderSelect} onChange={(value) => {
                                dispatch(getQuestionsBasedOnTitleId(value.id));
                            }
                            }>
                                {
                                    _.get(titleBasedOnFragmentId, 'data', [])
                                }
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="question" label={i18n.t('questions')} disabled={readOnly} component={renderSelect} onChange={() => {
                            }
                            }>
                                {
                                    _.get(questionsBasedOnTitleId, 'data', [])
                                }
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="fragment" label={i18n.t('fragment')} disabled={readOnly} component={renderSelect} onChange={() => {
                            }
                            }>
                                {
                                    _.get(getAllFragmentsForDropDown, 'data', [])
                                }
                            </Field>
                        </Grid>
                        {!readOnly &&
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button type="submit" disabled={submitting} >{i18n.t('submit')}</Button>
                            </Grid>
                        }
                    </Grid>
                </Form>
            </LoadingCustomOverlay>
        </CardComponent>
    );
}
export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].getFragmentQuestionLoop.data
    }))(reduxForm({
        form: 'FragmentQsLoop',
        enableReinitialize: true,
        validate
    })(FragmentQsLoop));

