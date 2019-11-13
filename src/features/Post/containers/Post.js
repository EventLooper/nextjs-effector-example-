import React from 'react';
import { useStore } from 'effector-react';
import { postStore } from '../models'


export const Post = () => {
    const post = useStore(postStore)

    return <div>{JSON.stringify(post)}</div>
}