const API_POINT = 
    "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {

    // 고양이 검색 api
    fetchCats : async (keyword) => {
        try{
            const data = await fetch(`${API_POINT}/api/cats/search?q=${keyword}`);
            return data.json();
        }catch(err){
            console.log(err);
        }
    },

    // 고양이 상세 검색 api
    fetchCat : async (id) => {
        try{
            const data = await fetch(`${API_POINT}/api/cats/${id}`);
            return data.json();    
        }catch(err){
            console.log(err);
        }
    },

    // 고양이 랜덤 검색 api
    fetchRandomCats : async () => {
        try{
            const data = await fetch(`${API_POINT}/api/cats/random50`);
            return data.json();    
        }catch(err){
            console.log(err);
        }
    }
}