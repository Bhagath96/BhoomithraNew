import React, { useEffect } from 'react';
import { Components } from '../../../common/components';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { STATE_REDUCER_KEY } from '../constants';

import { listModulesConfigurations } from '../actions';
const { Table } = Components;

function ListModules() {
    const history = useHistory();
    const dispatch = useDispatch();
    //function to list module configurations
    const pagination = useSelector(state => state.common.organizationModule);
    const { size, page } = pagination;
    useEffect(() => {
        dispatch(listModulesConfigurations({ size, page }));
    }, [size, page]);
    //selector for listing modules;
    const allModules = useSelector(state => state[STATE_REDUCER_KEY].listModules);
    const { data, requestInProgress = false, pageSize, totalCount, pageNo } = allModules;

    const editPressed = (id) => {
        history.push(`/admin/index/module/${id}`);
    };

    const deletePressed = (id) => {
        alert(id);
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                // dispatch(deleteRegularRole(data.id || 0));
            }
        });
    };
    return (
        <div>

            <Table
                showLoader={requestInProgress}
                headers={[{ name: 'Role Name', prop: 'name' }, { name: 'Description', prop: 'description' }, { name: 'Key', prop: 'key' }, { name: 'Actions', prop: 'action' }]}
                menuActions={[{ name: 'Edit', fn: editPressed }, { name: 'Delete', fn: deletePressed }]}
                renderPath='/admin/role/create'
                data={data || []}
                pageSize={pageSize}
                pageNo={pageNo}
                totalCount={totalCount}
                paginationProperty='organizationModule' />
        </div>
    );
}

export default ListModules;
