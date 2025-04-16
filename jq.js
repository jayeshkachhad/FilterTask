

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

        pros.children('div').addClass('productCol').css({ "flex": "1 1 calc(33% - 10px)" });
        pros.removeClass();
        pros.children('div').removeClass();
        $(".product").removeClass()
        $(".productCol").removeAttr('style')
        $(".productCol").removeClass()
        $(".thumb").removeAttr('style')
        // $(".productList").removeAttr('style')

        if (view == 0) {
            console.log("get in grid 0");
            pros.addClass('products');
            pros.children('div').addClass('product');
            $(".thumb").height(200);

        } else if (view == 1) {
            console.log("get in list 1");
            pros.addClass('productsList');
            pros.children('div').addClass('productList');
            $(".thumb").height(150);

        } else if (view == 2) {
            pros.addClass('productsCol');
            pros.children('div').addClass('productCol').css({ "flex": "1 1 calc(50% - 10px)" });
            $(".thumb").height(300);
        } else if (view == 3) {
            console.log("view 3");
            pros.addClass('productsCol');
            pros.children('div').addClass('productCol').css({ "flex": "1 1 calc(33% - 10px)" });
            $(".thumb").height(200);
            // pros.children('div').addClass('productCol');    
        } else if (view == 4) {
            console.log(" view  4");
            console.log("get in slide 2");
            pros.addClass('productsCol');
            pros.children('div').addClass('productCol').css({ "flex": "1 1 calc(25% - 10px)" });
            $(".thumb").height(150);
            // pros.children('div').addClass('productCol');
        }
        else {
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
    $("#col2").click(function () {
        view = 2;
        setView()
    })
    $("#col3").click(function () {
        view = 3;
        setView()
    })
    $("#col4").click(function () {
        view = 4;
        setView()
    })

})