import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listServiceProvider,
  deleteServiceProvider
} from '../../actions';
import { STATE_REDUCER_KEY } from '../../constants';
import Swal from 'sweetalert2';
import { history } from '../../../../common';
import { Components, I18n } from '../../../../common/components';
import { useParams } from 'react-router-dom';
const { MUIDataTable } = Components;
import { MUI_COMMON_OPTIONS } from '../../../../common/constants';
import ActionButtons from '../../../../common/components/custom/mui-data-table/ActionButtons';
import AddIcon from '@material-ui/icons/Add';
import { hasAccessPermission } from '../../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';

function ServiceProviderList() {
  const [page, setPage] = React.useState(0);
  const [size, setrowsPerPageState] = React.useState(10);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(listServiceProvider({ size, page }, id));
  }, [size, page]);
  let renderPath = `/admin/index/organization/${id}/serviceprovider/create`;

  const initialValues = useSelector((state) => state[STATE_REDUCER_KEY]);
  const {
    listServiceProvidsers: {
      data,
      totalCount: count,
      requestInProgress = false
    } = {}
  } = initialValues;

  const changePage = (pagess) => {
    setPage(pagess);
  };
  //triggered when add button is pressed
  //triggerd when perPage is clicked
  const changeRowsPerPage = (rowsPerPage) => {
    setrowsPerPageState(rowsPerPage);
  };
  const handleClick = () => {
    history.push(renderPath);
  };

  const editPressed = (providerId) => {
    if (providerId) {
      history.push(
        `/admin/index/organization/${id}/serviceprovider/${providerId}/details`
      );
    }
  };
  const deletePressed = (organization) => {
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteServiceProvider(id, organization || 0));
      }
    });
  };

  const columns = [
    {
      name: 'id',
      label: I18n.t('id')
    },
    {
      name: 'name',
      label: I18n.t('template_name')
    },
    {
      label: I18n.t('template_type'),
      name: 'templateType.name'
    },
    {
      name: I18n.t('actions'),
      options: {
        filter: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            right: '0',
            background: 'white',
            zIndex: 100
          }
        }),
        customBodyRender: (value, tableMeta) => {
          const menuActions = [];
          if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER.VIEW_IN_ACTION)) {
            menuActions.push({ name: I18n.t('view'), fn: editPressed });
          }
          if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER.EDIT_IN_ACTION)) {
            menuActions.push({ name: I18n.t('edit'), fn: editPressed });
          }
          if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER.DELETE_IN_ACTION)) {
            menuActions.push({ name: I18n.t('delete'), fn: deletePressed });
          }
          return menuActions.length > 0 && (
            <ActionButtons
              menuActions={[
                ...menuActions,
                tableMeta
              ]}
            />
          );
        }
      }
    }
  ];
  const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER.ADD);

  const options = {
    ...MUI_COMMON_OPTIONS,
    serverSide: false,
    page: page,
    rowsPerPage: size,
    count: count,
    customActions: showAddIcon && [
      { handleClick: handleClick, icon: <AddIcon />, toolTip: 'add' }
    ],
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'changePage':
          changePage(tableState.page);
          break;
        case 'changeRowsPerPage':
          changeRowsPerPage(tableState.rowsPerPage);
          break;

        default:
          break;
      }
    }
  };

  return (
    <div>
      <MUIDataTable
        title={I18n.t('service_provider')}
        data={data}
        columns={columns}
        options={options}
        requestInProgress={requestInProgress}
      />
    </div>
  );
}

export default ServiceProviderList;
