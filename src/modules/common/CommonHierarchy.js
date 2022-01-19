import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { renderSimpleSelect } from '../../utils/FormUtils';
import { Components, makeStyles, I18n } from '../../common/components';
import * as Actions from './actions';
import _ from '../../utils/LodashUtils';

import { HIERARCHY_INDEX, HIERARCHY_LABEL, STATE_REDUCER_KEY, PANCHAYATH_TYPES, DB_KEYS } from './constants';

const { Grid } = Components;

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

function dispatchMuncipalityCorporationLSGI(dispatch, identifier, lsgi, district) {
    dispatch(Actions.loadLSGI({
        identifier, id: {
            districtId: _.get(district, 'id', ''),
            lsgiTypeId: _.get(lsgi, 'id', '')
        }
    }));
}

function dispatchPanchayathLSGI(dispatch, identifier, panchayathType, lsgi, panchayath, district) {
    let typeKey = (panchayathType === PANCHAYATH_TYPES.BLOCK_PANCHAYATH ? 'blockPanchayathId' : 'districtPanchayathId');
    dispatch(Actions.loadLSGI({
        identifier, id: {
            [typeKey]: _.get(panchayath, 'id', ''),
            districtId: _.get(district, 'id', ''),
            lsgiTypeId: _.get(lsgi, 'id', '')
        }
    }));
}

function dispatchDistrictBlockPanchayath(dispatch, type, identifier, district) {
    switch (type) {
        case HIERARCHY_LABEL.BLOCK_PANCHAYATH:
            dispatch(Actions.loadBlockPanchayath({ identifier, id: { districtId: _.get(district, 'id', '') } }));
            break;
        case HIERARCHY_LABEL.DISTRICT_PANCHAYATH:
            dispatch(Actions.loadDistrictPanchayath({ identifier, id: { districtId: _.get(district, 'id', '') } }));
            break;
        default:
            break;
    }
}

