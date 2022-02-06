// Carousel

$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 300,
        autoplay: true,
        autoplayspeed: 1000,
        fade: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../images/icons/chevron-left-solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../images/icons/chevron-right-solid.svg"></button>',
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    arrows: false,
                    draggable: true
                }  
            }
        ]
      });

// Catalog   
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

// Catalog descr&list slider
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    

    $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
    });
}

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
// Modal
      $('[data-modal=consultation]').on('click', function() {
          $('.overlay, #consultation').fadeIn();
      });
      $('.modal__x').on('click', function(){
          $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
      });
 
      $('.catalog-item__btn').each(function(i) {
          $(this).on('click', function() {
              $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
              $('.overlay, #order').fadeIn('fast');
          });        
      });

// JqueryValidation
      function validateForms(form){
        $(form).validate({
            rules: {
               name: 'required',
               phone: 'required',
               email: {
                   required: true,
                   email: true
               }
            }
        });
        $('#order form').validate();
      }
      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');

      $('input[name=phone]').mask("+370 (999) 999-99");

// mail php
      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');


            $('form').trigger('reset');
        });
        return false;
      });


// smooth scroll , pageUp
      $(window).scroll(function(){
          if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
          } else {
            $('.pageup').fadeOut();
          }
      }); 
  });


