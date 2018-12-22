// Initialize Firebase
var config = {
    apiKey: "AIzaSyCWASefVdZjRKUp7dfhlHqACNsgnrE6VoM",
    authDomain: "project-firebase-7e5f8.firebaseapp.com",
    databaseURL: "https://project-firebase-7e5f8.firebaseio.com",
    projectId: "project-firebase-7e5f8",
    storageBucket: "project-firebase-7e5f8.appspot.com",
    messagingSenderId: "333106530184"
};
firebase.initializeApp(config);

// var to hold firebase
var database = firebase.database();

// Click function that adds trains to firebase when submitted
$("#add-train").on("click", function (event) {

    event.preventDefault();

    // details to be added to firebase
    database.ref().push({
        Train: $('#train-input').val(),
        Destination: $('#dest-input').val(),
        First_Time: $('#firstTime-input').val(),
        Frequency: $('#freq-input').val()
    });
});

// Pulls data from firebase and adds to screen
function loadTrains() {

    database.ref().on("child_added", function (snapshot) {

        var newTrain = snapshot.val();
        var tablediv = $('<tr>');

        // Uses moment to populate when the next train will arrive based on the current time
        function NextArrive() {

            // moment needs a date to work with

            // can add in a row that has how many years the train has been running for fun
            var firstTime = moment(newTrain.First_Time);
            var nextTime = moment(firstTime).add(newTrain.Frequency, 'minutes').format('HH:mm A');
            
            return nextTime;
        };

        var hours = NextArrive(newTrain.First_Time);

        function MinutesAway() {
            var futureTime = moment().add(newTrain.Frequency, 'minutes');
            return moment(futureTime).toNow(true);
        };

        tablediv.append('<td>' + newTrain.Train + '</td>');
        tablediv.append('<td>' + newTrain.Destination + '</td>');
        tablediv.append('<td>' + newTrain.Frequency + '</td>');
        tablediv.append('<td>' + hours + '</td>');
        tablediv.append('<td>' + MinutesAway() + '</td>');

        $('#table-body').append(tablediv);
    });
};

loadTrains();
