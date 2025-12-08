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

    const factBtn = document.getElementById('randomFact');
    const factDisplay = document.getElementById('random-fact-display');
    const diceWindow = document.getElementById('dice-window');
    const dice = document.getElementById('dice');
    const closeBtn = document.getElementById('close-dice-window');  // Correct variable name

    const randomFacts = [
        "I practiced playing the cello for 7 years!",
        "I actually went to UC Riverside before transferring to UC San Diego",
        "I have never had an internship!",
        "I actually learned that I wanted to become an ML Engineer because of Research!",
        "I am from SoCal!",
        "I have lived in the same city for my whole life!",
        "My first language was Telugu!",
        "Most of my immediate family lives in India!",
        "My favorite color is red!",
        "My favorite candy is Dark Chocolate!",
        "My favorite social media is YouTube!",
        "I'll be tutoring for CSE135 next quarter!",
        "I will be spending the next year getting my Masters!",
        "I don't know how to skateboard!",
        "I love doing arts and crafts (even when I'm bad at it)!",
        "I like pineapples on Pizza!"
    ];

    function getRandomFact() {
        const randomIndex = Math.floor(Math.random() * randomFacts.length);
        return randomFacts[randomIndex];
    }

    function displayFact() {
        const randomFact = getRandomFact();
        factDisplay.textContent = randomFact;
        factDisplay.style.display = 'block';
    }

    factBtn.addEventListener('click', () => {
        diceWindow.style.display = 'flex';

        dice.style.animation = 'spin 2s ease-out forwards';

        factDisplay.textContent = '';

        setTimeout(() => {
            displayFact();
        }, 2000); 

        const randomFact = getRandomFact();
        localStorage.setItem('myFact', randomFact);
    });

    closeBtn.addEventListener('click', () => {
        diceWindow.style.display = 'none';
    });

    function populateDropdown(projects) {
        const projectSelect = document.getElementById('project-select');
        const deleteSelect = document.getElementById('delete-project-select');
        const optionsHTML = '<option value="">Select a Project</option>';

        projectSelect.innerHTML = optionsHTML;
        deleteSelect.innerHTML = optionsHTML;  

        projects.forEach((project, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = project.title || 'Untitled Project';
            projectSelect.appendChild(option);

            const deleteOption = option.cloneNode(true);
            deleteSelect.appendChild(deleteOption);           
        });
    }

    const createForm = document.getElementById('user-create');
    if (createForm) {
        createForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload on form submit

            const title = document.getElementById('project-title').value;
            const description = document.getElementById('project-description').value;
            const imgSrc = document.getElementById('project-img-src').value;
            const githubLink = document.getElementById('project-github-link').value;

            let projects = JSON.parse(localStorage.getItem('projectsData')) || [];

            // Create new project object
            const newProject = {
                title: title,
                body: description,
                'img-src': imgSrc,
                'github-link': githubLink
            };

            projects.push(newProject);

            localStorage.setItem('projectsData', JSON.stringify(projects));

            displayProjects(projects);
            populateDropdown(projects);

            event.target.reset();
        });
    } 
    else {
        console.error("Form with id 'user-create' not found.");
    }        

    const updateForm = document.getElementById('user-update');
    if (updateForm) {
        updateForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload on form submit

            const selectedIndex = document.getElementById('project-select').value;
            if (selectedIndex === '') {
                alert('Please select a project to update.');
                return;
            }

            const updatedTitle = document.getElementById('update-project-title').value;
            const updatedDescription = document.getElementById('update-project-description').value;
            const updatedImgSrc = document.getElementById('update-project-img-src').value;
            const updatedGithubLink = document.getElementById('update-project-github-link').value;

            let projects = JSON.parse(localStorage.getItem('projectsData')) || [];

            const updatedProject = {
                title: updatedTitle,
                body: updatedDescription,
                'img-src': updatedImgSrc,
                'github-link': updatedGithubLink
            };

            projects[selectedIndex] = updatedProject;

            localStorage.setItem('projectsData', JSON.stringify(projects));

            displayProjects(projects);
            populateDropdown(projects);

            event.target.reset();

            // document.getElementById('project-select').selectedIndex = 0;
        });
    } 
    else {
        console.error("Form with id 'user-update' not found.");
    }

    const deleteForm = document.getElementById('user-delete');
    if (deleteForm) {
        deleteForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload on form submit

            const selectedIndex = document.getElementById('delete-project-select').value;
            if (selectedIndex === '') {
                alert('Please select a project to delete.');
                return;
            }

            let projects = JSON.parse(localStorage.getItem('projectsData')) || [];

            projects.splice(selectedIndex, 1);

            localStorage.setItem('projectsData', JSON.stringify(projects));

            displayProjects(projects);

            populateDropdown(projects);
        });
    } 
    else {
        console.error("Form with id 'user-delete' not found.");
    }

    const loadLocalButton = document.getElementById('load-local');
    const loadRemoteButton = document.getElementById('load-remote');
    
    if (loadLocalButton) loadLocalButton.addEventListener('click', loadLocalData);
    if (loadRemoteButton) loadRemoteButton.addEventListener('click', loadRemoteData);

    function loadLocalData() {
        const projects = JSON.parse(localStorage.getItem('projectsData'));
        if (projects) {
            displayProjects(projects);
            populateDropdown(projects);
        } else {
            alert('No project data found in localStorage.');
        }
    }

    function loadRemoteData() {
        const remoteURL = "https://api.jsonbin.io/v3/b/693612c1d0ea881f401986fc"

        fetch(remoteURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(jsonData => {
                if (jsonData.record && jsonData.record.length > 0) { 
                    displayProjects(jsonData.record);
                } 
            })
            .catch(error => {
                console.error("Error fetching remote data:", error);
            });
    }

    function displayProjects(projects) {
        const container = document.querySelector('.projects-container');
        container.innerHTML = ''; // Clear any existing content

        projects.forEach(project => {
            const projectCard = document.createElement('my-project');
            projectCard.setAttribute('title', project.title || 'Default Title');
            projectCard.setAttribute('description', project.body || 'No description provided.');
            projectCard.setAttribute('img-src', project['img-src'] || './images/default.jpg');
            projectCard.setAttribute('github-link', project['github-link'] || '#');
            container.appendChild(projectCard);
        });
    }

    const projectsData = [
        {
            "title": "Climate Pattern Prediction",
            "body": "In this project, I worked on predicting climate patterns by participating in a Kaggle competition, where I placed in the top 25% with a score of 0.9398. I built and improved a deep learning model using U-Net with attention mechanisms to predict climate data over time and space. I tested the model's performance by comparing it to different architectures like CNNs, DenseNet, ResNet, and U-Net variations, aiming to find the most accurate model. I also used data visualization techniques to display where the model was making errors, which helped improve its performance further.",
            "img-src": "./images/climateProject.png",
            "github-link": "https://github.com/satvikak/CSE151B-Competition-Code"
        },
        {
            "title": "Green Lens - AI Climate Argument Retrieval Engine",
            "body": "For this project, I was part of a 4-person team that built a real-time system to search for climate science articles based on specific user queries. The system used FastAPI, Streamlit, and OpenAI's GraphRAG architecture to power the search engine. I helped develop the retrieval pipeline, using advanced techniques like BERT+FAISS, BM25, and TF-IDF to ensure the articles retrieved were relevant and fast. We achieved a relevance score of 0.78 and managed to keep query response times under 7 seconds, making the tool both effective and efficient. Additionally, I worked on automating the process of generating citations and summarizing key points from the articles to make the system more user-friendly and scalable.",
            "img-src": "./images/paperRetrieval.png",
            "github-link": "https://github.com/knarula2099/CSE156-Project/tree/KN-RAG-Implementation"
        },
        {
            "title": "Restaurant Simulator",
            "body": "In this project, I worked with a team of 4 to create a fully functional restaurant simulation using C++. We designed a system where users could simulate restaurant operations, including managing tables, orders, and servers. I helped implement the system using Agile development and object-oriented design principles, ensuring the software was organized and easy to scale. We used unit testing with GoogleTest to ensure all parts of the system were reliable, achieving 100% code coverage and robust functionality. I also played a key role as both a developer and the scrum master of the team. I helped coordinate meetings, encourage good communication between team members, and ensured that all the different modules of the system fit together smoothly.",
            "img-src": "./images/restaurant.png",
            "github-link": "https://github.com/satvikak/RestaurantSimulator"
        }
    ];
    localStorage.setItem('projectsData', JSON.stringify(projectsData));
    
    class ProjectCard extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });

            const template = `
                <style>

                    .project-card h3 {
                        font-size: 1.5rem;
                        color: white;
                        background-color: var(--subsection-title-color);
                        padding: 0.3em 0.8em;
                        border-radius: var(--bubble-curvature);
                        margin-bottom: 1rem;
                    }

                    /* img Styling */
                    .project-card picture img {
                        max-width: 100%;
                        height: auto;
                        border-radius: var(--bubble-curvature);
                        margin-bottom: 1rem;
                    }

                    /* p Styling */
                    .project-card p {
                        color: white;
                        font-size: 1rem;
                        margin-bottom: 1rem;
                        background-color: var(--subsection-description-color);
                        padding: 1em;
                        border-radius: var(--bubble-curvature);
                        line-height: 1.6;
                    }

                    /* Link Styling */
                    .project-card a {
                        display: inline-block;
                        margin-top: 1rem;
                    }

                    .project-card a img {
                        width: 40px;
                        height: auto;
                        transition: transform 0.3s ease;
                    }

                    /* Details Styling */
                    details {
                        margin-top: 1rem;
                    }

                    summary {
                        font-size: 1.2rem;
                        font-weight: bold;
                        cursor: pointer;
                        color: white;
                        padding: 0.5em;
                    }
                </style>
                <div class="project-card">
                        <h3></h3>
                        <picture>
                            <source srcset="" type="image/avif">
                            <source srcset="" type="image/webp">
                            <img src="" alt="Project Title Screenshot">
                        </picture>
                        <details>
                            <summary>Project Description</summary>
                            <p></p>
                        </details>
                        <a href="" target="_blank">
                            <img src="./images/github.png" alt="GitHub">
                        </a>
                </div>
            `;
            shadow.innerHTML = template;
        }

        connectedCallback() {
            this.shadowRoot.querySelector('h3').textContent = this.getAttribute('title') || 'Default Title';
            this.shadowRoot.querySelector('p').textContent = this.getAttribute('description') || 'No description provided.';
            this.shadowRoot.querySelector('img').setAttribute('src', this.getAttribute('img-src') || './images/default.jpg');
            this.shadowRoot.querySelector('a').setAttribute('href', this.getAttribute('github-link') || '#');
            this.shadowRoot.querySelector('source').setAttribute('srcset', this.getAttribute('img-src') || './images/default.jpg');
        }
    }
    customElements.define('my-project', ProjectCard);

    class MyHeader extends HTMLElement {
        constructor() {
            super();

            // Attach shadow DOM to the component
            const shadow = this.attachShadow({ mode: 'open' });

            // Create the HTML structure for the header
            const header = document.createElement('header');
            header.innerHTML = `
                <style>
                    h1 {
                        background-color: var(--main-banner-color, #7E5072); 
                        padding: 1.5rem;
                        text-align: center;
                    }

                    nav {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                        justify-content: center;
                    }

                    nav a {
                        display: inline-block;
                        background-color: var(--main-bubble-color, #EA9E79);
                        color: white;
                        padding: 0.6em 1.2em;
                        border-radius: var(--bubble-curvature, 1rem); 
                        /* Idea utilized from here: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions" */
                        transition: all 0.5s ease-out;
                    }

                    nav a:hover {
                        background-color: var(--position-title-color, #C5365C);
                        /* Idea utilized from here: "https://stackoverflow.com/questions/31860157/css3-transform-translate-on-hover-with-transition" */
                        transform: translateY(2px);
                    }
                </style>
                <h1>Satvi's Personal Portfolio</h1>
                <nav>
                    <a href="./index.html">Home</a>
                    <a href="./about.html">About Me</a>
                    <a href="./experience.html">Experience</a>
                    <a href="./projects.html">Projects</a>
                    <a href="./resume.html">Resume</a>
                    <a href="./craftBlog.html">Craft Blog</a>
                    <a href="./photography.html">Photography</a>
                    <a href="./contact.html">Contact Me</a>
                    <a href="./form-no-js.html">No JS Contact Form</a>
                    <a href="./form-with-js.html">JS Contact Form</a>
                </nav>
            `;
            shadow.appendChild(header);
        }
    }

    // Register the custom element
    customElements.define('my-header', MyHeader);

    class MyFooter extends HTMLElement {
        constructor() {
            super();

            // Attach shadow DOM to the component
            const shadow = this.attachShadow({ mode: 'open' });

            // Create an internal <style> element to inject the global CSS variables
            const footer = document.createElement('footer');
            footer.innerHTML = `
                <style>
                    footer {
                        text-align: center;
                        font-size: var(--small-font, 0.9rem);
                        color: white; 
                        padding: 1rem 0 0 0;
                    }
                </style>
                Site made with ❤️ by Satvi
            `;
            shadow.appendChild(footer);
        }
    }

    // Register the custom element
    customElements.define('my-footer', MyFooter);

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
