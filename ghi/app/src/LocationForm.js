import React, { useEffect, useState } from 'react';


function LocationForm() {
    const [states, setStates] = useState([])
    const [name, setName] = useState('')
    const [roomCount, setRoomCount] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [submitted, setSubmitted] = useState('')


    const fetchStates = async () => {
        const url = "http://localhost:8000/api/states/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setStates(data.states)
        }
    }


    useEffect(() => {
        fetchStates()
    }, [])


    const handleNameChange = (e) => {
        const value = e.target.value
        setName(value)
    }

    const handleRoomCountChange = (e) => {
        const value = e.target.value
        setRoomCount(value)
    }

    const handleCityChange = (e) => {
        const value = e.target.value
        setCity(value)
    }

    const handleStateChange = (e) => {
        const value = e.target.value
        setState(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {}

        data.room_count = roomCount
        data.name = name
        data.city = city
        data.state = state

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(locationUrl, fetchConfig)
        if (response.ok) {
            const newLocation = await response.json()
            console.log(newLocation)

            setName('')
            setRoomCount('')
            setCity('')
            setState('')
            setSubmitted(true)
        } else {
            setSubmitted(false)
        }
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new location</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name"
                            required type="text" id="name" className="form-control"
                            name="name" value={name}/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleRoomCountChange} placeholder="Room count"
                            required type="number" id="room_count" className="form-control"
                            name="room_count" value={roomCount}/>
                            <label htmlFor="room_count">Room count</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCityChange} placeholder="City"
                            required type="text" id="city" className="form-control"
                            name="city" value={city}/>
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleStateChange} value={state}
                            required id="state" className="form-select" name="state">
                            <option value="">Choose a state</option>
                            {states.map(state => {
                                return (
                                    <option key={state.abbreviation} value={state.abbreviation}>
                                        {state.name}
                                    </option>
                                )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                {submitted && (
                    <div className="d-flex justify-content-center m-3">
                        <p>Your location was submitted!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LocationForm
