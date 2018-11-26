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
});

const form = document.querySelector('form')

form.addEventListener('submit', () => {
    event.preventDefault();

    ///validator////////////////////////////////////////////////////////////////
    const emptyElems = [];
    inputs.forEach((item, i) => {
        if (item.classList.contains('empty')) item.classList.remove('empty');
        if (!item.classList.contains('focused')) emptyElems.push(item);

        item.parentNode.querySelector('.fa-exclamation').style.display = 'none';
        item.parentNode.querySelector('.left-warn').style.display = 'none';

    });

    if (emptyElems.length !== 0) {
        emptyElems.forEach((item, i) => {
            item.parentNode.querySelector('.fa-exclamation').style.display = '';
            item.parentNode.querySelector('.left-warn').style.display = '';

            item.classList.add('empty');
            // item.classList.add('focused');
        });
        return;
    }

    ////////////////////////////////////////////////////////////////////////////


    const data = [].reduce.call(inputs, (acc, input) => {
        acc[input.id] = input.value;
        return acc;
    }, {});

});