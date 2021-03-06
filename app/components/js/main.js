﻿function closeLightbox() {
    var that = document.getElementById('lightbox');

    if(that) {
        that.classList.add('fade-100-0');
        setTimeout(function(){
            that.parentElement.removeChild(that);
        },500);
    }
}

function lightboxClick() {
    closeLightbox();
}

function lightboxKeyup(e) {
    var lightbox = document.getElementById('lightbox');
    if(lightbox) {
        if(e.which === 27) {
            closeLightbox();
        }
        else if(e.which === 9) {
            var focusedLink = document.querySelector('#lightBoxNav .partial-link:focus');

            if(!focusedLink) {
                document.querySelector('#lightBoxNav li:first-child>.partial-link')
                    .focus();
            }
        }
    }
}

function lightbox(innerContent) {
    if(!document.getElementById('lightbox')) {
        var lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.classList.add('light-box');
        lightbox.appendChild(innerContent);
        lightbox.addEventListener('click', lightboxClick);
        document.addEventListener('keyup', lightboxKeyup);

        document.body.appendChild(lightbox);
        lightbox.classList.add('fade-0-100');
    }
}

var app = {};

app.focusFirstLink = function focusFirstLink(e) {
    if(e.which === 9 && !e.shiftKey) {
        setTimeout(function() {
            document.querySelector('#lightBoxNav li:first-child>.partial-link').focus();
        },50);
    }
}

app.focusLastLink = function focusLastLink(e) {
    if(e.which === 9 && e.shiftKey) {
        setTimeout(function() {
            document.querySelector('#lightBoxNav li:last-child>.partial-link').focus();
        },50);
    }
}
app.lightBoxNav = function lightBoxNav() {
    var navId = this.dataset.target;
    var nav = document.querySelector(navId).cloneNode(true);
    nav.id = 'lightBoxNav';
    app.bindRoutes(nav);

    lightbox(nav);

    nav.querySelector('li:first-child>.partial-link').addEventListener('keydown', app.focusLastLink);
    nav.querySelector('li:last-child>.partial-link').addEventListener('keydown', 
            app.focusFirstLink);
};

app.partialEvents = {
    photos: function() {
        carousel();
    }
};

app.loadPartial = function loadPartial(e, name) {
    name = name || this.dataset.target;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            var content = document.getElementById('content');
            content.classList.add('fade-100-0');
            
            setTimeout(function(){
                content.innerHTML = req.responseText;
                content.classList.add('fade-0-100');
                content.classList.remove('fade-100-0');

                if(app.partialEvents[name]) {
                    app.partialEvents[name]();
                }
            }, 750);

        }
        else if (req.readyState === 4) {
            alert('failed');
        }
    };

    req.open('GET','views/' + (name) + '.html');
    req.send();
};

app.bindRoutes = function bindRoutes(node) {
    var partialLinks = node.getElementsByClassName('partial-link');

    for(var i = 0; i < partialLinks.length; i++) {
        partialLinks[i].addEventListener('click', app.loadPartial);
    }
};

app.bindEvents = function bindEvents() {
    var navToggle = document.getElementsByClassName('nav-toggle')[0];
    navToggle.addEventListener('click', app.lightBoxNav);
    app.bindRoutes(document);
};

app.bindEvents();
app.loadPartial(null, 'home');






/*CAROUSEL
===================*/

function carousel() {
    function carouselNext(images) {

        var prevFound = false;

        for(var i = 0; i < images.length; i++) {

            if(images[i].classList.contains('carousel-off-top') && !prevFound) {
                images[i].classList.add('carousel-prev');
                images[i].classList.remove('carousel-off-top');

                prevFound = true;
                var iNextOffTop = i - 1 < 0 ? images.length - 1 : i - 1;

                images[iNextOffTop].classList.add('carousel-off-top');
                images[iNextOffTop].classList.remove('carousel-off-bottom');
                images[iNextOffTop].classList.remove('carousel-off');
            }
            else if(images[i].classList.contains('carousel-prev')) {
                images[i].classList.add('carousel-current');
                images[i].classList.remove('carousel-prev');
            }
            else if(images[i].classList.contains('carousel-current')) {
                images[i].classList.add('carousel-next');
                images[i].classList.remove('carousel-current');
            }
            else if(images[i].classList.contains('carousel-next')) {
                images[i].classList.add('carousel-off-bottom');
                images[i].classList.remove('carousel-next');
            }
            else if(images[i].classList.contains('carousel-off-bottom')) {
                images[i].classList.add('carousel-off');
                images[i].classList.remove('carousel-off-bottom');
            }
        }
    }

    function carouselPrev(images) {

        var nextFound = false;

        for(var i = 0; i < images.length; i++) {

            if(images[i].classList.contains('carousel-off-top')) {
                images[i].classList.add('carousel-off');
                images[i].classList.remove('carousel-off-top');
            }
            else if(images[i].classList.contains('carousel-prev')) {
                images[i].classList.add('carousel-off-top');
                images[i].classList.remove('carousel-prev');
            }
            else if(images[i].classList.contains('carousel-current')) {
                images[i].classList.add('carousel-prev');
                images[i].classList.remove('carousel-current');
            }
            else if(images[i].classList.contains('carousel-next')) {
                images[i].classList.add('carousel-current');
                images[i].classList.remove('carousel-next');
            }
            else if(images[i].classList.contains('carousel-off-bottom') && !nextFound) {
                images[i].classList.add('carousel-next');
                images[i].classList.remove('carousel-off-bottom');

                nextFound = true;
                var iNextOffBottom = i + 1 > images.length - 1 ? 0 : i + 1;

                images[iNextOffBottom].classList.add('carousel-off-bottom');
                images[iNextOffBottom].classList.remove('carousel-off');
                images[iNextOffBottom].classList.remove('carousel-off-top');
            }
        }
    }

    document.getElementById('carouselNavNext')
        .addEventListener('click', function() {
                carouselNext(document.getElementsByClassName('carousel-img'));
            });

    document.getElementById('carouselNavPrev')
        .addEventListener('click', function() {
            carouselPrev(document.getElementsByClassName('carousel-img'));
        });

    var carouselImgs = document.getElementsByClassName('carousel-img');

    for(var i = 0; i < carouselImgs.length; i++) {
        carouselImgs[i].addEventListener('click', function() {
            var src = this.src.replace('/thumbs','');

            var img = document.createElement('img');
            img.src = src;
            img.classList.add('carousel-img-selected');

            lightbox(img);
        });
    }
}













