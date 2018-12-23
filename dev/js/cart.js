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
            $('.cart a').css("display", "none");
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
    $('.cart a').css("display", "block");
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


$('.btn-order').on('click', function(e) {
    e.preventDefault();
    
    var data = {
        surname: $("#surname").val(),
        name: $("#name").val(),
        street: $("#street").val(),
        body: $('.summary > tbody > tr > td.name').text()
    };
    
    console.log(data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/cart/order'
      }).done(function(data) {
        if (!data.ok) {
          alert("Error")
        } else {
            alert("good")
            $(location).attr('href', '/');
        }
      });
    });
});
  
/* eslint-enable no-undef */