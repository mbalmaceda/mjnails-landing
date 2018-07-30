function ajaxResponse(idDiv,alert,objHtml){
	var responseMessage = $('#'+idDiv);
	responseMessage.addClass('alert '+ alert);
	responseMessage.html(objHtml);
	responseMessage.show();
}