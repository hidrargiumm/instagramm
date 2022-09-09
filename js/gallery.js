'use strict';

//Создаем DOM элементы и отрисовываем их
(function () {
    let pictures = document.querySelector('.pictures');
    let pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

    // for (let i = 0; i < pictureElements.length; i++) {
    //     let pictureElement = pictureTemplate.cloneNode(true);

    //     pictureElement.querySelector('.picture__img').setAttribute('src', pictureElements[i].url);
    //     pictureElement.querySelector('.picture__stat--likes').textContent = pictureElements[i].likes;
    //     pictureElement.querySelector('.picture__stat--comments').textContent = pictureElements[i].comments.length;

    //     pictures.appendChild(pictureElement);
    // };

    window.renderGallery = function (galleryItem) {
        let galleryElement = pictureTemplate.cloneNode(true);

        galleryElement.querySelector('.picture__img').setAttribute('src', galleryItem.url);
        galleryElement.querySelector('.picture__stat--likes').textContent = galleryItem.likes;
        galleryElement.querySelector('.picture__stat--comments').textContent = galleryItem.comments.length;

        return galleryElement;
    };

    const succesHandler = function (galleryItems) {
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < galleryItems.length; i++) {
            fragment.appendChild(renderGallery(galleryItems[i]));
        };
        pictures.appendChild(fragment);
        window.preview();
    };

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

    window.load(succesHandler, errorHandler);
}());