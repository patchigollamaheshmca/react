import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCrossCircled } from 'react-icons/rx';

import styles from "../App.css";

function QuizPage() {
  const [score, setScore] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();
  const back=useNavigate();


  const questions = [
    {
      question: "PREDICT THE TOP LOSER(for tomorrow) across these indices",
      answers: [
        {text: "NIFTY50  17,356,-0.31%", isCorrect: true,option:"A"},
        {text: "NIFTYNEXT50  56,226,-0.31%", isCorrect: false,option:"B"},
        {text: "NIFTYBANK  17,356,+2.12%", isCorrect: false,option:"C"}
      ],
    },
    {
      question: "When was the National Stock Exchange Fifty (NIFTY) founded?",
      answers: [
        { text: "1982", isCorrect: false,option:"A" },
        { text: "1996", isCorrect: true,option:"B" },
        { text: "1986", isCorrect: false,option:"C" },
        { text: "1954", isCorrect: false,option:"D" },
      ],
    },
    {
      question: "Where is the National Stock Exchange headquartered?",
      answers: [
        { text: "The city of Mumbai.", isCorrect: true,option:"A" },
        { text: "The city of Madras.", isCorrect: false,option:"B" },
        { text: "The city of Hyderabad.", isCorrect: false,option:"C" },
        { text: "Himachal Pradesh.", isCorrect: false,option:"D" },
      ],
    },
    {
      question: "The London Stock Exchange’s Stock Market Index is known as",
      answers: [
        { text: "Footsie (FTSE)", isCorrect: true,option:"A" },
        { text: "NIFTY", isCorrect: false,option:"B" },
        { text: "The Sensex", isCorrect: false,option:"C" },
        { text: "Brent", isCorrect: false,option:"D" },
      ],
    },
    {
      question: "The UP Stock Exchange is located in which of the below cities?",
      answers: [
        { text: "Mumbai", isCorrect: false,option:"A" },
        { text: "Delhi", isCorrect: false,option:"B" },
        { text: "Kanpur", isCorrect: true,option:"C" },
        { text: "Bangalore", isCorrect: false,option:"D" },
      ],
    },
  ];

  const handleAnswerSelected = (answer) => {
    setSelectedAnswer(answer);

    if (answer.isCorrect) {
      setScore(score + 20);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      navigate("/results", { state: { score } });
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    setSelectedAnswer(null);
  };

  const handleFinishQuiz = () => {
    navigate("/results", { state: { score } });
  };
  
  const handleGoBack = () => {
    back('/');
  };

  const percentage = Math.round(
    ((currentQuestion +1 ) / questions.length) * 100
  );

  return (
    <div className="flex flex-col  bgcolor">
   
        <div className="flex items-center justify-between px-4 pt-5">
        <button className="px-4 py-2 text-lg font-medium text-white rounded-md">200</button>
          <h1 className="text-2xl font-bold">FantasyQuiz#156</h1>
          <button onClick={handleGoBack}>
            <RxCrossCircled className="text-red-500 w-6 h-6" />
          </button>       
      </div>
  
 
  
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mt-20">
          <div className="flex items-center justify-center">
            
            <h2 className="text-2xl font-medium text-gray-900">{questions[currentQuestion].question}</h2>
          </div>
          <div className="mt-4 space-y-4 flex flex-col items-center ">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button 
                key={index}
                className={`w-96  p-4 text-lg font-medium text-gray-900 rounded-md ${
                  selectedAnswer && answer.isCorrect
                  ? 'bg-green-500 hover:bg-green-600'
                  : selectedAnswer && selectedAnswer.text === answer.text
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'hover:bg-gray-200 bgwhite '  
              }`}
                onClick={() => handleAnswerSelected(answer)}
                disabled={selectedAnswer !== null}
              >
               <span className="bgcolor ans">{answer.option}</span> {answer.text}
              </button>
            ))}
          </div>
          {selectedAnswer && (currentQuestion === questions.length - 1) ? (
  <div className="mt-6">
    <button
      className="px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
      onClick={handleFinishQuiz}
    >
      Show Result
    </button>
  </div>
) : (
  <><div className="mt-6">
    <button
      className={`px-4 py-2 text-lg font-medium text-white rounded-md ${selectedAnswer ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
      onClick={handleNextQuestion}
      disabled={!selectedAnswer}
    >
      Continue
    </button>
  <div className="flex items-center justify-center mx-2" style={{ maxHeight: '10%' }}>
      <div className="w-3/4 bg-gray-300 rounded-md" style={{ overflow: 'hidden' }}>
        <div
          className="h-4 bg-green-500 rounded-md"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-lg font-medium text-gray-900">{currentQuestion + 1}/{questions.length}</div>
    </div></div></>

)}

        </div>
      </div>
    </div>
  );
}

export default QuizPage;