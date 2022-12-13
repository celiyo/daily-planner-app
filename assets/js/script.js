$(document).ready(function () {
  // Display the current date
  displayCurrentDate();
  // var now = parseInt(moment().format("h"));

  // Set up toDos
  setUpToDos();

  // Save toDo element in the local storage when the save button is clicked per timeblock
  $('.container').on('click', '.saveBtn', saveToDo);
});

function displayCurrentDate() {
  $('#currentDay').text(moment().format('dddd, MMMM Do'));
}

function setUpToDos() {
  var now = parseInt(moment().format('H'));
  var toDos = $('.time-block');

  // Color-code each timeblock based on the past, present and future time
  toDos.each(function () {
    var toDo = $(this);
    var toDoHour = parseInt(toDo.attr('data-hour'));
    var toDoKey = 'hour-' + toDoHour;
    if (toDoHour === now) {
      toDo.addClass('present').removeClass('past future');
    } else if (toDoHour < now) {
      toDo.addClass('past').removeClass('present future');
    } else {
      toDo.addClass('future').removeClass('past present');
    }

    // Loop through localStarge and get values for each toDo element
    for (var i = 0; i < localStorage.length; i++) {
      if (toDoKey === localStorage.key(i)) {
        $(this)
          .children('textarea')
          .val(localStorage.getItem(localStorage.key(i)));
      }
    }
  });
}

function saveToDo() {
  var todoVal = $(this).parent().children('textarea').val();
  var todoHour = 'hour-' + $(this).parent().attr('data-hour');
  localStorage.setItem(todoHour, todoVal);
}
