import React from 'react';
import { Row, Col, Button } from "antd";
import BasePage from './BasePage';
import DataList from '../../components/DataList';
import SearchBar from '../../components/SearchBar';

const gs = require('../../App.scss');

export default class BaseTablePage extends BasePage {

    constructor(props) {
        super(props);

        let params = this.readLinkParams();

        this.state = {
            result: {
                list: [],
                total: 0,
            },
            option: {
                page: (params.page || 1) - 1,
                pageSize: params.pageSize || 10,
                keyword: String(params.keyword || '')
            },
            keyword: String(params.keyword || ''),
            loading: true
        };

        this._onChangePage = this.onChangePage.bind(this);
    }

    getCommonTableProps() {
        const { option, result } = this.state;
        return {
            loading: this.state.loading,
            emptyRows: option.pageSize,
            pagination: {
                total: result.total,
                current: option.page + 1,
                pageSize: option.pageSize,
                onChange: this.onChangePage.bind(this),
            },
            bordered: true,
            size: 'middle',
            onSelectChange: this.onSelectChange.bind(this),
        };
    }

    getTableProps() {
        return { };
    }

    callSearchAPI() {
        throw new Error('callSearchAPI method should be overrided.');
    }

    processSearchResult(res) {
        return res;
    }

    doSearch(refresh) {
        this.setState({
            loading: true,
        }, async () => {
            let option = this.state.option || {};
            let keyword = this.state.keyword || '';
            let page = option.page || 0;
            if (refresh) {
                page = 0;
                option.page = page;
            }
            try {
                let pagination = {
                    index: page,
                    num: option.pageSize,
                };
                let res = this.processSearchResult(await this.callSearchAPI({ pagination, keyword }));
                let result = {
                    list: res.list || [],
                    total: res.total || 0,
                };
                option.keyword = keyword || '';
                this.updatePageLink({
                    ...option,
                    page: option.page + 1,
                }, {
                    result,
                    option,
                    loading: false
                });
            } catch (err) {
                console.error(err);
                this.setState({
                    option,
                    loading: false
                });
            }
        });
    }

    onChangePage(page, pageSize) {
        let option = this.state.option;
        option.page = page - 1;
        option.pageSize = pageSize;
        this.setState({
            option: option
        }, () => {
            this.doSearch();
        });
    }

    onSelectChange(selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys);
        console.log(selectedRows);
    }

    renderTable() {
        const commonProps = this.getCommonTableProps();
        const tableProps = this.getTableProps();
        const { result } = this.state;
        return (
            <Row className={gs.block} key="table">
                <Col span={24}>
                    <DataList ref="table" 
                                {...tableProps}
                                {...commonProps} 
                                data={result.list}
                        />
                </Col>
            </Row>
        );
    }

    renderToolBarButtons() {
        return (
            <Col span={24}>
                <Button type="primary" icon="plus" size={'default'}>New</Button>
            </Col>
        );
    }

    renderToolBar() {
         return (
             <Row className={gs.block} key="toolbar">
                <Col span={14}>
                {
                    this.renderToolBarButtons()
                }
                </Col>
                 <Col span={10}>
                    <SearchBar placeholder={'按关键字搜索'} enterButton value={this.state.keyword}
                        onChange={ value => {
                            this.setState({ keyword: value });
                        } }
                        onSearch={ value => {
                            this.setState({ keyword: value }, () => {
                                this.doSearch(true);
                            });
                        } } />
                 </Col>
             </Row>
         );
    }

    render() {
        return (
            <div>
            {
                this.renderToolBar()
            }
            {
                this.renderTable()
            }
            </div>
        );
    }
}