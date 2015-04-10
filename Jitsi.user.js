// ==UserScript==
// @name         My Fancy New Userscript
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://meet.jit.si/*
// @grant        none
// @require      http://code.jquery.com/jquery-2.1.3.min.js
// ==/UserScript==


function plugin() {
$('body').append($(' \
<style> \
.settings { z-index: 1000; position: absolute;  } \
.btn-settings { background-color: black  } \
.settings-inner { background-color: white; width: 200px; height: 200px; } \
</style> \
\
<div class="settings"> \
  <span class="btn-settings">Settings</span> \
  <span class="btn-reload">Reload</span> \
  <div class="settings-inner"> \
    <h3>Settings</h3> \
    <div class="persons"></div> \
  </div> \
</div> \
'));

setTimeout(function() {
   loadParticipantsSettings();
}, 6000);


$('.settings-inner').hide();
$('.btn-settings').click(function() { $('.settings-inner').toggle(); });
$('.btn-reload').click(function() { loadParticipantsSettings(); });
    
}

function loadParticipantsSettings() {
    $('.persons').empty();
    $('#remoteVideos .videocontainer').each(function() {
        var $media = $(this).find('audio');
        //if($media.length == 0) {
        //    $media = $(this).find('audio');
        //}
        var name = $(this).find('span.displayname').html();
        var $person = $('<div class="person"/>');
        $person.append($('<div/>').html(name));
        var $volCtl = $('<input type="range" min="0" max="1" step="0.1"/>');
        $volCtl.val($media.prop('volume'));
        $volCtl.on('input', function() {
            console.log('Value change: ' + this.value);
            $media.prop('volume', this.value);
        });
        $person.append($volCtl);
        $('.persons').append($person);

    });
}

plugin();
