document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Sample photo data (in a real app, this would come from an API)
    const photos = [
      { 
        id: 1, 
        src: './images/team/team_1.webp', 
        category: 'team', 
        caption: 'Our amazing team working together' 
      },
      { 
        id: 2, 
        src: './images/team/diwali_celeb.webp', 
        category: 'fun', 
        caption:'Celebrating Diwali at office' 
      },
      { 
        id: 3, 
        src: './images/work_hard-play_hard/work_play_1.webp', 
        category: 'fun', 
        caption: 'Team having fun at office' 
      },
      { 
        id: 4, 
        src: './images/bts/bts_1.webp', 
        category: 'bts', 
        caption: 'Behind the scenes of our photoshoot' 
      },
      { 
        id: 5, 
        src: './images/team/team_working_together.webp', 
        category: 'team', 
        caption: 'Team brainstorming session' 
      },
      { 
        id: 6, 
        src: './images/campaign/college_seminar.png', 
        category: 'campaigns', 
        caption: 'College seminar' 
      },
      { 
        id: 7, 
        src: './images/anniversaries/anniversary_2yr.png', 
        category: 'fun', 
        caption: 'Celebrating our 2nd anniversary' 
      },
      { 
        id: 8, 
        src: './images/bts/bts_video.png', 
        category: 'bts', 
        caption: 'Shooting on site video' 
      },
      { 
        id: 9, 
        src: './images/office/team_mumbai.webp', 
        category: 'team', 
        caption: 'Meet team Mumbai' 
      },
      { 
        id: 10, 
        src: './images/campaign/social_media.png', 
        category: 'campaigns', 
        caption: 'Social media campaign planning' 
      },
      { 
        id: 11, 
        src: './images/work_hard-play_hard/night-party.webp', 
        category: 'fun', 
        caption: 'Night party at office' 
      },
      { 
        id: 12, 
        src: './images/bts/bts_photo.png', 
        category: 'bts', 
        caption: 'Prepping for photoshoot' 
      },
      { 
        id: 13, 
        src: './images/office/office.webp', 
        category: 'workplace', 
        caption: 'Our modern office space' 
      },
      { 
        id: 14, 
        src: './images/office/collaboration_area.png', 
        category: 'workplace', 
        caption: 'Collaboration area in our office' 
      },
      { 
        id: 15, 
        src: './images/office/breakout_zone.png', 
        category: 'workplace', 
        caption: 'Our comfortable breakout zone' 
      },
      { 
        id: 16, 
        src: './images/team/christmas_celeb.png', 
        category: 'fun', 
        caption: 'Christmas celebrations' 
      },
      { 
        id: 17, 
        src: './images/anniversaries/cake.png', 
        category: 'fun', 
        caption: 'Cutting the anniversary cake' 
      },
      { 
        id: 18, 
        src: './images/team/delhi_meetup.png', 
        category: 'meetup', 
        caption: 'Meetup event at Delhi ' 
      },
      // Additional meeting photos in team category
      { 
        id: 19, 
        src: './images/office/weekly_meeting.png', 
        category: 'team', 
        caption: 'Weekly team meeting' 
      },
      { 
        id: 20, 
        src: './images/work_hard-play_hard/bhopal_storytelling.png', 
        category: 'fun', 
        caption: 'Bhopal Story Telling Session - 12 June' 
      },
      { 
        id: 21, 
        src: './images/team/team_2.webp', 
        category: 'team', 
        caption: 'Meet our team' 
      }
    ];
    
    // DOM Elements
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const loadMoreBtn = document.getElementById('load-more');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    // Variables
    let currentCategory = 'all';
    let currentSearchTerm = '';
    let displayedPhotos = 9;
    let currentPhotos = [];
    let currentIndex = 0;
    
    // Initialize the gallery
    function initGallery() {
      renderPhotos(photos.slice(0, displayedPhotos));
      currentPhotos = photos.slice(0, displayedPhotos);
    }
    
    // Render photos to the gallery
    function renderPhotos(photosToRender) {
      galleryGrid.innerHTML = '';
      
      if (photosToRender.length === 0) {
        galleryGrid.innerHTML = '<p class="no-results">No photos found matching your criteria.</p>';
        return;
      }
      
      photosToRender.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.className = `gallery-item ${photo.category}`;
        photoElement.setAttribute('data-category', photo.category);
        photoElement.setAttribute('data-id', photo.id);
        
        photoElement.innerHTML = `
          <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
          <div class="caption">${photo.caption}</div>
        `;
        
        galleryGrid.appendChild(photoElement);
        
        // Add click event to open modal
        photoElement.addEventListener('click', () => {
          openModal(photo.id);
        });
      });
    }
    
    // Filter photos by category
    function filterPhotos(category) {
      currentCategory = category;
      applyFilters();
    }
    
    // Search photos
    function searchPhotos(term) {
      currentSearchTerm = term.toLowerCase();
      applyFilters();
    }
    
    // Apply both category and search filters
    function applyFilters() {
      let filteredPhotos = photos;
      
      // Apply category filter
      if (currentCategory !== 'all') {
        filteredPhotos = filteredPhotos.filter(photo => photo.category === currentCategory);
      }
      
      // Apply search filter
      if (currentSearchTerm) {
        filteredPhotos = filteredPhotos.filter(photo => 
          photo.caption.toLowerCase().includes(currentSearchTerm))
      }
      
      // Update displayed photos
      displayedPhotos +=3;
      currentPhotos = filteredPhotos.slice(0, displayedPhotos);
      renderPhotos(currentPhotos);
      
      // Show/hide load more button
      loadMoreBtn.style.display = filteredPhotos.length > displayedPhotos ? 'block' : 'none';
    }
    
    // Load more photos
    function loadMorePhotos() {
      displayedPhotos += 3;
      applyFilters();
      
      // Scroll to the bottom of the newly loaded photos
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
    
    // Open modal with selected photo
    function openModal(id) {
      const photo = photos.find(p => p.id === id);
      if (!photo) return;
      
      modalImg.src = photo.src;
      modalCaption.textContent = photo.caption;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      // Set current index for navigation
      currentIndex = currentPhotos.findIndex(p => p.id === id);
    }
    
    // Close modal
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    
    // Navigate to previous photo
    function prevPhoto() {
      if (currentIndex > 0) {
        currentIndex--;
        const prevPhoto = currentPhotos[currentIndex];
        modalImg.src = prevPhoto.src;
        modalCaption.textContent = prevPhoto.caption;
      } else {
        // Loop to last photo
        currentIndex = currentPhotos.length - 1;
        const prevPhoto = currentPhotos[currentIndex];
        modalImg.src = prevPhoto.src;
        modalCaption.textContent = prevPhoto.caption;
      }
    }
    
    // Navigate to next photo
    function nextPhoto() {
      if (currentIndex < currentPhotos.length - 1) {
        currentIndex++;
        const nextPhoto = currentPhotos[currentIndex];
        modalImg.src = nextPhoto.src;
        modalCaption.textContent = nextPhoto.caption;
      } else {
        // Loop to first photo
        currentIndex = 0;
        const nextPhoto = currentPhotos[currentIndex];
        modalImg.src = nextPhoto.src;
        modalCaption.textContent = nextPhoto.caption;
      }
    }
    
    // Keyboard navigation for modal
    function handleKeyDown(e) {
      if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowLeft') {
          prevPhoto();
        } else if (e.key === 'ArrowRight') {
          nextPhoto();
        }
      }
    }
    
    // Event Listeners
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterPhotos(button.dataset.category);
      });
    });
    
    searchBtn.addEventListener('click', () => {
      searchPhotos(searchInput.value);
    });
    
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        searchPhotos(searchInput.value);
      }
    });
    
    loadMoreBtn.addEventListener('click', loadMorePhotos);
    
    closeBtn.addEventListener('click', closeModal);
    
    prevBtn.addEventListener('click', prevPhoto);
    
    nextBtn.addEventListener('click', nextPhoto);
    
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Initialize the gallery
    initGallery();
  });
