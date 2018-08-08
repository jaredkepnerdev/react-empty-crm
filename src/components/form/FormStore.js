

const dummyState = {};

class FormStore {
    constructor(component, data, validation) {
        this.data = data || {};
        this.originalData = JSON.parse(JSON.stringify(this.data));
        this.validation = validation || {};
        this.errors = {};
        this.originalErrors = JSON.parse(JSON.stringify(this.errors));
        this.component = component;
    }

    reset() {
        this.data = this.originalData || {};
        this.errors = this.originalErrors || {};
        this.render();
    }

    render(callBack) {
        this.component.setState(dummyState, () => {
            callBack && callBack();
        });
    }

    getFieldValue(name) {
        if (!name) return null;
        return this.data[name];
    }

    update(name, value, callBack) {
        const changed = {};
        changed[name] = value;
        this.data = Object.assign({}, this.data, changed);
        this.render(callBack);
    }
    
    validate(name, err) {
        const changed = {};
        changed[name] = err;
        this.errors = Object.assign({}, this.errors, changed);
        this.render();
    }

    toJSON() {
        return {
            data: Object.assign({}, this.data),
            errors: Object.assign({}, this.errors)
        };
    }
}

export default FormStore;