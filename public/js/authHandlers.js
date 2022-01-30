import AuthRequest from "./AuthRequest";

export const signUpHandler = async function (e) {
  e.preventDefault();
  const formValues = {};
  if (this.checkValidity()) {
    formValues.name = document.querySelector(
      ".formSignup input[name='name']"
    ).value;
    formValues.email = document.querySelector(
      ".formSignup input[name='email']"
    ).value;
    formValues.password = document.querySelector(
      ".formSignup input[name='password']"
    ).value;
    formValues.passwordConfirm = document.querySelector(
      ".formSignup input[name='passwordConfirm']"
    ).value;
    return await AuthRequest(
      // "http://localhost:3000/api/v1/user/signup",
     "https://nt-2.herokuapp.com/api/v1/user/signup",
      formValues
    );
  }
  e.stopPropagation();
  this.classList.add("was-validated");
};

export const signInHandler = async function (e) {
  console.log("handler");
  e.preventDefault();
  if (this.checkValidity()) {
    const formValues = {};
    formValues.email = document.querySelector(
      ".formSignin input[name='email']"
    ).value;
    formValues.password = document.querySelector(
      ".formSignin input[name='password']"
    ).value;
    return await AuthRequest(
      // "http://localhost:3000/api/v1/user/signin",
      "https://nt-2.herokuapp.com/api/v1/user/signin",
      formValues
    );
  }
  e.stopPropagation();
  this.classList.add("was-validated");
};
