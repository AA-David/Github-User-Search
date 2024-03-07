import style from '../styles/Repos.module.scss';

import ViewAllReposButton from './ViewAllReposButton';

import shield from '../images/Shield.svg';
import nesting from '../images/Nesting.svg';
import star from '../images/Star.svg';
import { useEffect, useState } from 'react';

export default function Repos({ repos, userSearched }) {
    const [returnedRepos, setReturnedRepos] = useState([]);
    const [reposShown, setReposShown] = useState(4);
    let lastUpdateDate;

    function calculateLastUpdate() {
        // Conveert dates to Date object
        const currentDate = new Date();
        const lastUpdate = new Date(lastUpdateDate);

        // Calculate difference in milliseconds
        const difference = currentDate - lastUpdate;

        // Convert difference to days (1000ms -> 1s -> 1hr -> 1day)
        const daysDifference = difference / (1000 * 60 * 60 * 24);

        if (daysDifference <= 1) {
            lastUpdateDate = 'less than 24 hours ago';
        } else {
            lastUpdateDate = Math.floor(daysDifference) + ' days ago';
        }
    }

    useEffect(() => {
        if (userSearched) {
            setReturnedRepos(repos.slice(0, reposShown).map(repo => {
                lastUpdateDate = repo.updated_at;
                calculateLastUpdate();

                return(
                    <div className={style.repo} key={repo.id} onClick={() => window.open(`${repo.html_url}`)}>
                        <p className={style.repoName}>{repo.name}</p>
                        <p className={style.repoDescription}>{repo.description}</p>
                        <div className={style.bottomLine}>
                            {repo.license ? <p className={style.repoLicense}><img src={shield} alt="Shield icon" /> {repo.license.spdx_id}</p> : ''} 
                            <p className={style.repoForks}> <img src={nesting} alt="Fork icon" /> {repo.forks}</p>
                            <p className={style.repoStars}> <img src={star} alt="Star icon" /> {repo.stargazers_count}</p>
                            <p className={style.repoLastUpdate}>updated {lastUpdateDate}</p>
                        </div>
                    </div>
                );
            }));
        } else {
            setReturnedRepos([]);
        }
    }, [userSearched, repos, reposShown])

    return (
        <>
            <section className={style.repoGridContainer}>
                {returnedRepos}
            </section>

            <ViewAllReposButton userSearched={userSearched} setReposShown={setReposShown} repos={repos} />
        </>
    );
}