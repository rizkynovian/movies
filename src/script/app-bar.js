class AppBar extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render() {
        this.innerHTML = `<nav class="navbar bg-primary">
                            <h1 class="navbar-brand mb-0 title">Movies Search</h1>
                            </nav>`;
    }
}

customElements.define("app-bar", AppBar);