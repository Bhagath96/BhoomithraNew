import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Components } from '../../../common/components';
import { fetchRRFItems } from '../actions';
import { ITEM_TYPES, STATE_REDUCER_KEY } from '../constant';
import { ViewItems } from '../../common/components/';
const { CardComponent } = Components;

const ViewRrfSales = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { listRRFItems: { data = [] } } = useSelector(state => state[STATE_REDUCER_KEY]);
    useEffect(() => {
        dispatch(fetchRRFItems({ id, type: ITEM_TYPES.RRF_SALE }));
    }, []);
    return (
        <CardComponent>
            <ViewItems data={data} />
        </CardComponent>
    );
};

export default ViewRrfSales;
