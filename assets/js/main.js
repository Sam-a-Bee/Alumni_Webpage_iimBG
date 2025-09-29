// Alumni data management
class AlumniManager {
    constructor() {
        this.alumni = [];
        this.events = [];
        this.news = [];
        this.mentorship = [];
        this.init();
    }

    async init() {
        await this.loadData();
        this.renderEvents();
        this.renderRoadmaps();
        this.renderGallery();
        this.renderNews();
        this.renderMentorship();
    }

    async loadData() {
        try {
            const response = await fetch('data/alumni.json');
            const data = await response.json();
            this.events = data.events || this.getDefaultEvents();
            this.roadmaps = data.roadmaps || this.getDefaultRoadmaps();
            this.gallery = data.gallery || [];
            this.news = data.news || [];
            this.mentorship = data.mentorship || [];
        } catch (error) {
            console.log('Using sample data');
            this.loadSampleData();
        }
    }

    loadSampleData() {
        // Sample data loaded from getDefault methods
        this.events = [
            { title: "Annual Reunion", date: "2024-06-15", description: "Join us for our annual reunion" }
        ];
        this.news = [
            { title: "New Alumni Portal", date: "2024-01-15", content: "We've launched a new alumni portal" }
        ];
    }

    getDefaultEvents() {
        return [
            {
                id: 1,
                title: "Anusmruti",
                date: "December 28, 2024",
                location: "Main Campus Auditorium",
                description: "Join us for our flagship annual gathering celebrating alumni achievements and fostering connections.",
                image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop"
            },
            {
                id: 2,
                title: "Chai & Chapters - Video Interview Series",
                date: "Every Friday, 7 PM",
                location: "Virtual Platform",
                description: "Intimate conversations with distinguished alumni sharing their journey over a cup of chai.",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop"
            }
        ];
    }

    getDefaultRoadmaps() {
        return [
            {
                id: 1,
                name: "Priya Sharma",
                batch: "2018",
                position: "VP Strategy, Goldman Sachs",
                description: "From campus placement to Wall Street leadership in just 6 years.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop"
            },
            {
                id: 2,
                name: "Arjun Mehta",
                batch: "2016",
                position: "Founder & CEO, TechVenture",
                description: "Built a unicorn startup valued at $1.2B, revolutionizing fintech in India.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop"
            },
            {
                id: 3,
                name: "Sneha Patel",
                batch: "2019",
                position: "Director of Innovation, Microsoft",
                description: "Leading AI initiatives and driving digital transformation across global markets.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=200&fit=crop"
            }
        ];
    }

    renderEvents() {
        const container = document.getElementById('events-grid');
        container.innerHTML = this.events.map(event => `
            <div class="event-card" onclick="openEventModal(${event.id})">
                <img src="${event.image}" alt="${event.title}" class="event-image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                <div class="event-date">${event.date}</div>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><strong>Location:</strong> ${event.location}</p>
            </div>
        `).join('');
    }

    renderRoadmaps() {
        const container = document.getElementById('roadmaps-grid');
        container.innerHTML = this.roadmaps.map(roadmap => `
            <div class="roadmap-card">
                <img src="${roadmap.image}" alt="${roadmap.name}" class="roadmap-image">
                <div class="roadmap-content">
                    <h3 class="roadmap-title">${roadmap.name}</h3>
                    <p class="roadmap-position">${roadmap.position}</p>
                    <p class="roadmap-batch">Batch of ${roadmap.batch}</p>
                    <p>${roadmap.description}</p>
                </div>
            </div>
        `).join('');
    }

