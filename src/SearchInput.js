class SearchInput {
    data = [];
    onSearch = null;
    searched_words = [];
    
    constructor({$app, onSearch}){

        const header = document.createElement('header');
        const $searchInput = document.createElement('input');
        this.$searchedWords = document.createElement('div');

        this.toggleBtn = document.createElement('input');
        this.toggleBtn.type = "checkbox";
        this.toggleBtn.addEventListener('click',(e) => this.changeTheme(e));
    
        $searchInput.className = "searchInput";
        $searchInput.placeholder = "Search Cat's name or breed...";
        this.$searchedWords.className = "searchedWords";
        // Event Delegation
        this.$searchedWords.addEventListener('click', (e) => {
            if(e.target.nodeName === "SPAN"){
                onSearch(e.target.innerText);
            }
        })

        header.appendChild(this.toggleBtn);
        header.appendChild($searchInput);
        header.appendChild(this.$searchedWords);
        $app.appendChild(header);

        $searchInput.focus();

        // 이벤트 리스너 등록
        $searchInput.addEventListener('keypress', (e) => {
            const keyword = e.target.value;
            if(e.keyCode === 13){ // enter
                if(e.target.value){
                    // 검색
                    onSearch(keyword); 
                    // 최근 검색어 배열에 추가
                    this.searched_words.push(keyword);
                    // LS에 검색어 배열 저장
                    localStorage.setItem("LS_searched_words", JSON.stringify(this.searched_words));
                    $searchInput.value = "";
                    // $searchedWords 리셋
                    while(this.$searchedWords.firstChild){
                        this.$searchedWords.removeChild(this.$searchedWords.firstChild);
                    }
                    // 최근 검색어 목록 렌더링
                    this.print_searched_words(this.searched_words);
                }
                else{
                    console.log('검색어 입력');
                }
            }
        })
        this.get_LS_Data();
        console.log('Created SearchInput', this);
    }
    
    // localStorage에서 searched_words 가져와 렌더링
    get_LS_Data(){
        const words = JSON.parse(localStorage.getItem("LS_searched_words"));
        if(words){
            this.searched_words = words;
            this.print_searched_words(words);
        }
    }    
    // 최근 검색어 목록 렌더링 함수 (5개)
    print_searched_words(words){
        words.slice(-5).forEach(txt => {
            const word = document.createElement('span');
            word.innerText = txt;
            this.$searchedWords.appendChild(word);
        })
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