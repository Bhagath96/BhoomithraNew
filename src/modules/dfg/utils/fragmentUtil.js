/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-key */
import React from 'react';
import _ from 'lodash';
// import { Button, Text, Input, Icon, Radio, Picker, Textarea, CheckBox, Camera, QRCodeScanner, Location, Dropdown } from '../../../common/components';
import { FILETYPES, IMAGE_PLACEHOLDER, QUESTION_TYPES } from '../../dfg/constants';
// import { I18n } from '../../../common';
// import Color from '../light.json';
// import { convertHeight, convertWidth } from '../../../common/utils/dimensionUtil';
import AndroidIcon from '@material-ui/icons/Android';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Components, I18n } from '../../../common/components';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import LocationMapping from '../CustomComponents/LocationMapping';
import { setFormChange } from '../../common/actions';
import { store } from '../common/store';
import { Icon } from '@material-ui/core';
import Colors from '../../../common/components/custom/Colors';
import QRCode from '../CustomComponents/QRCode';
import { convertToLocal } from '../../../utils/DateUtils';

const { Grid, Colors: Color, Select, FormControl, MenuItem, TextField, Typography, Checkbox, CustomRadio, ImageUpload } = Components;

const CustomButton = withStyles({
    label: {
        color: 'black !important',
        '&:hover': {
            color: 'black !important'
        }
    },
    root: {
        padding: '24px',
        '&:hover': {
            backgroundColor: Color['color-basic-100']
        }
    }

})(Button);


const styles = {
    questionGrid: {
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '20px',
        backgroundColor: Color['color-basic-transparent-100']
    },
    formControl: {
        marginBottom: '15px'
    },
    questionTitle: {
        marginBottom: '15px',
        fontSize: '1.2rem'
    },
    optionWithIconView: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    optionWithIcon: {
        flexGrow: 1,
        minWidth: 192,
        height: 38,
        marginRight: 15,
        marginBottom: 15,
        justifyContent: 'flex-start'
    },
    optionWithIconImage: {
        width: 28,
        height: 28
    },
    optionView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        flexShrink: 1,
        marginLeft: 5
    },
    select: {
        minWidth: '200px',
        color: Color['text-black-color']
    },
    option: {
        padding: '1em',
        cursor: 'pointer'
    },
    textareaContainer: {
        height: 180,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Color['color-basic-200'],
        borderColor: Color['color-basic-400']
    },
    textarea: {
        textAlignVertical: 'top',
        height: 170,
        fontSize: '1.1rem',
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        color: Color['text-basic-color'],
        borderRadius: '10px'
    },
    checkboxView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkboxText: {
        flexShrink: 1,
        marginLeft: 5
    },
    questionView: {
        marginTop: 15
    },
    questionText: {
        color: Color['text-black-color'],
        marginBottom: 10
    },
    alertIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
        marginTop: 8
    },
    errorText: {
        marginTop: 4
    }
};

const Validate = ({ errors, rest, question }) => <div style={{ flexDirection: 'row', display: 'flex' }}>
    {
        (errors[question.id] && rest.touched[question.id]) ?
            <>
                <ErrorOutline style={{ ...styles.alertIcon, color: Color['color-danger-500'] }} />
                <Typography style={{ ...styles.errorText, color: Color['color-danger-500'] }} >{errors[question.id]}</Typography>
            </> :
            null
    }
</div>;

const updateFormData = ({ field, value, values, setFieldValue, setDataSource, setFieldTouched, dataSource, ...rest }) => {

    if (rest.optionsHavingNoNextRoutes) {
        if (rest.optionsHavingNoNextRoutes.hasOwnProperty(field) && rest.optionsHavingNoNextRoutes[field].includes(value)) {
            rest.setNextButtonLabel(I18n.t('finish'));
        } else {
            rest.setNextButtonLabel(I18n.t('next'));
        }
    }
    if (rest.optionsHavingConnectedQuestions && rest.optionsHavingConnectedQuestions.hasOwnProperty(field) && values[field] !== value) {
        rest.processConnectedQuestions({ question: field, value, values, setFieldValue, setFieldTouched });
    } else {
        setFieldValue(field, value);
    }
    if (!_.isEmpty(dataSource)) {
        setDataSource(dataSource);
    }
};
const getImageSource = ({ base64 }) => {

    if (base64) {
        return `data:image/png;base64,${base64}`;
    } else {
        return 'data:image/png;base64,';
    }
};

