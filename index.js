// BURGER MENU


let burger = document.getElementById('burger');
let mobileNav = document.querySelector('.mobile-nav');

burger.addEventListener('click', function () {
    this.classList.toggle('is-active');
    mobileNav.classList.toggle('displayed');
    let links = document.querySelectorAll('.mobile-nav > .links > a');
    for (let i = 0; i < links.length; i++) {
        links[i].style.animation = `mobileFadeIn 1s ${i * 0.3}s forwards`;
    }
});


// HEADER ANIMATION
if (!/Mobi|Android/i.test(navigator.userAgent)) {
    const grid = document.querySelector('.grid-overlay');
    let targetX = 0,
        targetY = 0,
        currentX = 0,
        currentY = 0,
        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;

    // Throttle mousemove events
    let lastMove = 0;
    window.addEventListener('mousemove', function (e) {
        const now = Date.now();
        if (now - lastMove >= 16) { // Throttle to ~60fps for performance
            targetX = e.clientX / viewportWidth;
            targetY = e.clientY / viewportHeight;
            lastMove = now;
        }
    });

    // Update viewport size on resize
    window.addEventListener('resize', function () {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
    });

    function animate() {
        // Smoothly interpolate toward target values
        currentX += (targetX - currentX) * 0.015;
        currentY += (targetY - currentY) * 0.015;

        // Apply transformation
        grid.style.transform = `translate(${currentX * 300}px, ${currentY * 300}px)`;

        requestAnimationFrame(animate);
    }

    animate();
}



// SMOOTH SCROLL

document.addEventListener('DOMContentLoaded', function () {
    const lenis = new Lenis()

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    document.querySelector('body').classList.add('scroll');
    document.querySelector('.loader').style.animation = 'fadeOut 1s ease-in-out forwards';
    
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
    let links = document.querySelectorAll('.pages a');
    setTimeout(() => {
    for (let i = 0; i < links.length; i++) {
        links[i].style.animation = `fadeIn 1s ${i * 0.25}s forwards`;
    }
    }, 500);

    document.querySelectorAll('.details>h1>p').forEach((span, index) => {

        let typeSplit = new SplitType(`[animate${index}]`, {
            types: 'lines, words, chars',
            tagName: 'span'
        });

        gsap.from(`[animate${index}] .char`, {
            opacity: 0.3,
            duration: 2,
            ease: 'power1.out',
            stagger: 0.10,
            delay: index * 0.5
        });

    });
    }
});








const gElements = document.querySelectorAll('g');

gElements.forEach((gElement) => {
    gElement.addEventListener('mouseover', function () {
        const circles = gElement.querySelectorAll('circle');
        circles.forEach((circle) => {
            let radius = parseFloat(circle.getAttribute('r'));
            circle.setAttribute('r', radius + 5);
        });

        const reference = this.getAttribute('data-reference');

        const element = document.getElementById(reference);
        console

        element.classList.add('visible');
    });

    gElement.addEventListener('mouseout', function () {
        const circles = gElement.querySelectorAll('circle');
        circles.forEach((circle) => {
            let radius = parseFloat(circle.getAttribute('r'));
            circle.setAttribute('r', radius - 5);
        });

        const reference = this.getAttribute('data-reference');

        const element = document.getElementById(reference);

        element.classList.remove('visible');
    });
});



gsap.utils.toArray(".skill").forEach(skill => {
    ScrollTrigger.create({
        trigger: skill,
        start: "top 80%",
        onEnter: () => {
            skill.classList.add("show-skill");
        }
    });
});



document.querySelector('.project-overlay').addEventListener('click', function (event) {
    if (event.target.classList.contains('project-overlay')) {
        document.querySelector('.project-overlay').classList.remove('actives');
    }
});



gsap.registerPlugin(ScrollTrigger)
gsap.to("#layout4", {
    y: -200,
    scrollTrigger: {
        trigger: "#layout4",
        start: "top bottom", 
        end: "bottom top", 
        scrub: true 
    }
});

gsap.to("#layout3", {
    y: -200,
    scrollTrigger: {
        trigger: "#layout3",
        start: "top bottom", 
        end: "bottom top", 
        scrub: true 
    }
});

