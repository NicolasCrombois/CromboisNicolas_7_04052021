import { createStore } from 'vuex';

const store = createStore({
    state: {
        comment: [],
        publications: [],
        infoUserComment: [],
        users: [],
    },
    mutations: {
        setPublicationsGlobal(state, newPublications){
            state.publications = newPublications;
        }
    }
})

export default store