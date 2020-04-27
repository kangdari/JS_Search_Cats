class SearchInput {
    data = [];
    onSearch = null;
    searched_words = [];
    
    constructor({$app, onSearch}){

        const header = document.createElement('header');
        const $searchInput = document.createElement('input');
        const $searchedWords = document.createElement('div');

        this.toggleBtn = document.createElement('input');
        this.toggleBtn.type = "checkbox";
        this.toggleBtn.addEventListener('click',(e) => this.changeTheme(e));
    
        $searchInput.className = "searchInput";
        $searchInput.placeholder = "Search Cat's name or breed...";
        $searchedWords.className = "searchedWords";
        // Event Delegation
        $searchedWords.addEventListener('click', (e) => {
            if(e.target.nodeName === "SPAN"){
                onSearch(e.target.innerText);
            }
        })

        header.appendChild(this.toggleBtn);
        header.appendChild($searchInput);
        header.appendChild($searchedWords);
        $app.appendChild(header);

        $searchInput.focus();

        // 이벤트 리스너 등록
        $searchInput.addEventListener('keypress', (e) => {
            const keyword = e.target.value;
            if(e.keyCode === 13){ // enter
                if(e.target.value){
                    onSearch(keyword); 
                    // 최근 검색어 배열에 추가
                    this.searched_words.push(keyword);
                    $searchInput.value = "";

                    // $searchedWords 리셋
                    while($searchedWords.firstChild){
                        $searchedWords.removeChild($searchedWords.firstChild);
                    }
                    // 최근 검색어 5개만 출력
                    this.searched_words.slice(-5).forEach(txt => {
                        const word = document.createElement('span');
                        word.innerText = txt;
                        $searchedWords.appendChild(word);
                    })
                }
                else{
                    console.log('검색어 입력');
                }
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

    render() { }

}