const getOptionIcon = (icon1, isActive) => {
    return icon1 ?
        <i className={`icon-${icon1}`} style={{ backgroundColor: Colors[''], color: isActive ? Colors['color-basic-100'] : Colors['color-basic-900'] }} />
        :
        <Icon className='mdi mdi-image-off' style={[styles.optionWithIconImage, { color: isActive ? Colors['color-basic-100'] : Colors['color-basic-600'] }]} />;
};

const optionWithIcon = ({ question, values = {}, errors = {}, setFieldValue, ...rest }) => {
    const { options = [] } = question;
    return (< >
        <Grid item xs={12} style={styles.optionWithIconView}>
            {
                options?.map(option => {
                    const isActive = values[question.id] === option.id;
                    const dataSource = {};
                    if (option.dataSourceName) {
                        dataSource[option.dataSourceName] = option.dataSourceId;
                    }
                    return <Grid item xs={12} sm={4} lg={3} >
                        <CustomButton
                            key={option.id}
                            variant={isActive ? 'contained' : 'outlined'}
                            color={Colors['color-basic-100']}
                            startIcon={getOptionIcon(option.icon1, isActive)}
                            onClick={() => {
                                // makeDirty();
                                updateFormData({ field: question.id, value: option.id, values, setFieldValue, dataSource, ...rest });
                            }}
                            style={isActive ? { ...styles.optionWithIcon, backgroundColor: Color['color-basic-600'], color: 'white' } : { ...styles.optionWithIcon }}
                        >
                            {option.name}
                        </CustomButton>
                    </Grid>;
                })
            }
        </Grid>
        <Validate errors={errors} rest={rest} question={question} />
    </>);
};

const option = ({ question, values, errors, setFieldValue, ...rest }) => {
    const { options = [] } = question;
    return (
        <>
            <div>
                {
                    options.map((currentOption) => {
                        const isActive = values[question.id] === currentOption.id;
                        return <div key={currentOption.id} style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <CustomRadio
                                checked={isActive}
                                onChange={() => {
                                    // makeDirty();
                                    updateFormData({ field: question.id, value: currentOption.id, values, setFieldValue, ...rest });
                                }}
                            />
                            <Typography style={{ cursor: 'pointer' }} onClick={() => {
                                updateFormData({ field: question.id, value: currentOption.id, values, setFieldValue, ...rest });
                            }}>
                                {currentOption.name}
                            </Typography>
                        </div>;
                    })
                }
            </div>
            <Validate errors={errors} rest={rest} question={question} />
        </>);
};

const text = ({ question, values, errors, ...rest }) => {
    // let nextElementRef = undefined;
    let currentElementIndex = rest.questionsRequiringRefs.indexOf(question.id);
    if (currentElementIndex >= 0 && currentElementIndex < rest.questionsRequiringRefs.length - 1) {
        // nextElementRef = rest.autoFocusRefsMap.current[rest.questionsRequiringRefs[currentElementIndex + 1]];
    }
    // const { validations = [] } = question;
    return (
        <>
            <TextField
                value={values[question.id]}
                placeholder={question.placeholder}
                onChange={rest.handleChange(question.id.toString())}
                onBlur={rest.handleBlur(question.id.toString())}
            />
            <Validate errors={errors} rest={rest} question={question} />
        </>
    );
};

