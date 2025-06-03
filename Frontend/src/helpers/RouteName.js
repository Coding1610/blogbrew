export const RouteIndex = '/';
export const RouteSignIn = '/sign-in'
export const RouteSignUp = '/sign-up'
export const RouteProfileUser = '/user/profile'
export const RouteProfileAdmin = '/admin/profile'
export const RouteCateDetails = '/categories'
export const RouteAddCate = '/categories/add'
export const RouteEditCate = (cate_id) => {
    if(cate_id){
        return `/categories/edit/${cate_id}`;
    }
    else{
        return `/categories/edit/:cate_id`;
    }
};
export const RouteBlog = '/blog';
export const RouteBlogAdd = '/blog/add';
export const RouteBlogEdit = (blog_id) => {
    if(blog_id){
        return `/blog/edit/${blog_id}`;
    }
    else{
        return `/blog/edit/:blog_id`;
    }
}
export const RouteBlogDetails = (category, blog) => {
    if(!category || !blog){
        return '/blog/:category/:blog';
    }
    else{
        return `/blog/${category}/${blog}`;
    }
}
export const RouteBlogByCategory = (category) => {
    if(!category){
        return '/blog/:category/';
    }
    else{
        return `/blog/${category}`;
    }
}
export const RouteSearch = (q) => {
    if(q){
        return `/blog-search?q=${q}`;
    }
    else{
        return '/blog-search';
    }
}
export const RouteGetComments = '/get-all-comments';
export const RouteGetAllUsers = "/get-all-users";

// Client Side
export const RouteGetMyBlogs = '/blog/my-blogs';
export const RouteMyBlogsComments = '/comment/my-blogs-comments';
export const RouteCommentsByMe = '/comment/comments-by-me';

// 404 Not Found
export const RouteNotFound = '*';