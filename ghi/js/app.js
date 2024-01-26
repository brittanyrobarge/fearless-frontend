function createCard(dates, title, description, pictureUrl, location) {
  return `
       <div class="card mb-4 shadow-lg">
          <img src="${pictureUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
            <p class="card-text">${description}</p>
          </div>
              <div class="card-footer">
              <p>${dates.starts} - ${dates.ends}</p>
              </div>
          </div>
  `;
}


window.addEventListener('DOMContentLoaded', async () => {
  const url ='http://localhost:8000/api/conferences/';

  try {
      const response = await fetch(url);
      if (!response.ok) {
          const rowTag = document.querySelector(".row");
          const errorHtml = `<div class="alert alert-danger" role="alert">
          Your URL is bad
        </div>`
          rowTag.innerHTML = errorHtml;
      } else {
          const data = await response.json();

          for (let index=0; index< data.conferences.length; index++) {
              const conference = data.conferences[index];

              const detailURL = `http://localhost:8000${conference.href}`;
              const detailResponse = await fetch(detailURL);

              if (detailResponse.ok) {
                  const details = await detailResponse.json();
                  const title = details.conference.name;
                  const description = details.conference.description;
                  const pictureUrl = details.conference.location.picture_url;
                  const startDate = new Date(details.conference.starts).toLocaleDateString();
                  const endDate = new Date(details.conference.ends).toLocaleDateString();
                  const location = details.conference.location.name;
                  const html = createCard({starts: startDate, ends: endDate}, title, description, pictureUrl, location);
                  // const column = document.querySelector(".row.g-2");
                  // column.innerHTML += html;

                  const col_index = index % 3;
                  const columns = document.querySelectorAll(".col");
                  columns[col_index].innerHTML += html;
              }


          }
      }
  } catch (error) {
      const rowTag = document.querySelector(".row");
          const errorHtml = `<div class="alert alert-danger" role="alert">
          ${error}
        </div>`
      rowTag.innerHTML = errorHtml;
  }

});
