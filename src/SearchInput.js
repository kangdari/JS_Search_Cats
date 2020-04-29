class SearchInput {
    data = [];
    onSearch = null;
    searched_words = [];
    keyword = '';
    
    constructor({ $app, onSearch, onRandomSearch }){

        const header = document.createElement('header');
        this.$searchInput = document.createElement('input');
        const searchWrapper = document.createElement('div');
        this.$searchedWords = document.createElement('div');

        searchWrapper.className = "searchWrapper";

        this.toggleBtn = document.createElement('input');
        this.toggleBtn.type = "checkbox";
        this.toggleBtn.addEventListener('click',(e) => this.changeTheme(e));

        // 랜덤 검색 버튼 생성 및 이벤트 리스너 등록
        this.randomBtn = document.createElement('button');
        this.randomBtn.className = "randomBtn";
        this.randomBtn.innerText = "Random"
        this.randomBtn.addEventListener('click', () => onRandomSearch() )

        this.onSearch = onSearch;

        this.$searchInput.className = "searchInput";
        this.$searchInput.placeholder = "Search Cat's name or breed...";
        this.$searchedWords.className = "searchedWords";
        // Event Delegation, 검색어 목록에서 클락하여 검색하기.
        this.$searchedWords.addEventListener('click', (e) => {
            if(e.target.nodeName === "SPAN"){
                onSearch(e.target.innerText);
                this.save_searched_words(e.target.innerText);
            }
        })

        header.appendChild(this.toggleBtn);
        searchWrapper.appendChild(this.$searchInput);
        searchWrapper.appendChild(this.randomBtn);

        header.appendChild(searchWrapper);
        header.appendChild(this.$searchedWords);
        $app.appendChild(header);

        this.$searchInput.focus();

        // 이벤트 리스너 등록
        this.$searchInput.addEventListener('keypress', (e) => {
            this.keyword = e.target.value;
            if(e.keyCode === 13){ // enter
                if(e.target.value){
                    // 검색
                    onSearch(this.keyword); 
                    // 최근 검색어 저장
                    this.save_searched_words(this.keyword);
                }
                else{
                    console.log('검색어 입력');
                }
            }
        })

        this.get_LS_Data();

        window.addEventListener('scroll', () => this.onScrollSearch() );

        console.log('Created SearchInput', this);
    }

    // 스크롤 검색 함수
    // 가장 최근 검색어를 키워드로 검색
    onScrollSearch() {
        let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
        let windowHeight = window.innerHeight; // 스크린 창
        let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x

        if(scrollLocation + windowHeight >= fullHeight + 32){
            const keyword = this.searched_words[this.searched_words.length-1];
            api.fetchCats(keyword).then(({ data }) => {
                if(data){
                    const $searchResult = document.querySelector('.searchResult');
                    $searchResult.innerHTML += data.map(cat => 
                        `<article class="item"><img id=${cat.id} src=${cat.url} alt=${cat.name}/></article>`    
                    ).join('');
                }
            })
        }
    }

    // 최근 검색어를 저장하고 렌더링하는 함수
    save_searched_words(keyword){
        // 최근 검색어 배열에 추가
        this.searched_words.push(keyword);
        // LS에 검색어 배열 저장
        localStorage.setItem("LS_searched_words", JSON.stringify(this.searched_words));
        this.$searchInput.value = "";
        // $searchedWords 리셋
        while(this.$searchedWords.firstChild){
            this.$searchedWords.removeChild(this.$searchedWords.firstChild);
        }
        // 최근 검색어 목록 렌더링
        this.print_searched_words(this.searched_words);
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