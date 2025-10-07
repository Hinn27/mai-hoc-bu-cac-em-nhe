const URL = 'https://68c763d05d8d9f514731bd90.mockapi.io/api/test1/building'
const nha = document.getElementById('projectsSlider');

fetch(URL)
    .then(response => response.json())
    .then(data => {
        data.forEach((element, index) => {
            const {name, image, address} = element;

            // neu la item dau tien thi them class active
            let activeClass = index === 0 ? 'active' : '';

            // html mau
            let htmlContent = `
            <div class="project-card ${activeClass}">
                <div class="card-image">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="card-content">
                    <h3 class="project-title"> ${name}</h3>
                    <div class="project-location">
                        <i class="bi bi-geo-alt"></i>
                        <span>${address}</span>
                    </div>
                </div>
            </div>
            `;

            // them html phan tu chua
            nha.innerHTML += htmlContent;
        });
    })
    .catch(error => console.error('Error fetching data:', error));