import { showAlertError, showAlertSuccess } from "./alert";

export default async function (url, formValues) {
  try {
    const response = await axios.post(url, formValues);
    showAlertSuccess("Login Sucessfully");
    setTimeout(() => {
      location.assign("/nt/profile");
    }, 1500);
  } catch (error) {
    if (error.response) {
      console.log(error + "0");
      showAlertError(error.response.data);
    } else if (error.request) {
      console.log(error + "1");
      showAlertError(error);
    } else {
      console.log(error + "2");
      showAlertError(error);
    }
  }
}
