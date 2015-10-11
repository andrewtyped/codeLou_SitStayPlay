var app = {};

app.lightBoxNav = function lightBoxNav() {
    var navId = this.dataset.target;
    var nav = document.querySelector(navId).cloneNode(true);
    nav.id = 'lightBoxNav';
    app.bindRoutes(nav);

    var lightBox = document.createElement('div');
    lightBox.classList.add('light-box');
    lightBox.appendChild(nav);
    lightBox.addEventListener('click', function() {
        var that = this;
        that.classList.add('fade-80-0');
        setTimeout(function(){
            
            that.parentElement.removeChild(that);
        },500);
    });

    document.body.appendChild(lightBox);
    lightBox.classList.add('fade-0-80');
}

app.loadPartial = function loadPartial(e, name) {

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

    req.open('GET','views/' + (name || this.dataset.target) + '.html');
    req.send();
}

app.bindRoutes = function bindRoutes(node) {
    var partialLinks = node.getElementsByClassName('partial-link');

    for(var i = 0; i < partialLinks.length; i++) {
        partialLinks[i].addEventListener('click', app.loadPartial);
    }
}

app.bindEvents = function bindEvents() {
    var navToggle = document.getElementsByClassName('nav-toggle')[0];
    navToggle.addEventListener('click', app.lightBoxNav);
    app.bindRoutes(document);
}

app.bindEvents();
app.loadPartial(null, 'home');
