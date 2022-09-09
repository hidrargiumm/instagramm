'use strict';


const random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

const commentsArr = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const descriptionsArr = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
    'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка'];

//Создаем массив с рандомными данными    
const randomPhotoDescription = function () {

    return (new Array(26)).fill(undefined).map((_, index) => ({
        url: `photos/${index + 1}.jpg`,
        likes: (Math.random() * (200 - 15) + 15) | 0,
        comments: (new Array(Math.floor(1 + Math.random() * 2))).fill(undefined).map(() => random(commentsArr)),
        description: random(descriptionsArr)
    }
    )
    );
};

let pictureElements = randomPhotoDescription();

//Создаем DOM элементы и отрисовываем их
(function () {
    let pictures = document.querySelector('.pictures');
    let pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    for (let i = 0; i < pictureElements.length; i++) {
        let pictureElement = pictureTemplate.cloneNode(true);

        pictureElement.querySelector('.picture__img').setAttribute('src', pictureElements[i].url);
        pictureElement.querySelector('.picture__stat--likes').textContent = pictureElements[i].likes;
        pictureElement.querySelector('.picture__stat--comments').textContent = pictureElements[i].comments.length;

        pictures.appendChild(pictureElement);
    };

}());

//Форма загрузки фото//
//Открытие формы/закрытие формы
const uploadFileButton = document.querySelector('#upload-file');
const uploadFileWindow = document.querySelector('.img-upload__overlay');
const uploadWindowClose = uploadFileWindow.querySelector('.img-upload__cancel');

const onUploadWindowEscPress = function (evt) {
    let target = evt.target;
    if (evt.key === 'Escape' && target.className !== 'text__hashtags' && target.className !== 'text__description') {
        closeUploadWindow();
    };
    if (evt.key === 'Escape' && (target.className === 'text__hashtags' || target.className === 'text__description')) {
        target.blur();
    };
};

const onOutWindowUploadClick = function (evt) {
    let target = evt.target;
    if (target.className === 'img-upload__overlay') {
        closeUploadWindow();
    }
};


const openUploadWindow = function () {
    uploadFileWindow.classList.remove('hidden');
    document.addEventListener('keydown', onUploadWindowEscPress);
    document.addEventListener('click', onOutWindowUploadClick);
};
const closeUploadWindow = function () {
    uploadFileWindow.classList.add('hidden');
    document.removeEventListener('keydown', onUploadWindowEscPress);
    document.removeEventListener('click', onOutWindowUploadClick);
    uploadFileButton.value = '';
};

uploadFileButton.addEventListener('change', () => {
    openUploadWindow();
});

uploadWindowClose.addEventListener('click', () => {
    closeUploadWindow();
})

//эффекты в форме//
//масштаб фото
const resizeMinusBtn = uploadFileWindow.querySelector('.resize__control--minus');
const resizePlusBtn = uploadFileWindow.querySelector('.resize__control--plus');
const resizeValue = uploadFileWindow.querySelector('.resize__control--value');
const imgUploadPreview = uploadFileWindow.querySelector('.img-upload__preview');

resizeMinusBtn.addEventListener('click', () => {
    if (parseInt(resizeValue.value) > 25) {
        resizeValue.value = parseInt(resizeValue.value) - 25 + '%';
        imgUploadPreview.style.transform = `scale(${(parseInt(resizeValue.value)) / 100})`
    };
});
resizePlusBtn.addEventListener('click', () => {
    if (parseInt(resizeValue.value) < 100) {
        resizeValue.value = parseInt(resizeValue.value) + 25 + '%';
        imgUploadPreview.style.transform = `scale(${(parseInt(resizeValue.value)) / 100})`
    };
});

//Слайдер
const sliderBtn = uploadFileWindow.querySelector('.scale__pin');
const sliderLevel = uploadFileWindow.querySelector('.scale__level');
const scaleValue = uploadFileWindow.querySelector('.scale__value');
const imgUploadScale = uploadFileWindow.querySelector('.img-upload__scale');


sliderBtn.addEventListener('mousedown', (evt) => {
    evt.preventDefault();

    let startCoords = {
        x: evt.clientX
    };

    const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let shift = {
            x: startCoords.x - moveEvt.clientX
        };
        startCoords = {
            x: moveEvt.clientX
        };

        sliderBtn.style.left = (sliderBtn.offsetLeft - shift.x) + 'px';

        if (parseInt(sliderBtn.style.left) < 0) {
            sliderBtn.style.left = '0px'
        };
        if (parseInt(sliderBtn.style.left) > 450) {
            sliderBtn.style.left = '450px'
        };
        sliderLevel.style.width = sliderBtn.style.left;
        let value = (100 * parseInt(sliderBtn.style.left) / 450).toFixed(2);
        scaleValue.setAttribute('value', value);
        changeEffectLevel();

    };

    const onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

});

