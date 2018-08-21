// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

$ = require('jquery')
require('popper.js')
require('bootstrap')

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
    $('.quick-message-board').show();
    $('#quick-message').attr('show', true)
	$('.chat-board .quick-message').css('right', '365px')
	$('.chat-box').css('right', '345px')
	$('.chat-type').css('right', '545px')
	$('.chat-board').css('right', '345px')
	$('.chat-contents').css('right', '365px')
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

$('.user-button').on('click', onUser)
$('.group-button').on('click', onGroup)

$('.quick-message-close').on('click', onQuickMessageClose)
$('img.menu-close').on('click', onMenuClose)

$('#profile').on('click', onProfile)
$('#group').on('click', onProfile)
$('#contacts').on('click', onProfile)
$('#settings').on('click', onSettings)
$('#about').on('click', onProfile)