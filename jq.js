

$(document).ready(function () {
    // console.log("Jquery Got It")



    $(document).keydown(function (e) {
        if (e.ctrlKey && e.which === 72) {
            e.preventDefault()
            $(".product").hide();
            // Your code here
            // alert('Ctrl + H pressed');
            // Example:
            // $('#element').toggle();
        }
    });


    const pros = $("#allPro");
    let pro = $(".productList");

    // 0 for Grid, 1 for List, 2 for slide
    let view = 0;
    function setView() {
        if (view == 0) {
            console.log("get in grid 0");

            try {
                $(".productsSlide").removeClass();
                // $(".productsSlide").removeClass('productsSlide').addClass('products');
                console.log("here at try");
            } catch {
                console.log("here at catch");
                if (pros.hasClass('productsList')) {
                    pros.removeClass('productsList').addClass('products');
                    $(".productList").removeClass('productList').addClass('product')
                    console.log("here at if ");
                }
            }

            if (pros.hasClass('productsList')) {
                pros.removeClass('productsList').addClass('products');
                $(".productList").removeClass('productList').addClass('product')
                console.log("here at if ");
            }

            $(".thumb").width(300).height(200);


        } if (view == 1) {
            console.log("get in list 1");
            $(".products").removeClass('products').addClass('productsList')
            $(".product").removeClass('product').addClass('productList')
            $(".thumb").width(150).height(150);
        } if (view == 2) {
            console.log("get in slide 2");
            $(".products").removeClass('products').addClass('productsSlide')
            $(".productsList").removeClass('productsList').addClass('productsSlide');


        } else {
            console.log("else Got");
        }
        // return a;
    }

    $("#displayGrid").click(function () {
        view = 0;
        setView()
    })
    $("#displayList").click(function () {
        view = 1;
        setView()
    })
    $("#displaySlide").click(function () {
        view = 2;
        createDisplay(appliedData)
        $("#pagination").hide()
        setView()
    })

})