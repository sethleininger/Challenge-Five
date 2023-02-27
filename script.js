

$(document).ready(function() {

    function displayCurrentTime() {
      // Get the current date and time using Day.js
      var now = dayjs();
      // Format the date and time as a string using Day.js
      var formatted = now.format("dddd, MMMM D, YYYY, h:mm:ss A");
      // Update the content of the #currentDay element in the HTML
      document.querySelector("#currentDay").textContent = formatted;
    }
  
    //when page loads the current date and time appears at the top of the page, updating with interval of one second
    window.addEventListener("load", displayCurrentTime);
    setInterval(displayCurrentTime, 1000);
  
    //Pulling the current time/hour from dayjs
    var currentHour = dayjs().hour();
  
    // Loop through each time-block div
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
      // Compare the hour in the div's ID to the current hour
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  
    // Attach event listener to save button
    $('.saveBtn').on('click', function() {
      // Get the event text from the input element
      var eventText = $(this).siblings('.description').val();
  
      // Get the timeblock's hour from the ID attribute
      var hour = $(this).parent().attr('id');
  
      // Store the event text in local storage using the hour as the key
      localStorage.setItem(hour, eventText);
  
      // Retrieve saved event text from local storage
      var savedEvent = localStorage.getItem(hour);
  
      // Use jQuery to select the description element inside the current timeblock
      var descriptionEl = $(this).siblings('.description');
    
      // Set the text of the description element to the saved event text
      descriptionEl.val(savedEvent);
      console.log(hour);
  
    });
  
      // Load saved events from local storage for all time-blocks
      for (var i = 9; i <= 17; i++) {
        var hour = "hour-" + i;
        var savedEvent = localStorage.getItem(hour);
        if (savedEvent !== null) {
          $("#" + hour + " .description").val(savedEvent);
        }
      }
  });
  
  
  