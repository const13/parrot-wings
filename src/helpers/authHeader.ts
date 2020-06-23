export function authHeader() {
    let token = localStorage.getItem('id_token') || '';

    return { 'Authorization': 'Bearer ' + token };
}