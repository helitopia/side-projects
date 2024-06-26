new Swiper('.swiper', {
    direction: 'horizontal',
    effect: "coverflow",
    coverflowEffect: {
        slideShadows: false
    },
    slidesPerView: 3,
    navigation: {
        nextEl: '.next-song',
        prevEl: '.prev-song',
    },
});
