var time;
var checkTime;
var myInterval;
const alarms = [];
const currentTime = document.querySelector('#currentTime');
const setAlarmButton = document.querySelector('#setAlarmButton');
const timeInput = document.querySelector('#timeInput');
const alarmsList = document.querySelector('#alarmsList');



function showTime() {
    const realTime = new Date();
    const hour = realTime.getHours();
    const minute = realTime.getMinutes();
    const second = realTime.getSeconds();

    time = hour + ":" + minute + ":" + second;
    checkTime = hour + ":" + minute;
    // console.log("time:",time);
    // console.log("checkTime:",checkTime);
    currentTime.innerHTML = time;
}



function addAlarm(e) {
    var value = timeInput.value;
    const data = {
        text: value,
        id: Date.now()
    }
    alarms.push(data);
    renderAlarm(data);
    return;
}

function checkAlarm(li) {
    console.log(li[1].innerHTML);
    console.log(checkTime);
    if (checkTime == li[1].innerHTML) {
        alert('ringing');
        clearInterval(myInterval);
    }
}

function renderAlarm(data) {
    // console.log("renderAlarm", data);
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
}




function deleteAlarm(deleteButton) {

}


function showNotification(text) {
    alert(text);
}


setAlarmButton.addEventListener('click', addAlarm);


showTime();
setInterval(showTime, 1000);
