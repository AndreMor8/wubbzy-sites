var hasChanged = 0;
var hostName = '.typepad.com';

function setCookie (name, value, expires) {
    document.cookie = name + '=' + escape(value) + '; expires=' + expires.toGMTString() + '; domain=' + hostName + '; path=/';
}

function getCookie (name) {
    var key = name + '=';
    var c = document.cookie;
    var i = c.indexOf(key);
    if (i < 0) return '';
    var j = c.indexOf(';', i + key.length);
    if (j < 0) j = c.length;
    return unescape(c.substring(i + key.length, j));
}

function deleteCookie (name) {
    if (getCookie(name))
        setCookie(name, '', new Date(70, 0, 1, 0, 0, 1));
}

function rememberMe (f) {
    var now = new Date();
    now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    if( f.author )
    	setCookie('typepadauthor', f.author.value, now);
    if( f.email )
    	setCookie('typepademail', f.email.value, now);
    if( f.url )
    	setCookie('typepadurl', f.url.value, now);
}

function forgetMe () {
    deleteCookie('typepadauthor');
    deleteCookie('typepademail');
    deleteCookie('typepadurl');
}

function setFormValues (f) {
    var val = getCookie("typepadauthor");
    if( f.author && !f.author.value && val)
    	f.author.value = val;
    val = getCookie("typepademail");
    if( f.email && !f.email.value && val)
    	f.email.value = val;
    val = getCookie("typepadurl");
    if( f.url && !f.url.value && val)
    	f.url.value = val;
}

function unsetFormValues (f) {
    f.author.value = '';
    f.email.value = '';
    f.url.value = '';
}

function handleSubmit (f) {
    if (f.bakecookie && f.bakecookie.checked)
        rememberMe(f);
    else
        forgetMe();
}

function handleSubmitEvent( evt )
{
	evt = evt || event;
	var f = document.getElementById( "comment-form" ) ||
		document.comment_form || document.comments_form;
	return handleSubmit( f );
}

function handleCheck (e) {
    if (hasChanged) return;
    if (e.checked)
        setFormValues(e.form);
    else
        unsetFormValues(e.form);
}

function handleChange (e) {
    hasChanged = 1;
}

function doLoaded () {
	var f = document.getElementById( "comment-form" ) ||
		document.comment_form || document.comments_form;
    if( !f )
   		return;
   	f.onsubmit = handleSubmitEvent;
    setFormValues( f );
	if( f.author && f.author.value && f.bakecookie )
		f.bakecookie.checked = 1;
}
onload = doLoaded;

var theForm;
var requestSubmitted = false;
function disableButton (e) {
    if (!requestSubmitted) {
        e.disabled = true;
        theForm = e.form;
        requestSubmitted = true;
        setTimeout('submitIt()', 250);
    } else {
        return false;
    }
}

function submitIt () {
    // make sure we're posting
    if (theForm.bakecookie) handleSubmit(theForm);
    theForm.submit();
    return false;
}

function checkLocal()
{
    // See if its already set
    if( typeof commenterName != "undefined" && commenterName )
        return;

    // Look for it in the query string
    var q = window.location.search.substring(1);
    var parms = q.split('&');
    for (var i=0; i<parms.length; i++) {
        var pos = parms[i].indexOf('=');
        if (pos > 0) {
            var key = parms[i].substring(0,pos);

            if (key != "commenter")
                continue;

            commenterName = unescape(parms[i].substring(pos+1));

            if( typeof commenterName == "undefined" || !commenterName ) {
                deleteCookie("commenter");
            } else {
                var now = new Date();
                now.setTime(now.getTime() + 60 * 60 * 1000);
                setCookie("commenter", commenterName, now);
            }
            return;
        }
    }

    // Look for a cookie if its still not set
    commenterName = getCookie("commenter");
}

/* comment registration */	
var showHideElements =
{
	"comments-open-login" : "none",
	"comments-open-logout" : "block",
	"comments-open-data" : "none",
	"comments-open-text" : "block",
	"comments-open-footer" : "block"
};

function commentSignIn()
{
	if( typeof commenterName == "undefined" || !commenterName )
		return;
	
	// insert name
	var e = document.getElementById( "commenter-name" );
	if( e )
		e.innerHTML = commenterName;
	
	// hide/show various elements
	for( var i in showHideElements )
	{
		e = document.getElementById( i );
		if( e )
			e.style.display = showHideElements[ i ];
	}
}

attachLoadEvent = function( func )
{
	var old = window.onload;
	if( typeof old != 'function' )
		window.onload = func;
	else
	{
		window.onload = function( evt )
		{
			old( evt );
			return func( evt );
		};
	}
}

function maxTextarea( limit_field, limit_num )
{
    if( limit_field.value.length > limit_num )
        limit_field.value = limit_field.value.substring( 0, limit_num );
}
