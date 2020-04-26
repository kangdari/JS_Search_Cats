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
    
    >
    prefers-color-scheme 값은 dark, light 두 가지가 있으며, 브라우저의 모드에 따라서 미디어퀴리가 적용됨.
    ```
    @media (prefers-color-scheme: dark){
    body{
        color: #ffffff;
        background: #000000;
        }
    }
    ```

    * 기본적으로는 OS의 다크모드의 활성화 여부를 기반으로 동작하게 하되, 유저가 토글링 할 수 있도록 좌측 상단에 해당 기능을 토글하는 체크박스를 만듭니다.

    >
    checkbox 버튼을 생성자에서 생성하고 changeTheme 이벤트를 등록함.
    ```
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
    ```
