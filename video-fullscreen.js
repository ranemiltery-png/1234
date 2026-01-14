// video-fullscreen.js - Управление полноэкранным режимом
document.addEventListener('DOMContentLoaded', function() {
    const fullscreenButtons = document.querySelectorAll('.video-fullscreen-btn');
    
    fullscreenButtons.forEach(btn => {
        const video = btn.parentElement.querySelector('video');
        
        if (!video) return;
        
        // Обработчик клика на кнопку
        btn.addEventListener('click', function() {
            toggleFullscreen(video);
        });
        
        // Обработчик двойного клика на видео
        video.addEventListener('dblclick', function() {
            toggleFullscreen(video);
        });
        
        // Меняем иконку при переходе в полноэкранный режим
        video.addEventListener('fullscreenchange', updateFullscreenIcon);
        video.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
        video.addEventListener('mozfullscreenchange', updateFullscreenIcon);
        video.addEventListener('MSFullscreenChange', updateFullscreenIcon);
        
        function updateFullscreenIcon() {
            const isFullscreen = document.fullscreenElement || 
                                document.webkitFullscreenElement || 
                                document.mozFullScreenElement || 
                                document.msFullscreenElement;
            
            const icon = btn.querySelector('svg');
            if (isFullscreen === video) {
                // В полноэкранном режиме - иконка "выход"
                icon.innerHTML = '<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>';
                btn.setAttribute('title', 'Выйти из полноэкранного режима');
            } else {
                // В обычном режиме - иконка "полный экран"
                icon.innerHTML = '<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>';
                btn.setAttribute('title', 'На весь экран');
            }
        }
    });
    
    function toggleFullscreen(element) {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
            // Вход в полноэкранный режим
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        } else {
            // Выход из полноэкранного режима
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    
    // Автоматическое воспроизведение при скролле (опционально)
    const videos = document.querySelectorAll('video');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% видео видно
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Видео в зоне видимости
                video.play().catch(e => console.log('Автовоспроизведение запрещено'));
            } else {
                // Видео вне зоны видимости
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, observerOptions);
    
    videos.forEach(video => observer.observe(video));
});