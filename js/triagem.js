/* Jornada educativa: escolhas mantidas apenas enquanto a página está aberta. */
(function () {
  "use strict";

  const form = document.querySelector("[data-triage-form]");
  if (!form) return;

  const panels = Array.from(form.querySelectorAll("[data-triage-step]"));
  const progress = form.querySelector("[data-triage-progress]");
  const progressText = form.querySelector("[data-triage-progress-text]");
  const regionField = form.querySelector("#regiao");
  const result = document.querySelector("[data-triage-result]");
  const resultHeading = document.querySelector("[data-result-priority]");
  const resultMessage = document.querySelector("[data-result-message]");
  const restartButton = document.querySelector("[data-triage-restart]");
  const summary = {
    profile: document.querySelector("[data-summary-profile]"),
    region: document.querySelector("[data-summary-region]"),
    urgency: document.querySelector("[data-summary-urgency]"),
    preference: document.querySelector("[data-summary-availability]"),
  };
  const profileLabels = {
    jovem: "Jovem e responsável",
    mulher: "Mulher que busca acolhimento",
    voluntario: "Dentista voluntário",
    parceiro: "Parceiro ou apoiador",
  };
  const urgencyLabels = {
    alta: "Dor intensa ou necessidade de atenção rápida",
    media: "Necessidade de avaliação em breve",
    baixa: "Informação ou acompanhamento preventivo",
  };
  const guidance = {
    alta: {
      title: "Atenção prioritária",
      text: "Dor intensa merece avaliação profissional rápida. Procure um serviço de saúde bucal ou urgência local.",
    },
    media: {
      title: "Avaliação recomendada",
      text: "Converse com um profissional de odontologia para organizar uma avaliação e esclarecer suas dúvidas.",
    },
    baixa: {
      title: "Orientação preventiva",
      text: "Informações sobre higiene e prevenção podem apoiar sua conversa com um profissional de saúde bucal.",
    },
  };
  let currentStep = 1;

  function checkedValue(name) {
    const selected = form.querySelector('input[name="' + name + '"]:checked');
    return selected ? selected.value : "";
  }

  function readAnswers() {
    return {
      profile: checkedValue("perfil"),
      region: regionField.value,
      urgency: checkedValue("urgencia"),
      preference: checkedValue("disponibilidade"),
    };
  }

  function updateSummary() {
    const answers = readAnswers();
    summary.profile.textContent = profileLabels[answers.profile] || "Não informado";
    summary.region.textContent = answers.region || "Não informado";
    summary.urgency.textContent = urgencyLabels[answers.urgency] || "Não informado";
    summary.preference.textContent = answers.preference || "Não informado";
  }

  function setFeedback(message) {
    panels.forEach(function (panel) {
      panel.querySelector("[data-triage-feedback]").textContent = "";
    });
    panels[currentStep - 1].querySelector("[data-triage-feedback]").textContent = message;
  }

  function showStep(step, focusHeading) {
    currentStep = step;
    panels.forEach(function (panel, index) {
      panel.hidden = index !== step - 1;
    });
    result.hidden = true;
    setFeedback("");
    updateSummary();
    progress.value = step;
    progressText.textContent = "Etapa " + step + " de " + panels.length;
    if (focusHeading) panels[step - 1].querySelector("h2").focus();
  }

  function validateStep(step) {
    const answers = readAnswers();
    if (step === 1 && !answers.profile) return "Escolha o perfil que representa você.";
    if (step === 2 && (!answers.region || !answers.urgency)) {
      return "Informe uma região e selecione a necessidade de atenção.";
    }
    if (step === 3 && !answers.preference) return "Selecione uma preferência para concluir.";
    return "";
  }

  function advance() {
    const error = validateStep(currentStep);
    if (error) {
      setFeedback(error);
      return;
    }
    showStep(Math.min(currentStep + 1, panels.length), true);
  }

  form.querySelectorAll("[data-triage-next]").forEach(function (button) {
    button.addEventListener("click", advance);
  });
  form.querySelectorAll("[data-triage-back]").forEach(function (button) {
    button.addEventListener("click", function () {
      showStep(Math.max(currentStep - 1, 1), true);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Enter em uma etapa inicial deve avançar, não concluir o formulário.
    if (currentStep < panels.length) {
      advance();
      return;
    }
    for (let step = 1; step <= panels.length; step++) {
      const error = validateStep(step);
      if (error) {
        showStep(step, true);
        setFeedback(error);
        return;
      }
    }
    const answers = readAnswers();
    let nextStep = guidance[answers.urgency];
    if (answers.profile === "voluntario") {
      nextStep = {
        title: "Contribua com a rede",
        text: "Converse com a organização sobre cadastro profissional, disponibilidade e formas de voluntariado.",
      };
    } else if (answers.profile === "parceiro") {
      nextStep = {
        title: "Conheça as parcerias",
        text: "Explore as formas de apoio e apresente à equipe a contribuição que sua organização deseja oferecer.",
      };
    }
    resultHeading.textContent = nextStep.title;
    resultMessage.textContent =
      nextStep.text + " Esta orientação é educativa e não substitui avaliação profissional.";
    setFeedback("");
    result.hidden = false;
    resultHeading.focus();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    result.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  });

  form.addEventListener("change", function () {
    // Um resultado só é válido para o conjunto de respostas que o gerou.
    result.hidden = true;
    setFeedback("");
    updateSummary();
  });
  restartButton.addEventListener("click", function () {
    form.reset();
    showStep(1, true);
  });
  showStep(1, false);
})();
