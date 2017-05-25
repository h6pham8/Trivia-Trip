//initialize javascript functions when page loads
$(document).ready(function(){
    initializeHomeButton();
    initializeNotifyPopUp();
    initializeTriviaCategoryClick();
    initializeToggleAnswersButton();
});

//display welcome screen when clicking on Trivia Trip
function initializeHomeButton (){
    $('.logo').click(function(){
        $('#containerQuestions').hide("fast");
        $('#containerWelcome').show("fast");
    });
}

//displays the Welcome Pop Up on the top right corner when web is loaded
function initializeNotifyPopUp() {
    $(document).ready(function () {
        $.notify({
            icon: 'fa fa-hand-peace-o',
            message: "Welcome to Trivia Trip! Choose a category to begin."
        }, {
            type: 'info',
            delay: 3000
        });
    });
}

//eventListener to load trivia questions
function initializeTriviaCategoryClick () {
    //on click of a new category
    $('.trivCategory').click(function(){

        //only refresh content.container-fluid
        $('.content.container-fluid').load(location.href + " .content.container-fluid");

        //API call to get trivia questions and answers and populate the list
        $.ajax({
            url: "http://jservice.io/api/category?id=" + this.id
        }).done(function (data) {

            triviaTopic = data.title;
            //capitalize first letters of each word
            triviaTopic = triviaTopic.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
            $(".addTopic").html(triviaTopic);

            //array of objects
            //.question .answer .id
            triviaClues = data.clues;

            //populate list of questions and answers for given trivia topic
            var triviaQuestions = "";
            var difficultyLevel;
            for (var i = 0; i < triviaClues.length; i++){
                if(triviaClues[i].question.length > 5) {
                    //color code difficulty
                    if(triviaClues[i].value){
                        if(triviaClues[i].value <= 250){
                            difficultyLevel = 'success';
                        }
                        else if (triviaClues[i].value > 250 && triviaClues[i].value <= 500) {
                            difficultyLevel = 'info';
                        }
                        else if (triviaClues[i].value > 500 && triviaClues[i].value <=750) {
                            difficultyLevel = 'warning';
                        }
                        else if (triviaClues[i].value <= 1000) {
                            difficultyLevel = 'danger';
                        }
                    } else {
                        difficultyLevel = 'info';
                    }

                    triviaQuestions += "<a class='list-group-item list-group-item-action list-group-item-" + difficultyLevel + "'id='" + triviaClues[i].id + "'> <h6 class='list-group-item-heading'>" + triviaClues[i].question + "</h6>"
                        + "<p class='list-group-item-text trivia-answer' id='answer" + triviaClues[i].id + "'>" + "<mark>" + triviaClues[i].answer + " </mark></p>" + "</a>";
                }
            }
            $(".list-group").html(triviaQuestions);

            initializeDisplayAnswersOnClick();
        });

        //implement transition animation when a new category is selected
        if($('#containerQuestions').is(":hidden")){
            $('#containerWelcome').hide("fast");
            $('#containerQuestions').show("fast");
        } else {
            $('#containerQuestions').hide("fast");
            $('#containerQuestions').show("fast");
        }
    });
}

//toggle display of all answers
function initializeToggleAnswersButton() {
    $('.toggle-answers-on').click(function(){
        $('.trivia-answer').show("fast");
    });
    $('.toggle-answers-off').click(function () {
        $('.trivia-answer').hide("fast");
    });
}

//display answers on click of question
function initializeDisplayAnswersOnClick(){
    $('.list-group-item').click(function(){
        if($('#answer' + this.id).is(":visible")){
            $('#answer' + this.id).hide("fast");
        } else {
            $('#answer' + this.id).show("fast");
        }
    });
}