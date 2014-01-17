// ==UserScript==
// @name        RMultiDogeTip
// @namespace   http://github.com/richardjrossiii/
// @description Much Tip Many Users Doge
// @include     http://*.reddit.com/r/*/comments/*
// @require     http://code.jquery.com/jquery-migrate-1.2.1.min.js
// @version     1
// @grant       none
// ==/UserScript==

var veryUsernames = [];
var veryPostIds = [];

var veryMenus = $('ul.flat-list.buttons');
var suchOPMenu = veryMenus.first();

var suchOPUsername = suchOPMenu.parent().find('.tagline .author').text();
var suchLoggedInUsername = reddit.logged;

veryMenus.each(function (muchIndex, suchMenu) {
    suchMenu = $(suchMenu);
    if (suchMenu.is(suchOPMenu)) return;

    var suchCommentOwner = suchMenu.parent().find('.tagline .author').text();
    var suchPostId = suchMenu.parents('[data-fullname]').attr('data-fullname');

    if (suchCommentOwner == "" ||
        suchCommentOwner === suchOPUsername || 
        suchCommentOwner === suchLoggedInUsername ||
        suchCommentOwner === "dogetipbot"   || 
        suchCommentOwner === "so_doge_tip"  ||
        veryUsernames.indexOf(suchCommentOwner) !== -1)
        return;

    veryUsernames.push(suchCommentOwner);
    veryPostIds.push(suchPostId);
});

function dogeMultiTip() {
    var amount = prompt('Such multi tip, very wow. Much spread amount?');        
    amount = parseFloat(amount);

    if (amount <= 0 || isNaN(amount)) {
        alert('So poor very shibe you.');
        return;
    }
    
    var amountPer = amount / veryUsernames.length;
    var should = confirm('Last chance: Are you sure you want to tip ' + amountPer + ' doge per user in the thread?');
    
    if (!should) return;
    
    if (amountPer < 5) {
        alert('/u/dogetipbot does not accept tips less than 5 doge!');
        return;
    }

    for (var i = 0; i < veryPostIds.length; i++) {
        (function() {
            var suchPostId = veryPostIds[i];
            var suchTargetUsername = veryUsernames[i];
            var suchTimeout = i * 1500;
        
            var suchForm = $('input[value="' + suchPostId + '"]').parent();
            var suchReplyButton = suchForm.siblings('ul.buttons').find('a:contains("reply")');
        
            if (suchReplyButton.length == 0)
            {
                alert('No reply. Such error. Very sad. Check status for login. For user: ' + suchTargetUsername);
                return;
            }
        
            reply(suchReplyButton[0]);
        
            var suchForm = $('input[value="' + suchPostId + '"]').parent();
            var suchTextArea = suchForm.find('textarea[name="text"]');
        
            suchTextArea.val('Tip from ' + suchLoggedInUsername + ' to ' + suchTargetUsername + ':\n+/u/dogetipbot ' + amountPer + ' doge');
        
            setTimeout(function() {
                suchForm.submit();
            }, suchTimeout);
        })();
    }
}

var multiTipButton = $('<li><a href="javascript:void(0)">multi tip</a></li>');
multiTipButton.click(dogeMultiTip);

suchOPMenu.append(multiTipButton);