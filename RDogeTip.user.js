// ==UserScript==
// @name        RDogeTip
// @namespace   http://github.com/richardjrossiii/
// @description Much Tip Very Users Doge
// @include     http://*.reddit.com/r/*/comments/*
// @require     http://code.jquery.com/jquery-migrate-1.2.1.min.js
// @version     1
// @grant       none
// ==/UserScript==

var veryMenus = $('ul.flat-list.buttons');

function muchTip(soEvent) {
    var veryButton = $(soEvent.target);
    var suchPostId = veryButton.parents('[data-fullname]').attr('data-fullname');
    
    if (suchPostId == null) {
        alert('So error. Much sad. Such post id null.');
        return;
    }
    
    var amount = prompt('Such tip, very wow. Much amount?');        
    amount = parseFloat(amount);

    if (amount <= 0 || isNaN(amount)) {
        alert('So poor very shibe you.');
        return;
    }
    
    reply(veryButton);
    
    var muchForm = $('input[value="' + suchPostId + '"]').parent();
    
    var veryTextArea = muchForm.find('textarea[name="text"]');
    veryTextArea.val('+/u/dogetipbot ' + amount + ' doge');
    
    // Leave it up to the user to submit.
}

veryMenus.each(function (muchIndex, suchMenu) {
    // Add a tip menu item
    var manyTipButton = $('<li><a href="javascript:void(0)">much tip</a></li>');
    manyTipButton.click(manyTipButton, muchTip);
    
    $(suchMenu).append(manyTipButton);
});