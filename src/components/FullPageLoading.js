import React from "react";
import { Spin } from 'antd';

const s = require('./FullPageLoading.scss');

const FullPageLoading = ({ props, state }) => (
    <div className={s.page}>
        <Spin size="large" className={s.spin} />
    </div>
)

export default FullPageLoading;