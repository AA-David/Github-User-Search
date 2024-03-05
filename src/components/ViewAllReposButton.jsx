import { useEffect, useState } from 'react';
import style from '../styles/ViewAllReposButton.module.scss';

export default function ViewAllReposButton({ userSearched, setReposShown, repos }) {
    const [viewRepos, setViewRepos] = useState(true);

    useEffect(() => {
        setReposShown(4);
        setViewRepos(true);
    }, [userSearched]);

    function handleClick() {
        setReposShown(repos.length);
        setViewRepos(prev => !prev);

        if(!viewRepos) {
            setReposShown(4);
        }
    }

    return (
        <div className={style.viewAllReposButtonContainer} style={{display: userSearched ? 'flex' : 'none'}}>
            <button className={style.viewAllReposButton} onClick={handleClick} aria-label='View all repositories'>
                {
                    viewRepos ? 'View all repositories' : 'Hide repositories'
                }
            </button>
        </div>
    )
}