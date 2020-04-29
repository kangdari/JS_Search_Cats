# Programmers Challenge Search_Cats with VanillaJS

## 개요 

![main](./img/main.JPG)

3월 14일에 진행했던 프로그래머스 챌린지입니다. 그 당시 해결하지 못했던 부분과 개인적으로 보완하고자 하는 내용들을
추가하여 Search_Cats 웹 페이지를 제작했습니다.

## 과제 설명
* thecatapi 에서 크롤링한 데이터를 이용해 이미지를 검색하는 베이스 코드가 주어집니다.
* 베이스 코드는 모두 ES6 클래스 기반으로 작성되어 있으며, 이 코드에는 여러 개의 버그가 존재합니다. 요구사항을 잘 읽고, 버그를 하나씩 해결해주세요.

## 수행 기술
* JavaScript(ES6)
* 외부 라이브러리 사용 x

## 요구 사항

### HTML, CSS

* `<div>`로만 구성되어있는 마크업을 시멘틱한 방법으로 변경

    >* header 태그 - searchInput(검색창), 최근 검색어 목록, 화면 모드 토글 버튼
    >* main 태그 - 주 내용들이 위치함. 
    >* section 태그 - main 태그 내부에 위치하며 searchResult, imageInfo. 총 2개
    >* article 태그 - 각 고양이 이미지
    

* 유저가 사용하는 디바이스의 가로 길이에 따라 검색결과의 row 당 column 갯수를 적절히 변경해주어야 합니다.

    >
    ```
    /* 992px 이하 3개*/
    @media (max-width : 992px){
        section .searchResult{
            grid-template-columns: repeat(3, minmax(250px, 1fr));
        }
    }
    /* 768px 이하 적용 2개 */
    @media (max-width : 768px){
        section .searchResult{
            grid-template-columns: repeat(2, minmax(250px, 1fr));
        }
    }
    /* 576px 이하 적용 1개 */
    @media (max-width : 576px){
        section .searchResult{
            grid-template-columns: repeat(1, minmax(250px, 1fr));
        }
    }
    ```

* 다크 모드(Dark mode)를 지원하도록 CSS를 수정해야 합니다.
    * 모든 글자 색상은 `#FFFFFF` , 배경 색상은 `#000000` 로 한정합니다. 
        prefers-color-scheme 값은 dark, light 두 가지가 있으며, 브라우저의 모드에 따라서 미디어퀴리가 적용됨.
    >
    ```
    @media (prefers-color-scheme: dark){
    body{
        color: #ffffff;
        background: #000000;
        }
    }
    ```

    * 기본적으로는 OS의 다크모드의 활성화 여부를 기반으로 동작하게 하되, 유저가 토글링 할 수 있도록 좌측 상단에 해당 기능을 토글하는 체크박스를 만듭니다.
        * checkbox 버튼을 생성자에서 생성하고 changeTheme 이벤트를 등록함.
        * 기본 모드가 다크모드, 화이트 모드 어떤 것이든 토글링을 통해 모드 변경을 할 수 있도록 변경함.
    >
    ```
    changeTheme(e) {
        const body = document.querySelector('body');

        if(e.target.checked){
            // 기본 모드가 dark mode
            if(window.matchMedia("(prefers-color-scheme: dark)").matches){
                body.classList.toggle('light_mode');
            // 기본 모드 ligth mode
            }else{
                body.classList.toggle('dark_mode');
            }
        }else{
            if(window.matchMedia("(prefers-color-scheme: dark)").matches){
                body.classList.toggle('light_mode');
            }else{
                body.classList.toggle('dark_mode');
            }
        }
    }
    ```

### 이미지 상세 보기 모달 관련

* 디바이스 가로 길이가 768px 이하인 경우, 모달의 가로 길이를 디바이스 가로 길이만큼 늘려야 합니다.
    ```
    @media (max-width : 768px){
        ...
        .content_wrapper{
            width: 100%;
        }
    }
    ```

* **`필수`** 이미지를 검색한 후 결과로 주어진 이미지를 클릭하면 모달이 뜨는데, 모달 영역 밖을 누르거나 / 키보드의 ESC 키를 누르거나 / 모달 우측의 닫기(x) 버튼을 누르면 닫히도록 수정해야 합니다.
    * 모달 영역 밖
    ```
        this.$imageInfo.addEventListener('click' , (e) => {
            if (e.target.className === "imageInfo") {
                this.onClose(); // visible => false
            }
        })
    ```
    * 키보드의 ESC
    ```
        document.addEventListener('keydown', (e) => {
            if(this.$imageInfo.style.display === "block" && e.keyCode === 27){
                this.onClose(); // visible => false
            }
        })
    ```

    * 모달 우측(x) 버튼 클릭
    ```
        document.querySelector('.close_btn').addEventListener('click', () => this.onClose() )
    ```

### 검색 페이지 관련

* 페이지 진입 시 포커스가 `input` 에 가도록 처리하고, 키워드를 입력한 상태에서 `input` 을 클릭할 시에는 기존에 입력되어 있던 키워드가 삭제되도록 만들어야 합니다.
    * $searchInput 요소를 추가한 다음 `$searchInput.focus()` 처리

