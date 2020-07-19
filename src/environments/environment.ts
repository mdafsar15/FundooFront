export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/',
  registerUrl: 'users/registration/',
  loginUrl: 'users/login/',

  USER_API_URL: "http://localhost:8080/user",
  NOTE_API_URL: "http://localhost:8080/note",
  LABEL_API_URL: "http://localhost:8080/label",
  COLLABRATOR_API_URL: "http://localhost:8080/collaborators",

  // user api urls
  REGISTRATION_URL: "/registration",
  LOGIN_URL: "/login",
  ACTIVATE_ACCOUNT_URL: "/verification",
  FORGOT_PASSWORD_URL: "/forgot-password",
  UPDATE_PASSWORD_URL: "/update-password",
  //note api urls
  CREATE_NOTE_URL: "/create",
  GET_ALL_NOTES_URL: "/fetch/notes",
  GET_ALL_REMAINDER_NOTES_URL: "/fetch/notes/reminders",
  GET_ALL_ARCHIVED_NOTES_URL: "/fetch/notes/archived",
  GET_ALL_TRASHED_NOTES_URL: "/fetch/notes/trashed",
  GET_ALL_PINNED_NOTES_URL: "/fetch/notes/pinned",
  //  note
  UPDATE_NOTE_URL: "/update",
  DELETE_NOTE_URL: "/trash",
  ARCHIVE_NOTE_URL: "/archive",
  REMIND_NOTE_URL: "/addReminder/",
  DELETE_FOREVER_NOTE_URL: "/delete",
  RESTORE_NOTE_URL: "/restore",
  PINNED_UNPINNED_NOTE_URL: "/pin",
  CHANGE_COLOR_NOTE_URL: "?color=",
  DELETE_REMIND_URL: "/reminder/delete",

 // label 
 GET_ALL_LABELS_URL: "/fetch",
 CREATE_LABEL_URL: "/create",
 ADD_LABEL_URL:   "/addlabels/",
 DELETE_LABEL_URL: "/delete",
 RENAME_LABEL_URL: "/edit?labelName=",

 //collabrator
 COLLABRATOR_NOTE_URL:"/add"
};

