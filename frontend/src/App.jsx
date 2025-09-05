import React from 'react'
import PatientsList from "./components/PatientList"
import { PatientsProvider } from './context/PatientsContext'
import PatientForm from './components/PatientForm'

const App = () => {
  return (
    <PatientsProvider>
      <div>
        <h1>hospital management system</h1>
        <PatientForm />
        <PatientsList />

      </div>
    </PatientsProvider>

  )
}

export default App