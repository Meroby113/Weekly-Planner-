const daysOfWeek = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
const buttons = document.querySelectorAll('button');
buttons.forEach((button,index) => {
  button.addEventListener('click', function() {
    localStorage.setItem("buttonIndex", index);
    window.location.href = "./days";
  });
});
function saveTextareaData(event) {
    localStorage.setItem(event.target.id, event.target.value);
  }
  
  function loadTextareaData() {
    var textareas = document.getElementsByTagName('textarea');
    for (var i = 0; i < textareas.length; i++) {
      var textarea = textareas[i];
      var id = textarea.id;
      if (localStorage.getItem(id)) {
        textarea.value = localStorage.getItem(id);
      }
      textarea.addEventListener('input', saveTextareaData);
    }
  }

  window.onload = loadTextareaData;
 