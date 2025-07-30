// const client = require('./client')
import client from "./client";

export const frontImage = async (userData) => {
    console.log(userData)
    try {
        const data  = await client.post('/frontImage', userData);
        return data;
      } catch (error) {
        return { error };
      }
  };

  export const StoryBillBoardImage = async (userData) => {
    console.log(userData)
    try {
        const data  = await client.post('/StoryImage', userData);
        return data;
      } catch (error) {
        return { error };
      }
  };

  export const getFrontImage = async () => {
    try {
        const {data}  = await client.get('/getImage');
        return data;
      } catch (error) {
        return { error };
      }
  };

  export const getStoryBillBoardImage = async () => {
    try {
        const {data}  = await client.get('/getStoryImage');
        return data;
      } catch (error) {
        return { error };
      }
  };

  export const getTotalUsers = async () => {
    try {
        const {data}  = await client.get('/Total-users-data');
        return data;
      } catch (error) {
        return { error };
      }
  };

  export const getCaseById = async (postId) => {
    try {
        const {data}  = await client.get(`/post-details/${postId}`);
        return data;
      } catch (error) {
        return { error };
      }
  };

  export const getStoryById = async (storyId) => {
    try {
        const {data}  = await client.get(`/story-details/${storyId}`);
        return data;
      } catch (error) {
        return { error };
      }
  };

  
  export const getQuestionById = async (postId) => {
    try {
        const {data}  = await client.get(`/question-details/${postId}`);
        return data;
      } catch (error) {
        return { error };
      }
  };

  export const deleteFrontImage = async (postId) => {
    try {
        const data  = await client.delete(`/delete-frontImage/${postId}`);
        return data;
      } catch (error) {
        return { error };
      }
  };

  export const deleteStoryBillboardImage = async (postId) => {
    try {
        const data  = await client.delete(`/delete-StoryImage/${postId}`);
        return data;
      } catch (error) {
        return { error };
      }
  };

  export const DeleteUser = async (userId) => {
    try {
        const data  = await client.delete(`/delete-user/${userId}`);
        return data;
      } catch (error) {
        return { error };
      }
  };

  export const createCase = async (post) => {
    try {
      const create = await client
        .post("/case", post)
      return create;
    } catch (error) {
      return { error };
    }
  };

  export const recentCases = async () => {
    try {
      const { data } = await client.get("/All-case");
      return data;
    } catch (error) {
      return { error };
    }
  };

  export const getComments = async (postId) => {
    // console.log("posts id", postId);
    try {
      const { data } = await client.get(`/get-comments/${postId}`);
      return data;
    } catch (error) {
      return { error };
    }
  };

  export const getAllComments = async () => {
    try {
      const { data } = await client.get(`/get-comments`);
      return data;
    } catch (error) {
      return { error };
    }
  };

  export const getStory = async () => {
    try {
      const { data } = await client.get("/stories");
      return data;
    } catch (error) {
      return { error };
    }
  };

  export const addComment = async(userData)=>{
    try {
      const create = await client
        .post("/addComment", userData)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "ok") {
            alert("comment added");
          } else {
            alert(JSON.stringify(response.data));
          }
        })
        .catch((error) => console.log({ error }));
  
      return create;
    } catch (error) {
      return { error };
    }
  }

  export const addReply = async(userData)=>{
    try {
      const create = await client
        .put("/reply", userData)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "ok") {
            alert("reply added");
          } else {
            alert(JSON.stringify(response.data));
          }
        })
        .catch((error) => console.log({ error }));
  
      return create;
    } catch (error) {
      return { error };
    }
  }

  export const deleteComment = async(commentId)=>{
    try {
      const create = await client
        .delete(`/delete-comment/${commentId}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "ok") {
            alert("comment deleted");
          } else {
            alert(JSON.stringify(response.data));
          }
        })
        .catch((error) => console.log({ error }));
  
      return create;
    } catch (error) {
      return { error };
    }
  }

  export const getQuestions = async () => {
    try {
      const { data } = await client.get("/get-admin-questions");
      return data;
    } catch (error) {
      return { error };
    }
  };

  export const getThreads = async (pageNumber = 1, THREAD_LIMIT = 5) => {
    try {
      const response = await client.get(
        `/get-threads?page=${pageNumber}&limit=${THREAD_LIMIT}`
      );
      return response.data.threads;
    } catch (error) {
      return { error };
    }
  };

  export const getThreadsById = async (postId) => {
    try {
      const response = await client.get(
        `/thread-details/${postId}`
      );
      return response.data.threads;
    } catch (error) {
      return { error };
    }
  };