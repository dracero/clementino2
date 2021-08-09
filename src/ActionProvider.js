// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }
  greet(respuesta) {
    const intents = {
      mensajes: "Ponerse en contacto",
      cambios: "Pagina de cátedra",
      apuntes:
        "Es necesario cambiar a FIUBA la institución en tu perfil. Luego",
      ejercicios: "La Guía de problemas",
      examenes: "Tanto la constancia de parcial como la de integrador",
      aula_virtual: "En todos los casos el aula virtual",
      preguntas: "Es necesario",
      notas: "se forma",
      coordinadora:
        "la coordinación se encarga de la gestión de la asignatura.",
      mail: "El mail es",
      cursos: "tenés que ver el link",
      sp: "Si sos recursantes"
    };
    const traits = {
      no: "por mail",
      si: "por teléfono",
      default: ""
    };
    const entities = {
      Campus:
        "se encuentra en el Campus de exámenes, en la solapa con la fecha",
      Departamento_alumnos: "al departamento de alumnos",
      Descargas: "se descarga de la página de cátedra",
      especifcar_examen:
        "que me especifiques el tipo de exámen, parcial o integrador",
      Mensaje_Coordinaci_n: "con la coordinación de la materia",
      mensaje_departamento: "con el departamento de la materia",
      mensaje_docentes: "a los docentes de tu cátedra",
      nota_cursada: "con las notas de parciales, TP y otras actividades.",
      nota_actas:
        "promediando la de cursada con la del integrador, esta última tiene más peso.",
      pagina_catedra: "que veas la página de cátedra, ahí está la información",
      fecha_final:
        "que tengas en cuenta que son tres fechas de final. Consultá la página de cátedra",
      coordinacion: "En Física I la coordinadora es Ema Aveleyra",
      mail_f1: "fisica1fiuba@gmail.com",
      link_cursos: "https://campus.fi.uba.ar/mod/page/view.php?id=96093",
      recursantes: "podés inscribirte en los cursos SP"
    };
    try {
      var confint = respuesta.intents[0].confidence; //nivel del confianza del intent
      var key = [];
      for (var k in respuesta.entities) key.push(k);
      var confent = respuesta.entities[k][0].confidence; //nivel de confianza del entity
      var keys = [];
      if (confint >= 0.6 && confent >= 0.6) {
        for (var j in respuesta.entities) keys.push(j);
        const entitie = entities[j.split(":")[1]];
        const action = traits[respuesta.traits.mensaje_instant_neo[0].value];
        const resultado =
          intents[respuesta.intents[0].name] + " " + action + " " + entitie;
        const greetingMessage = this.createChatBotMessage(resultado);
        this.updateChatbotState(greetingMessage);
        if (resultado.includes("página de cátedra")) {
          this.handleLinks();
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
