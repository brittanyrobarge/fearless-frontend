import React, { useEffect, useState } from "react"

function PresentationForm() {

    const [conferences, setConferences] = useState([])
    const [presenterName, setPresenterName] = useState('')
    const [presenterEmail, setPresenterEmail] = useState('')
    const [company, setCompany] = useState('')
    const [title, setTitle] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [conference, setConference] = useState('')
    const [submitted, setSubmitted] = useState('')

    const fetchConferences = async () => {
        const url = "http://localhost:8000/api/conferences/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            setConferences(data.conferences)
        }
    }

    useEffect(() => {
        fetchConferences()
    }, [])

    const handlePresenterNameChange = (e) => {
        const value = e.target.value
        setPresenterName(value)
    }

    const handlePresenterEmailChange = (e) => {
        const value = e.target.value
        setPresenterEmail(value)
    }

    const handleCompanyChange = (e) => {
        const value = e.target.value
        setCompany(value)
    }

    const handleTitleChange = (e) => {
        const value = e.target.value
        setTitle(value)
    }

    const handleSynopsisChange = (e) => {
        const value = e.target.value
        setSynopsis(value)
    }

    const handleConferenceChange = (e) => {
        const value = e.target.value
        setConference(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {}

        data.presenter_name = presenterName
        data.presenter_email = presenterEmail
        data.company_name = company
        data.title = title
        data.synopsis = synopsis

        const presentationUrl = `http://localhost:8000/api/conferences/${conference}/presentations/`
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const response = await fetch(presentationUrl, fetchConfig)
        if (response.ok) {
            const newPresentation = await response.json()
            console.log(newPresentation)

            setPresenterName('')
            setPresenterEmail('')
            setCompany('')
            setTitle('')
            setSynopsis('')
            setConference('')
            setSubmitted(true)
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new presentation</h1>
                    <form onSubmit={handleSubmit} id="create-presentation-form">
                        <div className="form-floating mb-3">
                            <input onChange={handlePresenterNameChange} placeholder="Presenter name"
                            required type="text" id="presenter_name" className="form-control"
                            name="presenter_name" value={presenterName}/>
                            <label htmlFor="presenter_name">Presenter name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePresenterEmailChange} placeholder="Presenter e-mail"
                            required type="email" id="presenter_email" className="form-control"
                            name="presenter_email" value={presenterEmail}/>
                            <label htmlFor="presenter_email">Presenter email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCompanyChange} placeholder="Company name"
                            required type="text" id="company_name" className="form-control"
                            name="company_name" value={company}/>
                            <label htmlFor="company_name">Company name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleTitleChange} placeholder="Title"
                            required type="text" id="title" className="form-control"
                            name="title" value={title}/>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="form mb-3">
                            <textarea onChange={handleSynopsisChange} placeholder="Synopsis"
                            required id="synopsis" className="form-control"
                            name="synopsis" rows="5" value={synopsis}></textarea>
                            <label htmlFor="synopsis">Synopsis</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleConferenceChange} value={conference}
                            required id="conference" className="form-select" name="conference">
                            <option value="">Choose a conference</option>
                            {conferences.map(conference => {
                                return (
                                    <option key={conference.id} value={conference.id}>
                                        {conference.name}
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
                        <p>Your presentation was submitted!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PresentationForm
