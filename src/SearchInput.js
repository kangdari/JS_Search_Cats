class SearchInput {
    data = [];
    onSearch = null;
    
    constructor({$app, onSearch}){

        const header = document.createElement('header');
        const $searchInput = document.createElement('input');

        this.toggleBtn = document.createElement('input');
        this.toggleBtn.type = "checkbox";
        this.toggleBtn.addEventListener('click',(e) => this.changeTheme(e));
    
        $searchInput.className = "searchInput";
        $searchInput.placeholder = "Search Cats name or breed...";

        header.appendChild(this.toggleBtn);
        header.appendChild($searchInput);
        $app.appendChild(header);

        $searchInput.focus();

        // 이벤트 리스너 등록
        $searchInput.addEventListener('keypress', (e) => {
            const keyword = e.target.value;
            if(e.keyCode === 13){ // enter
                onSearch(keyword); 
            }
        })

        console.log('Created SearchInput', this);
    }

    // light, black 모드 설정
    changeTheme(e) {
        const body = document.querySelector('body');
        // black mode
        if(e.target.checked){
            body.classList.toggle('light_mode');
        // light mode
        }else{
            body.classList.toggle('light_mode');
        }
    }

    render() {}
}