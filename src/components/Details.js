import styled from "styled-components";
import {useState , useEffect} from "react";
import db from "../firebase";
import {useParams} from "react-router-dom";

const Detail = ()=>{

    const {id} = useParams();
    const [detail , setDetail] = useState({});

    useEffect(()=>{
        db.collection('movies').doc(id).get().then((doc)=>{
            if(doc.exists){
                setDetail(doc.data());
            }
            else {
                console.log('no such documents');
            }
            
        }).catch((error) => {
            console.log("Error getting the document:", error);
        })
    },[id])

    return <Container>
        <Background>
            <img alt={detail.title} src={detail.backgroundImg}></img>
        </Background>

        <MovieTitle>
            <img alt={detail.title} src={detail.titleImg}></img>
        </MovieTitle>

        <Content>
            <Controls>
                <PlayButton>
                    <img alt="" src="/images/play-icon-black.png"></img>
                    <span>Play</span>
                </PlayButton>
                <Trailer>
                    <img alt="" src="/images/play-icon-white.png"></img>
                    <span>Trailer</span>
                </Trailer>
                <AddList>
                    <span></span>
                    <span></span>
                </AddList>
                <Group>
                    <img alt="" src="/images/group-icon.png"></img>
                </Group>
            </Controls>
            <SubTitle>
                {detail.subTitle}
            </SubTitle>
            <Description>
                {detail.description}
            </Description>
        </Content>
    </Container>
}

const Container = styled.div`
    position : relative;
    min-height : calc(100vh - 250px);
    overflow: hidden;
    display : block ;
    top :72px;
    padding: 0 calc(3.5vw + 5px);
`
const Background = styled.div`
    left: 0px;
    right:0;
    top: 0;
    opacity: .8;
    position: fixed;
    z-index:-1;

    img{
        width: 100%;
        height:100%;

        @media (max-width:768px){
            width: initial;
        }
    }
`;

const MovieTitle = styled.div`
    display : flex;
    align-items: flex-end;
    -webkit-box-pack:start;
    justify-content: flex-start;
    margin:0 auto;
    height:30vw;
    min-height:170px;
    padding-bottom: 24px;
    width: 100%;

    img{
        max-width: 600px;
        min-width:200px;
        width:35vw;
    }
`;

const Content = styled.div`
    max-width : 874px;
`;  

const Controls =styled.div`
    align-items:center;
    display: flex;
    flex-flow:row nowrap;
    margin: 24px 0px;
    min-height: 56px;

`;

const PlayButton = styled.button`
    font-size: 15px;
    font-weight:bold;
    margin: 0 22px 0 0;
    padding:0 24px;
    height:56px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    letter-spacing: 1.8px;
    text-align : center;
    text-transform:uppercase;
    background:rgb(249,249,249);
    border:none;
    color : rgb(0 , 0 , 0 );

    img{
        width:32px;
    }

    &:hover{
        background:rgb(198,198,198);
    }

    @media (max-width:768px){
        height:45px;
        padding:0 12px;
        font-size: 12px;
        margin: 0 10px 0 0;

        img{
            width:25px;

        }
    }
`;

const Trailer = styled(PlayButton)`
    background:rgb(0 , 0 , 0 , 0.3);
    border: 1px solid rgb(249 ,249,249);
    color:rgb(249 ,249,249);
`;

const AddList = styled.div`
    margin-right:16px;
    height :44px;
    width :44px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgb(0,0,0,0.7);
    border-radius:50%;
    border:2px solid #fff;
    cursor:pointer;

    span{
        background-color:#fff;
        display:inline-block;

        &:first-child{
            height:2px;
            transform:translate(1px, 0px) rotate(0deg);
            width:16px;   
        }

        &:nth-child(2){
            height:16px;
            transform:translate(-8px) rotate(0deg);
            width:2px
        }
    }
`;

const Group = styled.div`
    height:44px;
    width:44px;
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    background:rgb(0,0,0,0.7);
    border:2px solid #fff;
`;

const SubTitle = styled.div`
    color:rgb(249 , 249 , 249);
    font-size:15px;
    min-height:20px;

    @media (max-width:768px){
        font-size:12px;
    }
`;

const Description = styled.div`
    color:rgb(249 , 249 , 249);
    font-size:20px;
    line-height:1.4;
    padding:16px 0px;

    @media (max-width:768px){
        font-size:14px;
    }
`;

export default Detail;
