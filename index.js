// Your code here
function createEmployeeRecord(array) {
    const [firstName, familyName, title, payPerHour] = [...array]
    const record = {firstName,familyName,title,payPerHour,timeInEvents: [],timeOutEvents: []}
    return record
}

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(record,time) {
    const event = {type: "TimeIn", date : time.split(" ")[0], hour : parseInt(time.slice(-4),10)}
    record.timeInEvents.push(event)
    return record
}

function createTimeOutEvent(record, time) {
    const [date,hour] = time.split(' ')
    record.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour,10)
    })
    return record
}

function hoursWorkedOnDate(record,date) {
    const timeIn = record.timeInEvents.find(evnt => evnt.date === date)
    const timeOut = record.timeOutEvents.find(evnt => evnt.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}


function wagesEarnedOnDate(record, date) {
    return record.payPerHour * hoursWorkedOnDate(record,date)
}

function allWagesFor(record) {
    return record.timeInEvents.reduce(function(total, evnt){
        return total + wagesEarnedOnDate(record, evnt.date)
    },0)
}

function calculatePayroll(records) {
    return records.reduce(function(total,record){
        return total + allWagesFor(record)
    },0)
}

function findEmployeeByFirstName(records, name) {
    return records.find(record => record.firstName === name)
}