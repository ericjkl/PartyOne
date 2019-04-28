export default function customDate (/*Date*/timestamp, /*string*/format) {
	/*format: year y, month m, day d, hour h, minute i -> 'any character; y/m/d/h/i gets replaced'*/
	if (typeof timestamp !== 'object') {
		console.log(`Timestamp must be Date object, ${typeof timestamp} given.`);
		return false;
	}
	if (typeof format !== "string") {
		console.log(`Format must be string, ${typeof format} given.`);
		return false;
	}
	let date = [timestamp.getFullYear(),
				timestamp.getMonth() + 1,
				timestamp.getDate(),
				timestamp.getHours(),
				timestamp.getMinutes()];
	for (let i = 0; i < date.length; i++) {
		if (typeof date[i] !== 'number' || isNaN(date[i])) {
			console.log(`Timestamp must be valid number, ${isNaN(date[i]) ? 'NaN' : typeof date[i]} given.`);
			return false;
		}
		if (date[i].toString().length === 1) {
			date[i] = "0" + date[i];
		}
	}
	const year = date[0];
	const month = date[1];
	const day = date[2];
	const hour = date[3];
	const minute = date[4];
	let customDate = "";

	for (let i = 0; i < format.length; i++) {
		switch (format[i]) {
			case "y":
				customDate += year;
				break;
			case "m":
				customDate += month;
				break;
			case "d":
				customDate += day;
				break;
			case "h":
				customDate += hour;
				break;
			case "i":
				customDate += minute;
				break;
			default:
				customDate += format[i];
				break;
		}
	}
	return customDate;
}