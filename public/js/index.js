import "@babel/polyfill";
import { signUpHandler, signInHandler } from "./AuthHandlers";

const signUpForm = document.querySelector(".formSignup");
const signInForm = document.querySelector(".formSignin");

if (signUpForm) {
  document
    .querySelector(".formSignup input[name='passwordConfirm']")
    .addEventListener("input", function (e) {
      if (
        this.value !=
        document.querySelector(".formSignup input[name='password']").value
      ) {
        return this.setCustomValidity(
          "passowrdConfirm value does not match password value"
        );
      }
      this.setCustomValidity("");
    });
  signUpForm.addEventListener("submit", signUpHandler, false);
}

if (signInForm) {
  signInForm.addEventListener("submit", signInHandler, false);
}
