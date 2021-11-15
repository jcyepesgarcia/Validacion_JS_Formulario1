const form = document.getElementById('user-form');
const submitButton = document.getElementById('submit-btn');

document.querySelectorAll('.form-box').forEach(
    (box) => {
    const boxInput = box.querySelector('input');

    boxInput.addEventListener('keydown', (event) => {
        console.log(`Input ${boxInput.name} value: `, boxInput.value);
    })
})