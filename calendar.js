window.onload = function() {

	// calendar object that takes in a node as a parameter to render at
	function Calendar(node) {
		let self = this;
		let date = new Date();

		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		self.month = date.getMonth();
		self.year = date.getFullYear();
		self.node = node;

		// renders calendar at the node
		self.render = function() {
			// check to make sure node is defined
			let node = self.node;
			if (node && node !== undefined && node !== null) {
				// remove previous calendar
				while (node.firstChild) {
					node.removeChild(node.firstChild);
				}

				// build the container to hold the calendar component
				let container = document.createElement('div');
				let center = document.createElement('div');

				// build the title that displays the month and year; append title to container
				let title = document.createElement('div');
				let text = document.createTextNode(months[self.month] + ' ' + self.year);
				title.classList.add('calendar-title');
				title.appendChild(text);
				container.appendChild(title);

				// build the center portion of the calendar by building the buttons and calendar
				let calendar = buildCalendar(self.month, self.year);
				let prevMonthButton = buildPrevMonthButton();
				let nextMonthButton = buildNextMonthButton();
				center.appendChild(prevMonthButton);
				center.appendChild(calendar);
				center.appendChild(nextMonthButton);
				center.classList.add('calendar-center');

				// append center portion of calendar to container
				container.appendChild(center);
				container.classList.add('calendar-container');
				node.appendChild(container);
			}
		}

		// builds calendar header; this header displays the days of the week
		function buildCalendarHeader() {
			let header = document.createElement('div');
			let weekDiv = document.createElement('div');
			let line = document.createElement('hr');
			weekDiv.classList.add('calendar-week');

			// grabs all the first letters of days of week and builds a header
			for (let i = 0; i < daysOfWeek.length; i++) {
				let div = document.createElement('div');
				let text = document.createTextNode(daysOfWeek[i].charAt(0));

				// check to see if weekend
				if (i === 0 || i === daysOfWeek.length - 1) {
					div.classList.add('calendar-day-weekend');
				}

				// add the calendar day of week to the week div 
				div.classList.add('calendar-day');
				div.appendChild(text);
				weekDiv.appendChild(div);
			}

			header.appendChild(weekDiv);
			header.appendChild(line);
			return header;
		}

		// builds the calendar based on month and year
		function buildCalendar(month, year) {
			// get data we need (number of days in the month and which day of week the month starts on)
			let calendarDiv = document.createElement('div');
			let numberOfDays = new Date(year, month + 1, 0).getDate(); // this actually grabs the last day of the previous month so we need to offset month by 1
			let startingDayOfWeek = new Date(year, month, 1).getDay();
			let weekDiv = document.createElement('div');
			weekDiv.classList.add('calendar-week');

			// add calendar header to calendar div
			let calendarHeader = buildCalendarHeader();
			calendarDiv.classList.add('calendar');
			calendarDiv.appendChild(calendarHeader);

			// add padding for empty days before first day of month
			for (let i = 0; i < startingDayOfWeek; i++) {
				let div = document.createElement('div');
				div.classList.add('calendar-day');
				weekDiv.appendChild(div);
			}

			// build calendar structure by week
			for (let i = 1; i <= numberOfDays; i++) {
				let div = document.createElement('div');
				let text = document.createTextNode(i);

				// check to see if weekend
				if (startingDayOfWeek === 0 || startingDayOfWeek === daysOfWeek.length - 1) {
					div.classList.add('calendar-day-weekend');
				}
				div.classList.add('calendar-day');
				div.appendChild(text);
				weekDiv.appendChild(div);
				startingDayOfWeek++;

				// check to see if we need to start a new week
				if (startingDayOfWeek > 6) {
					calendarDiv.appendChild(weekDiv);
					weekDiv = document.createElement('div');
					weekDiv.classList.add('calendar-week');
					startingDayOfWeek = 0;
				}

				// adds the last week
				if (i === numberOfDays && startingDayOfWeek <= 6) {
					calendarDiv.appendChild(weekDiv);
				}
			}

			return calendarDiv;
		}

		// builds the prev month button
		function buildPrevMonthButton() {
			// build the button
			let container = document.createElement('div');
			let button = document.createElement('button');
			let text = document.createTextNode('<<');
			button.appendChild(text);
			button.classList.add('calendar-month-button');
			button.classList.add('prev-month');

			// add event handler to button
			button.onclick = function() {
				prevMonth(self.month, self.year);
			}
			container.appendChild(button);
			container.classList.add('calendar-month-button-wrapper');
			return container;
		}

		// builds the next month button
		function buildNextMonthButton() {
			// build the button
			let container = document.createElement('div');
			let button = document.createElement('button');
			let text = document.createTextNode('>>');
			button.appendChild(text);
			button.classList.add('calendar-month-button');
			button.classList.add('next-month');

			//add event handler to button
			button.onclick = function() {
				nextMonth(self.month, self.year);
			}
			container.appendChild(button);
			container.classList.add('calendar-month-button-wrapper');
			return container;
		}

		// sets current date to prev month
		function prevMonth(month, year) {
			// check to see if we are moving from january to december
			if (month === 0) {
				self.year = self.year - 1;
				self.month = 11;
				year = self.year;
			} else {
				self.month = self.month - 1;
			}
			month = self.month;
			self.render();
		}

		// sets current date to next month
		function nextMonth(month, year) {
			// check to see if we are moving from december to january
			if (month === 11) {
				self.year = self.year + 1;
				self.month = 0;
				year = self.year;
			} else {
				self.month = self.month + 1;
			}
			month = self.month;
			self.render();
		}

	}

	// create a new calendar object and mount it on root
	let node = document.getElementById('root');
	let calendar = new Calendar(node);
	calendar.render();
}
