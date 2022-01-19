import React from 'react';
import { MuiPickersUtilsProvider, DateTimePicker, DatePicker, TimePicker } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { createTheme } from '@material-ui/core/styles';

import Colors from './Colors.js';
/*
    ref : https://material-ui-pickers.dev/demo/datepicker
*/

const materialTheme = createTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: Colors['color-basic-800']
            }
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                // backgroundColor: Colors['color-basic-200'],
                // color: "white",
            }
        },
        MuiPickersDay: {
            day: {
                color: Colors['color-basic-800']
            },
            daySelected: {
                backgroundColor: Colors['color-basic-800'],
                '&:hover': {
                    backgroundColor: Colors['color-basic-900']
                }
            },
            dayDisabled: {
                color: Colors['color-basic-200']
            },
            current: {
                color: Colors['color-cancelled-600']
            }
        },
        MuiPickersModal: {
            dialogAction: {
                color: Colors['color-basic-800']
            }
        },
        MuiButton: {
            textPrimary: {
                color: Colors['color-basic-800']
            }
        },
        MuiPickersYear: {
            yearSelected: {
                color: Colors['color-basic-800']
            }
        }
    }
});

const getComponent = (props) => {
    const { selected, onChange, shouldDisableDate, mode = 'date_time', ampm = false, ...rest } = props;
    switch (mode) {
        case 'date':
            return <DatePicker
                label="Date Picker"
                ampm={ampm}
                value={selected}
                onChange={onChange}
                shouldDisableDate={shouldDisableDate}
                animateYearScrolling={true}
                showTodayButton={true}
                todayLabel="Today"
                {...rest}
            />;
        case 'time':
            return <TimePicker
                label="Time Picker"
                ampm={ampm}
                value={selected}
                onChange={onChange}
                showTodayButton={true}
                todayLabel="now"
                {...rest}
            />;
        default:
            return <DateTimePicker
                label="Date Time Picker"
                value={selected}
                onChange={onChange}
                shouldDisableDate={shouldDisableDate}
                animateYearScrolling={true}
                showTodayButton={true}
                todayLabel="Today"
                {...rest}
            />;
    }
};

const CustomDateTimePicker = (props) => {
    return (
        <ThemeProvider theme={materialTheme}>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                {getComponent(props)}
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
};

export default CustomDateTimePicker;
