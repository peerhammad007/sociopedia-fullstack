import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { getPostsApi } from "utils/handleApi";

const PostsWidget = ({ userId }) => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        getPostsApi(token, dispatch, setPosts); // eslint-disable-next-line
    }, []) 

    

    // Check if posts is undefined or null
    if (!posts) {
        return <div>Loading posts...</div>;
    }
    

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
};

export default PostsWidget;