import React, { useEffect, useState, useRef } from 'react';
import getElements from '../utils/fragmentUtil';
import { Components, Icons, I18n } from '../../../common/components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core';

const { Button, Card, Colors: Color, AlertDialog, Typography } = Components;
const { KeyboardArrowRight, KeyboardArrowLeft, DoneAll } = Icons;

const styles = {
    templateWarp: {
        backgroundColor: 'white',
        padding: '2%'
    },
    templateHead: {
        fontWeight: 500,
        fontSize: '2rem',
        color: Color['color-success-900']
    },
    content: {
        paddingHorizontal: 13,
        paddingTop: 30
    },
    card: {
        alignSelf: 'stretch',
        marginBottom: 30,
        paddingBottom: 30
    },
    titleText: {
        color: Color['text-black-color'],
        marginBottom: 30
    },
    buttonView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 13,
        marginTop: 10
    },
    button: {
        width: 148,
        color: 'white'
    }
};

const CustomButton = withStyles({
    root: {
        color: 'white'
    },
    label: {
        '&:hover': {
            color: 'white'
        }
    }
})(Button);

const CommonView = (props) => {
    const { id: surveyId = null } = useParams();
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        previousButton,
        processConnectedQuestions,
        clearConnectedQuestionsToShow,
        saveSurveyImages,
        initializer,
        reducerKey
    } = props;
    const { surveyInprogressSync } = useSelector(state => state[reducerKey]);
    const [showNextButton, setShowNextButton] = useState(false);
    const [nextButtonLabel, setNextButtonLabel] = useState(I18n.t('next'));

    const {
        next,
        prev,
        scrollToTop,
        hasMultipleLinkToFragmentQuestions,
        optionsHavingConnectedQuestions,
        optionsHavingNoNextRoutes,
        questionsRequiringRefs,
        connectedQuestionsToShow,
        connectedQuestionsToRemove,
        previousAnswers,
        infoMessage,
        errorMessage,
        fragment: { label, titles = [] } = {}
    } = props.renderData;
    const buttonsViewRef = useRef();
    const autoFocusRefsMap = useRef({});
    const animatedViewRefsMap = useRef({});
    const contentRef = useRef();
    useEffect(() => {
        if (initializer?.templateTypeId) {
            props.startSurvey();
        }
    }, [initializer]);

    useEffect(() => {
        if (titles.length) {
            if (hasMultipleLinkToFragmentQuestions) {
                props.setInfoMessage('fragment_multiple_links');
            }
            if (!showNextButton) {
                setShowNextButton(true);
                // showButtonsView(buttonsViewRef);
            }
            if (next === 0) {
                setNextButtonLabel(I18n.t('finish'));
            } else if (optionsHavingNoNextRoutes) {
                Object.keys(optionsHavingNoNextRoutes).some(key => {
                    if (previousAnswers.hasOwnProperty(key) && optionsHavingNoNextRoutes[key].includes(previousAnswers[key])) {
                        setNextButtonLabel(I18n.t('finish'));
                        return true;
                    }
                });
            } else {
                setNextButtonLabel(I18n.t('next'));
            }
            // if (scrollToTop) {
            //     contentRef.current.scrollToPosition(0, 0);
            // }
        }
    }, [titles, scrollToTop]);

    // useEffect(() => {
    //     function handleBackButton() {
    //         if (prev) {
    //             previousButton();
    //             return true;
    //         }
    //         return false;
    //     }
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    //     return () => {
    //         backHandler.remove();
    //     }
    // }, [prev]);

    useEffect(() => {
        // const keyboardDidShowListener = Keyboard.addListener(
        //     'keyboardDidShow',
        //     () => {
        //         hideButtonsView(buttonsViewRef, setKeyboardVisible);
        //     }
        // );
        // const keyboardDidHideListener = Keyboard.addListener(
        //     'keyboardDidHide',
        //     () => {
        //         setKeyboardVisible(false);
        //         showButtonsView(buttonsViewRef);
        //     }
        // );
        return () => {
            // Anything in here is fired on component unmount.
            // keyboardDidHideListener.remove();
            // keyboardDidShowListener.remove();
            // props.resetRenderData();
            // props.resetSurveyData();
        };
    }, []);

    useEffect(() => {
        if (connectedQuestionsToRemove) {
            const promises = [];
            connectedQuestionsToRemove.forEach(connectedQuestion => {
                promises.push(connectedQuestion);
                // promises.push(animatedViewRefsMap.current[connectedQuestion].fadeOutLeft(500));

            });
            Promise.all(promises).then(() => {
                clearConnectedQuestionsToShow();
                // connectedQuestionsToRemove.forEach(connectedQuestion => {
                //     delete animatedViewRefsMap.current[connectedQuestion];
                // });
            });
        }
    }, [connectedQuestionsToRemove]);

    return (
        <>
            {/* <Header alignment='start' title={label} />
             */}
            <div align='center'>
                <Typography style={styles.templateHead} variant='h4'>{label}</Typography>
            </div>
            <div ref={contentRef} style={styles.content}>
                {
                    titles.map((title) => {
                        const { questions = [] } = title;
                        return <Card key={title.id} style={styles.card}
                        // animation='bounceInRight' shadow
                        >
                            {
                                title.showLabel &&
                                <Typography variant="h4" style={styles.titleText} >{title.title}</Typography>
                            }
                            {
                                questions.map((question, index) => (
                                    getElements({
                                        surveyId,
                                        question,
                                        index,
                                        connectedQuestionsToShow,
                                        connectedQuestionsToRemove,
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        setFieldValue,
                                        setFieldTouched,
                                        optionsHavingNoNextRoutes,
                                        optionsHavingConnectedQuestions,
                                        questionsRequiringRefs,
                                        processConnectedQuestions,
                                        setNextButtonLabel,
                                        saveSurveyImages,
                                        autoFocusRefsMap,
                                        animatedViewRefsMap
                                    })
                                ))
                            }
                        </Card>;
                    })
                }

                {
                    <AlertDialog
                        isOPen={infoMessage}
                        content={I18n.t(infoMessage)}
                        onOk={props.clearMessages}
                    />
                }
                {
                    <AlertDialog
                        isOPen={surveyInprogressSync}
                        content={I18n.t('survey_update_in_progress')}
                        icon={<CloudUploadIcon />}
                    />
                }
                {
                    <AlertDialog
                        isOPen={errorMessage}
                        content={I18n.t(errorMessage)}
                        onOk={() => {
                            props.clearMessages();
                            props.navigateBack();
                        }}
                        onCancel={props.clearMessages} />
                }
            </div>
            <div ref={buttonsViewRef} style={styles.buttonView}>
                {
                    prev ?
                        <CustomButton
                            style={styles.button}
                            variant="contained"
                            color="primary"
                            onClick={previousButton}
                            startIcon={<KeyboardArrowLeft />}
                        >
                            {I18n.t('previous')}
                        </CustomButton> :
                        <div style={styles.button} />
                }
                {
                    showNextButton &&
                    <CustomButton style={styles.button}
                        variant="contained"
                        onClick={handleSubmit}
                        endIcon={nextButtonLabel === I18n.t('finish') ? <DoneAll /> : <KeyboardArrowRight />}>
                        {nextButtonLabel}
                    </CustomButton>
                }
            </div>
        </ >
    );
};

export default CommonView;
