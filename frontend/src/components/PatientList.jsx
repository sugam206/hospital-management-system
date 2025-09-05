import React, { useEffect } from 'react';
import { usePatients } from "../context/PatientsContext"

const PatientList = () => {
    const { state, dispatch, fetchPatients } = usePatients();
    let { list, page, total, loading, limit } = state;

    useEffect(() => {
        fetchPatients(page);
    }, [page]);

    return (
        <div>
            <h1>patientsList</h1>
            {loading && <p>loading....</p>}
            <ul>
                {list.map((p) => (
                    <li key={p._id}>
                        {p.mrn}-{p.name.first} {p.name.last} ({p.age})
                    </li>
                ))}
            </ul>
            <div>
                <button disabled={page = 1}
                    onClick={() => dispatch({ type: "SET_PAGE", payload: page - 1 })}>
                    prev
                </button>
                <span>page{page}</span>
                <button disabled={list.length < limit}
                    onClick={() => dispatch({ type: "SET_PAGE", payload: page + 1 })}>
                    next
                </button>
            </div>
        </div>
    )
}

export default PatientList;