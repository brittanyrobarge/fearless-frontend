window.addEventListener('DOMContentLoaded', async () => {

    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();

        const conferenceTag = document.getElementById('conference');

        for (const conference of data.conferences) {
            const conferenceName = conference.name;
            const conferenceID = conference.id;

            const option = document.createElement('option');
            option.value = conferenceID;
            option.innerHTML = conferenceName;

            conferenceTag.appendChild(option)
        }
    }

    const conferenceTag = document.getElementById('conference');
    let conferenceID = '';
    conferenceTag.addEventListener('change', async event => {
        conferenceID = conferenceTag.options[conferenceTag.selectedIndex].value;
    });

    const formTag = document.getElementById('create-presentation-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const presentationUrl = `http://localhost:8000/api/conferences/${conferenceID}/presentations/`;
        const fetchConfig = {
            method: 'post',
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newPresentation = await response.json();
        }
    });
});
