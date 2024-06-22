import React, { useEffect } from 'react'

const IndexDB = () => {
    const usersData = [
        {
          "userId": 3333,
          "name": "Shafeeq Ahamed",
          "email": "shafeeq@mail.com",
          "password": "shafeeq",
          "likedPosts": [0, 1, 2]
        },
        {
          "userId": 2828,
          "name": "Sanjay Kumar",
          "email": "sanjay@mail.com",
          "password": "sanjay",
          "likedPosts": [3, 4]
        }
      ];
      
      const postsData = [
        {
            id: 0,
            img_url: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/24806c126581961.Y3JvcCwxMzgwLDEwODAsMjU2LDA.jpg',
            text: 'Artistic Poster Design',
            likes: '75',
            watches: '340',
            user: 'Creative Mind'
        },
        {
            id: 1,
            img_url: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/24806c126581961.Y3JvcCwxMzgwLDEwODAsMjU2LDA.jpg',
            text: 'Attack on Titan x Fortnite',
            likes: '253',
            watches: '654',
            user: 'Shafeeq Ahamed'
        },
        {
            id: 2,
            img_url: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/24806c126581961.Y3JvcCwxMzgwLDEwODAsMjU2LDA.jpg',
            text: 'GOAT Mikasa',
            likes: '15054',
            watches: '654608',
            user: 'Artistic Vision'
        },
        {
            id: 3,
            img_url: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/24806c126581961.Y3JvcCwxMzgwLDEwODAsMjU2LDA.jpg',
            text: 'Freeze-dried Cat Treats—Wanpy',
            likes: '51',
            watches: '580',
            user: 'Reshoka Designs'
        },
        {
            id: 4,
            img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a83ff4198066457.66559c18f2ba7.png',
            text: 'Brand Identity for Startups',
            likes: '65',
            watches: '520',
            user: 'Creative Works'
        },
        {
            id: 5,
            img_url: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/aadca8140674779.Y3JvcCwxMzgwLDEwODAsMjQyLDA.jpg',
            text: 'Minimalist Logo Collection',
            likes: '89',
            watches: '710',
            user: 'Design Lab'
        },
        {
            id: 6,
            img_url: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/24806c126581961.Y3JvcCwxMzgwLDEwODAsMjU2LDA.jpg',
            text: 'Urban Photography',
            likes: '44',
            watches: '290',
            user: 'Photo Genius'
        },
        {
            id: 7,
            img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a83ff4198066457.66559c18f2ba7.png',
            text: 'Futuristic UI Concepts',
            likes: '72',
            watches: '610',
            user: 'UI Expert'
        },
        {
            id: 8,
            img_url: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/aadca8140674779.Y3JvcCwxMzgwLDEwODAsMjQyLDA.jpg',
            text: 'Creative Illustration Art',
            likes: '63',
            watches: '450',
            user: 'Art Studio'
        },
        {
            id: 9,
            img_url: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/24806c126581961.Y3JvcCwxMzgwLDEwODAsMjU2LDA.jpg',
            text: 'Fashion Photography',
            likes: '94',
            watches: '830',
            user: 'Fashion Lens'
        },
        {
            id: 10,
            img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a83ff4198066457.66559c18f2ba7.png',
            text: 'Graphic',
            likes: '57',
            watches: '410',
            user: 'Design Trends'
        },
        {
            id: 11,
            img_url: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/aadca8140674779.Y3JvcCwxMzgwLDEwODAsMjQyLDA.jpg',
            text: 'Digital',
            likes: '76',
            watches: '540',
            user: 'Digital Artist'
        }
    ]
      
useEffect(() => {
      const openRequest = indexedDB.open('galleryDB', 1);
      openRequest.onupgradeneeded = function(event) {
        const db = event.target.result;
        const usersStore = db.createObjectStore('users', { keyPath: 'userId' });
        const postsStore = db.createObjectStore('posts', { keyPath: 'id' });
        usersData.forEach(user => {
          usersStore.add(user);
            console.log('User added:', user);
        });
        postsData.forEach(post => {
          postsStore.add(post);
          console.log('Post added:', post);
        });
      };
      openRequest.onsuccess = function(event) {
        console.log('IndexedDB opened successfully');
      };
      openRequest.onerror = function(event) {
        console.error('Error opening IndexedDB:', event.target.errorCode);
      };
}, [])
      
  return (
    <div>IndexDB</div>
  )
}

export default IndexDB