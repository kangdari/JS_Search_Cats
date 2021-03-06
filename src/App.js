console.log('App is running!!!')

class App{
    data = [];
    $app = null;

    constructor($app){
        this.$app = $app;

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
            },
            // 랜덤 검색 함수
            onRandomSearch: () => {
                // 로딩 시작
                this.setState({
                    data: null,
                    loading: true
                })
                // 로딩 끝
                api.fetchRandomCats().then(({ data }) => this.setState({
                    data,
                    loading: false
                }))
            }
        }),

        this.serachResult = new SearchResult({
            $app,
            initialData : this.data,
            onClick: (id) => {
                // 로딩 시작
                this.imageInfo.setState({
                    loading: true,
                });

                // 로딩 끝
                api.fetchCat(id).then(({data}) => this.imageInfo.setState({
                    visible: true,
                    loading: false,
                    data
                }));
            }
        }),

        this.imageInfo = new ImageInfo({
            initialData: {
                visible: false,
                data: null
            },
            onClose: () => {
                this.imageInfo.setState({
                    visible: false,
                })
            }
        })
    }

    setState(nextData){
        this.data = nextData;
        this.serachResult.setState(nextData);
        // LS에 검색 결과 데이터를 저장(this.data.data)
        if(this.data.data) localStorage.setItem('data', JSON.stringify(this.data.data));
    }

    // render() {}
}