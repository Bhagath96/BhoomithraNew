import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Components } from '../../../common/components';
import { fetchStockItems } from '../actions';
import { ITEM_TYPES, STATE_REDUCER_KEY } from '../constant';
import { ViewItems } from '../../common/components/';

const { CardComponent } = Components;

const ViewStockIn = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { listStockItems: { data = [] } } = useSelector(state => state[STATE_REDUCER_KEY]);
    useEffect(() => {
        dispatch(fetchStockItems({ id, type: ITEM_TYPES.STOCK_IN }));
    }, []);
    return (
        <CardComponent>
            <ViewItems data={data} />
        </CardComponent>
    );
};

export default ViewStockIn;
