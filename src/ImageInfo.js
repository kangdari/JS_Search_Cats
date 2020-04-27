class ImageInfo {
    data = []; // 상세 데이터 
    
    constructor({ initialData }){

        const main = document.querySelector('main');
        this.$imageInfo = document.createElement('section');
        this.$imageInfo.classList.add("imageInfo");

        this.data = initialData;

        main.appendChild(this.$imageInfo);

        this.render();
        console.log('Created ImageInfo', this);
    }

    setState(nextData){
        this.data = nextData;
        this.render();
    }

    render() {

        if(this.data.visible){
            const { id, name, origin, temperament, url } = this.data.data;

            this.$imageInfo.innerHTML = `
                <div class="content_wrapper">
                    <div class="title">${name}</div>
                    <img src="${url}" arl="cat_Image" />
                    <div class="content">
                        <p>출생: ${origin}</p>
                        <p>성격: ${temperament}</p>
                    </div>
                </div>
            `
            this.$imageInfo.classList.add('visible');
        }else{
            this.$imageInfo.classList.remove('visible');
        }


    }
}
