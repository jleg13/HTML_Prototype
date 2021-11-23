"use strict";
//quick validation for site prototype demo, needs to be on server
function validateLogin(user, loginInputs) {
  if (user.length > 0) {
    return user[0].password === loginInputs[2].value;
  } else {
    return false;
  }
}
