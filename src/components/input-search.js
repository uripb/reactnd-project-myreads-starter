import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WAIT_INTERVAL, ENTER_KEY } from '../constants';

class InputSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
        }
    }

    componentWillMount() {
        this.timer = null;
    }

    handleChange = value => {
        clearTimeout(this.timer);
        this.setState({ value });
        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    };

    handleKeyDown = e => {
        if (e.keyCode === ENTER_KEY) {
            this.triggerChange();
        }
    };

    triggerChange = () => {
        const { value } = this.state;
        this.props.onChange(value);
    };

    render() {
        const { placeholder } = this.props;
        const { value } = this.state;

        return (
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => this.handleChange(e.target.value)}
                onKeyDown={this.handleKeyDown}
            />
        );
    }
}

InputSearch.defaultProps = {
    value: '',
    placeholder: '',
}

InputSearch.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default InputSearch;