import { call, put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'

import {
    createParentFailed,
    createParentSuccess,
    getClientsRequest,
    getClientsFailed,
    getClientsSuccess,
    deleteParentSuccess,
    deleteParentFailed,
    deleteParentRequest,
    createChildreSuccess,
    createChildrenFailed,
    deleteChildSuccess,
    deleteChildFailed,
    deleteChildRequest,
    getChildrenByParentIdSuccess,
    getChildrenByParentIdFailed,
    searchStudentSuccess,
    searchStudentFailed,
    createRelationSuccess,
    createRelationFailed,
    getClientPageByIdSuccess,
    getClientPageByIdFailed,
    createChildrenRequest,
    getChildrenByParentIdRequest,
    searchStudentRequest,
    createStudentParentRelationRequest,
    getClientPageByIdRequest,
    createParentRequest,
}
    from '@/actions'
import { clientsAPI } from '@/api'
import { usersQueryGraphQL } from '@/graphQL'
import { usersMutationGraphQL } from '@/graphQL/mutation'

function* getClientsSaga(action) {
    try {
        const response = yield call(usersQueryGraphQL.getAllParents)
        console.log(response)
        yield put(getClientsSuccess(response.data.GetAllParents.parents))
    } catch (e) {
        yield put(getClientsFailed(e.message))
    }
}

function* getClientByIdSaga({ payload }) {
    try {
        const { id } = payload
        const response = yield call(usersQueryGraphQL.getParentById, { parentId: id })
        console.log(response)
        yield put(getClientPageByIdSuccess(response.data.GetParentById))
    } catch (e) {
        yield put(getClientPageByIdFailed(e.message))
    }
}

function* createParentSaga({ payload }) {
    try {
        const { parent } = payload
        const response = yield call(usersMutationGraphQL.createParent, { input: parent })
        console.log(response)
        yield put(createParentSuccess(response.data.CreateParent))
        notification.success({ message: '', description: 'Родитель успешно создан!' })
    } catch (e) {
        yield put(createParentFailed(e))
        notification.error({ message: 'Ошибка', description: e.message })
    }
}

function* deleteParentSaga({ payload }) {
    try {
        const { parentId, parentIndex } = payload
        const response = yield call(usersMutationGraphQL.deleteParent, { parentId })
        console.log(response)

        yield put(deleteParentSuccess(response.data.DeleteParent, parentIndex))
        notification.success({ message: '', description: 'Родитель успешно удален!' })
    } catch (e) {
        yield put(deleteParentFailed)
        notification.error({ message: 'Ошибка', description: e.message })
    }
}

function* createChildrenSaga({ payload }) {
    try {
        const { child, parentId } = payload
        const response = yield call(usersMutationGraphQL.createStudent, { input: { ...child, parentId } })
        console.log(response)

        yield put(createChildreSuccess(response.data, child))
        notification.success({ message: '', description: 'Ученик успешно создан!' })
    } catch (e) {
        yield put(createChildrenFailed(e))
        notification.error({ message: 'Ошибка', description: e.message })
    }
}

function* deleteChildSaga({ payload }) {
    try {
        const { childId, childIndex } = payload
        const response = yield call(usersMutationGraphQL.deleteStudent, { studentId: childId })
        console.log(response)

        yield put(deleteChildSuccess(response.data.DeleteStudent, childIndex))
        notification.success({ message: '', description: 'Ученик успешно удален!' })
    } catch (e) {
        yield put(deleteChildFailed(e))
        notification.error({ message: 'Ошибка', description: e.message })
    }
}

function* getChildrenByParentIdSaga({ payload }) {
    try {
        const { parentId } = payload
        const response = yield call(usersQueryGraphQL.getStudentsByParentId, { parentId: parentId })
        console.log(response)

        yield put(getChildrenByParentIdSuccess(response.data.GetStudentsByParentId.students))
    } catch (e) {
        yield put(getChildrenByParentIdFailed(e))
        notification.error({ message: 'Ошибка', description: e.message })
    }
}

function* searchStudentSaga(action) {
    try {
        const { token, input } = action.payload
        const response = yield call(clientsAPI.searchStudent, token, input)
        console.log(response)

        yield put(searchStudentSuccess(response.data))
    } catch (e) {
        yield put(searchStudentFailed(e))
    }
}

function* createStudentParentRelationSaga({ payload }) {
    try {
        const { parentId, childId } = payload
        const response = yield call(usersMutationGraphQL.createStudentParentRelation, { parentId, childId })
        console.log(response)

        yield put(createRelationSuccess(response.data))
    } catch (e) {
        yield put(createRelationFailed(e))
        notification.error({ message: 'Ошибка', description: e.message })
    }
}

export function* clientsSaga() {
    yield takeLatest(getClientsRequest, getClientsSaga)
    yield takeLatest(createParentRequest, createParentSaga)
    yield takeLatest(deleteParentRequest, deleteParentSaga)
    yield takeLatest(createChildrenRequest, createChildrenSaga)
    yield takeLatest(deleteChildRequest, deleteChildSaga)
    yield takeLatest(getChildrenByParentIdRequest, getChildrenByParentIdSaga)
    yield takeLatest(searchStudentRequest, searchStudentSaga)
    yield takeLatest(createStudentParentRelationRequest, createStudentParentRelationSaga)
    yield takeLatest(getClientPageByIdRequest, getClientByIdSaga)
}