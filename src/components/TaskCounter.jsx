import { useState } from "react"

function TaskCounter() {
    const [count, setCount] = useState(0)

    function increaseCount() {
        setCount(count + 1)
    }
    
    return <section>
        <p>You have created {count} sample tasks.</p>
        <button onClick={increaseCount}>Increase Count</button>
    </section>
}

export default TaskCounter

