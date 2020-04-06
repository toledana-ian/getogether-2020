var forceCall = [];
var forceNotCall = [];

var lastElementSelectedInRoulette = '';
var shuffleInstanceEmployeeProfiles = '';
var employmentYears = [];

var audioElement1 = '';
var audioElement2 = '';

function getRandomNumber(min, max){
    return Math.random() * (max - min) + min;
}
function sortNumber(a,b) {
    return a - b;
}

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
function loader (totalNumberOfItems, onComplete) {
    this.totalNumberOfItems = totalNumberOfItems;
    this.onComplete = onComplete;
    this.itemLoadedCounter = 0;
    this.data = [];

    this.itemLoaded = function(data){
        this.itemLoadedCounter++;
        this.data.push(data);

        if(this.itemLoadedCounter===this.totalNumberOfItems){
            this.onComplete(this.data);
        }
    }
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}

function initSound(){
    audioElement1 = document.createElement('audio');
    audioElement2 = document.createElement('audio');

    audioElement1.setAttribute('src', 'mp3/wheel_spin.mp3');
    audioElement2.setAttribute('src', 'mp3/powerpuff_girls.mp3');

    // audioElement.addEventListener("timeupdate",function(){
    //
    // });

    //audioElement.play();
    //audioElement.pause();
    //audioElement.currentTime = 0;
}
function initEmployeeProfilesFilter(){

    for(let x=0; x<employmentYears.length; x++){
        $('#selectMinEmployeeProfilesFilter').append(
            '<option value="'+x+'">'+employmentYears[x]+'</option>'
        )
        $('#selectMaxEmployeeProfilesFilter').append(
            '<option value="'+x+'">'+employmentYears[x]+'</option>'
        )
    }

    $('#selectMinEmployeeProfilesFilter').on('change', function() {
        if(parseInt(this.value)>parseInt($('#selectMaxEmployeeProfilesFilter').val())){
            $('#selectMaxEmployeeProfilesFilter').val(this.value);
        }
    });

    $('#selectMaxEmployeeProfilesFilter').on('change', function() {
        if(parseInt(this.value)<parseInt($('#selectMinEmployeeProfilesFilter').val())){
            $('#selectMinEmployeeProfilesFilter').val(this.value);
        }
    });


    $('#btnRemoveEmployeeProfilesFilter').on('click', function(){
        shuffleInstanceEmployeeProfiles.filter();
    });

    $('#btnSaveEmployeeProfilesFilter').on('click', function(){
        shuffleInstanceEmployeeProfiles.filter(
            employmentYears.slice(
                employmentYears.indexOf($('#selectMinEmployeeProfilesFilter option:selected').text()),
                parseInt($('#selectMaxEmployeeProfilesFilter').val())+1
            )
        );
    });
}
function initRouletteYear(){
    let rouletter = [];
    let rouletteLoader = 0;

    let rouletteParam = {
        startCallback : function() {

        },
        slowDownCallback : function() {

        },
        stopCallback : function($stopElm) {
            rouletteLoader.itemLoaded($stopElm);
        },

        speed: 5,
        duration: 3,
        stopImageNumber: null
    };

    for(let x=1; x<=2; x++){
        for(let employmentYear of employmentYears){
            $('#rouletteYear'+x).append(
                '<img src="img/years/'+employmentYear+'.png" data-year="'+employmentYear+'" style="height:45px;"/>',
            );
        }

        rouletter.push($('#rouletteYear'+x));
        rouletter[rouletter.length-1].roulette(rouletteParam);
    }

    $('#randomYearModal').on('shown.bs.modal', function (e) {
        let randNumer = [];
        randNumer.push(parseInt(getRandomNumber(0, employmentYears.length-1)));
        randNumer.push(parseInt(getRandomNumber(0, employmentYears.length-1)));
        randNumer.sort(sortNumber);

        $('#selectMinEmployeeProfilesFilter').val(randNumer[0]);
        $('#selectMaxEmployeeProfilesFilter').val(randNumer[1]);

        rouletteLoader = new loader(2, function(data){
            async function actionAfterLoaded() {
                await  new Promise(resolve => setTimeout(resolve, 2000));

                $('#randomYearModal').modal('hide');

                shuffleInstanceEmployeeProfiles.filter(
                    employmentYears.slice(
                        employmentYears.indexOf($('#selectMinEmployeeProfilesFilter option:selected').text()),
                        parseInt($('#selectMaxEmployeeProfilesFilter').val())+1
                    )
                );
            } actionAfterLoaded();
        });

        for(let x=0; x<rouletter.length; x++){
            rouletteParam['stopImageNumber']=randNumer[x];
            rouletter[x].roulette('option', rouletteParam);
            rouletter[x].roulette('start');
        }
    })
}
function initRollingEmployeeFilter(){
    let runOnce = true;

    let employeeProfileContainer = '.modal #rollingEmployeeBox2 .employee-profiles-container';
    let Shuffle = window.Shuffle;
    let shuffleInstance = 0;

    //$('#rollingEmployeeBox2 > img').show();
    $('#rollingModal').on('shown.bs.modal', function () {
        if(runOnce){
            createGrid($(employeeProfileContainer+' div div.thumbnail'));

            shuffleInstance = new Shuffle($(employeeProfileContainer), {
                itemSelector: employeeProfileContainer+' .thumbnail-container',
            });

            $('#txtRollingEmploeeFilter').on('change keyup paste', function(){
                $('#rollingEmployeeBox2 > img').hide();

                shuffleInstance.filter(function (element) {
                    return $(element).attr('data-name').toLocaleLowerCase().indexOf($('#txtRollingEmploeeFilter').val().toLocaleLowerCase()) != -1;
                });
            });

            runOnce=false;
        }
    })
}
function initLever(){
    let index = 0;
    let indexForceCall = null;
    let indexForceNotCall = [];

    let rouletteParam = {
        startCallback : function() {

        },
        slowDownCallback : function() {

        },
        stopCallback : function($stopElm) {
            $('[data-toggle="tooltip"]').tooltip();
            lastElementSelectedInRoulette = $stopElm;

            forceNotCall.push(lastElementSelectedInRoulette.attr('src').split('/').slice(-1)[0]);

            if(forceCall.length!==0){
                if(forceCall[0]==null)forceCall.shift();
            } else if(indexForceCall!=null){
                forceCall.shift();
            }
        },

        speed: 10,
        duration: 1,
        stopImageNumber: null
    };

    Lever.prototype.onLeverPull = function () {
        this.node.classList.add('animate');
        this.state = 'disabled';

        $('[data-toggle="tooltip"]').tooltip('dispose');
        $('#rollingEmployeeBox1 > div > img').hide();

        index = 0;
        indexForceCall = null;
        let elements = $('#rouletteEmployeeBox1 .roulette-inner > img');
        for(let element of elements){
            if(forceCall.length!==0){
                let imageFilename = $(element).attr('src').replace('img/profile/', '');
                if(forceCall[0]===imageFilename){
                    indexForceCall = index;
                    forceCall.shift();
                    break
                }
            } else break;
            index++;
        }

        if(indexForceCall != null){
            rouletteParam['stopImageNumber'] = indexForceCall;
        } else {
            indexForceNotCall = Array.from(new Set(indexForceNotCall));

            if(indexForceNotCall.length===elements.length-1){
                $('#rouletteEmployeeBox1').roulette('start');
                return;
            } else {
                let randNum = 0;

                while (true){
                    randNum = parseInt(getRandomNumber(0, elements.length-1));
                    if(indexForceNotCall.indexOf(randNum)=== -1) break;
                }
                rouletteParam['stopImageNumber'] = randNum;
            }
        }

        indexForceNotCall.push( rouletteParam['stopImageNumber']);

        $('#rouletteEmployeeBox1').roulette('option', rouletteParam);
        $('#rouletteEmployeeBox1').roulette('start');
    };
    Lever.prototype.onAnimationIteration = function () {
        if (!this.node.classList.contains('reverse')) {
            this.node.classList.add('reverse');
        }
    };
    Lever.prototype.onAnimationEnd = function () {
        if (this.node.classList.contains('reverse')) {
            this.node.classList.remove('animate', 'reverse');
            this.state = 'enabled';
        }
    };
    LEVER.init();

    $('#rollingModal').on('shown.bs.modal', function () {
        $('#rollingEmployeeBox2').scrollTop(0);
        $('#rollingEmployeeBox1 > div > img').show();
        $('#rollingEmployeeBox2 > img').show();

        $('[data-toggle="tooltip"]').tooltip('dispose');
        $('#rouletteEmployeeBox1').unbind().removeData().empty();

        let elements = $('.gallery-container .employee-profiles-container div.thumbnail-container.shuffle-item--visible');

        rouletteParam['speed'] = elements.length>10 ? elements.length:10;


        index = 0;
        indexForceNotCall = [];
        for(let element of elements){
            let imageFilename = $(element).children().children().attr('src').replace('img/profile/', '');
            if(forceNotCall.indexOf(imageFilename)!==-1){
                indexForceNotCall.push(index);
            }

            $('#rouletteEmployeeBox1').append(
                '<img ' +
                '   src="'+$(element).children().children().attr('src')+'" ' +
                '   data-name="'+$(element).attr('data-name')+'"' +
                '   data-studio="'+$(element).attr('data-studio')+'"' +
                '   style="height: 100%; width: auto; margin: 0 auto"' +
                '   data-toggle="tooltip" data-html="true" data-placement="bottom" title="<h4>'+$(element).attr('data-name')+'</h4>";'+
                '/>',
            );

            index++;
        }

        $('#rouletteEmployeeBox1').roulette(rouletteParam);
    });
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

    //$('#modalFullScreen').modal('show');

    $.ajax({
        url: "employeeData.json",
        dataType: 'json',
        success: function(employeeData){

            let elemployeeProfileContainerData = [
                ['.modal #rollingEmployeeBox2 .employee-profiles-container', 'col-md-4'],
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

                    if(elemployeeProfileContainerDatum[0]!='.gallery-container .employee-profiles-container'){
                        elemItem.on('click', function(e){
                            let imgSrc1 = $(lastElementSelectedInRoulette[0]).attr('src');
                            let imgSrc2 = $($(e.currentTarget).children().children()[0]).attr('src');
                            let imgName1 = $($(lastElementSelectedInRoulette[0])[0]).attr('data-name');
                            let imgName2 = $(e.currentTarget).attr('data-name');

                            $('#containerFinal1 .card-img-top').attr('src', imgSrc1);
                            $('#containerFinal2 .card-img-top').attr('src', imgSrc2);

                            $('#containerFinal1 .card-body .card-text').empty().append(imgName1);
                            $('#containerFinal2 .card-body .card-text').empty().append(imgName2);

                            $('#containerFinal1').hide();
                            $('#containerFinal2').hide();

                            $('#modalFullScreen').off().on('shown.bs.modal', function (e) {
                                audioElement2.currentTime = 0;
                                audioElement2.play();

                                $(this).css('padding-right', '0px');
                                $('#containerFinal1').show();
                                $('#containerFinal1').jAnimateSequence(['zoomInLeft', 'bounce', 'tada', 'wobble'], function(){
                                    $('#containerFinal2').show();
                                    $('#containerFinal2').jAnimateSequence(['zoomInRight', 'bounce', 'tada', 'wobble']);
                                });
                            }).on('hidden.bs.modal', function () {
                                audioElement2.pause();
                                $('#containerFinal1').hide();
                                $('#containerFinal2').hide();
                            });

                            $('#modalFullScreen').modal('show')
                        });
                    }

                    $(elemployeeProfileContainerDatum[0]).append(elemItem);
                }

                if(!employmentYears.includes(employeeDatum[5])){
                    employmentYears.push(employeeDatum[5]);
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

                        }
                    }
                });
            }

            initEmployeeProfilesFilter();
            initRouletteYear();
            initRollingEmployeeFilter();
            initLever();
            initSound();
        }
    });
});