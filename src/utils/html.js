import ReactDom from 'react-dom';

class HtmlHelper {
    
    static query(selector) {
        return $(selector);
    }
    
    static getElementRectagle(selector) {
        let ele = $(selector)[0];
        if (!ele) return null;
        let rect = ele.getBoundingClientRect();
        return rect;
    }
    
    static queryByComponent(component) {
        return $(ReactDom.findDOMNode(component));
    }

    static getPageFullWidth() {
        let width = 
            document.body.offsetWidth || document.documentElement.offsetWidth ||
            document.body.scrollWidth || document.documentElement.scrollWidth ||
            document.body.clientWidth || document.documentElement.clientWidth;
        return width || 0;
    }
    
    static getPageFullHeight() {
        let height = 
            document.body.offsetHeight || document.documentElement.offsetHeight ||
            document.body.scrollHeight || document.documentElement.scrollHeight ||
            document.body.clientHeight || document.documentElement.clientHeight;
        return height || 0;
    }
}

export default HtmlHelper;

