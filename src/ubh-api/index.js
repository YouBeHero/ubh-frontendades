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
});
