import React from 'react';

const s = require('./PageFooter.scss');

const PageFooter = (props, state) => (
    <div className={s.footer}>
        { props.children }
    </div>
)

export default PageFooter;