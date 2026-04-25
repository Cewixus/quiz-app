import { Navigate, useNavigate } from 'react-router-dom'
import './startPage.css'

export default function StartPage({startQuiz}){
    const navigate = useNavigate()

    async function handleStart() {
        startQuiz()   
        navigate('/quiz')    
    }

    return(
        <section className="start-page">
            <h1>Quizzical</h1>
            <p>Try your anime knowledge!</p>
            <button onClick={handleStart}>Start quiz</button>
        </section>
    )
}