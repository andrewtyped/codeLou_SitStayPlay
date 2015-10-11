var app = {};

app.lightBoxNav = function lightBoxNav() {
    var navId = this.dataset.target;
    var nav = document.querySelector(navId).cloneNode(true);
    nav.id = 'lightBoxNav';

    var lightBox = document.createElement('div');
    lightBox.classList.add('light-box');
    lightBox.appendChild(nav);
    lightBox.addEventListener('click', function() {
        var that = this;
        this.classList.add('fade-80-0');
        setTimeout(function(){
            
            that.parentElement.removeChild(that);
        },500);
    });

    document.body.appendChild(lightBox);
    lightBox.classList.add('fade-0-80');
}

app.loadPartial = function loadPartial() {

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            var content = document.getElementById('content');
            content.innerHTML = req.responseText;
        }
        else if (req.readyState === 4) {
            alert('failed');
        }
    };

    req.open('GET','views/' + this.dataset.partial + '.html');
    req.send();
}

app.bindEvents = function bindEvents() {
    var navToggle = document.getElementsByClassName('nav-toggle')[0];
    navToggle.addEventListener('click', app.lightBoxNav);

    var partialLinks = document.getElementsByClassName('partial-link');

    for(var i = 0; i < partialLinks.length; i++) {
        partialLinks[i].addEventListener('click', app.loadPartial);
    }
}

app.bindEvents();
