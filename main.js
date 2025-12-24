// ROOPRESHA - Luxury Architecture & Interior Design
// Premium Interactive Experience

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INITIALIZATION =====
    initializeWebsite();
    
    // ===== DOOR OPENING ANIMATION =====
    function initializeWebsite() {
        // Check if we're on homepage for door animation
        if (document.body.classList.contains('home-page')) {
            initializeDoorAnimation();
        } else {
            // For other pages, just hide the door immediately
            const doorContainer = document.querySelector('.door-container');
            if (doorContainer) {
                doorContainer.style.display = 'none';
            }
        }
        
        // Initialize all components
        initializeNavigation();
        initializeScrollAnimations();
        initializeTaglineRotation();
        initializeProjectModal();
        initializeFormValidation();
        initializeServiceCards();
        initializeTimelineAnimations();
        initializePageTransitions();
        initializeArchitecturalLines();
    }
    
    // ===== DOOR OPENING ANIMATION =====
    function initializeDoorAnimation() {
        const doorPanels = document.querySelectorAll('.door-panel');
        const doorContent = document.querySelector('.door-content');
        
        // Show door content after a brief delay
        setTimeout(() => {
            if (doorContent) doorContent.classList.add('visible');
        }, 300);
        
        // Open doors after longer delay
        setTimeout(() => {
            doorPanels.forEach(panel => {
                panel.classList.add('open');
            });
            
            // Hide door container after animation completes
            setTimeout(() => {
                const doorContainer = document.querySelector('.door-container');
                if (doorContainer) {
                    doorContainer.style.opacity = '0';
                    setTimeout(() => {
                        doorContainer.style.display = 'none';
                    }, 500);
                }
            }, 1200);
        }, 1500);
    }
    
    // ===== NAVIGATION =====
    function initializeNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Toggle mobile menu
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    function initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // If element has delay attribute
                    const delay = entry.target.getAttribute('data-delay');
                    if (delay) {
                        entry.target.style.transitionDelay = delay + 's';
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        // Parallax effect for hero sections
        window.addEventListener('scroll', function() {
            const hero = document.querySelector('.hero');
            if (hero) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
    }
    
    // ===== TAGLINE ROTATION =====
    function initializeTaglineRotation() {
        const taglines = document.querySelectorAll('.tagline');
        if (taglines.length === 0) return;
        
        let currentIndex = 0;
        
        // Show first tagline
        taglines[0].classList.add('active');
        
        // Rotate taglines every 5 seconds
        setInterval(() => {
            // Remove active class from current tagline
            taglines[currentIndex].classList.remove('active');
            
            // Move to next tagline
            currentIndex = (currentIndex + 1) % taglines.length;
            
            // Add active class to new tagline
            taglines[currentIndex].classList.add('active');
        }, 5000);
    }
    
    // ===== PROJECT MODAL =====
    function initializeProjectModal() {
        const projectCards = document.querySelectorAll('.project-card');
        const modal = document.querySelector('.project-modal');
        const closeModal = document.querySelector('.close-modal');
        const modalContent = modal ? modal.querySelector('.modal-content') : null;
        
        if (!projectCards.length || !modal) return;
        
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                const projectData = getProjectData(projectId);
                
                // Fill modal with project data
                if (modalContent && projectData) {
                    modalContent.innerHTML = `
                        <button class="close-modal">&times;</button>
                        <div class="modal-body">
                            <span class="small-text">${projectData.category}</span>
                            <h2>${projectData.title}</h2>
                            <p class="large-text" style="margin-bottom: 2rem;">${projectData.description}</p>
                            <div class="project-details">
                                <div class="detail-item">
                                    <span class="detail-label">Location</span>
                                    <span class="detail-value">${projectData.location}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Year</span>
                                    <span class="detail-value">${projectData.year}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Area</span>
                                    <span class="detail-value">${projectData.area}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Scope</span>
                                    <span class="detail-value">${projectData.scope}</span>
                                </div>
                            </div>
                            <div class="project-description">
                                <p>${projectData.fullDescription}</p>
                            </div>
                        </div>
                    `;
                    
                    // Re-attach close button event
                    const newCloseBtn = modalContent.querySelector('.close-modal');
                    newCloseBtn.addEventListener('click', closeModalHandler);
                }
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        function closeModalHandler() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (closeModal) {
            closeModal.addEventListener('click', closeModalHandler);
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModalHandler();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModalHandler();
            }
        });
    }
    
    function getProjectData(projectId) {
        // Mock project data - in a real implementation, this would come from a database
        const projects = {
            '1': {
                title: 'Villa Serenity',
                category: 'Residential',
                description: 'A hillside retreat embracing panoramic views',
                location: 'Lonavala, Maharashtra',
                year: '2023',
                area: '12,500 sq.ft.',
                scope: 'Architecture & Interior Design',
                fullDescription: 'Villa Serenity represents a harmonious dialogue between built form and natural landscape. Situated on a sloping site with panoramic valley views, the residence is organized as a series of cascading volumes that follow the terrain. Local stone, exposed concrete, and teak wood create a material palette that ages gracefully. Large cantilevered decks extend living spaces into the landscape, while strategically placed courtyards bring natural light deep into the plan.'
            },
            '2': {
                title: 'Urban Loft Residence',
                category: 'Residential',
                description: 'Industrial elegance in a converted warehouse',
                location: 'Mumbai',
                year: '2022',
                area: '4,800 sq.ft.',
                scope: 'Interior Architecture',
                fullDescription: 'This adaptive reuse project transforms a former industrial warehouse into a sophisticated urban residence. The design celebrates the existing structure\'s raw character while introducing refined interventions. Original brick walls and timber trusses are preserved and highlighted. A double-height living space is anchored by a sculptural steel staircase, while custom-designed furniture pieces create intimate zones within the expansive volume. Strategic material choices—concrete, blackened steel, oak, and linen—create a tactile, layered interior experience.'
            },
            '3': {
                title: 'Coral Boutique Hotel',
                category: 'Commercial',
                description: 'Coastal luxury with sustainable principles',
                location: 'Goa',
                year: '2023',
                area: '45,000 sq.ft.',
                scope: 'Architecture & Landscape',
                fullDescription: 'Coral Boutique Hotel redefines coastal luxury through a lens of environmental sensitivity. The low-rise structure is carefully sited to preserve existing vegetation and maximize natural ventilation. Local laterite stone and reclaimed wood form the primary material palette, while large overhangs and deep verandas provide shade and indoor-outdoor living. Water features and native landscaping create microclimates throughout the property. The design achieves a sense of place deeply connected to its Goan context while offering guests a serene, luxurious experience.'
            }
        };
        
        return projects[projectId] || projects['1'];
    }
    
    // ===== FORM VALIDATION =====
    function initializeFormValidation() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            // Clear previous errors
            contactForm.querySelectorAll('.error-message').forEach(el => el.remove());
            contactForm.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
            
            // Validate required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else if (field.type === 'email' && !isValidEmail(field.value)) {
                    isValid = false;
                    showFieldError(field, 'Please enter a valid email address');
                }
            });
            
            if (isValid) {
                // In a real implementation, this would submit the form via AJAX
                showFormSuccess();
            }
        });
        
        function showFieldError(field, message) {
            const formGroup = field.closest('.form-group');
            formGroup.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = '#a15843';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '0.5rem';
            
            formGroup.appendChild(errorElement);
        }
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function showFormSuccess() {
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Via Email ✓';
            submitBtn.style.backgroundColor = 'var(--color-brass)';
            submitBtn.style.color = 'var(--color-ivory)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
                contactForm.reset();
            }, 3000);
        }
    }
    
    // ===== SERVICE CARDS HOVER EFFECT =====
    function initializeServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon svg');
                if (icon) {
                    icon.style.stroke = 'var(--color-terracotta)';
                    icon.style.transform = 'scale(1.1)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon svg');
                if (icon) {
                    icon.style.stroke = 'var(--color-brass)';
                    icon.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // ===== TIMELINE ANIMATIONS =====
    function initializeTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const marker = entry.target.querySelector('.timeline-marker');
                    const icon = entry.target.querySelector('.timeline-icon svg');
                    
                    if (marker) {
                        marker.style.transform = 'translateX(-50%) scale(1.2)';
                        marker.style.transition = 'transform 0.3s ease';
                        
                        setTimeout(() => {
                            marker.style.transform = 'translateX(-50%) scale(1)';
                        }, 300);
                    }
                    
                    if (icon) {
                        icon.style.stroke = 'var(--color-terracotta)';
                        setTimeout(() => {
                            icon.style.stroke = 'var(--color-brass)';
                        }, 1000);
                    }
                }
            });
        }, {
            threshold: 0.5
        });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // ===== PAGE TRANSITIONS =====
    function initializePageTransitions() {
        const links = document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target="_blank"])');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Skip if it's the current page
                if (this.href === window.location.href) return;
                
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Create transition overlay
                const transitionOverlay = document.createElement('div');
                transitionOverlay.style.position = 'fixed';
                transitionOverlay.style.top = '0';
                transitionOverlay.style.left = '0';
                transitionOverlay.style.width = '100%';
                transitionOverlay.style.height = '100%';
                transitionOverlay.style.backgroundColor = 'var(--color-charcoal)';
                transitionOverlay.style.zIndex = '9999';
                transitionOverlay.style.opacity = '0';
                transitionOverlay.style.transition = 'opacity 0.5s ease';
                
                document.body.appendChild(transitionOverlay);
                
                // Fade in overlay
                setTimeout(() => {
                    transitionOverlay.style.opacity = '1';
                }, 10);
                
                // Navigate after delay
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        });
    }
    
    // ===== ARCHITECTURAL LINE ANIMATIONS =====
    function initializeArchitecturalLines() {
        // Create blueprint line animation on scroll
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            
            // Animate lines in specific sections
            const lineSections = document.querySelectorAll('.line-animation');
            
            lineSections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top + scrollPosition;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition > sectionTop - windowHeight + 100 && 
                    scrollPosition < sectionTop + sectionHeight) {
                    
                    const progress = (scrollPosition - (sectionTop - windowHeight + 100)) / 
                                    (windowHeight + sectionHeight);
                    
                    const lines = section.querySelectorAll('.line');
                    lines.forEach((line, index) => {
                        const delay = index * 0.1;
                        if (progress > delay) {
                            line.style.width = Math.min(100, (progress - delay) * 100 * 2) + '%';
                        }
                    });
                }
            });
        });
    }
    
    // ===== CUSTOM CURSOR (Optional Premium Feature) =====
    function initializeCustomCursor() {
        // Only enable on desktop
        if (window.innerWidth < 992) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.position = 'fixed';
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursor.style.backgroundColor = 'var(--color-brass)';
        cursor.style.borderRadius = '50%';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.transition = 'width 0.3s, height 0.3s, background-color 0.3s';
        
        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        cursorFollower.style.position = 'fixed';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
        cursorFollower.style.border = '1px solid var(--color-brass)';
        cursorFollower.style.borderRadius = '50%';
        cursorFollower.style.pointerEvents = 'none';
        cursorFollower.style.zIndex = '9998';
        cursorFollower.style.transform = 'translate(-50%, -50%)';
        cursorFollower.style.transition = 'width 0.6s, height 0.6s, transform 0.6s';
        cursorFollower.style.opacity = '0.3';
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Animate follower with delay
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();
        
        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.border = '1px solid var(--color-brass)';
                
                cursorFollower.style.width = '60px';
                cursorFollower.style.height = '60px';
                cursorFollower.style.borderColor = 'var(--color-terracotta)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '8px';
                cursor.style.height = '8px';
                cursor.style.backgroundColor = 'var(--color-brass)';
                cursor.style.border = 'none';
                
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.borderColor = 'var(--color-brass)';
            });
        });
    }
    
    // Initialize custom cursor (uncomment to enable)
    // initializeCustomCursor();
    
    // ===== WINDOW LOAD COMPLETION =====
    window.addEventListener('load', function() {
        // Add loaded class to body for any final animations
        document.body.classList.add('loaded');
        
        // Initialize any lazy-loaded elements
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.onload = () => img.classList.add('loaded');
        });
    });
    
});

// Add to your existing main.js file

// ===== MOBILE-SPECIFIC ENHANCEMENTS =====
function initializeMobileFeatures() {
    // Fix for mobile viewport height
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set on load and resize
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    // Prevent zoom on input focus for iOS
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Improve touch scrolling
    document.addEventListener('touchmove', function(e) {
        if (e.target.type === 'range') {
            return;
        }
    }, {passive: true});
    
    // Close mobile menu when tapping outside
    document.addEventListener('click', function(e) {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.menu-toggle')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Improve form input experience on mobile
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Scroll input into view on focus
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
    
    // Handle iOS form issues
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        // Fix for iOS date/time input issues
        const dateInputs = document.querySelectorAll('input[type="date"], input[type="time"]');
        dateInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.type = 'text';
                setTimeout(() => {
                    this.type = 'date';
                }, 100);
            });
        });
    }
}

// Call this function in your initializeWebsite() function
// Add: initializeMobileFeatures();