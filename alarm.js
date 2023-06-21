var time;
var checkTime;
var myInterval;
const alarms = [];
const currentTime = document.querySelector('#currentTime');
const setAlarmButton = document.querySelector('#setAlarmButton');
const timeInput = document.querySelector('#timeInput');
const alarmsList = document.querySelector('#alarmsList');


//Show time function and update in every 1 second
function showTime() {
    const realTime = new Date();
    var hour = realTime.getHours();
    var minute = realTime.getMinutes();
    var second = realTime.getSeconds();

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;

    time = hour + ":" + minute + ":" + second;
    checkTime = hour + ":" + minute;
    currentTime.innerHTML = time;
}


//Add alarm function
function addAlarm(e) {
    var value = timeInput.value;
    const data = {
        text: value,
        id: Date.now()
    }
    alarms.push(data);
    renderAlarm(data);
    timeInput.value = ''
    return;
}

//Check alarm function to check if alarm time
// is matched with current time then show notification alarm is ringing
function checkAlarm(li) {
    if (checkTime == li[1].innerHTML) {
        alert('ringing');
        clearInterval(myInterval);
    }
}

// Render alarm function
function renderAlarm(data) {
    if (data.text) {
        const li = document.createElement('li');
        li.innerHTML = `
                        <span>${data.text}</span>
                        <button class="delete" id="${data.id}">Delete</button>
                    `
        alarmsList.appendChild(li);
        showNotification('Alarm is added successfully ');
        myInterval = setInterval(function () {
            checkAlarm(li.childNodes);
        }, 1000)
    } else {
        showNotification('Select the Time First');
    }

}


// delete alarm function to delete specific alarm 
function deleteAlarm(e) {
    if (e.target.innerHTML == 'Delete') {
        e.target.parentElement.remove();
    }
}


//show notification function
function showNotification(text) {
    alert(text);
}

//selector for set alarm button
setAlarmButton.addEventListener('click', addAlarm);

//selector for delete alarm button
document.addEventListener('click', deleteAlarm);

showTime();
setInterval(showTime, 1000);
