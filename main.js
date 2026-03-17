

document.addEventListener('DOMContentLoaded', () => {

    const menu      = document.getElementById('menu');
    const close     = document.getElementById('close');
    const nav       = document.getElementById('navigation');
    const header    = document.getElementById('header');

    
    if (menu && nav) {
        menu.addEventListener('click', () => nav.classList.add('active'));
    }
    if (close && nav) {
        close.addEventListener('click', () => nav.classList.remove('active'));
    }

    
    if (nav) {
        nav.querySelectorAll('.link').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('active'));
        });
    }

    
    window.addEventListener('scroll', () => {
        if (nav) nav.classList.remove('active');

        
        if (header) {
            header.classList.toggle('shadow', window.scrollY > 0);
        }
    });

});