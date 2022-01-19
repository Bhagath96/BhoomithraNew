import React, { useState, useEffect } from 'react';
import ReactDragListView from 'react-drag-listview/lib/index';
import L from 'leaflet';
import * as Actions from '../../actions';
import { useDispatch } from 'react-redux';
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';
import { FaRegDotCircle } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiLocationMarker } from 'react-icons/hi';

import { Components } from '../../../../common/components';
const { Button } = Components;


const rowsAdd = (routesArray = []) => {
    const fullData = [];
    for (let i = 0; i < routesArray.length; i++) {
        const item = routesArray[i];
        let latlng = item.lat + ',' + item.lng;
        item.latlng = latlng;
        // ite.name = await fetChGeoLocationNames(item.lat, item.lng)
        item.endFlag = false;
        if (i === routesArray.length - 1) {
            item.endFlag = true;
        }
        fullData.push(item);
    }
    return fullData;

};
function DragComponent({ routesArray }) {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(rowsAdd(routesArray));
    }, [routesArray]);

    const dragProps = {
        onDragEnd(fromIndex, toIndex) {

            let newData = data;
            const item = newData.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            setData([]);
            setData(newData);
        },
        nodeSelector: 'li',
        handleSelector: 'button'
    };

    useEffect(() => {
        let points = data?.map(route => L.latLng(route.lat, route.lng));
        dispatch(Actions.addWayPointsForRouting({ points }));
    }, [data]);


    const handleItemChange = (fromIndex, upDownString) => {
        let toIndex = null;
        if (upDownString === 'up') {
            if (fromIndex === 0) {
                toIndex = data.length - 1;
            } else {

                toIndex = fromIndex - 1;
            }
        } else {
            if (fromIndex === data.length - 1) {
                toIndex = 0;
            } else {

                toIndex = fromIndex + 1;
            }

        }
        let newData = data;
        const item = newData.splice(fromIndex, 1)[0];
        data.splice(toIndex, 0, item);
        setData([]);

        setData(newData);
        let points = newData?.map(route => L.latLng(route.lat, route.lng));
        dispatch(Actions.addWayPointsForRouting({ points }));
    };

    return (
        <div>
            <ReactDragListView {...dragProps}>
                <ol >

                    {data?.map((item, index) => (
                        <div key={index}>

                            <li style={{ display: 'flex', flexDirection: 'row', margin: '2px', justifyContent: 'space-between', alignItems: 'center' }}>
                                {item.endFlag ? <HiLocationMarker /> : <FaRegDotCircle />} {item.name}
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: '10px' }}>
                                    <Button color="primary"><FiArrowUpCircle onClick={() => handleItemChange(index, 'up')} /></Button>
                                    <Button color="primary" ><FiArrowDownCircle onClick={() => handleItemChange(index, 'down')} /></Button>

                                </div>
                            </li>

                            <div>
                                {(data?.length > 1 && index !== data?.length - 1) &&
                                    < BiDotsVerticalRounded />
                                }

                            </div>

                        </div>
                    ))}
                </ol>
            </ReactDragListView>
        </div >
    );
}

export default DragComponent;
