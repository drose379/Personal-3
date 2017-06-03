$( document ).ready( function() {
  remarginContent();

  $(window).resize( function() {
    remarginContent();
  } );

  var navFolded = false;
  var navOffsetTop = $('nav').offset().top;
  var navPaddingTopBottom = $('nav').css('padding-top');
  $(window).scroll( function() {
    var scrollAmount = $(document).scrollTop();

    if( scrollAmount >= 20 ) {
      if( !navFolded ) {
        // Fold the nav, just use addclass/removeclass
        //$('nav').animate( {'margin-top': '0'}, 150 );
        $('nav').animate( {'padding-top': '20px', 'padding-bottom': '20px'}, 150 );
        $('nav').css( 'background-color', '#2c3e50');
        $('nav').css( 'box-shadow', '0px 0px 20px black' );
        //$( 'nav' ).css( 'padding-top', '20px' );
        //$('nav').css( 'padding-bottom', '20px' );

        //$('nav').find('h1').toggleClass( 'no-after' );
        navFolded = true;
      }
    } else {
      if( navFolded ) {
        // Unfold the nav, just use addclass/removeclass
        //$('nav').animate( {'margin-top': navOffsetTop }, 150 );
        $('nav').css( 'background-color', 'inherit');
        $('nav').css( 'box-shadow', 'inherit' );
        //$('nav').css( 'padding-top', navPaddingTopBottom );
        //$('nav').css( 'padding-bottom', navPaddingTopBottom );

        $('nav').animate( {'padding-top': navPaddingTopBottom, 'padding-bottom': 0}, 150 );

        //$('nav').find('h1').toggleClass( 'no-after' );
        navFolded = false;
      }
    }
  });
});

function remarginContent() {
  var landingTextTopOffset = $('nav').offset().top + $('nav').outerHeight() /*+ $('body').height() * 0.03*/;
  $('#landing-text').css( 'margin-top', landingTextTopOffset );
}
