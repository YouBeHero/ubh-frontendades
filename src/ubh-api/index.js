$(document).ready(function () {
    $.ajax({
        url: "get_causes.json",
        dataType: "text",
        success: function (data) {
            var json = $.parseJSON(data);
            
            $('.dropdown').prepend('<option selected="selected" disabled >Διάλεξε μια οργάνωση</option>');
            $('.dropdown').append('<optgroup class="animal" label="Φιλοζωικές"></optgroup>');
            $('.dropdown').append('<optgroup class="environmental" label="Περιβαλλοντικές"></optgroup>');
            $('.dropdown').append('<optgroup class="human" label="Ανθρωποκεντρικές"></optgroup>');
            
            for (var i=0;i<json.length;++i) {
                if (json[i].category_parent == 'Για τους καλούς μας φίλους') {
                    $('optgroup.animal').append('<option title="'+json[i].logo+'" value="'+json[i].id+'">'+json[i].name+'</option>');
                } else if (json[i].category_parent == 'Για τον άνθρωπο') {
                    $('optgroup.human').append('<option title="'+json[i].logo+'" value="'+json[i].id+'">'+json[i].name+'</option>');
                } else if (json[i].category_parent == 'Για το περιβάλλον') {
                    $('optgroup.environmental').append('<option title="'+json[i].logo+'" value="'+json[i].id+'">'+json[i].name+'</option>');
                }
            }
            
            function formatState (state) {
                if (!state.id) { return state.text; }
                var $state = $('<span><img src="' + state.element.title + '" style="max-height: 26px; margin-right: 10px;" />' + state.text + '</span>');
                return $state;
            }
            
            $(".dropdown").select2({
                templateResult: formatState
            });
            
            $('.dropdown').on('select2:select', function (e) {
                var data = e.params.data;
                setTimeout(function () {
                    $('.select2-selection__rendered').html('<span><img src="'+ data.title +'" style="max-height: 24px; margin-right: 10px;" />' + data.text + '</span>')
                }, 10);
            });
        }
    });
    
    // On button click, send (POST) the selection details to backend (via JSON)
    $("#send_cause_btn").click(function () {
        var btn = this;
        var selectedCause = document.querySelector("#causes_dropdown").selectedOptions[0]; // 
        if(!selectedCause.disabled) {
            var settings = {
                "url": "https://httpbin.org/post", // this endpoint is an echo server, it echoes the incoming POST request that it receives
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "selected_cause_id": selectedCause.value, // cause id
                    "selected_cause_name": selectedCause.text // cause name
                })
            };
            
            $.ajax(settings).done(function (response) {
                console.log("SENT (request body content in JSON format):");
                console.log(settings.data);
                console.log("RECEIVED (the whole response object):");
                console.log(response);
                btn.disabled = true;
                
            });
        } else {
            console.log("ERROR: A valid cause has not been selected.");
        }
    });
});
