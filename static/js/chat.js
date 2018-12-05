var socket  = io.connect('http://localhost:3030')

socket.on('message', function(){
    var output = $('#output');
    output.html("Message addded");
    console.log('Something message happend')
})