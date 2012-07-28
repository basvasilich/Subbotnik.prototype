requirejs.config({
    baseUrl: 'libs'
})

requirejs([
    'text!../blocks/file.hbs',
    'handlebars'
], function(hbsFile){
    $(function(){
        window.App = {}
        App.hbsFile = hbsFile
        App.dropBox = $('.b-grid_drop-place');
        App.fileCounter = 0;

        App.onDrop = function(evt){
            var files = [];
            var inputFiles = evt.originalEvent.dataTransfer.files

            $(inputFiles).each(function(){
                var icon = this.type.split('/').pop()
                files.push({
                    name: this.name,
                    icon: icon,
                    num: App.fileCounter
                })
                App.fileCounter++

            })
            App.fileCounter = 0

            var template = Handlebars.compile(App.hbsFile)
            var html = template({files: files})

            $(html).prependTo(App.dropBox);

            setTimeout("$('.b-grid-item_new').addClass('b-grid-item_uploading')", 200)

            $('.b-grid-item__progress').on('transitionend', function(){
                $(this).hide();
            })

        }

        $('body').delegate(App.dropBox, 'dragenter, dragover', function(evt){
            evt.preventDefault();
            evt.stopPropagation();
        })

        $('body').delegate(App.dropBox, 'drop', function(evt){
            evt.preventDefault();
            evt.stopPropagation();

            App.onDrop(evt);
        })

    })

})