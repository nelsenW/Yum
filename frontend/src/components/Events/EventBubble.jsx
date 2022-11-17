import './eventBubble.css'
import example from '../../assets/background.jpeg'

export default function EventBubble(){
    return (
        <div className="event-bubble">
            <img id='event-bubble-img' src={example}></img>
            <div id='event-bubble-desc'>
                <h2>Title</h2>
                <h4>price</h4>
            </div>
        </div>
    )
}