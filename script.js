// bien URL va bien chua the div
const URL = 'https://68c763d05d8d9f514731bd90.mockapi.io/api/test1/building';
const slider = document.getElementById('projectsSlider');

// bien luu index hien tai va mang cac the div
let viTriHienTai = 0;
let chieuDaiHienThi = 0;
let soAnhHienThi = 3; // hien 3 anh
let tongSoAnh = 0;

fetch(URL)
    .then(response => response.json())
    .then(data => {
        let htmlContent = ''; // khai báo ngoài vòng forEach

        data.forEach((element, index) => {
            const { name, image, address } = element;

            htmlContent += `
        <div class="project-card">
          <div class="card-image">
            <img src="${image}" alt="${name}">
          </div>
          <div class="card-content">
            <h3 class="project-title">${name}</h3>
            <div class="project-location">
              <i class="bi bi-geo-alt"></i>
              <span>${address}</span>
            </div>
          </div>
        </div>
      `;
        });

        // chen html vao div
        slider.innerHTML = htmlContent;

        // cap nhat thong so
        const card = slider.querySelector('.project-card');
        if (card) {
            chieuDaiHienThi = card.offsetWidth + 32; // gap 32px
            tongSoAnh = data.length;
        }
    })
    .catch(error => console.error('Error fetching data:', error));

// Prev
document.getElementById('prevBtn').addEventListener('click', () => {
    if (viTriHienTai > 0) {
        viTriHienTai--;
        updateSlider();
    }
});

// Next
document.getElementById('nextBtn').addEventListener('click', () => {
    const viTriToiDa = Math.ceil(tongSoAnh / soAnhHienThi) - 1;
    if (viTriHienTai < viTriToiDa) {
        viTriHienTai++;
        updateSlider();
    }
});

// ham cap nhat vi tri slider
function updateSlider() {
    const offset = viTriHienTai * chieuDaiHienThi * soAnhHienThi;
    slider.style.transform = `translateX(-${offset}px)`;
}
