import style from '../styles/SearchSuggestion.module.scss';

export default function SearchSuggestion({ username, profilePicture, bio, userSearched, setUserSearched, suggestionNotVisible }) {
    function handleClick() {
        setUserSearched(true)
    }

    return (
        <div id='suggestion' tabIndex='0' className={style.suggestion} style={suggestionNotVisible || userSearched ? {display: 'none'} : {display: 'flex'}} onClick={handleClick}>
            <img src={profilePicture} alt="User's profile picture" className={style.pfp} />

            <div className={style.info}>
                <p className={style.username}>{username}</p>
                <p className={style.subtitle}>{bio || 'This User Has No Bio'}</p>
            </div>
        </div>
    )
}