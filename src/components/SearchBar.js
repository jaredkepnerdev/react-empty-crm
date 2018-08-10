import React from 'react';
import { Input } from 'antd';

const Search = Input.Search;

const SearchBar = (props, state) => (
    <Search
        value={props.value}
        placeholder={props.placeholder}
        onChange={ (e) => {
            props.onChange && props.onChange(e.target.value);
        }}
        onSearch={props.onSearch}
        enterButton={props.enterButton}
        />
);

export default SearchBar;