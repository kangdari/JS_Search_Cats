class SearchInput {
    data = [];
    onSearch = null;
    
    constructor({$app, onSearch}){

        const header = document.createElement('header');
        const $searchInput = document.createElement('input');
    
        $searchInput.className = "searchInput";
        $searchInput.placeholder = "Search Cats name or breed..."

        header.appendChild($searchInput);
        $app.appendChild(header);

        // this.onSearch = onSearch;

        // 이벤트 리스너 등록
        $searchInput.addEventListener('keypress', (e) => {
            const keyword = e.target.value;
            if(e.keyCode === 13){ // enter
                onSearch(keyword); 
            }
        })

        console.log('Created SearchInput', this);
    }

    render() {}
}