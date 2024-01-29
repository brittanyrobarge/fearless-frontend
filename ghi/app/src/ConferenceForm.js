import React, { useEffect, useState } from 'react'


function ConferenceForm() {
    const [locations, setLocations] = useState([])
    const [name, setName] = useState('')
    const [starts, setStarts] = useState('')
    const [ends, setEnds] = useState('')
    const [description, setDescription] = useState('')
    const [maxAttendees, setMaxAttendees] = useState('')
    const [maxPresentations, setMaxPresentations] = useState('')
    const [location, setLocation] = useState('')
    const [submitted, setSubmitted] = useState('')


    const fetchLocations = async () => {
        const url = "http://localhost:8000/api/locations/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
        }
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    const handleNameChange = (e) => {
        const value = e.target.value
        setName(value)
    }

    const handleStartsChange = (e) => {
        const value = e.target.value
        setStarts(value)
    }

    const handleEndsChange = (e) => {
        const value = e.target.value
        setEnds(value)
    }

    const handleDescriptionChange = (e) => {
        const value = e.target.value
        setDescription(value)
    }

    const handleMaxAttendeesChange = (e) => {
        const value = e.target.value
        setMaxAttendees(value)
    }

    const handleMaxPresentationsChange = (e) => {
        const value = e.target.value
        setMaxPresentations(value)
    }

    const handleLocationChange = (e) => {
        const value = e.target.value
        setLocation(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {}

        data.name = name
        data.starts = starts
        data.ends = ends
        data.description = description
        data.max_attendees = maxAttendees
        data.max_presentations = maxPresentations
        data.location = location

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference)

            setName('')
            setStarts('')
            setEnds('')
            setDescription('')
            setMaxAttendees('')
            setMaxPresentations('')
            setLocation('')
            setSubmitted(true)
        } else {
            setSubmitted(false)
        }
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name"
                            required type="text" id="name" className="form-control"
                            name="name" value={name}/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStartsChange} placeholder="Starts"
                            required type="date" id="starts" className="form-control"
                            name="starts" value={starts}/>
                            <label htmlFor="starts">Starts</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEndsChange} placeholder="Ends"
                            required type="date" id="ends" className="form-control"
                            name="ends"value={ends}/>
                            <label htmlFor="ends">Ends</label>
                        </div>
                        <div className="form mb-3">
                            <textarea onChange={handleDescriptionChange} placeholder="Description"
                            required id="description" className="form-control"
                            name="description" rows="5" value={description}></textarea>
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxAttendeesChange} placeholder="Maximum Attendees"
                            required type="number" id="max-attendees" className="form-control"
                            name="max_attendees" value={maxAttendees}/>
                            <label htmlFor="max-attendees">Maximum Attendees</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxPresentationsChange} placeholder="Maximum Presentations"
                            required type="number" id="max-presentations" className="form-control"
                            name="max_presentations" value={maxPresentations}/>
                            <label htmlFor="max-presentations">Maximum Presentations</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleLocationChange} value={location}
                            required id="location" className="form-select"
                            name="location">
                            <option value="">Choose a location</option>
                            {locations.map(location => {
                                return (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
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
                        <p>Your conference was submitted!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ConferenceForm
