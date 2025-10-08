const URL = 'https://68c763d05d8d9f514731bd90.mockapi.io/api/test1/building';
const slider = document.getElementById('projectsSlider');

let viTriHienTai = 0;
const soAnhHienThi = 3; // hien 3 anh
let chieuDaiAnh = 0; // cua 1 anh
let khoangCach = 0;

fetch(URL)
	.then(response => response.json())
	.then(data => {
		let htmlContent = '';
		
		data.forEach(({ name, image, address }) => {
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
		
		slider.innerHTML = htmlContent;
		
		// lay chieu rong the dau tien lam tieu chuan
		const card = slider.querySelector('.project-card');
		// lay gap trong file css
		const styles = window.getComputedStyle(slider);
		// theo ChatGPT thi trinh duyet cu chi ho tro columnGap nen check ca 2
		khoangCach = parseFloat(styles.columnGap || styles.gap || 0);
		// chieu rong thuc te + tong chieu dai cua khoang cach giua cac anh
		chieuDaiAnh = card.offsetWidth + khoangCach;
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
	const viTriToiDa = Math.ceil(slider.children.length / soAnhHienThi) - 1;
	if (viTriHienTai < viTriToiDa) {
		viTriHienTai++;
	} else {
		viTriHienTai = 0; // quay ve dau
	}
	updateSlider();
});

// ham cap nhat vi tri slider
function updateSlider() {
	const offset = viTriHienTai * chieuDaiAnh * soAnhHienThi;
	slider.style.transform = `translateX(-${offset}px)`;
}

// CONTACT US //
const submitBtn = document.getElementById('submitBtn');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const contactForm = document.getElementById('description');

// ham kiem tra email
function mailHopLe(email) {
	const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!regexMail.test(email)) {
		throw new Error('Email không hợp lệ');
	}
	return true;
}

// ham kiem tra so dien thoai
function soDienThoaiHopLe(phone) {
	const regexPhone = /^\+?[0-9]{10,}$/;
	if (!regexPhone.test(phone)) {
		throw new Error('Số điện thoại không hợp lệ');
	}
	return true;
}

// xu ly su kien khi submit form
submitBtn.addEventListener('click', function(event) {
  try {
	  // .trim() loai bo khoang trang
	  if (!firstNameInput.value.trim()) {
		  throw new Error('Vui lòng nhập tên');
	  }
	  if (!lastNameInput.value.trim()) {
		  throw new Error('Vui lòng nhập họ');
	  }
	  // kiem tra email va so dien thoai bang regex
	  mailHopLe(emailInput.value);
	  soDienThoaiHopLe(phoneInput.value);
	  
	  if (!contactForm.value.trim()) {
		  throw new Error('Vui lòng nhập nội dung liên hệ');
	  }
	  alert('Gửi liên hệ thành công!');
	  
	  // reset form ve trang thai ban dau bang cach gan chuoi rong bang .value
	  firstNameInput.value = '';
	  lastNameInput.value = '';
	  emailInput.value = '';
	  phoneInput.value = '';
	  contactForm.value = '';
	  
  } catch (error) {
    alert(error.message);
  }
});