import React from 'react';
import { Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Colors from './Colors';

const CustomRadio = withStyles({
    root: {
        color: Colors['color-basic-800'],
        '&$checked': {
            color: Colors['color-basic-600']
        }
    },
    checked: {}
})((radioProps) => <Radio color="default" {...radioProps} />);

export default CustomRadio;
