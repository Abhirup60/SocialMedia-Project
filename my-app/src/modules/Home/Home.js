import React, { useEffect, useState } from "react";
import { ReactComponent as Avatar } from "../../assets/avatar.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import postImg from "../../assets/nature.jpg";
import Logout from "../../assets/logout.svg";
import Share from "../../assets/share.svg";
import Like from "../../assets/like.svg";
import Comment from "../../assets/comment.svg";
import { Link, useNavigate } from "react-router-dom";
import { stats, navigations } from "./data";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  useEffect(()=>{
    const fetchPosts = async()=>{
      const response = await fetch("https://social-media-project-server.vercel.app/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user:token")}`,
        },
      });

      const data = await response.json();
      setData(data.posts);
      setUser(data.user);

    }

    fetchPosts();
  },[])

  console.log(data, 'data');
  const {_id = '', username = '', email = ''} = user || {}

  return (
    <div className='h-screen bg-[#f3ecec] flex  overflow-hidden'>
      {/* left sidebar */}
      <div className='w-[20%] bg-white flex flex-col'>
        <div className='h-[30%] flex flex-col justify-center items-center border-b'>
          <Avatar width='70px' height='70px' className='my-1' />
          <p>{username}</p>
          <div className='h-[80px] w-[75%] flex justify-between my-2'>
            {stats.map(({ id, name, stats }) => {
              return (
                <div key={id} className='text-center'>
                  <h3 className='font-bold'>{stats}</h3>
                  <p className='font-light text-sm'>{name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className='h-[55%] flex flex-col justify-around px-12'>
          {navigations.map(({ id, name, icon, url }) => {
            return (
              <Link to={url} key={id} className='flex cursor-pointer'>
                <img src={icon} height={"30px"} width={"30px"} />
                <p className='ml-3'>{name}</p>
              </Link>
            );
          })}
          
        </div>
        <div className='h-[15%] border border-t-black'>
          <div className='ml-12 cursor-pointer pt-6 flex'>
            <img src={Logout} height={"30px"} width={"30px"} />
            <Link to='/account/signin' className='ml-3'>
              Log Out
            </Link>
          </div>
        </div>
      </div>

      {/* for feed */}
      <div className='w-[60%] overflow-scroll h-full scrollbar-hide'>
        <div className='bg-white h-[75px] border-l flex justify-evenly items-center pt-4'>
          <div className='flex justify-center items-center '>
            <Input placeholder='Search Here...' />
            <Button label='Search' className='mb-4 ml-3' />
            <Link to='/new-post'><Button label='Create new Post' className='mb-4 ml-3 bg-red-600'/></Link>
          </div>
        </div>

        
        {
          
          data?.map(({caption='', description='', image='', user={}})=>{
            return(
              <div className='bg-white w-[80%]  mx-auto mt-32 p-8'>
            <div className='border-b flex items-center pb-4'>
              <Avatar width={"50px"} height={"50px"} />
              <div className='ml-3'>
                <h3>{username}</h3>
                <h3>{email}</h3>
              </div>
            </div>
  
            <div className='border-b pb-4 mb-4'>
              <div className="h-[400px] flex justify-center items-center bg-gray-200">
              <img src={image} className="rounded-xl max-h-full"/>
              </div>
              <p>{caption}</p>
              <p className='mt-4'>
                {description}
              </p>
            </div>
  
            <div className='flex justify-around mt-2'>
              <div className='flex'>
                <img src={Like} height={"40px"} width={"40px"} />
                <p className='mt-3 ml-3'>10.5k Likes</p>
              </div>
  
              <div className='flex'>
                <img src={Comment} height={"40px"} width={"40px"} />
                <p className='mt-3 ml-3'>10.5k Comments</p>
              </div>
  
              <div className='flex'>
                <img src={Share} height={"40px"} width={"40px"} />
                <p className='mt-3 ml-3'>10.5k Share</p>
              </div>
            </div>
          </div>
            )
          })
        }
      </div>

      {/* right sidebar */}
      <div className='w-[20%] border-l flex flex-col justify-around'>
        {/* Trendings */}
        <b className='ml-9 rounded-md mt-1'>Trending </b>
        <div className='h-[200px] bg-red-600 mt-5 w-[80%] ml-9 rounded-md'></div>

        <b className='ml-9 rounded-md mt-1'>Suggestion for you </b>
        <div className='h-[200px] bg-blue-600 mt-5 w-[80%] ml-9 rounded-md'></div>

        <b className='ml-9 rounded-md mt-1'>Active followers </b>
        <div className='h-[200px] bg-green-600 mt-5 w-[80%] ml-9 rounded-md'></div>
      </div>
    </div>
  );
};

export default Home;
