const signUpForm = document.querySelector(".formSignup");
const signInForm = document.querySelector(".formSignin");

const handleAuthUpForm = async function (url, formValues) {
  try {
    console.log("inside authhandler");
    const response = await axios.post(url, formValues);
    console.log(response);
    location.assign("/nt/profile");
  } catch (error) {
    console.log(error.response);
  }
};

if (signUpForm) {
  signUpForm.addEventListener("submit", async (e) => {
    console.log("form in action");

    e.preventDefault();
    const formValues = {};
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
    console.log(formValues);
    await handleAuthUpForm(
      "http://localhost:3000/api/v1/user/signup",
      formValues
    );
  });
}
if (signInForm) {
  signInForm.addEventListener("submit", async (e) => {
    console.log("form in action");

    e.preventDefault();
    const formValues = {};
    formValues.email = document.querySelector(
      ".formSignin input[name='email']"
    ).value;
    formValues.password = document.querySelector(
      ".formSignin input[name='password']"
    ).value;
    console.log(formValues);
    await handleAuthUpForm(
      "http://localhost:3000/api/v1/user/signin",
      formValues
    );
  });
}

// Instructions to Handle form submissions
// 1. select the form
// 2. register an on sumbit event
// 3. create an event handler for the sumbit event
// 4. grab the values of the inputs
// 5. submit the value to a sever
// create on sucess and failure functions
