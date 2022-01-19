const signUpForm = document.querySelector(".formSignup");

console.log(axios);

const handleSignUpForm = async function (url, formValues) {
  try {
    const response = await axios.post(url, formValues);
    location.assign("/auth/profile");
    console.log(response);
  } catch (error) {
    console.log(error.response);
  }
};

signUpForm.addEventListener("submit", (e) => {
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
  handleSignUpForm("http://localhost:3000/api/v1/user/signup", formValues);
});

// Instructions to Handle form submissions
// 1. select the form
// 2. register an on sumbit event
// 3. create an event handler for the sumbit event
// 4. grab the values of the inputs
// 5. submit the value to a sever
// create on sucess and failure functions
