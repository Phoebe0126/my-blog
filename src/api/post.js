import { http } from './http'

// 发表一篇新的文章
export const createNewArticle = data => http('/posts/create', 'POST', data)

// 获取所有或某个用户的所有文章
export const getPosts = params => http('/posts', 'GET', params)

// 获取某篇文章详情
export const getPostById = postId => http( `/posts/${postId}`, 'GET')

// 删除某篇文章
export const deletePostById = postId => http(`/posts/${postId}`, 'DELETE')

// 获取某篇原始的文章
export const getRawPostById = postId => http(`/posts/raw/${postId}`, 'GET')

// 修改文章
export const editPost = (postId, data) => http(`/posts/edit/${postId}`, 'POST', data)