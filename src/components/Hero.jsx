import style from '../styles/Hero.module.scss';
import Search from './Search';

export default function Hero({ inputValue, setInputValue, username, setUsername, profilePicture, setProfilePicture, bio, setBio, setFollowers, setFollowing, setLocation, setRepos, userSearched, setUserSearched }) {
    return (
        <section className={style.hero}>
            <Search inputValue={inputValue} setInputValue={setInputValue}
                username={username} setUsername={setUsername}
                profilePicture={profilePicture} setProfilePicture={setProfilePicture}
                bio={bio} setBio={setBio}
                setFollowers={setFollowers}
                setFollowing={setFollowing}
                setLocation={setLocation}
                setRepos={setRepos}
                userSearched={userSearched} setUserSearched={setUserSearched} />
        </section>
    )
}