class SearchResult {
    data = [];
    loading = false;
    onClick = null;

    constructor({ $app, initialData, onClick}){

        const section = document.createElement('main');
        this.$searchResult = document.createElement('section');
        this.$searchResult.className = "searchResult";

        section.appendChild(this.$searchResult);
        $app.appendChild(section);
        
        this.data = initialData;
        this.onClick = onClick;

        console.log('Created SearchResult', this);
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
        // 각 item마다 고양이 상세 정보 불러오기 이벤트 설정
        document.querySelectorAll(".item").forEach(cat => 
            cat.addEventListener('click', (e)=> this.onClick(e.target.id) ))

        console.log('rendering')
    }
}