// Интерактивность для фильтров портфолио
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    // Функция фильтрации карточек
    function filterCards(category) {
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Обработчики кликов по кнопкам фильтра
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс к нажатой кнопке
            button.classList.add('active');
            
            // Получаем категорию для фильтрации
            const filterCategory = button.getAttribute('data-filter');
            
            // Фильтруем карточки
            filterCards(filterCategory);
        });
    });

    // Анимация появления карточек при загрузке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми карточками
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });

    // Добавляем CSS анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .card {
            transition: all 0.4s ease;
        }
        
        .card.hidden {
            opacity: 0;
            transform: scale(0.8);
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // Загрузка отзывов из JSON
    fetch('testimonials.json')
        .then(response => response.json())
        .then(testimonials => {
            const container = document.getElementById('testimonials-container');
            testimonials.forEach(t => {
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <p class="testimonial-text">"${t.text}"</p>
                    <p class="testimonial-author">— ${t.name}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Ошибка загрузки отзывов:', error));
});

// Плавная прокрутка к секциям
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Эффект параллакса для фоновых кругов
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.bg-circle');
    
    circles.forEach((circle, index) => {
        const speed = 0.5 + (index * 0.2);
        circle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});
