
        // Optimized Matrix rain effect
        const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff88';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }, 250);
        });

        // Floating particles (reduced count for performance)
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            particlesContainer.appendChild(particle);
        }

        // Scroll animations
        const sections = document.querySelectorAll('.section');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Project Progress Tracker
        const startDate = new Date('2026-01-02'); // Project start date
        const totalDuration = 50; // Total project duration in days
        
        function updateProgress() {
            const now = new Date();
            const daysElapsed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
            const progressPercent = Math.min(Math.floor((daysElapsed / totalDuration) * 100), 100);
            
            document.getElementById('daysElapsed').textContent = daysElapsed >= 0 ? daysElapsed : 0;
            document.getElementById('progressPercent').textContent = progressPercent >= 0 ? progressPercent + '%' : '0%';
            document.getElementById('progressFill').style.width = (progressPercent >= 0 ? progressPercent : 0) + '%';
        }
        
        updateProgress();
        setInterval(updateProgress, 60000); // Update every minute
