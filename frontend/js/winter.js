function init() {
    const inputs = document.querySelectorAll('.selectMe');

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

    const form = document.querySelector('form');

    form.addEventListener('submit', () => {
        event.preventDefault();

        const data = [].reduce.call(inputs, (acc, input) => {
            acc[input.id] = input.value;
            return acc;
        }, {});

        const emptyElems = Object.keys(data).filter(key => {
            if (!data[key]) {
                document.querySelector(`#${key}`).classList.add('empty');

                document.querySelector(`#${key}`).style.animation = 'shake .3s .5s';
                document.querySelector(`#${key}`).parentNode.querySelector('label').style.animation = 'shake .3s .5s';
                setTimeout(function() {
                    document.querySelector(`#${key}`).style.animation = '';
                    document.querySelector(`#${key}`).parentNode.querySelector('label').style.animation = '';
                }, 850);

                return key;
            }
        });

        if (emptyElems.length) {
            const elemsCoords = [].map.call(document.querySelectorAll('.empty'), item => {
                return item = window.pageYOffset + item.parentNode.getBoundingClientRect().top;
            });
            window.scrollTo(null, Math.min.apply(null, elemsCoords));
            return;
        }

        axios.post('/summer/addTour', data)
            .then(res => {
                console.log(res)
            })
    });
}
init();


let timer = null;

const lengthInput = document.querySelector('#tourLength');

lengthInput.addEventListener('input', function() {
    clearTimeout(timer);
    const value = event.target.value;
    const maxDays = 20;
    const backspaceEvent = event.inputType === 'deleteContentBackward';
    const delay = backspaceEvent && 5000 || 300;

    timer = setTimeout(() => {
        const form = document.querySelector('form');
        const days = document.querySelectorAll('.day');
        days.forEach((day, i) => {
            const innerV = day.querySelector('textarea').value;
            if (innerV && i < value) {
                return
            }
            form.removeChild(day)
        });

        function generateDiv(i) {
            const div = document.createElement('div');
            const textarea = document.createElement('textarea');
            const label = document.createElement('label');

            div.classList += 'day field';
            textarea.classList += 'selectMe msg';
            textarea.setAttribute('rows', 4);
            textarea.setAttribute('autocomplete', 'off');
            textarea.setAttribute('placeholder', 'Завтрак. Сплав по реке Укса...');
            textarea.setAttribute('id', `day${i}`);

            label.setAttribute('for', `day${i}`);
            label.innerHTML = `День ${i}`;

            div.appendChild(textarea);
            div.appendChild(label);
            return div;
        }

        for (let i = 1; i <= value; i++) {
            if (i > maxDays) {
                break;
            }
            form.insertBefore(generateDiv(i), document.querySelector('input[type="submit"]'));
        }
        init();

    }, delay);

});