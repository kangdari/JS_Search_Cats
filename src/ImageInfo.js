class ImageInfo {
    data = []; // 상세 데이터 
    onClose = null;

    constructor({ initialData, onClose }){

        const main = document.querySelector('main');
        this.$imageInfo = document.createElement('section');
        this.$imageInfo.className = "imageInfo";

        this.data = initialData;
        this.onClose = onClose;

        // 모달 밖 클릭
        this.$imageInfo.addEventListener('click' , (e) => {
            if (e.target.className === "imageInfo") {
                this.onClose();
            }
        })

        // ESC
        document.addEventListener('keydown', (e) => {
            if(this.$imageInfo.style.display === "block" && e.keyCode === 27){
                this.onClose();
            }
        })

        main.appendChild(this.$imageInfo);

        this.render();
        console.log('Created ImageInfo', this);
    }

    setState(nextData){
        this.data = nextData;
        console.log(this.data)
        this.render();
    }

    render() {
        if(this.data.visible){
            this.$imageInfo.style.display = "block";

            const { name, origin, temperament, url } = this.data.data;

            this.$imageInfo.innerHTML = `
                <div class="content_wrapper">
                    <div class="title">
                        <span>${name}</span>
                        <button class="close_btn">X</button>
                    </div>
                    <img src="${url}" arl="cat_Image" />
                    <div class="content">
                        <p>출생: ${origin}</p>
                        <p>성격: ${temperament}</p>
                    </div>
                </div>
            `
            // X 버튼 클릭
            document.querySelector('.close_btn').addEventListener('click', () => this.onClose() )

        }else{
            this.$imageInfo.style.display = "none";
        }



    }
}
