const API_POINT = 
    "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {

    // 고양이 검색 api
    fetchCats : (keyword) => {
        return fetch(`${API_POINT}/api/cats/search?q=${keyword}`).then(res => res.json())
    },

    // 고양이 상세 검색 api
    fetchCat : (id) => {
        return fetch(`${API_POINT}/api/cats/${id}`).then(res => res.json());
    }

}