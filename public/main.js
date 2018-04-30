$('.chosen-select').chosen({placeholder_text_single: "Choose the best rating."});

const choices = $('.chosen-select');

$('#submit').on('click', (e)=>{
    let options = [];
    let name = $('#name').val().trim();
    let photo = $('#photo').val().trim();
    e.preventDefault();
    $.each(choices, (i,c) => {
        options.push(c.value);
    });
    console.log(options);
    $.post('/survey',{score: options, name, photo}

    ).then(d=>{
        $('#match-name').text(d.name);
        $('#match-img').attr('src', d.photo);
        $("#results-modal").modal("show");
    })
    $('#name').val('');
    $('#photo').val('');
    choices.val('').trigger("chosen:updated");
})