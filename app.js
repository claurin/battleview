document.addEventListener("DOMContentLoaded", () => {
    const app = new Vue({
        el: '#app',
        data: { 
            header: 'Battle View', 
            characters: [],
            selectedIndex: -1,
            activeTabName: 'desc'
        },
        computed: {
            character() { return this.characters[this.selectedIndex]; }
        },
        methods: {
            load: async () => {
                const sortAsc = (c1,c2) => (c1.name < c2.name ? -1 : c1.name > c2.name ? 1 : 0);
                const chars = account.realmCharacters;
                const fields = bnet.fieldsProf;

                app.characters = [];
                app.selectedIndex = -1;
                
                app.characters = (await bnet.getCharacters(chars,fields)).sort(sortAsc);
            }
        }
    });
});