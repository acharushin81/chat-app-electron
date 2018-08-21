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

const electron = require('electron');
let {ipcRenderer} = electron;
let btn = document.getElementById('quick-message');
btn.addEventListener('click', function (e) {
    e.preventDefault();
    ipcRenderer.send('resize', 600, 800);
});

// function onQuickMessage() {
// 	$('.chat-board .quick-message').css('right', '365px')
// 	$('.chat-box').css('right', '345px')
// 	$('.chat-type').css('right', '545px')
// 	$('.chat-board').css('right', '345px')
// 	$('.chat-contents').css('right', '365px')

// 	ipcRenderer.send('resize', 600, 800);
// }

$('img.menu-close').on('click', onMenuClose)

$('#profile').on('click', onProfile)
$('#group').on('click', onProfile)
$('#contacts').on('click', onProfile)
$('#settings').on('click', onSettings)
$('#about').on('click', onProfile)
// $('.quick-message button').on('click', onQuickMessage)