let form_errors = [];

const contactForm = document.getElementById('contact-form');
if(contactForm) {
    const errorMessage = document.getElementById('error-message');

    const userName = contactForm.elements['name'];
    const userEmail = contactForm.elements['email'];
    const userSubject = contactForm.elements['subject'];
    const userMessage = contactForm.elements['message'];


    contactForm.addEventListener('submit', function(event) {    
        errorMessage.textContent = '';

        userName.setCustomValidity("");
        if (!userName.checkValidity()) {
            let tellUser = '';
            if (userName.validity.valueMissing) {
                tellUser = "Please enter your name!";
            } 
            else if (userName.validity.tooShort || userName.validity.tooLong) {
                tellUser = "Your name must be between 2 and 15 characters long!";
            } 
            else if (userName.validity.patternMismatch) {
                tellUser = "Your name can only have letters, spaces, apostrophes, and hyphens!";
            }
            userName.setCustomValidity(tellUser);
            userName.reportValidity();

            form_errors.push({
                field: 'name',
                enteredValue: userName.value,
                message: tellUser
            })

            event.preventDefault();
            return;
        } 
        else {
            userName.setCustomValidity("");
        }

        userEmail.setCustomValidity("");
        if (!userEmail.checkValidity()) {
            let tellUser = '';
            if (userEmail.validity.valueMissing) {
                tellUser = "Please enter your email!";
            } 
            else if (userEmail.validity.typeMismatch || userEmail.validity.patternMismatch) {
                tellUser = "Your email address must follow the form 'sakammula@ucsd.edu'!";
            }
            userEmail.setCustomValidity(tellUser);
            userEmail.reportValidity();

            form_errors.push({
                field: 'email',
                enteredValue: userEmail.value,
                message: tellUser
            })

            event.preventDefault();
            return;
        } 
        else {
            userEmail.setCustomValidity("");
        }

        userSubject.setCustomValidity("");
        if (!userSubject.checkValidity()) {
            let tellUser = '';
            if (userSubject.validity.valueMissing) {
                tellUser = "Please enter your message subject!";
            } 
            else if (userSubject.validity.tooShort || userSubject.validity.tooLong) {
                tellUser = "Your subject line must be between 2 and 50 characters long!";
            } 
            userSubject.setCustomValidity(tellUser);
            userSubject.reportValidity();

            form_errors.push({
                field: 'subject',
                enteredValue: userSubject.value,
                message: tellUser
            })

            event.preventDefault();
            return;
        } 
        else {
            userSubject.setCustomValidity("");
        }

        userMessage.setCustomValidity("");
        if (!userMessage.checkValidity()) {
            let tellUser = '';
            if (userMessage.validity.valueMissing) {
                tellUser = "Please enter a message!";
            } 
            else if (userMessage.validity.tooShort || userMessage.validity.tooLong) {
                tellUser = "Your message must be between 2 and 500 characters long!";
            }
            userMessage.setCustomValidity(tellUser); 
            userMessage.reportValidity();

            form_errors.push({
                field: 'message',
                enteredValue: userMessage.value,
                message: tellUser
            })       

            event.preventDefault();
            return;
        } 
        else {
            userMessage.setCustomValidity("");
        }

        document.getElementById('form-errors').value = JSON.stringify(form_errors);

    });


    const nameAllowedPattern = /^[A-Za-zÀ-ž\s'\-]+$/;
    userName.addEventListener('input', function() { 
        const enteredName = userName.value;
        if(!nameAllowedPattern.test(enteredName)) {
            userName.classList.add('flash');
            errorMessage.textContent = "Invalid character! Your name can only have letters, spaces, apostrophes, and hyphens!";
            setTimeout(() => {
                userName.classList.remove('flash');
                errorMessage.textContent = '';
            }, 1000);
        }
    });

    const emailAllowedChars = /^[a-zA-Z0-9._%+\-@]*$/;
    userEmail.addEventListener('input', function () {
        const enteredEmail = userEmail.value;
        if (!emailAllowedChars.test(enteredEmail)) {
            userEmail.classList.add('flash');
            errorMessage.textContent = "Invalid character! Email can only contain letters, numbers, ., _, %, +, -, and @";
            setTimeout(() => {
                userEmail.classList.remove('flash');
                errorMessage.textContent = '';
            }, 1000);
        }
    });

    const countdown = document.getElementById('info-message');
    const maxMessageLength = userMessage.maxLength;

    // Initial text
    countdown.textContent = `You have ${maxMessageLength} message characters left!`;

    userMessage.addEventListener('input', function() {
        const remainingChars = maxMessageLength - userMessage.value.length;
        countdown.textContent = `You have ${remainingChars} message characters left!`;

        // Remove any previous limit classes
        countdown.classList.remove('normal-limit', 'warning-limit', 'error-limit');

        // Apply the correct class
        if (remainingChars <= 250 && remainingChars > 0) {
            countdown.classList.add('warning-limit');
        } else if (remainingChars <= 0) {
            countdown.classList.add('error-limit');
        } else {
            countdown.classList.add('normal-limit');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const changeThemeButton = document.getElementById('changeTheme');
    const body = document.body;

    // Function to apply the stored theme
    const applyTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            body.classList.add('darkMode');
        } else {
            body.classList.remove('darkMode');
        }

        // Update button text if button exists
        if (changeThemeButton) {
            changeThemeButton.textContent = body.classList.contains('darkMode') ? '🌙' : '☀️';
        }
    };

    // Apply theme on page load
    applyTheme();

    // Only attach click listener if the button exists
    if (changeThemeButton) {
        changeThemeButton.addEventListener('click', () => {
            body.classList.toggle('darkMode'); // toggle class
            localStorage.setItem(
                'theme',
                body.classList.contains('darkMode') ? 'dark' : 'light'
            );

            // Update button text
            changeThemeButton.textContent = body.classList.contains('darkMode') ? '🌙' : '☀️';
        });
    }
});


// We need this below function to actually load DOM content and use our CSS transitions
// Developed with help from ChatGPT
document.addEventListener('DOMContentLoaded', () => {
  
    // We note down all the links in our navigation
    const links = document.querySelectorAll('a[href^="./"], a[href^="/"]');

    // We go through each link and add a click event listener
    links.forEach(link => {
        link.addEventListener('click', async (e) => {
        // If a link goes to a new tab or external site we clcik it
        if (link.target === "_blank" || link.href.includes("http") && !link.href.includes(window.location.origin)) return;

        // We ensure we aren't using default nav, so we can use our transition
        e.preventDefault();

        // We remember the nav the user clicked
        const href = link.href;

        // We make sure the browser supports transitioning
        if (document.startViewTransition) {
            // We start the actial transtion
            document.startViewTransition(async () => {
            window.location.href = href;
            });
        } 
        // We fall back to normal if not supported
        else {
            window.location.href = href;
        }
        });
    });
});

