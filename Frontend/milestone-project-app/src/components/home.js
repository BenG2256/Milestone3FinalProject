import { useContext } from 'react';
// import { CurrentUser } from './contexts/CurrentUser';


function Home() {

    // const { currentUser } = useContext(CurrentUser)
    // console.log(currentUser.username)

    let loggedIn = (
        <div style={{ float: 'right' }}>
            <li>
                {/* {currentUser.username} */}
            </li>
            {/* <button onClick={handleLogout}>
                Logout
            </button> */}
        </div>

    )

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