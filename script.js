window.addEventListener('load', () => {
    if (localStorage.getItem('showElement') === 'false')
        return;

    const time = 5000;
    const info = [
        'I cannot make you understand. I cannot make anyone understand what is happening inside me. I cannot even explain it to myself.',
        'How about if I sleep a little bit longer and forget all this nonsense.',
        'I only fear danger where I want to fear it.',
        'He thought back on his family with deep emotion and love. His conviction that he would have to disappear was, if possible, even ' +
        'firmer than his sister\'s. He remained in this state of empty and peaceful reflection until the tower clock struck three in the morning. ' +
        'He still saw that outside the window everything was beginning to grow light.',
        'One morning, as Gregor Samsa was waking up from anxious dreams, he discovered that in his bed he had been changed into a monstrous bug…',
    ];
    const element = document.querySelector('.element');
    const closeButton = element.querySelector('.element_close');
    const pointsContainer = element.querySelector('.element_transition-points');
    const [leftArrow, rightArrow] = element.querySelectorAll('.element_arrow');
    const slideContent = element.querySelector('.element_slide-content > p');
    const disableTips = document.getElementById('disableTips');
    const points = [];
    let currSlide = 0;
    let wrapped = false;
    slideContent.textContent = info[0];

    closeButton.addEventListener('click', hideElement);

    function addPoint(pointIndex) {
        const point = document.createElement('span');
        point.addEventListener('click', () => {
            slideContent.textContent = info[pointIndex];
            currSlide = pointIndex;
            setSlide(pointIndex);
        });
        pointsContainer.appendChild(point);
        if (point.offsetLeft !== 0 && point.offsetLeft === parseInt(getComputedStyle(point).marginLeft)) {
            point.style.marginLeft = '0';
            wrapped = true;
        }
        if (wrapped) {
            point.style.marginTop = '5px';
        }
        return point;
    }

    function showElement() {
        element.classList.remove('element_hidden');
        for (let i = 0; i < info.length; i++)
            points.push(addPoint(i));
        points[0].classList.add('element_transition-point_active');
        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'Escape':
                    hideElement();
                    break;
                case 'ArrowLeft':
                    previousSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
            }
        });
    }

    function hideElement() {
        element.classList.add('element_hidden');
    }

    function setSlide(slideIndex) {
        slideContent.textContent = info[slideIndex];
        points.forEach((point) => point.classList.remove('element_transition-point_active'));
        points[slideIndex].classList.add('element_transition-point_active');
    }

    function nextSlide() {
        currSlide = ++currSlide % info.length;
        setSlide(currSlide);
    }

    function previousSlide() {
        currSlide = currSlide - 1 < 0 ? info.length - 1 : currSlide - 1;
        setSlide(currSlide);
    }

    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', previousSlide);
    disableTips.addEventListener('click', function () {
        localStorage.setItem('showElement', !this.checked);
    });
    setTimeout(showElement, time);
});
