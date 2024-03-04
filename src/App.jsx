import { useState } from 'react';
import style from './styles/App.module.scss';

import Hero from './components/Hero';
import UserStats from './components/UserStats';
import Description from './components/Description';
import Repos from './components/Repos';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [bio, setBio] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [location, setLocation] = useState('');
  const [repos, setRepos] = useState([]);
  const [userSearched, setUserSearched] = useState(false);

  return (
    <>
      <Hero setLocation={setLocation}
        inputValue={inputValue} setInputValue={setInputValue}
        username={username} setUsername={setUsername}
        profilePicture={profilePicture} setProfilePicture={setProfilePicture}
        bio={bio} setBio={setBio} 
        setFollowers={setFollowers}
        setFollowing={setFollowing}
        setRepos={setRepos}
        userSearched={userSearched} setUserSearched={setUserSearched} />

        
      <div className={style.wrapper}>
        <UserStats username={username}
          location={location} 
          userSearched={userSearched} 
          profilePicture={profilePicture}
          followers={followers} setFollowers={setFollowers}
          following={following} setFollowing={setFollowing} />

        <Description username={username} bio={bio} userSearched={userSearched} />

        <Repos repos={repos} userSearched={userSearched} />
      </div>
    </>
  );
}

export default App
