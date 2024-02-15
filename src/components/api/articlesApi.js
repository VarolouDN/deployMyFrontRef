export const API_URL = "http://localhost:5000/api/article";

export async function getArticles() {
  const res = await fetch(`${API_URL}/articles`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting articles");

  const data = await res.json();

  return data;
}

export async function getArticle(id) {
  const res = await fetch(`${API_URL}/articles/${id}`);
  if (!res.ok) throw Error(`Couldn't find article with id #${id}`);

  const data = await res.json();
  console.log(data);
  return data;
}

export async function createArticleApi(article) {
  try {
    // console.log(formData);

    console.log(article);
    const res = await fetch(`${API_URL}/create`, {
      method: "POST",
      // body: formData,
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json",
        //   'Content-Type':'multipart/form-data'
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    console.log(data);

    return data;
  } catch {
    throw Error("Failed creating your article");
  }
}
//=====================================================================//

export async function updateArticleApi(updatedObj, _id) {
  try {
    const res = await fetch(`${API_URL}/articles/${_id}`, {
      method: "PUT",
      body: JSON.stringify(updatedObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your article");
  }
}

export async function deleteArticleApi(_id, userId) {
  try {
    const res = await fetch(`${API_URL}/articles/${_id}?userId=${userId}`, {
      method: "DELETE",
      // body: JSON.stringify(_id,userId),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(_id, userId);

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    console.log(err.message);
    throw Error("Failed deleting your article");
  }
}
