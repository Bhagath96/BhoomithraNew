import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';

import { locks } from '../../../common';
import getElements from '../utils/fragmentUtil';
const { dfgLock } = locks;
import { Components, Icons, I18n } from '../../../common/components';

// import { useHistory } from 'react-router-dom';
import { STATE_REDUCER_KEY } from '../constants';
import { useSelector } from 'react-redux';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core';
// const history = useHistory();

const { Grid, Button, Card, Colors: Color, Typography, Dialog } = Components;
const { KeyboardArrowRight, KeyboardArrowLeft, DoneAll, CloudUpload } = Icons;


// import { StyleSheet, View, Keyboard, BackHandler } from 'react-native';
// import { createAnimatableComponent, View as AnimatedView } from 'react-native-animatable';
// import { dimensionUtils, asyncutils, toastUtils } from "../../../common/utils";
// import { useTheme } from '@ui-kitten/components';

// const { waitUntil } = asyncutils;
// const { hideToast } = toastUtils;

// const { SafeAreaView, Header, Content, Text, Modal, Card, Button, Icon } = Components;
// const { convertHeight, convertWidth } = dimensionUtils;

// const AnimatedCard = createAnimatableComponent(Card);

// const hideButtonsView = (ref, setKeyboardVisible) => {
//     setTimeout(() => { setKeyboardVisible(true); }, 200);
//     ref.current.fadeOutDown();
// }

// const showButtonsView = (ref) => {
//     ref.current.fadeInUp();
// }


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
        // height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 13,
        marginTop: 10
    },
    button: {
        width: 148,
        // backgroundColor: Color['color-success-300'],
        color: 'white'
        // height: 38
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

const generateDialogBody = (message) => <Grid container direction="row"
    justify="center"
    alignItems="center" spacing={2}>
    <div>
        {message}
    </div>
</Grid>


const DynamicFormView = (props) => {
    const [showNextButton, setShowNextButton] = useState(false);
    // const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [nextButtonLabel, setNextButtonLabel] = useState('next');
    const { showResumeModal } = useSelector(state => state[STATE_REDUCER_KEY]);

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
        setDataSource
    } = props;

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
        readOnly,
        fragment: { label, titles = [] } = {}
    } = props.renderData;
    const buttonsViewRef = useRef();
    const autoFocusRefsMap = useRef({});
    const animatedViewRefsMap = useRef({});
    const contentRef = useRef();
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
                setNextButtonLabel('finish');
            } else if (optionsHavingNoNextRoutes) {
                const result = Object.keys(optionsHavingNoNextRoutes).some(key => {
                    if (previousAnswers.hasOwnProperty(key) && optionsHavingNoNextRoutes[key].includes(previousAnswers[key])) {
                        setNextButtonLabel('finish');
                        return true;
                    }
                    return false;
                });
                if (!result) {
                    setNextButtonLabel('next');
                }
            } else {
                setNextButtonLabel('next');
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
            // props.resetSurvey();
        }
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

    const theme = {};

    // const styles = StyleSheet.create({
    //     content: {
    //         paddingHorizontal: convertWidth(13),
    //         paddingTop: convertHeight(30)
    //     },
    //     card: {
    //         alignSelf: 'stretch',
    //         marginBottom: convertHeight(30),
    //         paddingTop: convertHeight(30),
    //         paddingBottom: convertHeight(30)
    //     },
    //     titleText: {
    //         color: theme['text-black-color'],
    //         marginBottom: convertHeight(30)
    //     },
    //     buttonView: {
    //         height: convertHeight(60),
    //         flexDirection: 'row',
    //         justifyContent: 'space-between',
    //         alignItems: 'flex-start',
    //         paddingHorizontal: convertWidth(13),
    //         marginTop: convertHeight(10)
    //     },
    //     button: {
    //         width: convertWidth(148),
    //         height: convertHeight(38)
    //     }
    // });
    return (
        <Grid style={styles.templateWarp}>
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
                                        autoFocusRefsMap,
                                        animatedViewRefsMap,
                                        setDataSource,
                                        readOnly,
                                        theme
                                    })
                                ))
                            }
                        </Card>;
                    })
                }
                {
                    <Dialog
                        isOPen={infoMessage}
                        title=''
                        body={generateDialogBody(I18n.t(infoMessage))}
                        onOk={props.clearMessages}
                    />
                }
                {
                    <Dialog isOpen={errorMessage}
                        body={generateDialogBody(I18n.t(errorMessage))}
                        onOk={() => {
                            props.clearMessages();
                            // props.navigateBack();
                        }}
                        okText={I18n.t('finish')}
                    />
                }
                {
                    <Dialog
                        title={I18n.t('continue')}
                        isOPen={showResumeModal}
                        body={generateDialogBody(I18n.t('resume_or_not'))}
                        onOk={() => {
                            props.doResume();
                        }}
                        okText={I18n.t('yes')}
                        onCancel={() => {
                            props.dontResume();
                        }}
                        cancelText={I18n.t('no')} />
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
                        color="primary"
                        onClick={handleSubmit}

                        // onClick={() => {
                        //     if (dfgLock.acquired) {
                        //         infoToast(I18n.t('please_wait'), 0);
                        //         waitUntil(() => dfgLock.acquired).then(() => {
                        //             handleSubmit();
                        //             hideToast();
                        //         });
                        //     } else {
                        //         handleSubmit();
                        //     }
                        // }}
                        endIcon={nextButtonLabel === 'finish' ? <DoneAll /> : <KeyboardArrowRight />}>
                        {I18n.t(nextButtonLabel)}
                    </CustomButton>
                }
            </div>
        </Grid >
    );
};

export default DynamicFormView;