gsap.to("#layout1", {
    y: -200,
    scrollTrigger: {
        trigger: "#layout1",
        start: "top bottom", 
        end: "bottom top", 
        scrub: true 
    }
});

gsap.to("#layout2", {
    y: -200,
    scrollTrigger: {
        trigger: "#layout2",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});


document.querySelector('.badges').addEventListener('click', function() {
    window.open('https://github.com/Maxence-r', '_blank');
});

document.querySelector('.youtube').addEventListener('click', function() {
    window.open('https://www.youtube.com/@EncoreMaxence', '_blank');
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('projects.json')
    .then(response => response.json())
    .then(projectData => {
        const projectsContainer = document.querySelector('.projects-container');

        projectData.projects.forEach(project => {
            let projectElement = createProjectElement(project);
            projectsContainer.appendChild(projectElement);
        });

        document.querySelectorAll('.project').forEach(projectElement => {
            const projectId = projectElement.getAttribute('id');
            const currentProject = projectData.projects.find(project => project.id === projectId);
            projectElement.addEventListener('click', () => {
                document.querySelector('.project-overlay').classList.add('actives');
                document.querySelector('.details-of-project > h1').textContent = currentProject.name;
                document.querySelector('.details-of-project > p').textContent = currentProject.description;
                if (currentProject.demotype === 'video') {
                    document.querySelector('.project-infos > img').style.display = 'none';
                    document.querySelector('.project-infos > video').style.display = 'block';
                    document.querySelector('.project-infos > video').src = currentProject.demo;
                } else {
                    document.querySelector('.project-infos > video').style.display = 'none';
                    document.querySelector('.project-infos > img').style.display = 'block';
                    document.querySelector('.project-infos > img').src = currentProject.demo;
                }
                if (currentProject.link) {
                    document.querySelector('.project-under > a').style.display = 'block';
                    document.querySelector('.project-under > a').href = currentProject.link;
                }   else {
                    document.querySelector('.project-under > a').style.display = 'none';
                }
            });
        });
    })
    .catch(error => console.error('Failed to load project data:', error));

    function createProjectElement(project) {
        let projectElement = document.createElement('div');
        projectElement.id = project.id;
        projectElement.className = 'project';

        let img = document.createElement('img');
        img.src = project.preview;

        let projectDetails = document.createElement('div');
        projectDetails.className = 'project-details';

        let title = document.createElement('h2');
        title.textContent = project.name;

        let description = document.createElement('p');
        description.textContent = project.description;

        projectDetails.appendChild(title);
        projectDetails.appendChild(description);
        projectElement.appendChild(img);
        projectElement.appendChild(projectDetails);

        return projectElement;
    }
});

document.getElementById('downloadCV').addEventListener('click', function() {
    window.open('./assets/cvvv-2025.pdf', '_blank');
});


//
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.path-container');
    const svg = container.querySelector('svg');
    const pathBoxes = container.querySelectorAll('.path-box');
  
    function updateCardPositions() {
      const containerRect = container.getBoundingClientRect();
  
      pathBoxes.forEach(box => {
        const id = box.id;
        const circleGroup = svg.querySelector(`g[data-reference="${id}"]`);
        if (!circleGroup) return;
  
        const circle = circleGroup.querySelector('circle');
        if (!circle) return;
  
        // Get circle's position in SVG coordinates
        const svgPoint = svg.createSVGPoint();
        svgPoint.x = circle.cx.baseVal.value;
        svgPoint.y = circle.cy.baseVal.value;
        
        // Convert to container's coordinates
        const ctm = circle.getCTM();
        const position = svgPoint.matrixTransform(ctm);
        
        // Adjust for container's position
        const left = position.x + (svg.getBoundingClientRect().left - containerRect.left);
        const top = position.y + (svg.getBoundingClientRect().top - containerRect.top);
  
        // Update card position
        box.style.left = `${left + 20}px`;
        box.style.top = `0px`;
      });
    }
  
    // Initial update and on window resize
    updateCardPositions();
    window.addEventListener('resize', updateCardPositions);
  });