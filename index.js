// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
	return {
		firstName,
		familyName,
		title,
		payPerHour,
		timeInEvents: [],
		timeOutEvents: [],
	};
}

function createEmployeeRecords(arr) {
	return arr.map((item) => createEmployeeRecord(item));
}

function createTimeInEvent(obj, date) {
	obj.timeInEvents.push({
		type: 'TimeIn',
		hour: +(date.split(' ')[1].slice(0, 2) + '00'),
		date: date.split(' ')[0],
	});
	return obj;
}

function createTimeOutEvent(obj, date) {
	//"YYYY-MM-DD HHMM"
	obj.timeOutEvents.push({
		type: 'TimeOut',
		hour: +(date.split(' ')[1].slice(0, 2) + '00'),
		date: date.split(' ')[0],
	});
	return obj;
}

function hoursWorkedOnDate(obj, date) {
	let timeIn = obj.timeInEvents.find((instance) => instance.date === date).hour / 100;
	let timeOut = obj.timeOutEvents.find((instance) => instance.date === date).hour / 100;
	return timeOut - timeIn;
}

function wagesEarnedOnDate(obj, date) {
    let val = hoursWorkedOnDate(obj, date) * obj.payPerHour
    return val
}

function allWagesFor(obj) {
	let dates = [];
	obj.timeInEvents.forEach((element) => {
		dates.push(element.date);
	});
	return dates.reduce((total, curr) => {
		return total += wagesEarnedOnDate(obj, curr);
	}, 0);
}

function calculatePayroll(arr) {
    return arr.reduce((total, employee) => {
        return total += allWagesFor(employee)
    },0)
}