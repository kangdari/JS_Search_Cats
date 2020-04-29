class SearchResult {
    data = [];
    loading = false;
    onClick = null;

    constructor({ $app, initialData, onClick}){

        const section = document.createElement('main');
        this.$searchResult = document.createElement('section');
        this.$searchResult.className = "searchResult";

        // event Delegation 기법을 사용하여 이벤트 리스너 등록
        this.$searchResult.addEventListener('click', (e)=> {
            if(e.target.tagName === "IMG"){
                this.onClick(e.target.id);
            }
        })    

        section.appendChild(this.$searchResult);
        $app.appendChild(section);
        
        this.data = initialData;
        this.onClick = onClick;

        // LS에서 저장된 데이터가 있는지 확인하고 렌더링
        this.get_LS_Data();

        console.log('Created SearchResult', this);
    }

    get_LS_Data(){
        const data = JSON.parse(localStorage.getItem("data"));
        if(data) {
            this.setState({
                loading: false,
                data,
            })
        }
    }

    setState(nextData){
        this.data = nextData.data;
        this.loading = nextData.loading;
        this.render(); // image 렌더링
    }

    render() {
        // 로딩 중 ...
        if(this.loading){
            this.$searchResult.innerHTML = `
                <div>Loading...</div>
            `
        }

        // 검색 결과가 없을 때.
        if(!this.loading && !this.data.length){
            this.$searchResult.innerHTML = `
                <div>검색 결과가 없습니다.</div>
            `
        }

        // 로딩이 끝나고 검색 결과가 있을 때.
        if(!this.loading && !!this.data.length){
            this.$searchResult.innerHTML = this.data.map(cat => {
                const { id, url, name} = cat;
                return `
                    <article class="item"><img id=${id} src="${url}" alt="${name}"/></article>
                `}).join('')

        }
    }
}