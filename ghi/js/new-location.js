window.addEventListener('DOMContentLoaded', async () => {

    const url = "http://localhost:8000/api/states/";
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();

        const stateTag = document.getElementById('state');

        for (const state of data.states) {
            const stateName = state.name;
            const stateAbbreviation = state.abbreviation;

            const option = document.createElement('option');
            option.value = stateAbbreviation;
            option.innerHTML = stateName;

            stateTag.appendChild(option);
        }
    }

    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: 'post',
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
        }
    });
});
