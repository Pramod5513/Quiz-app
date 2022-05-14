import {useState} from "react";
import {useEffect} from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3"
import correct from "../assets/correct.mp3"
import wrong from "../assets/wrong.mp3"

export default function Trivia({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {
  const [question,setQuestion]=useState(null);
  const [selectedAnswer,setSelectedAnswer]=useState(null); //34min
  const [className,setClassName]=useState("option");
  const [letsPlay]=useSound(play);
  const [correctAnswer]=useSound(correct);
  const [wrongAnswer]=useSound(wrong);

  useEffect(()=>{
    letsPlay();
  },[letsPlay]);

  useEffect(() => {                               // 30min
    setQuestion(data[questionNumber-1])
    },[data,questionNumber]);

    const delay = (duration, callback)=>{
      setTimeout(()=>{
        callback();
      },duration);
    };

    const handleClick=(a)=>{
      setSelectedAnswer(a);
      setClassName("option active");
      delay(3000,()=>
        setClassName(a.correct?"option correct": "option wrong")
      );
      delay(5000,()=>{
        if (a.correct){
          correctAnswer();
          delay(1000,()=>{
            setQuestionNumber((prev)=>prev+1);
            setSelectedAnswer(null);
          });
        } else{
          wrongAnswer();
          delay(1000,()=>{
            setStop(true);
          });
        }
      });
      // setTimeout(()=>{
      //   setClassName(a.correct?"option correct": "option wrong")
      // },3000)
    };
  return (
    <div className="trivia">
        <div className="question">{question?.question}</div>
        <div className="answers">
          {question?.answers.map((a)=>(
            <div className={selectedAnswer===a ? className:"option"} onClick={()=>handleClick(a)}>{a.text}</div>
          ))}
        </div>
    </div>
  )
}
