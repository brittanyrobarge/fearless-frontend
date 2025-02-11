window.addEventListener('DOMContentLoaded', async () => {

  function createCard(name, description, location, pictureUrl, starts, ends) {
      return `
          <div class="col-4">
              <div class="card shadow mb-2">
                  <img src="${pictureUrl}" class="card-img-top">
                  <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <h6 class='card-subtitle mb-2 text-muted'>${location}</h6>
                      <p class="card-text">${description}</p>
                  </div>
                  <div class='card-footer'>
                      <p style='text-align: center; margin: 0;'>${starts.toLocaleDateString()} - ${ends.toLocaleDateString()}</p>
                  </div>
              </div>
          </div>
      `;
  }
  
  
      try {
          const url = 'http://localhost:8000/api/conferences/';
          const response = await fetch(url);
  
          if (!response.ok) {
              return alert(
                  `${response.status}: ${response.url} ${response.statusText}`
              );
          } else {
              const data = await response.json();
  
              for (let conference of data.conferences) {
                  const detailUrl = `http://localhost:8000${conference.href}`;
                  const detailResponse = await fetch(detailUrl);
                  if (detailResponse.ok) {
                      const details = await detailResponse.json();
                      const name = details.conference.name;
                      const description = details.conference.description;
                      const location = details.conference.location.name;
                      const pictureUrl = details.conference.location.picture_url;
                      const starts = new Date(details.conference.starts);
                      const ends = new Date(details.conference.ends);
                      const html = createCard(name, description, location, pictureUrl, starts, ends);
                      const row = document.querySelector('.row');
                      row.innerHTML += html;
                  }
              }
  
          }
      } catch (e) {
          console.error(e)
      }
  
  });
  