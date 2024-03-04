import { useState, useEffect, useRef } from 'react';
import style from '../styles/Search.module.scss';

import searchIcon from '../images/Search.svg';
import SearchSuggestion from './SearchSuggestion';

export default function Search({ inputValue, setInputValue, username, setUsername, profilePicture, setProfilePicture, bio, setBio, setFollowers, setFollowing, setLocation, setRepos, userSearched, setUserSearched }) {
    const [suggestionNotVisible, setSuggestionNotVisible] = useState(true);
    const [searchable, setSearchable] = useState(false);

    const accessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

    function fetchData() {
        console.log('Data Fetched')
        fetch(`https://api.github.com/users/${inputValue}`, {
            headers: {
                Authorization: `${accessToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (inputValue === data.login || inputValue === data.name) {
                setUser(data);
            } else {
                setSearchable(false);
                resetStates();
            }
        })
        .catch(err => console.log(err));
    }

    function setUser(data) {
        console.log('User Set')
        setSearchable(true);

        setUsername(data.name);
        setProfilePicture(data.avatar_url);
        setBio(data.bio);
        setFollowers(data.followers);
        setFollowing(data.following);
        setLocation(data.location);

        fetch(data.repos_url)
            .then(res => res.json())
            .then(data => {
                setRepos(data)
            })

        setSuggestionNotVisible(false);
    }

    function resetStates() {
        console.log('States Resetted')
        setUsername('');
        setProfilePicture('');
        setBio('');
        setFollowers('');
        setFollowing('');
        setLocation('');
        setRepos([]);
        setSuggestionNotVisible(true);
    }

    useEffect(() => {
        if (userSearched) fetchData();

        const timeoutId = setTimeout(() => {
           if(inputValue.length > 0) {
                fetchData();
           } else {
                setSearchable(false);
                resetStates();
           }
        }, 500);
        
        return () => clearTimeout(timeoutId);
    }, [inputValue, userSearched]); 

    function handleBlur(e) {
        if (e.relatedTarget === null) {
            resetStates();
        }  
    }

    function handleChange(e) {
        setUserSearched(false);
        resetStates();
        setInputValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log('Form submitted');
        
        if (searchable) {
            setUserSearched(true);
        } else {
            resetStates();
        }
    }

    return (
        <>
            <form className={style.form} onSubmit={handleSubmit} onBlur={handleBlur}>
                <button>
                    <img src={searchIcon} alt='Search icon' />
                </button>

                <input type='search' placeholder='Username' onChange={handleChange} value={inputValue}></input>
            </form>    

            <SearchSuggestion bio={bio}
                profilePicture={profilePicture}
                suggestionNotVisible={suggestionNotVisible}
                username={username} setUsername={setUsername}
                userSearched={userSearched} setUserSearched={setUserSearched} />
        </>
    )
}