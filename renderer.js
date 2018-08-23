// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// $ = require('jquery')
$ = jQuery = require('jquery')
require('jquery-ui')
require('jquery-autocomplete')
require('popper.js')
require('bootstrap')

navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia || 
                            navigator.msGetUserMedia);

if (navigator.getUserMedia) {
  // Request the camera.
  navigator.getUserMedia(
    // Constraints
    {
      video: true
    },

    // Success Callback
    function(localMediaStream) {
    	$('#none-camera').hide();
  		$('#camera-stream').show();

		var vid = document.getElementById('camera-stream');

		// Create an object URL for the video stream and use this 
		// to set the video source.
		vid.src = window.URL.createObjectURL(localMediaStream);
    },

    // Error Callback
    function(err) {
      	$('#camera-stream').hide();
	  	$('#none-camera').show();
    }
  );

} else {
  $('#camera-stream').hide();
  $('#none-camera').show();
}


$('#main-sidebar .menu').on('click', function() {
	var src = $(this).find('img').attr('src')
	if (src == 'imgs/menu.png')
	{
		src = 'imgs/close.png'
	}	
	else
	{
		src = 'imgs/menu.png'
		$('.navigation .dropdown-menu').attr('style', '');
	}
	$(this).find('img').attr('src', src)
})

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
    $('.navigation .dropdown-menu').removeClass('show');
	$('.navigation .dropdown-menu').attr('style', '');
	$('.navigation .menu img').attr('src', 'imgs/menu.png')

}

function onSettings() {
	currectSidebar = $('#settings-sidebar')
	$('#main-sidebar').hide()
    $('#settings-sidebar').show()
    $('.navigation .dropdown-menu').removeClass('show');
	$('.navigation .dropdown-menu').attr('style', '');
	$('.navigation .menu img').attr('src', 'imgs/menu.png')

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
    $('.quick-message-board').slideDown();
    $('#quick-message').attr('show', true)
	$('.chat-board .quick-message').css('right', '365px')
	$('.chat-box').css('right', '345px')
	$('.chat-type').css('right', '545px')
	$('.chat-board').css('right', '345px')
	$('.chat-contents').css('right', '345px')
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
	$('.chat-contents').css('right', '0px')
	$('.send-button').css('right', '30px')
	$('.smile-icon').css('right', '130px')
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

$('.settings-font-size .dropdown-item').on('click', function() {
	var size = $(this)[0].innerHTML
	$('.chat-content .callout span').css('font-size', size)
	$('#font-size').html(size)
})

$('body').on('click', '.chat-board', function() {
	$('.person-option .dropdown-menu').each(function(index) {
		$(this).removeClass('show');
		$(this).attr('style', '');
	})
	console.log(2)
	$('.navigation .dropdown-menu').removeClass('show');
	$('.navigation .dropdown-menu').attr('style', '');
	$('.navigation .menu img').attr('src', 'imgs/menu.png')
	$('.settings-font-size .dropdown-menu').removeClass('show');
	$('.settings-font-size .dropdown-menu').attr('style', '');
	$('#quick-message-list .dropdown-menu').removeClass('show');
	$('#quick-message-list .dropdown-menu').attr('style', '');
})

$('.friends-list li .list-more').on('click', onPersonAction)
$('.friends-list li').on('click', onPerson)

$('.user-button').on('click', onUser)
$('.group-button').on('click', onGroup)

$('.quick-message-close').on('click', onQuickMessageClose)
$('img.menu-close').on('click', onMenuClose)

$('#profile').on('click', onProfile)
$('#settings').on('click', onSettings)

function animate() {
	$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
}

$('.dropdown').on('show.bs.dropdown', animate)

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
	$('.profile-content-input').val($('.profile-content.status')[0].innerHTML)
	// $('.profile-content.status').hide();
	$('.profile-content-input').show()
	$('.profile-content-input').focus()
	$('.profile-content.status').hide()

})

$('.profile-content-input').focusout(function() {
	$('.profile-content-input').hide()
	$('.profile-content.status').show()	
	$('.profile-content.status').html($('.profile-content-input').val())
})

$('.profile-birthday-button').on('click', function() {
	$('.profile-birthday-input').val($('.profile-content.birthday')[0].innerHTML)
	// $('.profile-content.status').hide();
	$('.profile-birthday-input').show()
	$('.profile-birthday-input').focus()
	$('.profile-birthday.birthday').hide()

})

$('.profile-birthday-input').focusout(function() {
	$('.profile-birthday-input').hide()
	$('.profile-content.birthday').show()	
	$('.profile-content.birthday').html($('.profile-birthday-input').val())
})

$('.profile-city-button').on('click', function() {
	$('.profile-city-input').val($('.profile-content.city')[0].innerHTML)
	// $('.profile-content.status').hide();
	$('.profile-city-input').show()
	$('.profile-city-input').focus()
	$('.profile-content.city').hide()

})

$('.profile-city-input').focusout(function() {
	$('.profile-city-input').hide()
	$('.profile-content.city').show()	
	$('.profile-content.city').html($('.profile-city-input').val())
})


function onColor() {
	var bcolor = $(this).css('background-color')
	$('.chat-board').css('background-color', bcolor)

	$(this).css('background-color', $('.current-theme').css('background-color'))
	$('.current-theme').css('background-color', bcolor)
}

$('.settings-theme-colors li div').on('click', onColor)

$('.settings-button').on('click', function() {
	var img = $(this).attr('alt')
	$('.send-button img').attr('src', img)
})



$('.add-quick-message').on('click', function() {
	$('#type-quick-message').show()
})

$('.message-cancel').on('click', function() {
	$('#type-quick-message').hide()	
})

$('.message-save').on('click', function() {
	if ($('#msg-text').val() == '')
		return;
	var html = '<div class="more-add row">'
    html += '<input type="text" readonly="true" style="background-color: ' + $('#color-picker').val() + '" class="col-10 form-control quick-message-control" name="form-control" placeholder="Consectetur adipiscing edit" value="' + $('#msg-text').val() + '">'
    html += '<div class="col-2 pr-0 text-right dropdown dropleft">'
    html += '<div class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle"></i></div>'
    html += '<div class="dropdown-menu" style="color: black">'
    html += '<a class="dropdown-item edit-message" href="#">edit</a>'
    html += '<a class="dropdown-item delete-message" href="#">delete</a>'
    html += '</div>'
    html += '</div>'
	$('#quick-message-list').append(html)
	$('#msg-text').val('')
	$('.edit-message').on('click', editMessage)
	$('.delete-message').on('click', deleteMessage)
	$('.dropdown').on('show.bs.dropdown', animate)
	$('input.quick-message-control').on('click', quickMsgSend)
})


$('.button-color').on('click', function() {
	$('#color-picker').trigger('click')
}) 

function deleteMessage() {
	$(this).parent().parent().parent().remove()
}

$('.delete-message').on('click', deleteMessage)

function editMessage() {
	$(this).parent().parent().parent().find('input').attr("readonly", false)
	$(this).parent().parent().parent().find('input').focus()
}

$('.edit-message').on('click', editMessage)

function quickMsgSend() {
	var text = $(this).val()
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
}

$('input.quick-message-control').on('click', quickMsgSend)