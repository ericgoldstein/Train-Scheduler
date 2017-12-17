var config = {
    apiKey: "AIzaSyDGuqn2gbpEYDqD_zvh03XkiE2se4O_YLY",
    authDomain: "train-database-ca4da.firebaseapp.com",
    databaseURL: "https://train-database-ca4da.firebaseio.com",
    projectId: "train-database-ca4da",
    storageBucket: "",
    messagingSenderId: "116796311367"
  };
  firebase.initializeApp(config);

const database = firebase.database();
// let trainData = new firebase("https://console.firebase.google.com/project/train-database-ca4da/database/train-database-ca4da/data");

$('#addTrainButton').on('click', function(event) {

let trainName = $("#trainNameInput").val().trim();
let lineName = $("#lineInput").val().trim();;
let destination = $("#destinationInput").val().trim();;
let trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subrtact(10, "years").format("X");;
let frequencyInput = $("#frequencyInput").val().Trim();
  

  let newTrain = {
  
    name: trainName,
    line: lineName,
    destination: destination,
    trainTime: trainTimeInput,
    frequency: frequencyInput,
   } 
   trainData.push(newTrain);

  $('#trainNameInput').val('');
  $('#lineInput').val('');
  $('#destinationInput').val('');
  $('#trainInput').val('');
  $('#frequencyInput').val('');
  return false;

  });


// };
// database.ref()
database.ref().on('child_added' , function(childSnapshot, prevChildKey){
  console.log(childSnapshot.val());

  let trainName = childSnapshot.val().name;
  let lineName = childSnapshot.val().line;
  let destination = childSnapshot.val().destination;
  let trainTimeInput = childSnapshot.val().trainTime;
  let frequencyInput = childSnapshot.val().frequency;

  let diffTime = moment().diff(moment.unix(trainTimeInput), "minutes");
  let timeRemainder = moment().diff(moment.unix(trainTimeInput), "minutes") % trainTimeInput ;
  let minutes = frequencyInput - timeRemainder;

  let nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

 // totalMonths = moment().diff(moment(employeeStart), 'months');
 // totalBilled = totalMonths * employeeSalary;

$('#trainTable > tbody').append("<tr><td>" + trainName + "</td><td>" + lineName + "</td><td>"
+ destination + "</td><td>" + frequencyInput + "minutes" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");


  
});
