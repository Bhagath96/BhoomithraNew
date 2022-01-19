import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Components } from '../../../common/components';
import { fetchCKCItems } from '../actions';
import { ITEM_TYPES, STATE_REDUCER_KEY } from '../constant';
import { ViewItems } from '../../common/components/';

const { CardComponent } = Components;

const ViewCkcSales = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { listCKCItems: { data = [] } } = useSelector(state => state[STATE_REDUCER_KEY]);
    useEffect(() => {
        dispatch(fetchCKCItems({ id, type: ITEM_TYPES.CKC_SALE }));
    }, []);
    return (
        <CardComponent>
            <ViewItems data={data} />
        </CardComponent>
    );
};

export default ViewCkcSales;
