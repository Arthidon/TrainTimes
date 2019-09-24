// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBWMFGQ9wtqzT6frk0Fya6VgQqosljriL4",
    authDomain: "fir-2-ab495.firebaseapp.com",
    databaseURL: "https://fir-2-ab495.firebaseio.com",
    projectId: "fir-2-ab495",
    storageBucket: "fir-2-ab495.appspot.com",
    messagingSenderId: "813910943173",
    appId: "1:813910943173:web:2a9eca86c1fd0723e297ac"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


var database = firebase.database();

var trainName = "";
var traindestination = "";
var trainStart;
var trainRate;

$("#addtrain").click(function(){
event.preventDefault();
trainName = $("#train-name").val().trim();
traindestination = $("#train-destination").val().trim();
trainStart = $("#train-start").val().trim();
trainRate = $("#train-rate").val().trim();


database.ref().push({
    trainName: trainName,
    traindestination: traindestination,
    trainStart: trainStart,
    trainRate: trainRate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
});
    console.log(trainName, traindestination, trainStart, trainRate);

    // Clear form
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-start").val("");
    $("#train-rate").val("");
});

database.ref().on("child_added", function(snapshot) {
// storing the snapshot.val() in a variable for convenience
var sv = snapshot.val();

// Console.loging the last user's data
console.log(sv.trainName, sv.traindestination, sv.trainStart, sv.trainRate);

// Calculate minutes until Next Train
var timeConvert = moment(sv.trainStart, "HHmm").subtract(1, "years");
var timeDifference = moment().diff(moment(timeConvert), "minutes");
var timeRemaining = timeDifference % sv.trainRate;
var timeAway = sv.trainRate - timeRemaining;
var nextArrival = moment().add(timeAway, "minutes");
var arrivalDisplay = moment(nextArrival).format("HH:mm");
totalBilled = 5 * sv.trainRate;

// Change the HTML to reflect
trainTable = `
        <tr>
        <td>${sv.trainName}</td>
        <td>${sv.traindestination}</td>
        <td>${sv.trainRate}</td>
        <td>${arrivalDisplay}</td>
        <td>${timeAway}</td>
        <td>${totalBilled}$</td>
        </tr>
`;

$('#trainTable').append(trainTable);

// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});
