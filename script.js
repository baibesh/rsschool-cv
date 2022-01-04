// Слушатель на движение мышки
document.addEventListener('mousemove', bgImg);

document.getElementById('homeNav').classList.add('active');

const bgElem = document.querySelector('#bg_img');

// Страница по умолчанию
let page = 'home';

switchContent(page)

function bgImg(e) {
    bgElem.style.backgroundPosition = `calc(50% - ${e.clientX * 0.02}px) calc(50% - ${e.clientY * 0.02}px)`
}

function switchContent(content) {
    // Переключение active в навигации
    switchActiveNav(content)

    // меняем значение страницы по умолчанию
    page = content;

    // Добавляем анимацию
    changeAnimation();

    // Рисуем страницу
    drawPage();
}

function switchActiveNav(newPage) {
    if (newPage !== page) {
        document.getElementById(`${page}Nav`).classList.remove('active');
        document.getElementById(`${newPage}Nav`).classList.add('active');
    }
}

function changeAnimation() {
    // Берем все классы root в виде массива
    const currentClasses = document.getElementById('root').className.split(' ');

    // Чистим классы из root
    document.getElementById('root').className = '';

    const allAnimationClasses = ['slideInDown', 'slideInRight', 'flipInX'].filter(item => currentClasses.indexOf(item) === -1);

    const id = Math.ceil(Math.random() * allAnimationClasses.length)

    // Добавляем новые классы в root
    document.getElementById('root').classList.add('container', 'animated', allAnimationClasses[id - 1]);
}

function drawPage() {
    var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', `pages/${page}.html`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("root").innerHTML = xhr.responseText;
        }
    }
    xhr.send();
}
