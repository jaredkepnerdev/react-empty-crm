
const defaultState = {
    leftSideMenuCollapsed: false
};

export default class UIAction {
    type = "ui";
    getDefaultStorage() {
        const initialState = {
            ...defaultState,
        }
        return initialState;
    }

    leftSideMenuCollapse(flag) {
        this.update("leftSideMenuCollapsed", flag);
    }
}