const toeicexam = {
    namespaced: true,
    state: () => ({
        headerTitle: "TOEICExamOnline.pg"
    }),
    mutations: {
        setHeaderTitle( state , val) {
            try {
                state.headerTitle = val;
            } catch (e) {
                console.log(e);
            }
        }
    },
    actions: {},
    getters: {
        getHeaderTitle: state => {
            return state.headerTitle;
        }
    }
}
export default toeicexam;
