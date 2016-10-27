window.onload = function(){
	var messages = [];
	var socket = io.connect('http://127.0.0.1:3700');
	var field = document.getElementById('field');
	var sendButton = document.getElementById('send');
	var content = document.getElementById('content');
	var name = document.getElementById('name');


	socket.on('message', function(data){
		console.log('Just Debugging', data);
		if (data.message){
			messages.push(data);

			var html = '';
			for(var i=0;i<messages.length ; i++){
				html += "<br/>" + messages[i].username + ": ";
				html += messages[i].message + "<br/>";
			}
			content.innerHTML = html;
			content.scrollTop = content.scrollHeight;
		}
		else{
			console.log('There is a problem: ', data);
		}
	});

	function click(){
		if (name.value == ""){
			alert("type your name biiitch!");
		}
		else{
			var text = field.value;
			socket.emit('send', {message: text, username: name.value});
			field.value = "";
		}
		
	};

	sendButton.onclick = function(){click()};

	field.addEventListener("keyup", function(event){
		event.preventDefault();
		if (event.keyCode == 13){
			click();
		}
	});




};