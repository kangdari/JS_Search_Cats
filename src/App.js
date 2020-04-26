console.log('App is running!!!')

class App{
    data = [];
    $app = null;

    constructor($app){
        this.$app = $app;

        this.searchInput = new SearchInput({
            $app,
            onSearch: (keyword) => {
                api.fetchCats(keyword).then(({data}) => this.setState(data));
            }
        }),

        this.serachResult = new SearchResult({
            $app,
            initialData : this.data,
            onClick: (id) => {
                api.fetchCat(id).then(({data}) => console.log(data))
            }
        })
    }

    setState(nextData){
        this.data = nextData;
        this.serachResult.setState(nextData);
    }

    // render() {}
}