import axios from "axios";
import BASE_URL from "config";

const patchFriendApi = async (_id, friendId, token, dispatch, setFriends) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/users/${_id}/${friendId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(setFriends({ friends: response.data }));
  } catch (error) {
    console.error('There was a problem with the Axios request:', error);
  }
};

const registerApi = async (values, onSubmitProps, setPageType) => {
  // this allows us to send form info with image
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  formData.append("picturePath", values.picture.name);

  try {
    const savedUserResponse = await axios.post(
      `${BASE_URL}/auth/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const savedUser = savedUserResponse.data;
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
    }
  } catch (error) {
    console.error('There was a problem with the Axios request:', error);
  }
};

const loginApi = async (values, onSubmitProps, dispatch, setLogin, navigate) => {
  try {
    const loggedInResponse = await axios.post(
      `${BASE_URL}/auth/login`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const loggedIn = loggedInResponse.data;

    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  } catch (error) {
    console.error('There was a problem with the Axios request:', error);
  }
};

const getFriendsApi = async (userId, token, dispatch, setFriends) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/${userId}/friends`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    dispatch(setFriends({ friends: data }));
  } catch (error) {
    console.error('There was a problem with the Axios request:', error);
  }
};

const createPostApi = async(formData, token, dispatch, setPosts, setImage, setPost) => {
  try {
      const response = await axios.post(
        `${BASE_URL}/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const posts = response.data;
      dispatch(setPosts({posts}));
      setImage(null);
      setPost('');
    
    } catch (error) {
      console.error('There was a problem with the Axios request:', error);
    }
    
};

const getPostsApi = async (token, dispatch, setPosts) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    dispatch(setPosts({ posts: data }));
  } catch (error) {
    console.error('There was a problem with the Axios request:', error);
  }
};

const patchLikeApi = async (postId, loggedInUserId, token, dispatch, setPost) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/posts/${postId}/like`,
      { userId: loggedInUserId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const updatedPost = response.data;
    dispatch(setPost({ post: updatedPost }));
  } catch (error) {
    console.error('There was a problem with the Axios request:', error);
  }
};

const getUserApi = async (userId, token, setUser) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    setUser(data);
  } catch (error) {
    console.error('There was a problem with the Axios request:', error);
  }
};

  export {patchFriendApi, registerApi, loginApi, getFriendsApi, createPostApi, getPostsApi, patchLikeApi, getUserApi}