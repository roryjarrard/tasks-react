function WelcomeMessage({name}) {
    return <section>
        <h2>Welcome, {name}</h2>
        <p>
            This application will help you learn how a React frontend works with a FastAPI backend and a PostgreSQL database.
        </p>
    </section>
}

export default WelcomeMessage