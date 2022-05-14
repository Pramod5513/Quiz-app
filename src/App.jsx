import {useState} from "react";
import {useEffect} from "react";
import {useMemo} from "react";
import "./app.css"
import Trivia from "./components/Trivia";
import Timer from "./components/Timer"
import Start from "./components/Start"

function App() {
  const [username,setUsername] = useState(null);
  const [questionNumber,setQuestionNumber]=useState(1)
  const [stop,setStop]=useState(false);
  const [earned,setEarned]=useState("₹ 0");

  const data=[
    {
      id:1,
      question: "Which of the following gods is also known as ‘Gauri Nandan’?",
      answers:[
        {
          text:"Agni",
          correct:false,
        },
        {
          text:"Indra",
          correct:false,
        },
        {
          text:"Hanuman",
          correct:false,
        },
        {
          text:"Ganesha",
          correct:true,
        },
      ]
    },
    {
      id:2,
      question: "Pongal is a popular festival of which state?",
      answers:[
        {
          text:"Karnataka",
          correct:false,
        },
        {
          text:"Kerala",
          correct:false,
        },
        {
          text:"Tamil Nadu",
          correct:true,
        },
        {
          text:"Andra Pradesh",
          correct:false,
        },
      ]
    },
    {
      id:3,
      question: "Cold brew, Latte, Espresso are all examples of which beverage?",
      answers:[
        {
          text:"Tea",
          correct:false,
        },
        {
          text:"Fruit Juice",
          correct:false,
        },
        {
          text:"Coffee",
          correct:true,
        },
        {
          text:"Lassi",
          correct:false,
        },
      ]
    },
    {
      id:4,
      question:  "Which of these is a term for a score used in racquet sports?",
      answers:[
        {
          text:"Hate",
          correct:false,
        },
        {
          text:"Love",
          correct:true,
        },
        {
          text:"Down",
          correct:false,
        },
        {
          text:"Up",
          correct:false,
        },
      ]
    },
    {
    id:5,
    question: "Rajat Sharma, Sonia Singh, Rahul Kanwal and Sumit Awasthi are all associated with which profession?",
    answers:[
      {
        text:"Astrology",
        correct:false,
      },
      {
        text:"Journalism",
        correct:true,
      },
      {
        text:"Medicine",
        correct:false,
      },
      {
        text:"Law",
        correct:true,
      },
    ]
  },
  {
    id:6,
    question: "In Sept 2020, which iconic motorcycle brand announced that it is shutting down its manufacturing facilities in India?",
    answers:[
      {
        text:"Harley Davidson",
        correct:true,
      },
      {
        text:"Triumph",
        correct:false,
      },
      {
        text:"Indian",
        correct:true,
      },
      {
        text:"Arctic Cat",
        correct:false,
      },
    ]
  },
  {
    id:7,
    question: "Which was the colour of the saree worn by Madhuri Dixit in the song 'Didi tera dewar deewana,' which triggered a fashion trend in the country?",
    answers:[
      {
        text:"Green",
        correct:false,
      },
      {
        text:"Red",
        correct:false,
      },
      {
        text:"Yellow",
        correct:false,
      },
      {
        text:"Purple",
        correct:true,
      },
    ]
  },
  {
    id:8,
    question:  "In which state of India is the town of Jamtara located?",
    answers:[
      {
        text:"Odisha",
        correct:false,
      },
      {
        text:"Bihar",
        correct:false,
      },
      {
        text:"Jharkhand",
        correct:true,
      },
      {
        text:"West Bengal",
        correct:false,
      },
    ]
  },
  {
    id:9,
    question: "Who is the first woman and also former astronaut to reach the deepest point of the ocean, Mariana trench?",
    answers:[
      {
        text:"Sally Ride",
        correct:false,
      },
      {
        text:"Valentina Tereshkova",
        correct:false,
      },
      {
        text:"Svetiana Savitskaya",
        correct:false,
      },
      {
        text:"Kathryn D Sullivan",
        correct:true,
      },
    ]
  },
  {
    id:10,
    question:  "Where in Singapore did Netaji Subhash Chandra Bose make the first proclamation of an Azad Hind government?",
    answers:[
      {
        text:"Cathay cinema hall",
        correct:true,
      },
      {
        text:"Fort Canning park",
        correct:false,
      },
      {
        text:"National University of Singapore",
        correct:false,
      },
      {
        text:"National Gallery of Singapore",
        correct:false,
      },
    ]
  }
  ]

  const moneyPyramid = useMemo(()=>[
    // {id:16,amount:"₹ 7 Crore"},
    // {id:15,amount:"₹ 1 Crore"},
    // {id:14,amount:"₹ 50,00,000"},
    // {id:13,amount:"₹ 25,00,000"},
    // {id:12,amount:"₹ 12,50,000"},
    // {id:11,amount:"₹ 6,40,000"},
    {id:10,amount:"₹ 3,20,000"},
    {id:9,amount:"₹ 1,60,000"},
    {id:8,amount:"₹ 80,000"},
    {id:7,amount:"₹ 40,000"},
    {id:6,amount:"₹ 20,000"},
    {id:5,amount:"₹ 10,000"},
    {id:4,amount:"₹ 5,000"},
    {id:3,amount:"₹ 3,000"},
    {id:2,amount:"₹ 2,000"},
    {id:1,amount:"₹ 1,000"}
  ],[]);
  useEffect(() => {
    questionNumber >1 && 
      setEarned(moneyPyramid.find(m=> m.id === questionNumber-1).amount);
  }, [moneyPyramid,questionNumber]);
  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned: {earned}</h1>
            ):(
            <> 
            <div className="top">
              <div className="timer">
                <Timer setStop={setStop} 
                  questionNumber= {questionNumber}/>
              </div>
            </div>
            <div className="bottom">
              <Trivia 
                data={data} 
                setStop={setStop} 
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
              />
            </div>
            </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m)=>(
                <li className= {questionNumber===m.id ?"moneyListItem active" : "moneyListItem"}>
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
              </>
            ) : (
              <Start setUsername={setUsername}/>
            )}
    </div>
  );
}

export default App;
