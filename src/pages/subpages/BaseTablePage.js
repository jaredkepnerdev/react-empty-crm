import React from 'react';
import BasePage from './BasePage';
import DataList from '../../components/DataList';

export default class BaseTablePage extends BasePage {

    constructor(props) {
        super(props);

        let params = this.readLinkParams();

        this.state = {
            result: {
                list: []
            },
            option: {
                curPage: params.curPage || 0,
                perPage: params.perPage || 10,
                keyword: String(params.keyword || '')
            },
            keyword: String(params.keyword || ''),
            loading: true
        };

        this._onChangePage = this.onChangePage.bind(this);
    }

    getCommonTableProps() {
        return {
            loading: this.state.loading
        };
    }

    getTableProps() {
        return {};
    }

    callSearchAPI() {
        throw new Error('callSearchAPI method should be overrided.');
    }

    processSearchResult(res) {
        return res;
    }

    async doSearch(refresh) {
        let option = this.state.option || {};
        let keyword = this.state.keyword || '';
        let curPage = option.curPage || 0;
        if (refresh) {
            curPage = 0;
            option.curPage = curPage;
        }
        let perPage = option.perPage || 10;
        try {
            let res = this.processSearchResult(await this.callSearchAPI({ ...option, keyword }));
            let result = {
                list: res.list || [],
                total: res.total || 0,
            };
            option.keyword = keyword || '';
            this.updatePageLink(option, {
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
    }

    onChangePage(page) {
        let option = this.state.option;
        option.curPage = page - 1;
        this.setState({
            option: option
        }, () => {
            this.doSearch();
        });
    }

    renderTable() {
        const tableProps = this.getTableProps();
        const { result } = this.state;
        return <DataList ref="table" {...tableProps} 
                        data={result.list}
                />;
    }

    render() {
        return (
            <div>
                {
                    this.renderTable()
                }
            </div>
        );
    }
}