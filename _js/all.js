(function($){ // start jquery
$(function(){


/* ScrollTo */

$('a[href^=#].js-scrollTo').click(function(){
    var href= this.hash;
    var $target = $(href == '#_top' ? 'body' : href);

    if($target.size()){
        var TOP = $target.offset().top;
        $('html, body').animate({scrollTop:TOP}, 500, 'swing');
    }
    return false;
});


/* Dropdown Select */

$('.widget-archive-dropdown select').change(function() {
    window.location = $(this).find('option:selected').val();
});


/* Flat Height */

$('.js-flatheight').each(function() {
    var flatheight = 45; // min-height
    $('.js-flatheight-target', this).each(function() {
        if( $(this).height() > flatheight ) {
            flatheight = $(this).height();
        }
    });
    $('.js-flatheight-target', this).css({
        height: flatheight + 'px',
        boxSizing: 'initial'
    });
});


}); // end $(function


})(jQuery); // end jquery



