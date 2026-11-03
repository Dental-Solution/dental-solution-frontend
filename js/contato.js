/* Validação local do contato. Não existe serviço de envio nesta sprint. */
(function () {
  "use strict";

  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const nameField = form.querySelector("#nome");
  const emailField = form.querySelector("#email");
  const messageField = form.querySelector("#mensagem");
  const feedback = form.querySelector("[data-form-feedback]");
  const fields = [nameField, emailField, messageField];

  function setFieldError(field, message) {
    const error = form.querySelector('[data-error-for="' + field.id + '"]');
    field.classList.toggle("is-invalid", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));
    error.textContent = message;
  }

  function clearFeedback() {
    feedback.textContent = "";
    feedback.classList.remove("is-success");
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  fields.forEach(function (field) {
    field.addEventListener("input", function () {
      setFieldError(field, "");
      clearFeedback();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearFeedback();
    fields.forEach(function (field) {
      setFieldError(field, "");
    });
    let firstInvalid = null;

    function validate(field, condition, message) {
      if (!condition) {
        setFieldError(field, message);
        firstInvalid = firstInvalid || field;
      }
    }

    validate(nameField, nameField.value.trim().length >= 3, "Informe seu nome com pelo menos 3 caracteres.");
    validate(
      emailField,
      isValidEmail(emailField.value.trim()),
      "Digite um e-mail válido, como nome@exemplo.com.",
    );
    validate(
      messageField,
      messageField.value.trim().length >= 10,
      "Escreva uma mensagem com pelo menos 10 caracteres.",
    );

    if (firstInvalid) {
      feedback.textContent = "Revise os campos destacados antes de continuar.";
      firstInvalid.focus();
      return;
    }

    feedback.textContent =
      "Mensagem validada. Para enviá-la à equipe, utilize um dos perfis de contato ao lado.";
    feedback.classList.add("is-success");
  });
})();
