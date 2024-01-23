function createCard(title, description, pictureUrl, start, end, location ) {
  return `
    <div class="card mb-4 shadow">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <h6 class="card-subtitle mb-2 text-secondary">${location}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer">
      <small class="text-body-secondary">${start} - ${end}</small>
    </div>
    </div>
  `;
}

function createAlert(alert) {
  return `
  <div class="alert alert-warning" role="alert">
      ${alert}
  </div>
  `
}

window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log(response)
      const column = document.querySelector('.col')
      column.innerHTML += createAlert("Conferences not available")
    } else {
      const data = await response.json();
      for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            console.log(details)

            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const start = new Date(details.conference.starts).toLocaleDateString()
            const end = new Date(details.conference.ends).toLocaleDateString()
            const location = details.conference.location.name
            const html = createCard(title, description, pictureUrl, start, end, location);
            const column = document.querySelectorAll('.col');
            if (column[0].querySelectorAll('.card').length === column[1].querySelectorAll('.card').length &&
                  column[0].querySelectorAll('.card').length === column[2].querySelectorAll('.card').length) {
                  // All columns have the same number of cards
                  column[0].innerHTML += html;
              } else if (column[0].querySelectorAll('.card').length > column[1].querySelectorAll('.card').length) {
                  column[1].innerHTML += html;
              } else if (column[1].querySelectorAll('.card').length > column[2].querySelectorAll('.card').length) {
                  column[2].innerHTML += html;
              }
          }
        }

      }
  } catch (e) {
      console.error(e);
    createAlert(e)
  }
});