const textarea = ({ question, values, errors, ...rest }) => {
    return (
        <>
            <TextareaAutosize
                // containerStyle={styles.textareaContainer}
                // style={styles.textarea}
                value={values[question.id]}
                onChange={rest.handleChange(question.id.toString())}
                onBlur={rest.handleBlur(question.id.toString())}
                status={(errors[question.id] && rest.touched[question.id]) ? 'danger' : 'basic'}
                caption={(errors[question.id] && rest.touched[question.id]) ? <Typography category='c1' status='danger'>{errors[question.id]}</Typography> : null}
                captionIcon={(errors[question.id] && rest.touched[question.id]) ? <AndroidIcon name='alert-circle-outline' /> : null}
                maxLength={500}
                placeholder={question.placeholder}
                rowsMin={3}

            />
            <Validate errors={errors} rest={rest} question={question} />
        </>);
};

const dropdown = ({ question, values, errors, setFieldValue, ...rest }) => {

    const { options = [] } = question;
    let selected = null;
    if (values[question.id] !== undefined) {
        if (typeof values[question.id] === 'number') {
            selected = Number(values[question.id]);
        } else {
            selected = values[question.id];

        }

    }

    return (
        <FormControl style={styles.formControl}>
            <Select
                value={selected}
                onChange={(value) => {
                    // makeDirty();
                    rest.handleChange(value);
                    updateFormData({ field: question.id, value: value.target.value, values, setFieldValue, ...rest });
                }}
                style={styles.select}
            >
                {/* <option aria-label="None" value="" /> */}
                {options?.map((item) => {
                    return <MenuItem style={styles.option} key={item.id} value={item.id}>{item.name}</MenuItem>;
                })}
            </Select>
            <Validate errors={errors} rest={rest} question={question} />
        </FormControl>
        // <FormControl>
        //     {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        //     <Select
        //         labelId="demo-simple-select-label"
        //         id="demo-simple-select"
        //         value={values[question.id]}
        //         onChange={(value) => {
        //             updateFormData({ field: question.id, value, values, setFieldValue, ...rest });
        //         }}
        //     >

        //         {

        //             options?.map((optionItems) => {

        //                 <MenuItem key={optionItems.id} value={optionItems.id} >{optionItems.name}</MenuItem>
        //             })
        //         }
        //     </Select>
        // </FormControl>
        // <Dropdown
        //     picker={
        //         <Picker
        //             selectedValue={values[question.id]}
        //             onValueChange={(value) => {
        //                 updateFormData({ field: question.id, value, values, setFieldValue, ...rest });
        //             }}
        //             mode="dropdown"
        //         >
        //             {
        //                 [
        //                     <Item key={-1} label={I18n.t('select')} value={undefined} />,
        //                     ...options.map(option => <Item key={option.id} label={option.name} value={option.id} />)
        //                 ]
        //             }
        //         </Picker>
        //     }
        //     status={(errors[question.id] && rest.touched[question.id]) ? 'danger' : 'basic'}
        //     caption={(errors[question.id] && rest.touched[question.id]) ? <Text style={styles.errorText} category='c1' status='danger'>{errors[question.id]}</Text> : null}
        //     captionIcon={(errors[question.id] && rest.touched[question.id]) ? <Icon fill={Color['color-danger-500']} style={styles.alertIcon} name='alert-circle-outline' /> : null}
        // />

    );
};

const checkbox = (
    { question, values, errors, setFieldValue, ...rest }
) => {
    const { options = [] } = question;
    const selectedOptions = values[question.id] || [];
    return (
        <FormControl style={styles.formControl}>
            <div>
                {
                    options.map((option, index) => {
                        const isActive = selectedOptions?.includes(option.id);
                        return <div key={option.id}
                            style={styles.checkboxView} >
                            <Checkbox
                                checked={isActive}
                                status={'success'}
                                onChange={() => {
                                    // makeDirty();
                                    const selectedItemIndex = selectedOptions?.indexOf(option.id);
                                    if (selectedItemIndex > -1) {
                                        setFieldValue(`${question.id}[${selectedItemIndex}]`, undefined);
                                    } else {
                                        setFieldValue(`${question.id}[${selectedOptions.length}]`, option.id);
                                    }
                                }}
                            />
                            <Typography onClick={() => {
                                if (isActive) {
                                    setFieldValue(`${question.id}[${index}]`, undefined);
                                } else {
                                    setFieldValue(`${question.id}[${index}]`, option.id);
                                }
                            }}>
                                {option.name}
                            </Typography>
                        </div>;
                    })
                }
            </div>
            <div style={{ flexDirection: 'row' }}>
                {
                    (errors[question.id]) ?
                        <Icon name='alert-circle-outline' /> :
                        null
                }
                {
                    (errors[question.id]) ?
                        <Typography>{errors[question.id]}</Typography> :
                        null
                }
            </div>
        </FormControl>
    );
};

