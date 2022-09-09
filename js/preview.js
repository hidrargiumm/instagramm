'use strict';

(function () {
    //Открытие предпросмотра фото//
    //функция отрисовки окна
    window.preview = function () {
        const showBigPicture = function (i) {
            bigPicture.classList.remove('hidden');

            bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('src', window.pictureElements[i].url);
            bigPicture.querySelector('.likes-count').textContent = window.pictureElements[i].likes;
            bigPicture.querySelector('.comments-count').textContent = window.pictureElements[i].comments.length;
            bigPicture.querySelector('.social__caption').textContent = window.pictureElements[i].description;
            for (let j = 0; j < window.pictureElements[i].comments.length; j++) {
                bigPicture.querySelector('.social__comments').insertAdjacentHTML('afterbegin', `
        <li class="social__comment social__comment--text">
        <img class="social__picture" src="${window.pictureElements[i].comments[j].avatar}" alt="Аватар комментатора фотографии" width="35" height="35">
        ${window.pictureElements[i].comments[j].message}
       </li>`);
            };
            bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
            bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
        };

        const bigPicture = document.querySelector('.big-picture');
        const pictureItems = document.querySelectorAll('.picture__link');
        const closeBigPictureBtn = document.querySelector('.big-picture__cancel');

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
    };
}());