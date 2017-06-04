$( document ).ready( function() {
  remarginContent();

  $(window).resize( function() {
    remarginContent(); /* !!!!ONLY DO THIS IF WIDTH CHANGES, NOT HEIGHT */
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

  var aboutTop = $('#landing-bottom').offset().top;
  var projectsTop = $('#projects').offset().top;
  var contactTop = $('#contact').offset().top - 50;

  var homeNav = $('#nav-right a:nth-child(1)');
  var aboutNav = $('#nav-right a:nth-child(2)');
  var projectsNav = $('#nav-right a:nth-child(3)');
  var contactNav = $('#nav-right a:nth-child(4)');

  homeNav.css( 'border-bottom', '3px solid #3498db' );
  var curNav = homeNav;


  $(window).scroll( function() {
    // Have variables for top offsets of all sections, highlight correct nav
    var scrollAmount = $('nav').offset().top + $('nav').outerHeight();

    if( scrollAmount > aboutTop && scrollAmount < projectsTop ) {
      // Highlight about

      if( curNav != aboutNav ) {
        curNav.css( 'border-bottom', '3px solid rgba(0,0,0,0)' );
        curNav = aboutNav;
        curNav.css( 'border-bottom', '3px solid #3498db' );
      }
    } else if( scrollAmount > projectsTop && scrollAmount < (contactTop-150) ) {
      // Highlight projects
      if( curNav != projectsNav ) {
        curNav.css( 'border-bottom', '3px solid rgba(0,0,0,0)' );
        curNav = projectsNav;
        curNav.css( 'border-bottom', '3px solid #3498db' );
      }
    } else if( scrollAmount > contactTop-150 ) {
      // Highlight contact
      if( curNav != contactNav ) {
        curNav.css( 'border-bottom', '3px solid rgba(0,0,0,0)' );
        curNav = contactNav;
        curNav.css( 'border-bottom', '3px solid #3498db' );
      }
    } else if( scrollAmount < aboutTop ) {
      // Highlight home
      if( curNav != homeNav ) {
        curNav.css( 'border-bottom', '3px solid rgba(0,0,0,0)' );
        curNav = homeNav;
        curNav.css( 'border-bottom', '3px solid #3498db' );
      }
    }

  });

  homeNav.click( function() {
    $('body').animate( {'scrollTop': '0'} );
  });
  aboutNav.click( function() {
    $('body').animate( {'scrollTop': aboutTop - 50} );
  });
  projectsNav.click( function() {
    $('body').animate( {'scrollTop': projectsTop - 50} );
  });
  contactNav.click( function() {
    $('body').animate( {'scrollTop': contactTop - 50} );
  });


  $('#input-container').submit( function( event ) {
    event.preventDefault();
    var name = $('#name').val();
    var senderEmail = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();

    if( senderEmail.indexOf( '@' ) >= 0 && name ) {
      // Valid email

      var data = {
        'name': name,
        'replyto': senderEmail,
        'message': message
      };

      var http = new XMLHttpRequest();
      http.open( "POST", "https://dylanrose.me/api/send-mail.php" );
      http.send( JSON.stringify( data ) );

      swal({
        "title": "I'll be in touch",
        "text": "Thanks for reaching out, " + name + "! I'll get back to you as soon as I can!",
        "timer": 1500,
        "showConfirmButton": false,
        "type": "success"
      });
    } else {
      // Must provide a valid email and name
      swal({
        "type": "error",
        "title": "Try Again",
        "text": "Please provide a valid name and email!",
        "timer": 1500,
        "showConfirmButton": false
      });
    }

  });

});


function remarginContent() {
  //var landingTextTopOffset = $('nav').offset().top + $('nav').outerHeight() /*+ $('body').height() * 0.03*/;
  var landingTextTopOffset = $('nav').outerHeight();
  $('#landing-text').css( 'margin-top', landingTextTopOffset );
}
