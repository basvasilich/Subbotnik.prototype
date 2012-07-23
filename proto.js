requirejs.config({
    baseUrl:'libs'
});

requirejs([
        'text!../blocks/b-grid-item/b-grid-item.hbs',
        'handlebars'
    ],
    function (hbsFile) {
        $(function () {
            window.App = {}

            App.hbsFile = hbsFile
            App.dropbox = $('.b-grid_drop-place');
            App.fileCounter = 0

            App.onDrop = function (evt) {
                evt.preventDefault();
                evt.stopPropagation();

                var files = [];
                var inputFiles = evt.originalEvent.dataTransfer.files

                $(inputFiles).each(function () {
                    var icon = this.type.split('/').pop()
                    files.push({
                        id:App.fileCounter,
                        name:this.name,
                        size:this.size,
                        icon:icon
                    })
                    App.fileCounter++
                })
                var fileTemplate = Handlebars.compile(App.hbsFile);
                var html = fileTemplate({files:files})
                $(html).prependTo(App.dropbox)
                App.fileCounter = 0;

                setTimeout("$('.b-grid-item_new').addClass('b-grid-item_uploading')", 500)

                $('.b-grid-item__progress').on("transitionend", function (evt) {
                    $(this).hide();
                })
            }
        })

        $("body").delegate(App.dropbox, "dragenter, dragover", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        });

        $("body").delegate(App.dropbox, "drop", function (evt) {
            App.onDrop(evt)
        });
    });