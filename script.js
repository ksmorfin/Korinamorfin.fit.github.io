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

let comments = [];

function renderComments() {
    commentsContainer.innerHTML = "";
    comments.forEach((comment, index) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");

        commentElement.innerHTML = `
            <p><strong>${comment.name}</strong></p>
            <p>${comment.email}</p>
            <p>${comment.phone}</p>
            <p>${comment.country}</p>
            <p>${comment.occupation}</p>
            <p>${comment.instagramaccount}</p>
            <small>${comment.date}</small>
            <button type="button" class="delete-btn" data-index="${index}">Delete</button>
        `;

        commentsContainer.appendChild(commentElement);
    });
}

countryCode.addEventListener("change", function () {
    phoneInput.placeholder = this.value + " ";
});

commentsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        
        const index = e.target.dataset.index;

        comments.splice(index, 1);
        
        localStorage.setItem("comments", JSON.stringify(comments));

        renderComments();
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.full_name.value;
    const email = form.email.value;
    const prefix = countryCode.value;
    const phoneNumber = form.phone.value;
    const fullPhone = prefix + phoneNumber;
    const country = form.country.value;
    const occupation = form.occupation.value;
    const instagramaccount = form.instagramaccount.value;

    if (!occupation.trim()) return;

    const date = new Date();
    const formattedDate = date.toLocaleString();

    const newComment = {
        name: name,
        email: email,
        phone: fullPhone,
        country: country,
        occupation: occupation,
        instagramaccount: instagramaccount,
        date: formattedDate
    };

comments.push(newComment);

localStorage.setItem("comments", JSON.stringify(comments));

renderComments();

form.reset();

});

const savedComments = localStorage.getItem("comments");

if (savedComments) {
    comments = JSON.parse(savedComments);
    renderComments();
}