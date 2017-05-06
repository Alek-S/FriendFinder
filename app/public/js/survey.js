$('#submit').on('click', function(){

    event.preventDefault();
    var answers = [];
    var data ={
        name: $('#name').val(),
        photo: $('#photo').val(),
        result: answers
    };

    for(var i=0; i<10; i++){
        var val = $('#'+ (i+1) ).val();
        answers.push(val);
    }
    console.log(answers);
    let valid = notEmpty(answers);

    if( valid ===true){
    //post the info
        $.ajax(window.location.origin + '/api/friends', {
            data : JSON.stringify(data),
            contentType : 'application/json',
            type : 'POST'
        }).done(function(res){ //get best match
            console.log(res);
            console.log(res.photo);
            $('#matchPhoto').attr('src', res.photo); //populate photo
            $('#matchName').text(res.name); //populate name
            $("#myModal").modal('toggle'); //toggle modal to display
        });
    } else {
        console.log('ERROR: Not all fields completed');
        $('#matchPhoto').attr('src','../img/sign_warning.png' ); //populate photo
        $('#matchName').text('Please complete all fields');
        $("#myModal").modal('toggle');
    }


});

function notEmpty(answerList){
    if( $('#name').val() === '' || $('#photo').val() === '' || answerList.indexOf('') > -1 ){
        return false;
    }
    return true;
}