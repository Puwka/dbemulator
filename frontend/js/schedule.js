const inputs = document.querySelectorAll('.selectMe');
const selectTag = document.querySelector('select');
const dateInputs = document.querySelectorAll('input[type="date"]');
const form = document.querySelector('form');

function shakeError(elem) {
    elem.classList.add('empty');
    elem.style.animation = 'shake .3s .5s';
    elem.parentNode.querySelector('label').style.animation = 'shake .3s .5s';
    setTimeout(function() {
        elem.style.animation = '';
        elem.parentNode.querySelector('label').style.animation = '';
    }, 850);
}

selectTag.addEventListener('click', function(event) { //special event for <select>
    event.target.classList.add('focused');
});

inputs.forEach(function(input) {
    input.addEventListener('blur', function(e) {
        const target = e.target;
        if (target.value) {
            target.classList.add('focused');
        } else {
            target.classList.remove('focused');
        }
    });
    input.addEventListener('input', () => {
        event.target.classList.remove('empty');
    })
});

document.querySelector('input[type="submit"]').addEventListener('click', function() { //Удаляем системную ошибку при сабмите
    dateInputs.forEach(function(input) {
        input.removeAttribute("required");
    });
})

document.querySelector('.title-box input').addEventListener('blur', function() { //Отправка запроса на получение линка
    let link = null;


    axios.post('/tours/findByName', document.querySelector('.title-box input').value)
        .then(res => {
            link = res.link;
            document.querySelector('.title-box input').classList.remove('empty');

            data.link = link;
        })
        .catch(e => { //error handling
            shakeError(document.querySelector('.title-box input'));
        });
});

form.addEventListener('submit', () => {
    event.preventDefault();

    dateInputs.forEach(function(input) { // снова добавляем атрибут, чтобы не было крестика справа
        input.setAttribute("required", "required");
    });

    const data = [].reduce.call(inputs, (acc, input) => {
        acc[input.id] = input.value;
        return acc;
    }, {});

    const emptyElems = Object.keys(data).filter(key => {
        if (!data[key]) {
            const elem = document.querySelector(`#${key}`);

            elem.classList.add('empty');
            shakeError(elem);

            if (document.querySelector('.title-box input').classList.contains('empty')) { //Чисто для тряски тайтла
                shakeError(document.querySelector('.title-box input'));
            };

            return key;
        };
    });


    if (emptyElems.length) {
        const elemsCoords = [].map.call(document.querySelectorAll('.empty'), item => {
            return item = window.pageYOffset + item.parentNode.getBoundingClientRect().top;
        });
        window.scrollTo(null, Math.min.apply(null, elemsCoords));

        return;
    }

    axios.post('/schedule/addTour', data)
        .then(res => {
            console.log(res);
        });

});