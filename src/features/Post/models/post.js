import { forward } from 'effector';
import { universal } from '../../../Lib/domains';


const started = universal.event('start post store')

const fetchPost = universal.effect({
    handler: async ({ id: postId }) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        console.log('post fetched', postId)
        return res.json()
    }
})

const postStore = universal.store({}).on(fetchPost.done, (_, { result }) => result)


forward({
    from: started.filterMap(({ router }) => router.query),
    to: fetchPost
})


export { started, postStore, fetchPost }