const changeEffectLevel = function () {
    let currentFilter = imgUploadPreview.style.filter;

    if (currentFilter.includes('none')) {
        imgUploadPreview.style = 'filter: none';
    };
    if (currentFilter.includes('grayscale')) {
        imgUploadPreview.style = 'filter: grayscale' + `(${scaleValue.value/100})`;
    };
    if (currentFilter.includes('sepia')) {
        imgUploadPreview.style = 'filter: sepia' + `(${scaleValue.value/100})`;
    };
    if (currentFilter.includes('invert')) {
        imgUploadPreview.style = 'filter: invert' + `(${scaleValue.value}%)`;
    };
    if (currentFilter.includes('blur')) {
        imgUploadPreview.style = 'filter: blur' + `(${3 * scaleValue.value / 100}px)`;
    };
    if (currentFilter.includes('brightness')) {
        let brightnessValue = '';
        if ((3 * scaleValue.value / 100) < 1) {
            brightnessValue = 1; 
        } else {
            brightnessValue = 3 * scaleValue.value / 100;
        };
        imgUploadPreview.style = 'filter: brightness' + `(${brightnessValue})`;
    };


};

const effects = {
    none: 'none',
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness'
};

const effectsBtn = uploadFileWindow.querySelectorAll('.effects__radio');

for (let effect of effectsBtn) {
    effect.addEventListener('click', (evt) => {
        changeFilter(evt.target.value);
    })
};

const changeFilter = function (effect) {
    //сбрасываем значение слайдера при переключении эффекта
    sliderBtn.style.left = '450px'
    sliderLevel.style.width = '100%'
    scaleValue.setAttribute('value', 100);
    imgUploadScale.classList.remove('hidden');
    //применяем эффект к фото
    switch (effect) {
        case 'none': imgUploadPreview.style.filter = effects[effect];
                     imgUploadScale.classList.add('hidden');
            break;
        case 'chrome': imgUploadPreview.style.filter = effects[effect] + '(1)';
            break;
        case 'sepia': imgUploadPreview.style.filter = effects[effect] + '(1)';
            break;
        case 'marvin': imgUploadPreview.style.filter = effects[effect] + '(100%)';
            break;
        case 'phobos': imgUploadPreview.style.filter = effects[effect] + '(3px)';
            break;
        case 'heat': imgUploadPreview.style.filter = effects[effect] + '(3)';
            break;       
    };
};





//Открытие предпросмотра фото//
//функция отрисовки окна
const showBigPicture = function (i) {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('src', pictureElements[i].url);
    bigPicture.querySelector('.likes-count').textContent = pictureElements[i].likes;
    bigPicture.querySelector('.comments-count').textContent = pictureElements[i].comments.length;
    bigPicture.querySelector('.social__caption').textContent = pictureElements[i].description;
    for (let j = 0; j < pictureElements[i].comments.length; j++) {
        bigPicture.querySelector('.social__comments').insertAdjacentHTML('afterbegin', `
        <li class="social__comment social__comment--text">
        <img class="social__picture" src="img/avatar-${Math.floor(1 + Math.random() * 6)}.svg" alt="Аватар комментатора фотографии" width="35" height="35">
        ${pictureElements[i].comments[j]}
       </li>`);
    };
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
};

const bigPicture = document.querySelector('.big-picture');
const pictureItems = document.querySelectorAll('.picture__link');
const closeBigPictureBtn = document.querySelector('.big-picture__cancel');

console.log(pictureItems);

const onBigPictireEscPress = function (evt) {
    let target = evt.target;
    if (evt.key === 'Escape' && target.className !== 'social__footer-text') {
        closeBigPicture();
    };
    if (evt.key === 'Escape' && target.className === 'social__footer-text') {
        target.blur();
    };
}

const onOutClickBigPicture = function (evt) {
    let target = evt.target;
    if (target.className === 'big-picture overlay') {
        closeBigPicture();
    };
};

const closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    while (bigPicture.querySelector('.social__comments').firstChild) {
        bigPicture.querySelector('.social__comments').firstChild.remove();
    };
    document.removeEventListener('keydown', onBigPictireEscPress);
    document.removeEventListener('click', onOutClickBigPicture);
};

for (let i = 0; i < pictureItems.length; i++) {
    pictureItems[i].addEventListener('click', () => {
        document.addEventListener('keydown', onBigPictireEscPress);
        document.addEventListener('click', onOutClickBigPicture);
        showBigPicture(i);
    }
    );

    pictureItems[i].addEventListener('keydown', (evt) => {
        consple.log(evt);
        if (evt.code === 'Enter') {
            showBigPicture(i);
            document.addEventListener('keydown', onBigPictireEscPress);
            document.addEventListener('click', onOutClickBigPicture);
        };
    });

};

closeBigPictureBtn.addEventListener('click', () => {
    closeBigPicture();
});

