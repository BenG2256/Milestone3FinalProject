import { useContext } from 'react';
import { CurrentUser } from '../contexts/CurrentUser'


function Home() {

    const { currentUser } = useContext(CurrentUser)
    // console.log("in home.js: ", currentUser.username)

    let loggedIn = (
        <div>
            <li>hello</li>
        </div>
    )

    if (currentUser) {
        loggedIn = (
            <div>
                <li>
                    {currentUser.username}
                </li>
                {/* <button onClick={handleLogout}>
                Logout
            </button> */}
            </div>

        )
    }

    return (
        <main>
            <div className="App">
                <header className="App-header">
                    <h1>Map App</h1>
                </header>
                {loggedIn}
            </div>
        </main>
    );
}

export default Home;