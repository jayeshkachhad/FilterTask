$(document).ready(function () {
    // console.log("Jquery Got It")

    // $("#jq").click(function () {

    //     $(".product").hide();
    // })


    // $("#clear").mouseenter(function () {
    //     console.log("you are on clear");
    //     // alert("You entered p1!");
    // });

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

    // $(".product").each(function () {
    //     $(this).mouseenter(function () {
    //         $(this).slideUp();
    //     });
    // })

})