    renderGallery() {
        const container = document.getElementById('gallery-grid');
        if (this.gallery.length > 0) {
            container.innerHTML = this.gallery.map((item, index) => `
                <div class="gallery-item" onclick="openLightbox(${index})">
                    <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                </div>
            `).join('');
        } else {
            container.innerHTML = `
                <div class="gallery-item" onclick="openLightbox(0)">
                    <img src="https://via.placeholder.com/300x200/EDCB01/1a237e?text=Event+Photo+1" alt="Sample Event" loading="lazy">
                </div>
                <div class="gallery-item" onclick="openLightbox(1)">
                    <img src="https://via.placeholder.com/300x200/1a237e/EDCB01?text=Event+Photo+2" alt="Sample Event" loading="lazy">
                </div>
                <div class="gallery-item" onclick="openLightbox(2)">
                    <img src="https://via.placeholder.com/300x200/EDCB01/1a237e?text=Event+Photo+3" alt="Sample Event" loading="lazy">
                </div>
            `;
        }
    }

    renderNews() {
        const container = document.getElementById('news-list');
        container.innerHTML = this.news.map(item => `
            <div class="news-card">
                <h3>${item.title}</h3>
                <p>Date: ${item.date}</p>
                <p>${item.content}</p>
            </div>
        `).join('');
    }

    renderMentorship() {
        const container = document.getElementById('mentorship-opportunities');
        if (container && this.mentorship.length > 0) {
            container.innerHTML = this.mentorship.map(mentor => `
                <div class="mentor-card">
                    <h4>${mentor.mentor}</h4>
                    <p>Expertise: ${mentor.expertise}</p>
                    <p>Company: ${mentor.company}</p>
                    <span class="status ${mentor.availability.toLowerCase()}">${mentor.availability}</span>
                </div>
            `).join('');
        }
    }
}

// Counter animation function
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach((counter, index) => {
        setTimeout(() => {
            counter.classList.add('animate');
            
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + '+';
            }, 16);
        }, index * 200);
    });
}

// Photo slider functionality
let currentSlideIndex = 0;
let slides, dots;

// Initialize slider elements after DOM loads
function initSlider() {
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.dot');
}

function showSlide(index) {
    if (!slides || !dots) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-slide every 7 seconds
setInterval(() => {
    changeSlide(1);
}, 7000);

// Modal and Lightbox functionality
let currentGalleryIndex = 0;
let galleryImages = [];

function openEventModal(eventId) {
    const modal = document.getElementById('eventModal');
    const modalBody = document.getElementById('modal-body');
    
    // Sample event details - replace with actual data
    modalBody.innerHTML = `
        <h2>Event Details</h2>
        <p><strong>Date:</strong> December 15, 2024</p>
        <p><strong>Time:</strong> 6:00 PM - 9:00 PM</p>
        <p><strong>Location:</strong> Main Campus Auditorium</p>
        <p><strong>Description:</strong> Join us for our annual alumni gathering featuring networking, dinner, and keynote presentations from distinguished graduates.</p>
        <p><strong>Registration:</strong> Free for all alumni</p>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('eventModal').style.display = 'none';
}

function openLightbox(index) {
    currentGalleryIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Sample images - replace with actual gallery data
    galleryImages = [
        'https://via.placeholder.com/800x600/EDCB01/1a237e?text=Event+Photo+1',
        'https://via.placeholder.com/800x600/1a237e/EDCB01?text=Event+Photo+2',
        'https://via.placeholder.com/800x600/EDCB01/1a237e?text=Event+Photo+3'
    ];
    
    lightboxImg.src = galleryImages[index];
    lightbox.style.display = 'block';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function prevImage() {
    currentGalleryIndex = currentGalleryIndex > 0 ? currentGalleryIndex - 1 : galleryImages.length - 1;
    document.getElementById('lightbox-img').src = galleryImages[currentGalleryIndex];
}

function nextImage() {
    currentGalleryIndex = currentGalleryIndex < galleryImages.length - 1 ? currentGalleryIndex + 1 : 0;
    document.getElementById('lightbox-img').src = galleryImages[currentGalleryIndex];
}

function openNewsletter() {
    window.open('#', '_blank');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('eventModal');
    const lightbox = document.getElementById('lightbox');
    if (event.target === modal) closeModal();
    if (event.target === lightbox) closeLightbox();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    new AlumniManager();
    setTimeout(animateCounters, 500);
});