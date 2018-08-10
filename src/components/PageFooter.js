import React from 'react';
import classnames from 'classnames';

const s = require('./PageFooter.scss');

const PageFooter = (props, state) => (
    <div className={classnames(s.footer, props.className)}>
        { props.children }
    </div>
)

export default PageFooter;