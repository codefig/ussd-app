var socket  = io.connect('http://localhost:3030/user')

socket.on('message', function(params){
    var name = params.name;
    var userLocation = params.userLocation;
    var distressLocation = params.distressLocation;
    var details = params.details;

    var output = $('#row');
    var text  = ` <div class="col-lg-4 col-sm-6 portfolio-item">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <p><span class="badge badge-info">Reporter</span>  `+ name+`</p> 
        <p class="card-text"><span class="badge badge-danger">Address </span> `+ userLocation+`</p>
        <p><span class="badge badge-dark">Location</span>  `+ distressLocation +`</p>
        <p> `+ details +`</p>
      </div>
    </div>
  </div>
  `
    output.append(text);
    console.log('Something message happend')
    console.log(params);
})