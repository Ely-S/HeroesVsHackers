jQuery(function($){
	var makeCode = function(id){	
		return new QRCode("qrcode", {
		    text: id,
		    width: 128,
		    height: 128,
		    colorDark : "#000000",
		    colorLight : "#ffffff",
		    correctLevel : QRCode.CorrectLevel.H
		});
	}
});