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
    event.preventDefault()

    const data = [].reduce.call(inputs, (acc, input) => {
        acc[input.id] = input.value;
        return acc;
    }, {});
    // 
    // data.forEach((item, i) => {
    //     ifdata[i]
    // })

})