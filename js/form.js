'use strict';

(function () {
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
            imgUploadPreview.style = 'filter: grayscale' + `(${scaleValue.value / 100})`;
        };
        if (currentFilter.includes('sepia')) {
            imgUploadPreview.style = 'filter: sepia' + `(${scaleValue.value / 100})`;
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

    //Отправка формы
    const form = document.querySelector('.img-upload__form');

    const errorHandler = function (errorMessage) {
        let node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center: background-color: black;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';
    
        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };

    form.addEventListener('submit', function (evt) {
        window.upload(new FormData(form), function(response){
            closeUploadWindow();
        }, errorHandler);
        evt.preventDefault();

    });
}())