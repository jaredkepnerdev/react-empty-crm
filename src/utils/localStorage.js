
export const loadState = (key) => {
    try {
        const state = localStorage.getItem('state.' + key);
        try {
            return JSON.parse(state);
        } catch (err) {
            return state;
        }
    } catch (err) {
        return null;
    }
}

export const saveState = (key, state) => {
    try {
        if (state === undefined || state === null) {
            return localStorage.removeItem('state.' + key);
        }
        const plain = typeof state === "object" ? JSON.stringify(state) : state;
        localStorage.setItem('state.' + key, plain);
        console.log(`state[${key}] is saved into local storage`);
    } catch (err) {
        console.error(err);
    }
}