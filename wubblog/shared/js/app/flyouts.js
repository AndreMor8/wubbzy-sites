function refreshFlyouts( ev ) {
    var target = YAHOO.util.Event.getTarget( ev );

    var flyouts = [
        { id: 'global-user-blogs',   parent: 'nav-group' },
        { id: 'global-user-library', parent: 'nav-group' },
        { id: 'global-user-account', parent: 'nav-group' },
        { id: 'blog-compose',        parent: 'blog-nav-compose' },
        { id: 'user-blogs',          parent: 'flyout-parent' },
        { id: 'blog-actions',        parent: 'blog' },
        { id: 'album-actions',       parent: 'album' },
        { id: 'typelist-actions',    parent: 'typelist' },
        { id: 'post-actions',        parent: 'post' },
        { id: 'page-actions',        parent: 'page' },
        { id: 'comment-author',      parent: 'comment' },
        { id: 'comment-entry',       parent: 'comment' },
        { id: 'comment-actions',     parent: 'comment' },
        { id: 'contact',             parent: 'contact-list' },
        { id: 'trackback-source',    parent: 'trackback' },
        { id: 'trackback-entry',     parent: 'trackback' },
        { id: 'trackback-actions',   parent: 'trackback' },
        { id: 'design-settings',     parent: 'tp-button-status' },
        { id: 'design-actions',      parent: 'tp-button-status' },
        { id: 'blogchooser',         parent: 'db-compose-blogchooser' },
        { id: 'share-accounts',      parent: 'share-post' }
    ];
    
    var flyout_parents,
        flyout_target,
        flyout_info,
        flyout_parent;

    // remove all "flyout-focus" classes
    flyout_parents = YAHOO.util.Dom.getElementsByClassName( 'flyout-focus', null, null, function( el ) {
    
        // Unless the flyout has the class 'flyout-clicks-okay' and the target was a child of the flyout, close it
        if( !( YAHOO.util.Dom.isAncestor( el, target ) && YAHOO.util.Dom.hasClass( el, 'flyout-clicks-okay' ) ) ){

            // remove the flyout-focus class
            YAHOO.util.Dom.removeClass( el, 'flyout-focus' );
            for( var i = 0; i < flyouts.length; i++ ) {
                YAHOO.util.Dom.removeClass( el, 'flyout-focus-' + flyouts[ i ].id );
            }

            // remove the flyout-clicks-okay class (if it's not present this fails silently)
            YAHOO.util.Dom.removeClass( el, 'flyout-clicks-okay' );

        }

    } );

    // check whether the click reveals a flyout
    flyout_target = getFlyoutTarget(ev);
    if(!flyout_target) {
        return;
    }
    // stop event from completing
    YAHOO.util.Event.stopEvent( ev );

    // get the target's intended flyout
    for( var i = 0; i < flyouts.length; i++ ) {
        if( YAHOO.util.Dom.hasClass( flyout_target, 'flyout-init-' + flyouts[ i ].id ) ) {
            flyout_info = flyouts[ i ];
        }
    }
    if( !flyout_info ) {
        return;
    }

    // get the intended flyout's parent
    flyout_parent = YAHOO.util.Dom.getAncestorByClassName( flyout_target, flyout_info.parent );
    if( !flyout_parent ) {
        return;
    }

    // set the focus class for the flyout on the parent
    YAHOO.util.Dom.addClass( flyout_parent, 'flyout-focus' );
    YAHOO.util.Dom.addClass( flyout_parent, 'flyout-focus-' + flyout_info.id );

    // if the flyout_target has 'flyout-clicks-okay' on it, add to parent
    if( YAHOO.util.Dom.hasClass( flyout_target, 'flyout-clicks-okay' ) ) {
        YAHOO.util.Dom.addClass( flyout_parent, 'flyout-clicks-okay' );
    }

}

function getFlyoutTarget(ev) {
    // check whether the click reveals a flyout
    flyout_target = YAHOO.util.Event.getTarget( ev );
    if( !YAHOO.util.Dom.hasClass( flyout_target, 'flyout-init' ) ) {
        flyout_target = YAHOO.util.Dom.getAncestorByClassName( flyout_target, 'flyout-init' );
    }
    if( !flyout_target ) {
        return null;
    }
    
    return flyout_target;
}

YAHOO.util.Event.on( document, 'click', refreshFlyouts );