const CommonHierarchy = (props) => {
    const classes = useStyles();
    const { formName, change, formPath, identifier, data, disabled } = props;
    const dispatch = useDispatch();
    const initialValues = useSelector(state => _.get(state, `form.${formName}.values.${formPath}`, {}));
    const [isPanchayath, setIsPanchayath] = useState(false);
    const { lsgiTypes: lsgiList } = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));

    // let [state, setState] = useState({});
    let [district, setDistrict] = useState(null);
    // let [districtPanchayath, setDistrictPanchayath] = useState(null);
    // let [blockPanchayath, setBlockPanchayath] = useState();
    let [currentLsgiType, setCurrentLsgiType] = useState();

    useEffect(() => {
        let { state: currentState, lsgiType: asCurrentLsgiType, district: asCurrentDistrict, districtPanchayath: asCurrentDistrictPanchayath, blockPanchayath: asCurrentBlockPanchayath } = initialValues;
        if (asCurrentDistrict?.id) {
            setDistrict(asCurrentDistrict);
        }
        if (asCurrentLsgiType?.id) {
            setCurrentLsgiType(asCurrentLsgiType);
        }
        // if (asCurrentDistrictPanchayath?.id) {
        //     setDistrictPanchayath(asCurrentDistrictPanchayath);
        // }
        // if (asCurrentBlockPanchayath?.id) {
        //     setBlockPanchayath(asCurrentBlockPanchayath);
        // }

        dispatch(Actions.loadLSGITypes());
        dispatch(Actions.loadStates({ identifier }));

        if (currentState?.id) {
            dispatch(Actions.loadDistricts({ identifier, id: { stateId: _.get(currentState, 'id', '') } }));
        }
        if (asCurrentLsgiType?.id) {
            change(`${formPath}.${HIERARCHY_LABEL.LSGI_TYPE}`, asCurrentLsgiType);

            if (asCurrentLsgiType.id === DB_KEYS.PANCHAYATH) {
                setIsPanchayath(true);
                dispatchDistrictBlockPanchayath(dispatch, HIERARCHY_LABEL.BLOCK_PANCHAYATH, identifier, asCurrentDistrict);
                dispatchDistrictBlockPanchayath(dispatch, HIERARCHY_LABEL.DISTRICT_PANCHAYATH, identifier, asCurrentDistrict);
                if (asCurrentDistrictPanchayath?.id) {
                    dispatchPanchayathLSGI(dispatch, identifier, PANCHAYATH_TYPES.DISTRICT_PANCHAYATH, asCurrentLsgiType, asCurrentDistrictPanchayath, asCurrentDistrict);
                } else if (asCurrentBlockPanchayath?.id) {

                    dispatchPanchayathLSGI(dispatch, identifier, PANCHAYATH_TYPES.BLOCK_PANCHAYATH, asCurrentLsgiType, asCurrentBlockPanchayath, asCurrentDistrict);
                }
            } else {

                dispatchMuncipalityCorporationLSGI(dispatch, identifier, asCurrentLsgiType, asCurrentDistrict);
            }
        }

    }, [initialValues?.state]);

    const clearStates = (key) => {
        switch (key) {
            case HIERARCHY_LABEL.STATE:
                setIsPanchayath(false);
                setDistrict(null);
                break;
            case HIERARCHY_LABEL.DISTRICT:
                setIsPanchayath(false);
                break;
            default:
                break;
        }
    };

    const clearLower = (path, currentComponent) => {
        let currentIndex = HIERARCHY_INDEX[currentComponent];
        Object.entries(HIERARCHY_INDEX).forEach(([key, value]) => {
            if (value > currentIndex) {
                change(`${formPath}.${key}`, null);
            }
        });
        clearStates(currentComponent);
    };

    const callNextApi = (key, id) => {
        switch (key) {
            case HIERARCHY_LABEL.STATE:
                dispatch(Actions.loadDistricts({ identifier, id: { stateId: _.get(id, 'id', '') } }));
                break;
            case HIERARCHY_LABEL.LSGI_TYPE:
                if (_.get(id, 'id', '') === DB_KEYS.PANCHAYATH) {
                    dispatchDistrictBlockPanchayath(dispatch, HIERARCHY_LABEL.BLOCK_PANCHAYATH, identifier, district);
                    dispatchDistrictBlockPanchayath(dispatch, HIERARCHY_LABEL.DISTRICT_PANCHAYATH, identifier, district);
                } else {
                    dispatchMuncipalityCorporationLSGI(dispatch, identifier, id, district);
                }
                break;
            case HIERARCHY_LABEL.BLOCK_PANCHAYATH:
                dispatchPanchayathLSGI(dispatch, identifier, PANCHAYATH_TYPES.BLOCK_PANCHAYATH, currentLsgiType, id, district);
                break;
            case HIERARCHY_LABEL.DISTRICT_PANCHAYATH:
                dispatchPanchayathLSGI(dispatch, identifier, PANCHAYATH_TYPES.DISTRICT_PANCHAYATH, currentLsgiType, id, district);
                break;
            default:
                break;
        }
    };

    return (

        < Grid container >
            <Grid item sm={6} className={classes.item}>
                <Field disabled={disabled} name={HIERARCHY_LABEL.STATE} label={I18n.t('state')} component={renderSimpleSelect}
                    onChange={(currentState) => {
                        let value = { id: currentState.target.value };
                        // setState(value);
                        change(`${formPath}.${HIERARCHY_LABEL.STATE}`, value);
                        clearLower(formPath, HIERARCHY_LABEL.STATE);
                        callNextApi(HIERARCHY_LABEL.STATE, value);
                    }}>
                    {
                        _.get(data, HIERARCHY_LABEL.STATE, [])
                    }
                </Field>
            </Grid>

            <Grid item sm={6} className={classes.item}>
                <Field disabled={disabled} name={HIERARCHY_LABEL.DISTRICT} label={I18n.t('district')} component={renderSimpleSelect}
                    onChange={(currentDistrict) => {
                        let value = { id: currentDistrict.target.value };
                        change(`${formPath}.${HIERARCHY_LABEL.DISTRICT}`, value);
                        setDistrict(value);
                        clearLower(formPath, HIERARCHY_LABEL.DISTRICT);
                        callNextApi(HIERARCHY_LABEL.DISTRICT, value);
                    }}>
                    {
                        _.get(data, HIERARCHY_LABEL.DISTRICT, [])
                    }
                </Field>
            </Grid>

            <Grid item sm={6} className={classes.item}>
                <Field disabled={disabled} name={HIERARCHY_LABEL.LSGI_TYPE} label={I18n.t('lsgi_type')} component={renderSimpleSelect}
                    onChange={(lsgi) => {
                        let value = { id: lsgi.target.value };
                        change(`${formPath}.${HIERARCHY_LABEL.LSGI_TYPE}`, value);
                        setCurrentLsgiType(value);
                        if (value.id === DB_KEYS.PANCHAYATH) {
                            setIsPanchayath(true);
                        } else {
                            setIsPanchayath(false);
                        }
                        clearLower(formPath, HIERARCHY_LABEL.LSGI_TYPE);
                        callNextApi(HIERARCHY_LABEL.LSGI_TYPE, value);
                    }}>
                    {
                        _.get(lsgiList, 'data', [])

                    }
                </Field>
            </Grid>

            {
                isPanchayath &&
                <>
                    <Grid item sm={6} className={classes.item}>
                        <Field disabled={disabled} name={HIERARCHY_LABEL.BLOCK_PANCHAYATH} label={I18n.t('block_panchayath')} component={renderSimpleSelect}
                            onChange={(blokPanchayath) => {
                                let value = { id: blokPanchayath.target.value };
                                // setBlockPanchayath(value);
                                change(`${formPath}.${HIERARCHY_LABEL.BLOCK_PANCHAYATH}`, value);
                                change(`${formPath}.${HIERARCHY_LABEL.DISTRICT_PANCHAYATH}`, null);
                                clearLower(formPath, HIERARCHY_LABEL.BLOCK_PANCHAYATH);
                                callNextApi(HIERARCHY_LABEL.BLOCK_PANCHAYATH, value);
                            }}>
                            {
                                _.get(data, HIERARCHY_LABEL.BLOCK_PANCHAYATH, [])
                            }
                        </Field>
                    </Grid>
                    <Grid item sm={6} className={classes.item}>
                        <Field disabled={disabled} name={HIERARCHY_LABEL.DISTRICT_PANCHAYATH} label={I18n.t('district_panchayath')} component={renderSimpleSelect}
                            onChange={(currentDistrictPanchayath) => {
                                let value = { id: currentDistrictPanchayath.target.value };

                                // setDistrictPanchayath(value);
                                change(`${formPath}.${HIERARCHY_LABEL.DISTRICT_PANCHAYATH}`, value);
                                change(`${formPath}.${HIERARCHY_LABEL.BLOCK_PANCHAYATH}`, null);
                                clearLower(formPath, HIERARCHY_LABEL.DISTRICT_PANCHAYATH);
                                callNextApi(HIERARCHY_LABEL.DISTRICT_PANCHAYATH, value);
                            }}>
                            {
                                _.get(data, HIERARCHY_LABEL.DISTRICT_PANCHAYATH, [])
                            }
                        </Field>
                    </Grid>
                </>
            }

            <Grid item sm={6} className={classes.item}>
                <Field disabled={disabled} name={HIERARCHY_LABEL.LSGI} label={I18n.t('lsgi')} component={renderSimpleSelect}
                    onChange={(currentLSGI) => {
                        let value = { id: currentLSGI.target.value };
                        change(`${formPath}.${HIERARCHY_LABEL.LSGI}`, value);
                        clearLower(formPath, HIERARCHY_LABEL.LSGI);
                        callNextApi(HIERARCHY_LABEL.LSGI, value);
                    }}>
                    {
                        _.get(data, HIERARCHY_LABEL.LSGI, [])
                    }
                </Field>
            </Grid>
        </Grid >
    );
};

export default CommonHierarchy;
