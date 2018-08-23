// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// $ = require('jquery')
$ = jQuery = require('jquery')
require('jquery-ui')
require('jquery-autocomplete')
require('popper.js')
require('bootstrap')

var list = $(".friends-list .list-name");
var dataList = '';


var availableTags = new Array();
for (var i = 0; i < list.length; i ++) {
	dataList += list[i].innerHTML
	if (i != list.length - 1)
		dataList += ','
}
$('#search-input').attr('data-list', dataList);

$( "#user-search" ).autocomplete({
  source: availableTags
});

var currectSidebar;

function onProfile() {
	currectSidebar = $('#profile-sidebar');
	$('#main-sidebar').hide()
    $('#profile-sidebar').show()
}

function onSettings() {
	currectSidebar = $('#settings-sidebar')
	$('#main-sidebar').hide()
    $('#settings-sidebar').show()
}

function onMenuClose() {
	$('#main-sidebar').show()
	currectSidebar.hide()
}

const electron = require('electron')
const remote = electron.remote

const {ipcRenderer} = require('electron');
let btn = document.getElementById('quick-message');
btn.addEventListener('click', function (e) {
	var status = $('#quick-message').attr('show')
	if (status == 'true')
		return;
    e.preventDefault();
    var contents = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds();
    ipcRenderer.send('resize', contents.width + 345, contents.height);
    $('.quick-message-board').fadeIn();
    $('#quick-message').attr('show', true)
	$('.chat-board .quick-message').css('right', '365px')
	$('.chat-box').css('right', '345px')
	$('.chat-type').css('right', '545px')
	$('.chat-board').css('right', '345px')
	$('.chat-contents').css('right', '365px')
	$('.send-button').css('right', '375px')
	$('.smile-icon').css('right', '475px')
});

function onQuickMessageClose() {
	var contents = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds();
    ipcRenderer.send('resize', contents.width - 345, contents.height);

	$('.quick-message-board').hide();
	$('#quick-message').attr('show', false)
	$('.chat-board .quick-message').css('right', '20px')
	$('.chat-box').css('right', '0px')
	$('.chat-type').css('right', '200px')
	$('.chat-board').css('right', '0px')
	$('.chat-contents').css('right', '25px')
}

function onUser() {

	$('.user-button').css('background-color', '#1d252e')
	$('.group-button').css('background-color', '#262f38')
	$('.user-button').css('border-right', '1px solid #00aeef')
	$('.group-button').css('border-left', 'none')
}

function onGroup() {
	$('.group-button').css('background-color', '#1d252e');
	$('.user-button').css('background-color', '#262f38');
	$('.group-button').css('border-left', '1px solid #00aeef')
	$('.user-button').css('border-right', 'none')
}

function onPerson() {
	$('.friends-list li').each(function( index ) {
	  $( this ).removeClass('selected');
	});

	$(this).addClass('selected');
}

function onPersonAction() {
	$('.person-option .dropdown-menu').each(function(index) {
		$(this).removeClass('show');
		$(this).attr('style', '');
	})
}

$('body').on('click', function() {
	$('.person-option .dropdown-menu').each(function(index) {
		$(this).removeClass('show');
		$(this).attr('style', '');
	})

	$('.navigation .dropdown-menu').removeClass('show');
	$('.navigation .dropdown-menu').attr('style', '');
})

function onMsgSend()
{
	
}

$('.send-button').on('click', onMsgSend)

$('.friends-list li .list-more').on('click', onPersonAction)
$('.friends-list li').on('click', onPerson)
$('.friends-list li').on('click', onPerson)

$('.user-button').on('click', onUser)
$('.group-button').on('click', onGroup)

$('.quick-message-close').on('click', onQuickMessageClose)
$('img.menu-close').on('click', onMenuClose)

$('#profile').on('click', onProfile)
$('#settings').on('click', onSettings)


$('.dropdown').on('show.bs.dropdown', function() {
	$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});

function onAttachment() {
	$('#attachment').trigger('click')
}


$('.attachment-file').on('click', onAttachment)
$('.send-button').on('click', function() {
	var text = $('.chat-input input').val()
	if (text == '')
		return
	$('.chat-input input').val('')
	var html = '<div class="clearfix"></div>'
    html += '<div class="row chat-content float-right">'
    html += '<div class="callout left middle">'
    html += '<span>' + text + '</span>'
    html += '</div>'
    html += '<div class="chat-avatar text-center ">'
    html += '<img src="imgs/avatar.png" width="34px" height="34px">'
    html += '<span>12:47</span>'
    html += '</div>'
    $('.chat-contents').append(html);
	
	var height = $('.chat-contents').prop('scrollHeight');
	
    $('.chat-contents').scrollTop(height - $('.chat-contents').height() +  100);
})


$('.profile-content-button').on('click', function() {
	console.log($('.profile-content.status').innerHTML);
	$('.profile-content-input').val($('.profile-content.status').innerHTML)
	// $('.profile-content.status').hide();
	$('.profile-content-input').show()
	$('.profile-content-input').focus()
})