* **`필수`** 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 유저에게 알리는 UI를 추가해야 합니다.
    * 검색 api를 호출하는 onSearch, onClick 함수에서 api를 호출하기 전의 loading 상태 값과 api 호출 후 loading 상태 값을 각각의 인스턴스에 전달.
    * 인스턴스에서는 loading의 상태 값에 따라 렌더링될 수 있도록 코드 작성.

    * App.js
    ```
        this.searchInput = new SearchInput({
            $app,
            onSearch: (keyword) => {
                // 로딩 시작
                this.setState({
                    data: null,
                    loading: true,
                })
                // 로딩 끝
                api.fetchCats(keyword).then(({data}) => this.setState({
                    data,
                    loading: false,
                }));
            }
        }),
    ```
    * SearchResult.js
    ```
        render() {
        // 로딩 중 ...
        if(this.loading){
            this.$searchResult.innerHTML = `
                <div>Loading...</div>
            `
        }
        ...
    ```


* **`필수`** 검색 결과가 없는 경우, 유저가 불편함을 느끼지 않도록 UI적인 적절한 처리가 필요합니다.
    * 검색 데이터가 없을 경우 빈 배열을 반환합니다. render() 함수 내부에서 검색 결과 배열을 체크하여 분기 처리해주었습니다.
    ```
    // 검색 결과가 없을 때.
    if(!this.loading && !this.data.length){
        this.$searchResult.innerHTML = `
            <div>검색 결과가 없습니다.</div>
        `
    }

    // 로딩이 끝나고 검색 결과가 있을 때.
    if(!this.loading && !!this.data.length){
        ...
    }
    ```

* 최근 검색한 키워드를 `SearchInput` 아래에 표시되도록 만들고, 해당 영역에 표시된 특정 키워드를 누르면 그 키워드로 검색이 일어나도록 만듭니다. 단, 가장 최근에 검색한 5개의 키워드만 노출되도록 합니다.
    * 검색 이벤트가 발생하면 검색어를 searched_words 배열에 추가하고 그 배열을 사용하여 렌더링하고, $searchedWords에 이벤트 리스너 등록(event delegation 기법 사용).

* 페이지를 새로고침해도 마지막 검색 결과 화면이 유지되도록 처리합니다.
    * 브라우저의 LocalStorage에 검색 결과와 최근 검색어 목록(searched_words)를 저장하고 새로고침 시 각 클래스의 생성자에서 LocalStorage에서 저장해둔 item 값을 가져와 값이 존재하면 렌더링할 수 있도록 코드 작성.

* **`필수`** SearchInput 옆에 버튼을 하나 배치하고, 이 버튼을 클릭할 시 `/api/cats/random50` 을 호출하여 화면에 뿌리는 기능을 추가합니다. 버튼의 이름은 마음대로 정합니다.
    * fetchRandomCats 랜덤 검색 api 함수를 작성하고 이 함수를 호출하는 onRandomSearch() 함수를 SearchInput의 인스턴스로 전달합니다. SearchInput 클래스의 생성자에서 생성한 랜덤 버튼의 이벤트 리스너로 onRandomSearch()를 등록함.

* lazy load 개념을 이용하여, 이미지가 화면에 보여야 할 시점에 load 되도록 처리해야 합니다.

### 스크롤 페이징 구현
* 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그 다음 페이지를 로딩하도록 만들어야 합니다.
    * 다음 페이지를 로딩하는 api를 몰라 스크롤 이벤트 발생 시 최근 검색어로 검색을 수행하고 결과를 이어서 렌더링 하도록 작성했습니다.

### 코드 구조 관련

* ES6 module 형태로 코드를 변경합니다.
    * `webpack` , `parcel` 과 같은 번들러를 사용하지 말아주세요.
        모르겠다..

    * 해당 코드 실행을 위해서는 `http-server` 모듈을(로컬 서버를 띄우는 다른 모듈도 사용 가능) 통해 `index.html` 을 띄워야 합니다.
        `npm install http-server` 설치 후 index.html이 위치한 경로에서 `http-server ./` 명령어 실행

* API fetch 코드를 `async` , `await` 문을 이용하여 수정해주세요. 해당 코드들은 에러가 났을 경우를 대비해서 적절히 처리가 되어있어야 합니다.

* **`필수`** API 의 status code 에 따라 에러 메시지를 분리하여 작성해야 합니다. 아래는 예시입니다.

    ```
    fetchCats : (keyword) => {
        return fetch(`${API_POINT}/api/cats/search?q=${keyword}`).then(res => res.json())
    },
    ```
    위 코드를 아래 코드로 변경했고 try-catch문을 사용하여 에러 처리를 했습니다.
    ```
    // async, await를 사용.
    fetchCats : async (keyword) => {
        try{
            const data = await fetch(`${API_POINT}/api/cats/search?q=${keyword}`);
            return data.json();
        }catch(err){
            console.log(err);
        }
    },
    ```

* SearchResult 에 각 아이템을 클릭하는 이벤트를 Event Delegation 기법을 이용해 수정해주세요.
    * img item들의 부모 요소인 $searchResult에 이벤트 리스너를 등록하고 콜백 함수에서 분기 처리를 통해 이미지가 클릭되었을 때만 검색이 이루어지도록 작성했습니다.
    ```
    this.$searchResult.addEventListener('click', (e)=> {
        if(e.target.tagName === "IMG"){
            this.onClick(e.target.id);
        }
    })    
    ```

* 컴포넌트 내부의 함수들이나 Util 함수들을 작게 잘 나누어주세요.


## 느낀점






