// Initialize Firebase
var config = {
    apiKey: "AIzaSyAb8082owYSAtGobZboSl4WP6o4wvrp1g0",
    authDomain: "test-database-fa18b.firebaseapp.com",
    databaseURL: "https://test-database-fa18b.firebaseio.com",
    projectId: "test-database-fa18b",
    storageBucket: "test-database-fa18b.appspot.com",
    messagingSenderId: "395587426252"
};
firebase.initializeApp(config);

var database = firebase.database();
//globals
var name;
var destination;
var time;
var frequency;
//click the submit button to add value to the variables
$("#addTrain").on("click", function (event) {
    event.preventDefault();
    name = $("#trainName").val();
    destination = $("#destination").val();
    time = $("#trainTime").val();
    frequency = $("#frequency").val();

    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");

    var user = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
    }
    //pushes content to database
    database.ref().push(user);
})
//pulling from database to print the html
database.ref().on("child_added", function (snapshot) {

    var firstTrain = snapshot.val().time;
    console.log(firstTrain);
    var trainFreq = snapshot.val().frequency;
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(firstTrainConverted,  "minutes");
    var tRemainder = diffTime % trainFreq;
    var tMinutesTillTrain = trainFreq - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

    var newRow = $("<tr>")
    var nameCol = $("<td>").text(snapshot.val().name);
    var destCol = $("<td>").text(snapshot.val().destination);
    var freqCol = $("<td>").text(snapshot.val().frequency);
    var nextTrainCol = $("<td>").text(nextTrain);
    var timeTillCol = $("<td>").text(tMinutesTillTrain);
    //appending to newly created column and row
    newRow.append(nameCol, destCol, freqCol, nextTrainCol, timeTillCol);
    $(".trainTable").append(newRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});