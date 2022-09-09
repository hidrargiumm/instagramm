'use strict';

(function () {

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
            comments: (new Array(Math.floor(1 + Math.random() * 2))).fill(undefined).map(item => random(commentsArr)),
            description: random(descriptionsArr)
        }
        )
        );
    };

    window.pictureElements = randomPhotoDescription();
})();