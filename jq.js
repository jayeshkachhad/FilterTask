$(document).ready(function () {
    // console.log("Jquery Got It")

    // $("#jq").click(function () {

    //     $(".product").hide();
    // })


    $("#clear").mouseenter(function () {
        console.log("you are on clear");
        // alert("You entered p1!");
    });


    $(".product").each(function () {
        $(this).mouseenter(function () {
            $(this).slideUp();
        });
    })

})