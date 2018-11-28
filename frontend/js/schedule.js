function init() {
    const inputs = document.querySelectorAll('.selectMe');
    const selectTag = document.querySelector('select');

    selectTag.addEventListener('click', function(event) {
        const target = event.target;
        event.target.classList.add('focused');
        // console.log(target.nodeName);
        //
        // target.parentNode.style =
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
            event.target.classList.remove('empty')
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
            return
        }

        axios.post('/summer/addTour', data)
            .then(res => {
                console.log(res)
            })

        // inputName
        // let link = null
        // axios.post('/tours/findByName', inputName.value)
        //     .then(res => {
        //         link = res.link
        //     })
        // selector.value
        // data.link = link

        // axios.post('/schedule/addTour', data)
        //     .then(res => {
        //         console.log(res)
        //     })
    });
}
init();