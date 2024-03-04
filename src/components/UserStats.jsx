import { useEffect } from 'react';
import style from '../styles/UserStats.module.scss';

import defaultPfp from '../images/DefaultPfp.png';

export default function UserStats({ username, profilePicture, followers, setFollowers, following, setFollowing, location, userSearched }) {
    const accessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

    useEffect(() => {
        if (username?.length > 0 && userSearched) {
            fetch(followers, {
                headers: {
                    Authorization: `${accessToken}`
                }
            })
            .then(res => res.json())
            .then(data => setFollowers(data.length));

            fetch(following, {
                headers: {
                    Authorization: `${accessToken}`
                }
            })
            .then(res => res.json())
            .then(data => setFollowing(data.length));
        }
    }, [username]);

    return (
        <section className={style.stats}>
            <div className={style.pfpContainer}>
                <img src={userSearched ? profilePicture : defaultPfp} alt="User's profile picture" />
            </div>

            <div className={style.statInfo}>
                <div><p className={style.label}>Followers</p> <p className={style.stat}>{userSearched && followers ? followers : '0'}</p></div>
                <div><p className={style.label}>Following</p> <p className={style.stat}>{userSearched && following ? following : '0'}</p></div>
                <div><p className={style.label}>Location</p> <p className={style.stat}>{userSearched && location ? location : 'None'}</p></div>
            </div>
        </section>
    )
}