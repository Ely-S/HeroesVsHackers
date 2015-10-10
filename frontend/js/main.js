var makeCode = function(id){	
	return new QRCode("qrcode", {
	    text: id,
	    width: 200,
	    height: 200,
	    colorDark : "#000000",
	    colorLight : "#ffffff",
	    correctLevel : QRCode.CorrectLevel.H
	});
};
jQuery(function($){
	makeCode("1234567890");
});