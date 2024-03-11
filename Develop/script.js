// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $(document).ready(function () {
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    const currentHour = dayjs().hour();
    $('.time-block').each(function () {
      const divId = parseInt($(this).attr('id'));
      loadData(divId);
      if (divId === currentHour) {
        $(this).addClass('present');
      } else if (divId < currentHour) {
        $(this).addClass('past');
      } else if (divId > currentHour) {
        $(this).addClass('future');
      }
    })
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    $('.saveBtn').on('click', function (event) {
      var userInput = $(event.target).siblings('textarea').val();
      var divId = $(event.target).parent('.time-block').attr('id');
      if (event.target.matches('i')) {
        userInput = $(event.target).parent('button').siblings('textarea').val();
        divId = $(event.target).parent('button').parent('.time-block').attr('id');
      }
      localStorage.setItem(divId, userInput);
      console.log(divId)
      window.location.reload();
    });
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    function loadData(divId) {
      var userInput = localStorage.getItem(divId);
      $('#' + divId).children('textarea').val(userInput);
    }
    // TODO: Add code to display the current date in the header of the page.
    function currentDate() {
      var currentDay = dayjs().format('dddd, MMMM DD');
      $('#currentDay').text(currentDay)
    };
    currentDate();
  });
});
