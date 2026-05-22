// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    lucide.createIcons();

    // ==========================================================================
    // CUSTOM CURSOR
    // ==========================================================================
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Instantly move the dot
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Animate outer ring with a slight lag
            cursor.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 250, fill: 'forwards' });
        });

        // Hover effect for interactive items
        const hoverables = document.querySelectorAll('a, button, input, textarea, .cmd-btn, .tab-btn, .filter-btn, .project-card');
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    // ==========================================================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); // refresh icons
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // ==========================================================================
    // SCROLL EVENTS: STICKY HEADER & ACTIVE LINKS
    // ==========================================================================
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header class toggling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Nav Link highlighting
        let currentSection = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 150;
            const sectionHeight = sec.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // TYPING TEXT EFFECT (HERO)
    // ==========================================================================
    const typingElement = document.getElementById('typing-text');
    const textArray = ["Full Stack Developer", "ML Engineer", "MERN Stack Expert", "Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // natural typing speed
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // pause at full text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500; // pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typingElement) {
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // INTERACTIVE PROFILE TERMINAL SIMULATION
    // ==========================================================================
    const terminalBody = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const quickCmdButtons = document.querySelectorAll('.cmd-btn');

    const commands = {
        help: `
            Available Commands:<br>
            - <span class="terminal-highlight">about</span> : Display detailed professional background.<br>
            - <span class="terminal-highlight">skills</span> : Show top tech stack capabilities.<br>
            - <span class="terminal-highlight">experience</span> : Print workplace timeline.<br>
            - <span class="terminal-highlight">projects</span> : Output list of key built systems.<br>
            - <span class="terminal-highlight">contact</span> : Get phone and email addresses.<br>
            - <span class="terminal-highlight">socials</span> : List links to developer profiles.<br>
            - <span class="terminal-highlight">gpa</span> : Print academic records.<br>
            - <span class="terminal-highlight">clear</span> : Reset the terminal screen.
        `,
        about: `
            <span class="text-cyan">Rahul Naik | Full Stack & ML Developer</span><br>
            Results-driven engineer specializing in building high-throughput web architectures and intelligence APIs. 
            Passionate about reducing system latency, crafting elegant React UI components, and building robust ML models.
            Based in Hyderabad, open to global opportunities.
        `,
        skills: `
            <span class="text-cyan">Frontend:</span> React.js, Next.js, HTML5, CSS3, JavaScript, TypeScript<br>
            <span class="text-cyan">Backend:</span> Node.js, Express.js, REST APIs, .NET, Python<br>
            <span class="text-cyan">Databases:</span> MySQL, MongoDB, SQL Server<br>
            <span class="text-cyan">Tools & Core:</span> Git, Docker, CI/CD, Postman, DSA (300+ problems), OpenCV, NLP
        `,
        experience: `
            <span class="text-purple">[Nov 2024 - Present]</span> Junior Software Engineer - <span class="text-cyan">Dhruv Technology Solutions</span><br>
            &nbsp;&nbsp;* Designed and developed RESTful APIs, optimized query workflows, and reduced system latency by 30%.<br>
            &nbsp;&nbsp;* Built UI code modules using React, and automated release cycles with Git CI/CD.<br>
            <span class="text-purple">[Aug 2024 - Nov 2024]</span> Machine Learning Intern - <span class="text-cyan">Infosys</span><br>
            &nbsp;&nbsp;* Trained predictions algorithms using Python and preprocessed massive business datasets.<br>
            <span class="text-purple">[Nov 2023 - Apr 2024]</span> Full Stack Developer Intern - <span class="text-cyan">24HR7 Commerce Pvt Ltd</span><br>
            &nbsp;&nbsp;* Optimized database queries and streamlined client renders, boosting performance speed by 40%.
        `,
        projects: `
            <span class="text-cyan">--- Live Web Projects ---</span><br>
            1. <span class="text-cyan">Jobs Dart</span> (<a href="https://jobsdart.in" target="_blank" style="color:var(--accent-cyan)">jobsdart.in</a>) - Job Portal Connecting Professionals.<br>
            2. <span class="text-cyan">Veltria</span> (<a href="https://veltria.in" target="_blank" style="color:var(--accent-cyan)">veltria.in</a>) - Modern Tech Consulting Solutions.<br>
            3. <span class="text-cyan">MVBRYT</span> (<a href="https://mvbryt.com" target="_blank" style="color:var(--accent-cyan)">mvbryt.com</a>) - B2B SaaS Lead Generation.<br>
            4. <span class="text-cyan">Nutryx</span> (<a href="https://nutryx.in" target="_blank" style="color:var(--accent-cyan)">nutryx.in</a>) - Personalized Diet &amp; Health Tracking.<br>
            5. <span class="text-cyan">Srini Property Services</span> (<a href="https://srinipropertyservices.com" target="_blank" style="color:var(--accent-cyan)">srinipropertyservices.com</a>) - Premium PropTech Real Estate Services.<br>
            6. <span class="text-cyan">Bharat Home Tuitions</span> (<a href="https://bharathometuitions.com" target="_blank" style="color:var(--accent-cyan)">bharathometuitions.com</a>) - Tutoring &amp; EdTech Hub.<br>
            <br><span class="text-purple">--- Technical &amp; Enterprise Projects ---</span><br>
            7. <span class="text-cyan">Pharma Inventory &amp; Audit System</span> [React, .NET, SQL Server] - Enterprise stock &amp; audit management.<br>
            8. <span class="text-cyan">Edwards (Mendix MES)</span> [Mendix, MES] - Manufacturing Execution System for production floor tracking.<br>
            9. <span class="text-cyan">Smart Reminders with Face Recognition</span> [Python, OpenCV, ML] - AI-powered personalized reminders.<br>
            10. <span class="text-cyan">Real-time Emotion &amp; Sentiment Analysis</span> [Python, OpenCV, NLP] - Multi-modal emotion AI pipeline.<br>
            11. <span class="text-cyan">Real-time Chat App</span> [MERN, Socket.IO] - Full-featured WebSocket chat platform.
        `,
        contact: `
            <span class="text-cyan">Email:</span> dyrahulnaik22@gmail.com<br>
            <span class="text-cyan">Phone:</span> +91 6302806154<br>
            <span class="text-cyan">Location:</span> Hyderabad, India
        `,
        socials: `
            <span class="text-cyan">GitHub:</span> <a href="https://github.com/dyrahulnaik22" target="_blank" style="color:var(--accent-cyan)">github.com/dyrahulnaik22</a><br>
            <span class="text-cyan">LinkedIn:</span> <a href="https://www.linkedin.com/in/rahul-naik-811b85225/" target="_blank" style="color:var(--accent-cyan)">linkedin.com/in/rahul-naik-811b85225</a>
        `,
        gpa: `
            <span class="text-cyan">B.Tech - Computer Science & Engineering</span><br>
            Sreyas Institute of Engineering And Technology, Hyderabad (Jan 2024 graduation)<br>
            GPA: <span class="text-green">7.2 / 10</span>
        `
    };

    function executeCommand(cmd) {
        const cleanedCmd = cmd.trim().toLowerCase();
        let response = '';

        if (cleanedCmd === '') return;

        // Visual command input line echoing
        const inputEcho = document.createElement('div');
        inputEcho.className = 'terminal-line font-fira';
        inputEcho.innerHTML = `<span class="terminal-prompt">rahul@portfolio:~$</span> <span>${cmd}</span>`;
        terminalBody.appendChild(inputEcho);

        if (cleanedCmd === 'clear') {
            terminalBody.innerHTML = '';
            return;
        }

        if (commands.hasOwnProperty(cleanedCmd)) {
            response = commands[cleanedCmd];
        } else {
            response = `Command not found: <span class="text-pink">${cmd}</span>. Type <span class="terminal-highlight">help</span> for a list of valid actions.`;
        }

        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line';
        responseLine.innerHTML = response;
        terminalBody.appendChild(responseLine);

        // Add spacer
        const spacer = document.createElement('div');
        spacer.className = 'terminal-line';
        spacer.innerHTML = '<br>';
        terminalBody.appendChild(spacer);

        // Auto Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const commandText = terminalInput.value;
                executeCommand(commandText);
                terminalInput.value = '';
            }
        });
    }

    // Quick Action button listeners
    quickCmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            executeCommand(cmd);
        });
    });


    // ==========================================================================
    // SKILLS SECTION TABS
    // ==========================================================================
    const skillTabs = document.querySelectorAll('.tab-btn');
    const skillContents = document.querySelectorAll('.tab-content');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            skillTabs.forEach(t => t.classList.remove('active'));
            skillContents.forEach(c => c.classList.remove('active'));

            // Add active class
            tab.classList.add('active');
            const targetId = `tab-${tab.getAttribute('data-tab')}`;
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Triggers progress bar animation inside active tab
                const progressBars = targetContent.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const widthStyle = bar.style.width;
                    bar.style.width = '0px';
                    setTimeout(() => {
                        bar.style.width = widthStyle;
                    }, 50);
                });
            }
        });
    });

    // Trigger skills bar animation for the initially active tab (Frontend)
    const initialProgressBars = document.querySelectorAll('#tab-frontend .skill-progress');
    initialProgressBars.forEach(bar => {
        const widthStyle = bar.style.width;
        bar.style.width = '0px';
        setTimeout(() => {
            bar.style.width = widthStyle;
        }, 300);
    });


    // ==========================================================================
    // PROJECTS GALLERY FILTER
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active class
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else if (card.classList.contains(filterValue)) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide');
                }
            });
        });
    });


    // ==========================================================================
    // CONTACT FORM INTERACTION
    // ==========================================================================
    const contactForm = document.getElementById('portfolio-contact-form');
    const successMsg = document.getElementById('form-success-msg');
    const resetFormBtn = document.getElementById('btn-reset-form');

    if (contactForm && successMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values for visual console action (cool feedback!)
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            
            // Change submit button to visual loading state
            const submitBtn = document.getElementById('btn-submit-form');
            const submitBtnText = submitBtn.querySelector('span');
            const originalText = submitBtnText.textContent;
            submitBtnText.textContent = "Connecting to SMTP server...";
            submitBtn.disabled = true;

            // Simulate form submission delay
            setTimeout(() => {
                contactForm.classList.add('hide');
                successMsg.classList.add('show');
                
                // Output info into terminal if exists
                const successText = `[Form Submission Received] | User: ${name} (${email}) | SMTP Status: Success 200`;
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-line text-green';
                outputLine.innerHTML = successText;
                terminalBody.appendChild(outputLine);
                terminalBody.scrollTop = terminalBody.scrollHeight;
                
                submitBtnText.textContent = originalText;
                submitBtn.disabled = false;
            }, 1800);
        });
    }

    if (resetFormBtn && contactForm && successMsg) {
        resetFormBtn.addEventListener('click', () => {
            contactForm.reset();
            successMsg.classList.remove('show');
            contactForm.classList.remove('hide');
        });
    }


    // ==========================================================================
    // SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // trigger animation only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // ==========================================================================
    // PARTICLE BACKGROUND CANVAS NETWORK
    // ==========================================================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 140 };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        window.addEventListener('resize', resizeCanvas);
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Keep inside screen limits
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Mouse interaction collision checks
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius + this.size) {
                        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                            this.x += 2;
                        }
                        if (mouse.x > this.x && this.x > this.size * 10) {
                            this.x -= 2;
                        }
                        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                            this.y += 2;
                        }
                        if (mouse.y > this.y && this.y > this.size * 10) {
                            this.y -= 2;
                        }
                    }
                }

                // Movement
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function initParticles() {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 11000;
            // Cap particles to prevent lag
            if (numberOfParticles > 120) numberOfParticles = 120;
            
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 0.5;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                
                // Alternate particle colors between blue-cyan and purple/pink
                let color = i % 2 === 0 ? 'rgba(0, 242, 254, 0.25)' : 'rgba(185, 39, 252, 0.2)';
                
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Draw connections between points
        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 110) {
                        opacityValue = 1 - (distance / 110);
                        ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.12})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
            requestAnimationFrame(animate);
        }

        // Start Particles
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
        animate();
    }
});
