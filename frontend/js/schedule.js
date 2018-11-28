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

function showAlert(answer) { // catcher
    const errorElem = document.querySelector('.alert');

    if (answer) {
        errorElem.innerHTML = 'Успех!';
        errorElem.style.backgroundColor = "#5CB811";
        errorElem.style.border = "2px solid rgba(92,184,17,.9)";
    } else {
        errorElem.innerHTML = 'Имя тура не найдено :(';
        errorElem.style.backgroundColor = "#FE1A00";
        errorElem.style.border = "2px solid rgba(254,26,0,.9)";

        document.querySelector('#name').classList.add('empty');
    }
    errorElem.style.display = "block";
    errorElem.style.top = document.documentElement.clientHeight - errorElem.clientHeight - 10 + 'px';
    errorElem.style.left = document.documentElement.clientWidth - errorElem.offsetWidth - 10 + 'px';

    setTimeout(() => {
        errorElem.style.display = "none";
    }, 8000)
};

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


form.addEventListener('submit', () => {
    event.preventDefault();

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
        const emptyNode = document.querySelector('.empty');
        const coords = window.pageYOffset + emptyNode.parentNode.getBoundingClientRect().top - 15;
        window.scrollTo(null, coords);
        return;
    }

    axios.post('/schedule/addTour', data)
        .then(res => {
            showAlert(true);
            console.log(res);
        })
        .catch(err => {
            showAlert(false);

            console.log(1);
            console.log(err.response);

        });

});