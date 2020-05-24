import React from 'react'
import Item from './Forecast1'

const Posts = ({ posts }) => {
  return (
    <ul className='list-group mb-4'>
        {posts.map((item, index) => (
            <Item
                key={index}
                {...item} />
        ))}
    </ul>
  );
};

export default Posts;