function init() {
    const inputs = document.querySelectorAll('.selectMe');

    inputs.forEach(function(input) {
        input.addEventListener('blur', function(e) {
            // console.log(e);
            const target = e.target;
            if (target.value) {
                target.classList.add('focused');
            } else {
                target.classList.remove('focused');
            }
        })
        input.addEventListener('input', () => {
            event.target.classList.remove('empty')
        })
    });

    const form = document.querySelector('form')

    form.addEventListener('submit', () => {
        event.preventDefault();

        const data = [].reduce.call(inputs, (acc, input) => {
            acc[input.id] = input.value;
            return acc;
        }, {});

        const emptyElems = Object.keys(data).filter(key => {
            if (!data[key]) {
                document.querySelector(`#${key}`).classList.add('empty');
                return key;
            }

        })

        if (emptyElems.length) {
            return
        }

        axios.post('http://localhost:3005/summer/addTour', data)
            .then(res => {
                console.log(res)
            })
    });
}
init()


let timer = null

const lengthInput = document.querySelector('#tourLength');

lengthInput.addEventListener('input', function() {
    clearTimeout(timer)
    const value = event.target.value;
    const maxDays = 20;
    const backspaceEvent = event.inputType === 'deleteContentBackward'
    const delay = backspaceEvent && 5000 || 300;

    timer = setTimeout(() => {
        const form = document.querySelector('form')
        const days = document.querySelectorAll('.day')
        days.forEach((day, i) => {
            const v = day.querySelector('textarea').value
            if (v && i < value) {
                return
            }
            form.removeChild(day)
        })

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

        for (var i = 1; i <= value; i++) {
            if (i > maxDays) {
                return;
            }
            form.insertBefore(generateDiv(i), document.querySelector('input[type="submit"]'));
        }
        init();

    }, delay);

});