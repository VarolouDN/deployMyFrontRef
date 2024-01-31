export const setArticles = (payload) => {
  return {
    type: "SET_ARTICLES",
    payload,
  };
};

export const setCurrentArticle = (payload) => {
  return {
    type: "SET_CURRENT_ARTICLE",
    payload,
  };
};

export const getArticles = () => (dispatch) => {
  fetch("http://localhost:5000/api/article/articles")
    .then((response) => response.json())
    .then((data) => {
      dispatch(setArticles(data));
      console.log(data);
    })
    .catch((e) => console.log(e));
};

// export function createArticle(title, name, id, text, navigate) {
//   return async function (dispatch) {
//     try {
//       const res = await fetch("http://localhost:5000/api/article/create", {
//         method: "post",
//         body: JSON.stringify({
//           title: title,
//           name: name,
//           userId: id,
//           text: text,
//         }),
//         headers: {
//           "content-type": "application/json",
//           "Access-Control-Allow-Origin": "http://localhost:3000",
//         },
//       });
//
//       const data = await res.json();
//       console.log(data.message);
//       if (data.success) {
//         alert(data.message);
//         navigate("/articles");
//       } else alert(data.message);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
// }

export function updateArticle(title, name, userId, text, _id, navigate) {
  return async function (dispatch) {
    try {
      const res = await fetch(
        `https://localhost:5000/api/article/articles/${_id}`,
        {
          method: "PUT",
          body: JSON.stringify({ title, name, userId, id: _id, text }),
          headers: {
            "content-type": "application/json",
            // 'Access-Control-Allow-Origin': 'http://localhost:3000'
          },
        }
      );

      const data = await res.json();
      console.log(data.message);
      if (data.success) {
        alert(data.message);
        navigate("/articles");
      } else alert(data.message);
    } catch (e) {
      console.log(e.message);
    }
  };
}
export function deleteArticle(userId, _id, navigate) {
  return async function (dispatch) {
    try {
      const res = await fetch(
        `http://localhost:5000/api/article/articles/${_id}?userId=${userId}`,
        {
          method: "DELETE",
          //  body: JSON.stringify({ title, name, userId,id:_id ,text}),
          headers: {
            "content-type": "application/json",
            // 'Access-Control-Allow-Origin': 'http://localhost:3000'
          },
        }
      );

      const data = await res.json();
      console.log(data.message);
      if (data.success) {
        alert(data.message);
        navigate("/articles");
      } else alert(data.message);
    } catch (e) {
      console.log(e.message);
    }
  };
}
