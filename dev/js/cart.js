/* eslint-disable no-undef */
$(function() {

  var cartItemsString = localStorage.getItem("cartItems");
  var savedItems = JSON.parse(cartItemsString) || [];

  for (var i=0; i<savedItems.length; i++) {
    addToCart(savedItems[i]);
  }

  
  
  function updateStorage(){
    var cartItems = [];
    $(".summary > tbody > tr").each(function(i, tr) {
        var item = {
            name: $(this).find(".name").text(),
            price: $(this).find(".price").text(),
        };  
        cartItems.push(item);  
    });


    var cartItemsString = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", cartItemsString); 

  }

  function removeFromCart($tr){
    $tr.remove();
        
        updateTotal();
        updateStorage();
        
        if ($(".summary > tbody > tr").length ===0) {
            $(".cart").addClass("empty");
        }
  } 

  function addToCart(item){

    $(".cart").removeClass("empty");

    $(".summary > tbody").append(
        "<tr>" + 
            "<td class='name'>" + item.name + "</td>" +
            "<td class='price'>" + item.price +"</td>" +
            "<td class='del'><button type='button'>X</button></td" +
        "</tr>"
    );
    $('.hidden').css("display", "block");
    updateTotal();
    updateStorage();
};

function updateTotal(){
  var total = 0;
  $(".summary > tbody > tr").each(function(i, tr){
     var price = $(tr).find(".price").text();
      total += +price;
  });

  $(".summary .sum").text(total + " грн.");
}

  $(".list").on("click", ".buy", function (event) {
    var goods = $(event.target).closest(".box");
     var item = {
         id: goods.attr("id"),
         name: goods.find(".name").text(),
         price: goods.find(".price-value").text(),
     };
     addToCart(item);
 });

 $(".summary").click(function(event) {
    var $target = $(event.target);
    if ($target.is(".del > button")) {
        var $tr = $target.closest("tr");
        removeFromCart($tr);
    }
});




//---------------ORDER START---------------//

// REMOVE ERRORS
function removeErrors() {
    $(' .order p.error').remove();
    $('.form-order p input').removeClass('error');
  }

   // CLEAR
   $('.form-order p input').on('focus', function() {
    removeErrors();
  });

    $('.btn-order').on('click', function(e) {
        e.preventDefault();
        removeErrors();

        var data = {
            surname: $('#surname').val(),
            name: $('#name').val(),
            phone: $('#phone').val(),
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
        }).done(function (data) {
            if (!data.ok) {
              $('.top').after('<p class="error">' + data.error + '</p>');
              if (data.fields) {
                data.fields.forEach(function(item) {
                  $('#' + item).addClass('error');
                });
              }
            } else {
                $('.top').after('<p class="success">Ваше замовлення прийнято!</p>');
                localStorage.clear();
                setTimeout( function() {
                    $(location).attr('href', '/');
                }, 4000);
                
            }
          });
    });

});
  
/* eslint-enable no-undef */