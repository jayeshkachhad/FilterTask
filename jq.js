

$(document).ready(function () {
    // console.log("Jquery Got It")



    $(document).keydown(function (e) {
        if (e.ctrlKey && e.which === 72) {
            e.preventDefault()
            $(".product").hide();
        }
    });


    const pros = $("#allPro");
    // let pro = $(".productList");

    // 0 for Grid, 1 for List, 2 for slide
    let view = 0;
    function setView() {

        pros.removeClass();
        pros.children('div').removeClass();
        $(".product").removeClass()

        if (view == 0) {
            console.log("get in grid 0");
            pros.addClass('products');
            pros.children('div').addClass('product');
            $(".thumb").width(300).height(200);

        } if (view == 1) {
            console.log("get in list 1");
            pros.addClass('productsList');
            pros.children('div').addClass('productList');
            $(".thumb").width(150).height(150);

        } if (view == 2) {
            console.log("get in slide 2");
            pros.addClass('productsSlide');
            pros.children('div').addClass('product');

        } else {
            console.log("else Got");
        }
        // return a;
    }

    $("#displayGrid").click(function () {
        view = 0;
        setView()
        $("#pagination").show()
    })
    $("#displayList").click(function () {
        view = 1;
        setView()
        $("#pagination").show()
    })
    $("#displaySlide").click(function () {
        view = 2;
        createDisplay(appliedData)
        $("#pagination").hide()
        setView()
    })

})