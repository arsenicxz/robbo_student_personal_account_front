import { createAction } from "redux-actions"
import { toast } from 'react-toastify'

import {
    CREATE_ROBBO_UNIT, CREATE_ROBBO_UNIT_FAILED,
    CREATE_ROBBO_UNIT_SUCCESS, DELETE_ROBBO_UNIT,
    DELETE_ROBBO_UNIT_FAILED, DELETE_ROBBO_UNIT_SUCCESS,
    GET_ALL_ROBBO_UNITS,
    GET_ALL_ROBBO_UNITS_FAILED, GET_ALL_ROBBO_UNITS_SUCCESS,
    GET_ROBBO_UNITS_BY_UNIT_ADMIN_ID_FAILED,
    GET_ROBBO_UNITS_BY_UNIT_ADMIN_ID_REQUEST,
    GET_ROBBO_UNITS_BY_UNIT_ADMIN_ID_SUCCESS,
    GET_ROBBO_UNIT_BY_ID,
    GET_ROBBO_UNIT_BY_ID_FAILED,
    GET_ROBBO_UNIT_BY_ID_SUCCESS,
    UPDATE_ROBBO_UNIT, UPDATE_ROBBO_UNIT_FAILED,
    UPDATE_ROBBO_UNIT_SUCCESS,
    CLEAR_ROBBO_UNITS_PAGE,
    CLEAR_ROBBO_UNIT_PAGE,
} from "@/constants"

export const getRobboUnits = createAction(GET_ALL_ROBBO_UNITS, token => {
    return {
        token,
    }
})

export const getRobboUnitsSuccess = createAction(GET_ALL_ROBBO_UNITS_SUCCESS, response => {
    return {
        response,
    }
})

export const getRobboUnitsFailed = createAction(GET_ALL_ROBBO_UNITS_FAILED, err => {
    toast.error(err)
    return {
        err,
    }
})

export const createRobboUnit = createAction(CREATE_ROBBO_UNIT, (token, robboUnit) => {
    return {
        token,
        robboUnit,
    }
})

export const createRobboUnitSuccess = createAction(CREATE_ROBBO_UNIT_SUCCESS, (response, robboUnit) => {
    toast.success("Robbo Unit успешно создан!")
    return {
        response,
        robboUnit,
    }
})

export const createRobboUnitFailed = createAction(CREATE_ROBBO_UNIT_FAILED, err => {
    toast.error("Ошибка при создании Robbo Unit!")
    return {
        err,
    }
})

export const deleteRobboUnitRequest = createAction(DELETE_ROBBO_UNIT, (token, robboUnitId, robboUnitIndex) => {
    return {
        token,
        robboUnitId,
        robboUnitIndex,
    }
})

export const deleteRobboUnitSuccess = createAction(DELETE_ROBBO_UNIT_SUCCESS, (response, robboUnitIndex) => {
    toast.success("Robbo Unit успешно удален!")
    return {
        response,
        robboUnitIndex,
    }
})

export const deleteRobboUnitFailed = createAction(DELETE_ROBBO_UNIT_FAILED, err => {
    toast.error(err)
    return {
        err,
    }
})

export const updateRobboUnit = createAction(UPDATE_ROBBO_UNIT, (token, robboUnit) => {
    return {
        token,
        robboUnit,
    }
})

export const updateRobboUnitSuccess = createAction(UPDATE_ROBBO_UNIT_SUCCESS, response => {
    toast.success('Robbo Unit успешно обновлен!')
    return {
        response,
    }
})

export const updateRobboUnitFailed = createAction(UPDATE_ROBBO_UNIT_FAILED, err => {
    toast.error('Ошибка при обновлении.')
    return {
        err,
    }
})

export const getRobboUnitById = createAction(GET_ROBBO_UNIT_BY_ID, (token, robboUnitId) => {
    return {
        token,
        robboUnitId,
    }
})

export const getRobboUnitByIdSuccess = createAction(GET_ROBBO_UNIT_BY_ID_SUCCESS, response => {
    return {
        response,
    }
})

export const getRobboUnitByIdFailed = createAction(GET_ROBBO_UNIT_BY_ID_FAILED, err => {
    toast.error(err)
    return {
        err,
    }
})

export const getRobboUnitsByUnitAdminIdRequest = createAction(GET_ROBBO_UNITS_BY_UNIT_ADMIN_ID_REQUEST, token => {
    return {
        token,
    }
})

export const getRobboUnitsByUnitAdminIdSuccess = createAction(GET_ROBBO_UNITS_BY_UNIT_ADMIN_ID_SUCCESS, response => {
    return {
        response,
    }
})

export const getRobboUnitsByUnitAdminIdFailed = createAction(GET_ROBBO_UNITS_BY_UNIT_ADMIN_ID_FAILED, err => {
    return {
        err,
    }
})

export const clearRobboUnitsPage = createAction(CLEAR_ROBBO_UNITS_PAGE)
export const clearRobboUnitPage = createAction(CLEAR_ROBBO_UNIT_PAGE)