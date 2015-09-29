var app = {};

app.lightBoxNav = function lightBoxNav() {
    var navId = this.dataset.target;
    var nav = document.querySelector(navId).cloneNode(true);
    nav.id = 'lightBoxNav';

    var lightBox = document.createElement('div');
    lightBox.classList.add('light-box');
    lightBox.appendChild(nav);
    lightBox.addEventListener('click', function() {
        this.parentElement.removeChild(this);
    });

    document.body.appendChild(lightBox);
}

app.bindEvents = function bindEvents() {
    var navToggle = document.getElementsByClassName('nav-toggle')[0];

    navToggle.addEventListener('click', app.lightBoxNav);
}

app.bindEvents();
