import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Createpost = () => {
    const [data, setData] = useState({
        caption: '',
        desc: '',
        img: ''
    });

    const [url, seturl] = useState('');
    const navigate = useNavigate();

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', data.img);
        formData.append('upload_preset', 'Social Media');
        formData.append('cloud_name', 'dbnaboneh');

        const res = await fetch(`https://api.cloudinary.com/v1_1/dbnaboneh/upload`, {
            method: 'POST',
            body: formData
        });

        if(res.status === 200){
            return await res.json();
        }else{
            return 'Error';
        }
    };

        const handleSubmit = async (e) => {
            e.preventDefault();
            const { secure_url } = await uploadImage();
            seturl(secure_url);
        
            const response = await fetch('https://social-media-project-three.vercel.app/api/new-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('user:token')}`
                },
                body: JSON.stringify({
                    caption: data.caption,
                    desc: data.desc,
                    image: secure_url,
                })
            });
        
            if (response.ok) {
                const data = await response.json();  // Successfully created post
                // console.log('Success:', data);
                navigate('/')

            } else {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                
                // Handle token expiration
                if (errorData === "Token has expired") {
                    alert("Your session has expired. Please log in again.");
                    // Redirect to login page or handle re-login
                    navigate('/account/signin'); // assuming you have a route to login
                }
            }
        };        

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[800px] h-[600px] p-6'>
                <form onSubmit={handleSubmit}>
                    <Input
                        placeholder='Caption ...'
                        name='title'
                        className='py-4'
                        value={data.caption}
                        onChange={(e) => setData({ ...data, caption: e.target.value })}
                        isRequired={true}
                    />
                    <textarea
                        rows={10}
                        className='w-full border shadow p-4 resize-none'
                        placeholder='Description'
                        value={data.desc}
                        onChange={(e) => setData({ ...data, desc: e.target.value })}
                        required
                    />
                    <Input
                        type='file'
                        name='image'
                        className='py-4'
                        onChange={(e) => setData({ ...data, img: e.target.files[0] })}
                        isRequired={false}
                        
                    />
                    <label htmlFor="image" className='cursor-pointer p-4 border shadow'>
                        {data.img ? data.img.name : 'Upload Image'}
                    </label><br />
                    <Button label='Create Post' type='submit' className='hover: bg-orange-600 mt-5' />
                </form>
            </div>
        </div>
    );
};

export default Createpost;
