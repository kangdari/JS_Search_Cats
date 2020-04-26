const API_POINT = 
    "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {

    // 고양이 검색 api
    fetchCats : (keyword) => {
        return fetch(`${API_POINT}/api/cats/search?q=${keyword}`).then(res => res.json())
    }

}