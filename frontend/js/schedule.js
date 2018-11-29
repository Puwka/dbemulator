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

function showAlert(answer) { // alert
    if (answer) {
        document.querySelector('.success').style.animation = '10s .5s alertAppearance';
        setTimeout(() => {
            document.querySelector('.success').style.animation = 'none'
        }, 12000);
    } else {
        document.querySelector('#name').classList.add('empty');
        document.querySelector('.error').style.animation = '10s .5s alertAppearance';
        setTimeout(() => {
            document.querySelector('.error').style.animation = 'none';
        }, 12000);
    }

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
        })
        .catch(err => {
            showAlert(false);
        });

});