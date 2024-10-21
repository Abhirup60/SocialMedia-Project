import Contact from "../../assets/contact.svg";
import Profile from "../../assets/profile.svg";
import Homee from "../../assets/home.svg";
import Message from "../../assets/message.svg";

export const stats = [
    {
        id:1,
        name:'Posts',
        stats: 1000
    },
    {
        id:2,
        name:'Followers',
        stats: 1000
    },
    {
        id:3,
        name:'Following',
        stats: 1000
    }
];

export const navigations = [
    {
        id: 1,
        name: 'Feed',
        icon: Homee,
        url:'/'
    },

    {
        id: 2,
        name: 'My Profile',
        icon: Profile,
        url:'/profile'

    },
    {
        id: 3,
        name: 'Contact',
        icon: Contact,
        url:'/'

    },
    {
        id: 4,
        name: 'Message',
        icon: Message,
        url:'/'

    }

]