const image = ({
    question,
    values,
    errors, setFieldValue, ...rest }) => {
    return <>
        <ImageUpload onImageUpload={(base64) => {
            // makeDirty();
            let formattedBase64 = _.replace(base64, `data:${FILETYPES};base64,`, '');
            setFieldValue(question.id, formattedBase64);
        }} initialValues={{ initialBase64: values[question.id] }} />
        <Validate errors={errors} rest={rest} question={question} accept={FILETYPES} />
    </>;
};

const qrcode = ({ question, values, errors, setFieldValue, theme, ...rest }) => (
    <>
        <QRCode initialValues={values[question.id]} onGetQRCode={(response) => {
            setFieldValue(question.id, response);
        }} />

        <Validate errors={errors} rest={rest} question={question} />
    </>
);

const location = ({ question, values, errors, setFieldValue, ...rest }) => {
    return <>
        <div>
            <LocationMapping initialValues={values[question.id]} onGetLocation={(response) => {
                setFieldValue(question.id, response);
            }} />
        </div>
        <Validate errors={errors} rest={rest} question={question} />
    </>;
};

const datePicker = ({ question, values, errors, setFieldValue, ...rest }) => {

    return <>
        <div>
            <input
                type='datetime-local'
                name='datePicker'
                value={convertToLocal(values[question.id], 'YYYY-MM-DDThh:mm')}
                placeholder={question.placeholder}
                onChange={(event) => {

                    setFieldValue(question.id, event.target.value)
                }}

            />

        </div>
        <Validate errors={errors} rest={rest} question={question} />

    </>;

};


const renderElement = ({ question, ...rest }) => (
    <Grid container style={styles.questionGrid} direction="column">
        {
            question.showLabel &&
            <Typography style={styles.questionTitle} >{question.question}</Typography>
        }
        {
            question.type === QUESTION_TYPES.DROPDOWN && dropdown({ question, ...rest })
        }
        {
            question.type === QUESTION_TYPES.SEARCHABLE_DROPDOWN && dropdown({ question, ...rest })
        }
        {
            question.type === QUESTION_TYPES.OPTION_WITH_ICON && optionWithIcon({ question, ...rest })
        }
        {
            question.type === QUESTION_TYPES.TEXT && text({ question, ...rest })
        }
        {
            question.type === QUESTION_TYPES.OPTION && option({ question, ...rest })
        }
        {
            question.type === QUESTION_TYPES.TEXTAREA && textarea({ question, ...rest })
        }
        {
            question.type === QUESTION_TYPES.CHECKBOX && checkbox({ question, ...rest })
        }
        {
            question.type === QUESTION_TYPES.IMAGE && image({ question, ...rest })
        }
        {
            question.type === QUESTION_TYPES.QR_CODE && qrcode({ question, ...rest })
        }
        {
            question.type === QUESTION_TYPES.LOCATION && location({ question, ...rest })
        }
        {
            question.type === QUESTION_TYPES.DATE && datePicker({ question, ...rest })
        }
    </Grid>
);

const getElements = ({ question, connectedQuestionsToShow = [], ...rest }) => (

    question.isConnectedQuestion ?
        connectedQuestionsToShow.includes(question.id) ?
            <div
            // useNativeDriver
            // animation='fadeInLeft'
            // duration={500}
            // key={question.id}
            // style={index !== 0 ? styles.questionView : {}}
            // ref={ref => rest.animatedViewRefsMap.current[question.id] = ref}
            >
                {
                    renderElement({ question, ...rest })
                }
            </div> : null :
        <div
            key={question.id}

        >
            {
                renderElement({ question, ...rest })

            }
        </div>
);

export default getElements;
