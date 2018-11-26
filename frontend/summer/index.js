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

    axios.post('localhost:3005/summer', data)
        .then(res => {
            console.log(res)
        })
});