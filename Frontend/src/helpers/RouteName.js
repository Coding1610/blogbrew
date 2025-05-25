export const RouteIndex = '/';
export const RouteSignIn = '/sign-in'
export const RouteSignUp = '/sign-up'
export const RouteProfile = '/profile'
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