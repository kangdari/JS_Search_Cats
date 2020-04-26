class SearchResult {
    data = [];
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
        this.data = nextData;
        this.render(); // image 렌더링
    }

    render() {
        if(this.data){
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