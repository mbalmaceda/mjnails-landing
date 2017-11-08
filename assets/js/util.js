function ajaxResponse(idDiv,alert,objHtml){
	var responseMessage = $('#'+idDiv);
	console.log(responseMessage);
	responseMessage.addClass('alert '+ alert);
	responseMessage.html(objHtml);
	responseMessage.show();
}