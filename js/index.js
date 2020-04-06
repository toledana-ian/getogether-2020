function createGrid(elements) {
    let maxElementHeight = 0;

    elements.each(function () {
        let elementHeight = $(this).height();
        maxElementHeight = maxElementHeight > elementHeight ? maxElementHeight : elementHeight;
    });
    elements.each(function () {
        $(this).css("min-height", (maxElementHeight + "px"));
    });

    return maxElementHeight;
}
function imageLoader (totalNumberOfImage, onComplete) {
    this.totalNumberOfImage = totalNumberOfImage;
    this.onComplete = onComplete;
    this.imageLoadedCounter = 0;

    this.imageLoaded = function(){
        this.imageLoadedCounter++;

        if(this.imageLoadedCounter==this.totalNumberOfImage){
            this.onComplete();
        }
    }
}

$(function(){
    let noImage=[
        'MTolentino',
        'ARaquepo',
        'LPrudenciado',
        'JMariano',
        'ILeaño',
        'RDijamco',
        'VLasam',
        'RMillare',
        'JMolina',
        'PLim',
    ];

    let mainPage = window.open('projector.html');
    console.log(mainPage);

    $.ajax({
        url: "employeeData.json",
        dataType: 'json',
        success: function(employeeData){

            let elemployeeProfileContainerData = [
                ['.gallery-container .employee-profiles-container', 'col-xs-6 col-sm-4 col-md-3 col-lg-2'],
            ];

            for(let employeeDatum of employeeData){
                let image = employeeDatum[0];

                if(noImage.includes(image)){
                    image = 'default';
                }

                for(let elemployeeProfileContainerDatum of elemployeeProfileContainerData){
                    let elemItem = $('<div class="'+elemployeeProfileContainerDatum[1]+' thumbnail-container" ' +
                        '       data-groups=\'["'+employeeDatum[5]+'"]\'' +
                        '       data-name="'+employeeDatum[1]+'"' +
                        '       data-studio="'+employeeDatum[2]+'"' +
                        '   >' +
                        '    <div class="thumbnail">\n' +
                        '        <img src="img/profile/'+image+'.png" class="img-responsive">\n' +
                        '        <div class="caption">\n' +
                        '            <h3>'+employeeDatum[1]+'</h3>\n' +
                        '            <p>'+employeeDatum[2]+'</p>\n' +
                        '            <p>'+employeeDatum[4]+'.'+employeeDatum[3]+'.'+employeeDatum[5]+'</p>\n' +
                        '        </div>\n' +
                        '    </div>\n' +
                        '</div>')
                    ;

                    elemItem.on('click', function(e){
                        let imgSrc2 = $($(e.currentTarget).children().children()[0]).attr('src');
                        let imgName2 = $(e.currentTarget).attr('data-name');

                        $('#containerFinal2 .card-img-top').attr('src', imgSrc2);
                        $('#containerFinal2 .card-body .card-text').empty().append(imgName2);

                        $('#modalFullScreen').modal('show');
                    });

                    $(elemployeeProfileContainerDatum[0]).append(elemItem);
                }
            }

            for(let elemployeeProfileContainerDatum of elemployeeProfileContainerData){
                let employeeImages = $(elemployeeProfileContainerDatum[0]+" div .thumbnail img");
                let imageLoaderInstance = new imageLoader(employeeImages.length, function(){
                    if(elemployeeProfileContainerDatum[0]!=='.modal #rollingEmployeeBox2 .employee-profiles-container'){
                        createGrid($(elemployeeProfileContainerDatum[0]+' div div.thumbnail'));

                        let Shuffle = window.Shuffle;
                        let element = document.querySelector(elemployeeProfileContainerDatum[0]);

                        shuffleInstanceEmployeeProfiles = new Shuffle(element, {
                            itemSelector: elemployeeProfileContainerDatum[0]+' .thumbnail-container',
                        });
                    }
                });
                employeeImages.one("load", function() {
                    imageLoaderInstance.imageLoaded();
                }).each(function() {
                    if(this==undefined) return;
                    if(this.complete){
                        try {
                            $(this).load();
                        } catch (e) {
                            console.log(e);
                        }
                    }
                });
            }
        }
    });
});