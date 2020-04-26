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
        })

    }

    setState(nextData){
        this.data = nextData;
        console.log(this.data);
    }

    // render() {}
}