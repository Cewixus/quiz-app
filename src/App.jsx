import { useEffect, useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import StartPage from './StartPage.jsx'
import QuizPage from './QuizPage.jsx'
import js from '@eslint/js'

export default function() {
    const [questions, setQuestions] = useState(() => {
        const saved = localStorage.getItem("quiz")
        return saved ? JSON.parse(saved) : []
    })
    const [selected, setSelected] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [gameIsOver, setGameIsOver] = useState(false)
    const [score, setScore] = useState(null)
    const [disabled, setDisabled] = useState(false)

    async function startQuiz() {
        setIsLoading(true)
        try {
            const res = await fetch("https://opentdb.com/api.php?amount=5&category=31&type=multiple")
            const data = await res.json()
            
            const formatted = data.results.map((result, i) => {
                return({
                    id: i,
                    question: result.question,
                    correct: result.correct_answer,
                    answers: [...result.incorrect_answers, result.correct_answer].sort(() => Math.random() - 0.5),
                })
            })
            localStorage.setItem("quiz", JSON.stringify(formatted))
            setQuestions(formatted)
            
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }

    function handleSelected(questionId, answer) {
        setSelected(prev => ({
            ...prev,
            [questionId]: answer
        }))
    }

    function handleCheckAnswers() {
        if(Object.keys(selected).length === questions.length){
            setScore(questions.filter(question => {
                return question.correct === selected[question.id]
            }).length)

            setGameIsOver(true)
            setDisabled(true)
        }else
            alert("Answer all questions!")
    }

    async function playAgain() {
        setIsLoading(true)

        await startQuiz()

        setGameIsOver(false)
        setScore(null)
        setSelected({})
        setDisabled(false)

        setIsLoading(false)
    }

 return (
    <Routes>
        <Route path='/' element={<StartPage startQuiz={startQuiz}/>}/>
        <Route path='/quiz' element={isLoading ? <p className='loading'>Loading...</p>
                                    :questions.length === 0 ? <Navigate to='/' replace/>
                                    :<QuizPage 
                                    startQuiz={startQuiz}
                                    isLoading={isLoading}
                                    questions={questions} 
                                    selected={selected}
                                    score={score}
                                    gameIsOver={gameIsOver}
                                    disabled={disabled}
                                    handleSelected={handleSelected}
                                    handleCheckAnswers={handleCheckAnswers}
                                    playAgain={playAgain}
                                    />}/>
    </Routes>
)
}

