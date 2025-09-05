import React, { createContext, useReducer, useContext } from "react";
import api from "../api/axios";

const PatientsContext = createContext();

const initialState = {
    list: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
};

const patientsReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                list: action.payload.patients,
                total: action.payload.total,
                limit: action.payload.limit,
            };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "SET_PAGE":
            return { ...state, page: action.payload };
        case "ADD_PATIENT":
            return { ...state, list: [action.payload, ...state.list] };
        default:
            return state;
    }
};

export const PatientsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(patientsReducer, initialState);

    // Fetch patients
    const fetchPatients = async (page = 1) => {
        dispatch({ type: "FETCH_START" });
        try {
            const res = await api.get(`/patients?page=${page}&limit=${state.limit}`);
            dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({
                type: "FETCH_ERROR",
                payload: err.response?.data?.message || err.message,
            });
        }
    };

    // Create new patient
    const createPatient = async (patientData) => {
        try {
            const res = await api.post("/patients", patientData);
            dispatch({ type: "ADD_PATIENT", payload: res.data });
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    return (
        <PatientsContext.Provider
            value={{ state, dispatch, fetchPatients, createPatient }}
        >
            {children}
        </PatientsContext.Provider>
    );
};

export const usePatients = () => useContext(PatientsContext);
