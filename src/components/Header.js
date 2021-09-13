import styled from 'styled-components';
import { useDispatch , useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth , provider} from '../firebase';
import { selectUserName , selectUseEmail , selectUserPhoto , setUserloginDetails , setSignOutState } from '../features/userSlice';
import { useEffect } from 'react';

const Header = (props) =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(()=>{
        auth.onAuthStateChanged(async (user) => {
            if (user){
                setUser(user);
                history.push("/home");
            }
        })
    },[userName])    

    const handleAuth = () =>{
        if(!userName){
            auth.signInWithPopup(provider).then(result => {
            setUser(result.user);
            console.log(result.user);
            }).catch((error) =>{
            console.log(error.message);
            })
        }else if(userName){
            auth.signOut().then(() => {
                dispatch(setSignOutState());
                history.push("/");
            }).catch((err) => alert(err.message));
        }
    }

    const setUser = (user)=>{
        dispatch(
            setUserloginDetails({
                name:user.displayName,
                email:user.email,
                photo:user.photoURL,
            })
        )
    }

    // console.log(user);

    return <Nav>
        <Logo>
            <img src="/images/logo.svg" alt="logo"></img>
        </Logo>
        {!userName ? <Login onClick={handleAuth}>Login</Login> : <>
            <Navmenu>
            <a href="/home">
                <img src="/images/home-icon.svg" alt=""></img>
                <span>HOME</span>
            </a>
            <a href="/home">
                <img src="/images/search-icon.svg" alt=""></img>
                <span>SEARCH</span>
            </a>
            <a href="/home">
                <img src="/images/watchlist-icon.svg" alt=""></img>
                <span>WATCHLIST</span>
            </a>
            <a href="/home">
                <img src="/images/original-icon.svg" alt=""></img>
                <span>ORIGINALS</span>
            </a>
            <a href="/home">
                <img src="/images/movie-icon.svg" alt=""></img>
                <span>MOVIES</span>
            </a>
            <a href="/home">
                <img src="/images/series-icon.svg" alt=""></img>
                <span>SERIES</span>
            </a>
        </Navmenu>
        <Signout>
             <UserImg src={userPhoto} alt={userName}></UserImg>
             <Dropdown>
                 <span onClick={handleAuth}>Sign out</span>
             </Dropdown>
        </Signout>
       
        </>}
    </Nav>
};

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between; 
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img{
        display: block;
        width: 100%;
    }
`;

const Navmenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0;
    padding:0;
    position: relative;
    margin-right:auto;
    margin-left: 25px;

    a{
        display: flex;
        align-items: center;
        padding: 0 12px;

        img{
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index:auto;
        }

        span{
            color: rgb(249 , 249 , 249);
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 1.42px;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;

            &:before{
                background-color: rgb(249 , 249 , 249);
                border-radius: 0 0 4px 4px;
                bottom: -6px;
                content: "";
                height: 2px;
                left: 0px;
                opacity: 0;
                position: absolute;
                right: 0px;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94);
                visibility: hidden;
                width: auto;
            }
        }
    

    &:hover{
        span:before{
            transform:scaleX(1);
            visibility: visible;
            opacity: 1;
        }
    }
}

    @media (max-width:910px){
        display: none;
    }
`;

const Login = styled.a`
    background-color: rgba(0,0,0,0.6);
    padding: 8px 16px;
    text-transform:uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

const UserImg = styled.img`
    height: 100%;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19 , 19 , 19);
    border: 1px solid rgba(151 , 151 , 151 ,0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`;

const Signout = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    overflow: inherit;

    ${UserImg}{
        border-radius: 50%;
        height: 100%;
        width: 100%;
    }

    &:hover{
        ${Dropdown}{
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;

export default Header;