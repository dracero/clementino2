// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import LearningOptions from "./components/LearningOptions/LearningOptions";
import LinkList from "./components/LinkList/LinkList";
import BotAvatar from "./components/BotAvatar/BotAvatar";

const config = {
  initialMessages: [
    createChatBotMessage("Bienvenidos", {
      customComponents: {},
      widget: "learningOptions"
    })
  ],
  botName: "Física FIUBA",
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />
  },

  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E"
    },
    chatButton: {
      backgroundColor: "#376B7E"
    }
  },

  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />
    }, //fin primer widget
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Página de Cátedra Física I",
            url: "https://campus.fi.uba.ar/course/view.php?id=1366",
            id: 1
          },
          {
            text: "Información del departamento",
            url: "https://campus.fi.uba.ar/course/index.php?categoryid=97",
            id: 2
          },
          {
            text: "Web de exámenes",
            url: "https://campus2.fi.uba.ar/",
            id: 3
          }
        ]
      }
    }, //fin sefundo widget
    {
      widgetName: "fisicalinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Página de Cátedra Física I",
            url: "https://campus.fi.uba.ar/course/view.php?id=1366",
            id: 1
          },
          {
            text: "Fechas de integradores",
            url: "https://campus.fi.uba.ar/mod/page/view.php?id=96099",
            id: 2
          },
          {
            text: "Requisitos inscripción integradores",
            url: "https://campus.fi.uba.ar/mod/page/view.php?id=96099",
            id: 3
          }
        ]
      }
    }
  ]
};

export default config;
