$(window).load(function(){ 
    $(function () {
        $("table#remove_row").on("click", ".remove", function () {
            $(this).closest('tr').remove();
        });
    });

    $(document).click(function () {
        $('.tooltip').remove();
        $('[title]').tooltip();
    });
});