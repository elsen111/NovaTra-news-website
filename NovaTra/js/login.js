// HTML ELEMENTS
const eventElement = document.querySelector('.event-element');
const input = document.querySelector('.event-input');
const wrapper = document.querySelector('.wrapper');
const linkButtons = document.querySelectorAll('.form-link');
const formContainer = document.querySelector('.form-container');
const heading = document.querySelector('.login-para');





// FUNCTIONS
// Show/Hide Password
eventElement.addEventListener('click', () => {
    if (input.type == 'password') {
        input.type = 'text';
    } else {
        input.type = 'password'
    }
    eventElement.classList.toggle('fa-eye-slash')
});


// Go from login page to sign-up page and vice-verca
linkButtons.forEach(element => {
    element.addEventListener('click', () => {
        if (element.classList.contains('login-link')) {
            wrapper.classList.add('login-wrapper');
            wrapper.classList.remove('sign-up-wrapper');
            heading.textContent = 'Sign In'
        } else {
            wrapper.classList.remove('login-wrapper');
            wrapper.classList.add('sign-up-wrapper');
            heading.textContent = 'Sign Up'
        }
    })
})