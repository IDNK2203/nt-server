const createAltertContainer = (message, type = "warning") => {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("bs-alert-container");
  alertContainer.innerHTML = `<div class="alert ${
    type === "warning" ? "alert-warning" : "alert-success"
  } alert-dismissible fade show" role="alert">
  <strong> Error Message:</strong> 
  <br/>${message}.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

  </div>`;
  return alertContainer;
};

const handleValidateionError = (error) => {
  const errors = Object.values(error.error.errors).map((el) => el.message);
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("bs-alert-container");
  const valErrors = errors.map((e) => {
    return `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong> Error Message:</strong> 
    <br/>${e}.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  
    </div>`;
  });
  const formContainer = document.querySelector(".container");
  alertContainer.innerHTML = valErrors.join("");
  formContainer.insertBefore(alertContainer, formContainer.firstChild);
};

export const showAlertError = (error) => {
  const { message } = error;
  console.log(error.error != "undefined");
  // check if error.error is undefined
  // if error.error is undefined do nothing if undefined do somethin
  if (typeof error.error != "undefined") {
    if (error.error.name === "ValidationError") {
      return handleValidateionError(error);
    }
  }
  const formContainer = document.querySelector(".container");
  formContainer.insertBefore(
    createAltertContainer(message),
    formContainer.firstChild
  );
};

export const showAlertSuccess = (message) => {
  const formContainer = document.querySelector(".container");
  formContainer.insertBefore(
    createAltertContainer(message, "success"),
    formContainer.firstChild
  );
};
