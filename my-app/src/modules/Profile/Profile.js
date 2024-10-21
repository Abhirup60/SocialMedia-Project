import React, { useEffect, useState } from "react";
import { ReactComponent as Avatar } from "../../assets/avatar.svg";
import postImg from "../../assets/nature.jpg";
import Share from "../../assets/share.svg";
import Like from "../../assets/like.svg";
import Comment from "../../assets/comment.svg";
import { stats } from "../Home/data";

const Profile = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:8000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user:token")}`,
        },
      });

      setPosts(await response.json());
    };

    getPosts();
  }, []);

  console.log(posts, "posts");

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center p-6'>
        {/* user's details of following followers */}
        <div className='h-[50%] w-[40%]  mt-20 flex flex-col justify-center items-center '>
          <Avatar width='110px' height='110px' className='my-1' />
          <p>@James_bond</p>
          <div className='h-[80px] w-[75%] flex my-2  items-center justify-between'>
            {stats.map(({ id, name, stats }) => {
              return (
                <div key={id} className='text-center'>
                  <h3 className='font-bold text-2xl'>{stats}</h3>
                  <p className='font-light text-lg'>{name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* posts */}
        <div className='flex justify-between'>
          {posts?.posts?.length > 0 &&
            posts?.posts?.map(({_id, caption='', description='', image=''}) => {
              return (
                <div className='w-[400px]  mt-6 mx-2 flex flex-col border p-3 rounded-lg'>
                  {/* image */}
                  <div className='border-b pb-4 mb-4'>
                    <p>{caption}</p>
                    <img src={image} className='rounded-xl' />
                    <p className='mt-4 text-center'>
                      {description}
                    </p>
                  </div>
                  
                  {/* likes , share, comments */}
                  <div className='flex justify-around mt-2 p-3'>
                    <div className='flex'>
                      <img src={Like} height={"25px"} width={"25px"} />
                      <p className='mt-3 ml-3'>10.5k </p>
                    </div>

                    <div className='flex'>
                      <img src={Comment} height={"25px"} width={"25px"} />
                      <p className='mt-3 ml-3'>10.5k </p>
                    </div>

                    <div className='flex'>
                      <img src={Share} height={"25px"} width={"25px"} />
                      <p className='mt-3 ml-3'>10.5k </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
