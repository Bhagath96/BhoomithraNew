import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga, history } from '../../common';
import { getDefaultLanguage } from '../common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';
import { initializeDynamicForm, setResumeModalVisibility, syncInprogressData, toggleDownloadingSurveyDataModalVisibility } from '../dfg/actions';
import { editSyncedSurvey } from '../../modules/dfg/saga-web';
import { PATH } from '../../routes';
import { SurveyDataRepository } from '../../common/pouchDB/repositories';

function* fetchServiceHistoryDetails() {
    const language = yield select(getDefaultLanguage);
    const processed = true;
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SERVICE_HISTORY);
    let { passedColumns } = additionalProps;
    // yield call(saga.handleAPIRequest, API.fetchStateDetails, { data: { ...action.payload.data, langId } });
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SERVICE_HISTORY);
    yield fork(saga.handleAPIRequest, API.fetchServiceHistoryDetails, { params: { ...tableProps, langId, processed, sort: 'serviceCompletionDate' } });
    const serviceHistoryAction = yield take([ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_SUCCESS, ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_FAILURE]);
    let serviceHistoryTableData = getPayloadData(serviceHistoryAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, serviceHistoryTableData.content || []);
    if (serviceHistoryAction.type === ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SERVICE_HISTORY, getPayloadData(serviceHistoryAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SERVICE_HISTORY, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SERVICE_HISTORY, filterOptionsList: allFilterValues }));
    }
}

function* listServiceHistoryById(action) {
    const surveyIds = action.payload.data.surveyIds;
    const templateTypeId = action.payload.data.templateTypeId;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield fork(saga.handleAPIRequest, API.listServiceHistoryById, { langId, surveyIds, templateTypeId });

}


function* editServiceHistory(action) {
    const { surveyId } = action.payload.data;
    const payload = {
        data: {
            surveyId,
            toggleModalVisibility: (data) => toggleDownloadingSurveyDataModalVisibility(data)
        }
    };
    const status = yield call(editSyncedSurvey, { payload });

    if (status) {
        const existingSurveyData = yield call([SurveyDataRepository, 'findById'], surveyId);
        let { templateTypeId, version } = existingSurveyData;
        const initializer = {
            templateTypeId,
            version,
            surveyDataKey: surveyId,
            surveyFinishedAction: function* surveyFinishedAction() {
                yield put(syncInprogressData());
                // navigate after DFG
                yield call(history.push, PATH.SERVICE_HISTORY);
            },
            setResumeModalVisibility: (data) => setResumeModalVisibility(data)
        };
        yield put(initializeDynamicForm(initializer));
        // navigate to DFG
        yield call(history.push, `${PATH.SERVICE_HISTORY}/edit`);
    }
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_SERVICE_HISTORY_DETAILS, fetchServiceHistoryDetails),
        takeLatest(ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_BY_ID, listServiceHistoryById),
        takeLatest(ActionTypes.EDIT_SERVICE_HISTORY, editServiceHistory)
    ]);
}

