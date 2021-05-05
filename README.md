# Calendar App w/ React.js & Redux

A project inspired in Google Calendar. Calendar App helps us to manage tasks or events in a detailed way, selecting the start time and end time of these and the frequency that we want to repeat them. This project was built with React, React Router, and Redux.

![Calendar App](src/img/posters/calendar-screen.jpg)

<h2 align='center'><a href='https://calendar.carlosortiz.dev/'>Check it live here</a></h2>

## About the project

### Local Storage
* Tasks and events are saved in Local Storage.
* The project sets a fake token when the user's logged in, which is also saved in LS to handle redirects and routers.

### Global state
* Date: contains two properties, mainCalendar and smallCalendar, both hold data such as current month, current year, current day, and an array containing the days of the current month.
    * mainCalendar: data used to display the calendar that shows once the user is logged in.
    * smallCalendar: data used to display the calendar that appears inside the add task form.
* TaskList: holds all tasks or events the user demands. It is an array of objects, which ones represent a group of tasks.
* FakeToken: a token generated every time the user is logged in.
* User: the user email that it is requested by the app to enter.
* AppStatus: defines six properties, which ones represent the status of every request made by the user (Pending, Failure, and Success).

### API
* All logic to fetch data when a task or token is saved, edited or removed, is defined in Client.js.

## Installation
Clone the Repository and run

```
npm install
npm start
```

## Deployment

```
npm run build
```

## Built with

- [React JS](https://reactjs.org/)
- [React Router](https://github.com/ReactTraining/react-router)
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)

## Contributing

Please feel free to send pull request if you want to contribute!

## Authors

- **Carlos Ortiz** - _Development_ - [CharlieOrtiz](https://github.com/CharlieOrtiz)