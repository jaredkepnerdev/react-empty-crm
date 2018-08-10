import React from "react";
import { Spin } from 'antd';

const s = require('./SubPageLoading.scss');

const SubPageLoading = ({ props, state }) => (
    <div className={s.page}>
        <Spin size="large" className={s.spin} />
    </div>
)

export default SubPageLoading;