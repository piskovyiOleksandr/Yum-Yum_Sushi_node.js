/* eslint-disable no-undef */
$(function() {

    $('.order').on('click', function(e) {
        e.preventDefault();
    
        var data = {
            surname: $('#surname').val(),
            name: $('#name').val(),
            street: $('#street').val(),
            numb: $('#numb').val(),
            apartment: $('#apartment').val(),
            nameOrder: $('.summary .name').text(),
            sumOder: $('.summary .sum').text()
        };
    
        $.ajax({
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          url: '/cart/order'
        }).done(function(data) {
          if (!data.ok) {
            $('.top').after('<p class="error"> Заповніть всі поля </p>');
          } else {
              $('.success').css("display", "block");
          }
        });
    });


});  
/* eslint-enable no-undef */