import style from '../styles/Description.module.scss';

export default function Description({ username, bio, userSearched }) {
    return (
        <>
            <p className={style.username}>{userSearched && username ? username : ''}</p>
            <p className={style.bio}>{userSearched && bio ? bio : ''}</p>
        </>
    )
}