import React, { useState } from "react";
import { usePatients } from "../context/PatientsContext";

const PatientForm = () => {
    const { createPatient } = usePatients();
    const [formData, setFormData] = useState({
        name: { first: "", last: "" },
        dob: "",
        sex: "male",
        phone: "",
        email: "",
        address: "",
        emergencyContact: { name: "", phone: "", relation: "" },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("name.")) {
            const field = name.split(".")[1];
            setFormData({ ...formData, name: { ...formData.name, [field]: value } });
        } else if (name.startsWith("emergencyContact.")) {
            const field = name.split(".")[1];
            setFormData({
                ...formData,
                emergencyContact: { ...formData.emergencyContact, [field]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPatient = await createPatient(formData);
            alert(`Patient added: ${newPatient.mrn}`);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name.first"
                placeholder="First Name"
                onChange={handleChange}
            />
            <input name="name.last" placeholder="Last Name" onChange={handleChange} />
            <input name="dob" type="date" onChange={handleChange} />
            <select name="sex" onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <input name="phone" placeholder="Phone" onChange={handleChange} />
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
            />
            <input name="address" placeholder="Address" onChange={handleChange} />

            <h4>Emergency Contact</h4>
            <input
                name="emergencyContact.name"
                placeholder="Name"
                onChange={handleChange}
            />
            <input
                name="emergencyContact.phone"
                placeholder="Phone"
                onChange={handleChange}
            />
            <input
                name="emergencyContact.relation"
                placeholder="Relation"
                onChange={handleChange}
            />

            <button type="submit">Add Patient</button>
        </form>
    );
};

export default PatientForm;
