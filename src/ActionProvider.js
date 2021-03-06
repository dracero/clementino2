import intents from "./intents";

// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }
  greet(respuesta) {
    const traits = {
      no: "Enviar un mail.",
      si: "Llamar por teléfono.",
      default: ""
    };
    const entities = {
      Campus:
        "se encuentra en el Campus de exámenes, en la solapa con la fecha",
      Departamento_alumnos: "al departamento de alumnos",
      Descargas: "se descarga de la página de cátedra",
      especifcar_examen:
        "que me especifiques el tipo de exámen, parcial o integrador",
      Mensaje_Coordinaci_n: "con la coordinación de la materia.",
      mensaje_departamento: "con el departamento de la materia.",
      mensaje_docentes: "a los docentes de tu cátedra.",
      nota_cursada: "con las notas de parciales, TP y otras actividades.",
      nota_actas:
        "promediando la de cursada con la del integrador, esta última tiene más peso.",
      pagina_catedra: "que veas la página de cátedra, ahí está la información",
      fecha_final:
        "que tengas en cuenta que son tres fechas de final. Consultá la página de cátedra",
      coordinacion: "En Física I la coordinadora es Ema Aveleyra",
      mail_f1: "fisica1fiuba@gmail.com",
      link_cursos: "https://campus.fi.uba.ar/mod/page/view.php?id=96093",
      recursantes: "podés inscribirte en los cursos SP",
      informacion: "Hay información de la cursada y los finales",
      con_recursante:
        "rendiste tres veces final y no aprobaste o si se te venció la cursada",
      plazo_inscripcion:
        "Luego de una hora del cierre de la inscripción a una fecha de examen, se habilitará la siguiente. Podés inscribirte en todas las fechas que quieras, siempre y cuando tengas oportunidades de final para rendir",
      rendir_examen:
        "No podés concurrir a rendir final sin estar inscripto. Sin excepciones.",
      desinc: "Podés desinscribirte hasta 24 horas antes. Es lo recomendado.",
      en_el_link: "Es importante también que envíes un mensaje a los docentes",
      detalles:
        "Para más detalles ver las resoluciones correspondientes y el régimen de cursada vigente en www.fi.uba.ar ",
      fuera_term:
        "Los docentes y coordinadores no pueden inscribirte fuera de término. Si tenés la chance de inscribirte hacelo y si no vas a cursar podés desinscribirte.",
      mails:
        "Enviá un mail a Mesa de Ayuda (ayuda@fi.uba.ar) con copia a la casilla del Departamento de Física (fisica@fi.uba.ar). Recordá que solo de lunes a viernes antes de las 18.",
      desinscripcion: "Tenes que desinscribirte en el período habilitado.",
      pag_dep: "Está en el siguiente link:"
    };
    try {
      var confint = respuesta.intents[0].confidence; //nivel del confianza del intent
      var key = [];
      for (var k in respuesta.entities) key.push(k);
      var confent = respuesta.entities[k][0].confidence; //nivel de confianza del entity
      var keys = [];
      if (confint >= 0.8 && confent >= 0.8) {
        for (var j in respuesta.entities) keys.push(j);
        let entitie = entities[j.split(":")[1]];
        if (entitie === undefined) {
          entitie = entities[j.split(":")[0]];
        }
        const action = traits[respuesta.traits.mensaje_instant_neo[0].value];
        const resultado =
          intents.intents[respuesta.intents[0].name] +
          " " +
          entitie +
          " " +
          action;
        const greetingMessage = this.createChatBotMessage(resultado);
        this.updateChatbotState(greetingMessage);
        if (resultado.includes("página de cátedra")) {
          this.handleLinks();
        }
        if (
          resultado.includes("Los certificados de examen") ||
          resultado.includes("Los horarios de las asginaturas")
        ) {
          this.handleCerts();
        }
      } else {
        const greetingMessage = this.createChatBotMessage(
          "No comprendo tu pregunta. Por favor reformulala"
        );
        this.updateChatbotState(greetingMessage);
      }
    } catch (error) {
      const greetingMessage = this.createChatBotMessage(
        "No comprendo tu pregunta. Mirá los links de interés"
      );
      this.updateChatbotState(greetingMessage);
    }
  } //fin funcion

  handleJavascriptList = () => {
    const message = this.createChatBotMessage(
      "Estos son links que se serán de interés",
      {
        widget: "javascriptLinks"
      }
    );

    this.updateChatbotState(message);
  };

  handleLinks = () => {
    const message = this.createChatBotMessage("Este es el link", {
      widget: "fisicalinks"
    });

    this.updateChatbotState(message);
  };

  handleCerts = () => {
    const message = this.createChatBotMessage("Este es el link", {
      widget: "certlinks"
    });

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    // NOTE: This function is set in the constructor, and is passed in
    // from the top level Chatbot component. The setState function here
    // actually manipulates the top level state of the Chatbot, so it's
    // important that we make sure that we preserve the previous state.
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;
