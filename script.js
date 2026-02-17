const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation a');

// Abrir / cerrar menú
toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Cerrar menú
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Carousel functionality
const track = document.querySelector('.carousel-track');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

btnRight.addEventListener('click', () => {
    track.scrollLeft += 300;
});

btnLeft.addEventListener('click', () => {
    track.scrollLeft -= 300;
});

// ----------------------
// FORM + COMMENT BOX FUNCTIONALITY
// ----------------------

const form = document.querySelector("#comment-form");
const commentsContainer = document.querySelector("#commentscontainer");
const countryCode = document.getElementById("country-code");
const phoneInput = document.getElementById("phone");

countryCode.addEventListener("change", function () {
    phoneInput.placeholder = this.value + " ";
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

commentsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        e.target.closest(".comment").remove();
    }
});

    const name = form.full_name.value;
    const email = form.email.value;
    const prefix = countryCode.value;
    const phoneNumber = form.phone.value;
    const fullPhone = prefix + phoneNumber;
    const country = form.country.value;
    const occupation = form.occupation.value;
    const instagramaccount = form.instagramaccount.value;

    if (!occupation.trim()) return;

    const comment = document.createElement("div");
    comment.classList.add("comment");

    const date = new Date();
    const formattedDate = date.toLocaleString();

    comment.innerHTML = `
        <p><strong>${name}</strong></p>
        <p>${email}</p>
        <p>${fullPhone}</p>
        <p>${country}</p>
        <p>${occupation}</p>
        <p>${instagramaccount}</p>
        <small>${formattedDate}</small>
        <button type="button" class="delete-btn">Delete</button>
    `;

    commentsContainer.appendChild(comment);
    form.reset();
});