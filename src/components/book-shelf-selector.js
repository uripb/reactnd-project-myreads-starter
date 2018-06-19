import React from 'react';
import PropTypes from 'prop-types';
import { BOOK_SHELF } from '../constants';

const BookShelfSelector = (props) => {
    const { value, onChange } = props;
    const shelfKeys = BOOK_SHELF.map(item => item.key);
    const shelfVal = shelfKeys.includes(value) ? value : 'none';

    return (
        <div className="book-shelf-changer">
            <select
                value={shelfVal}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="move" disabled>Move to...</option>
                {BOOK_SHELF.map(shelf => (
                    <option
                        key={shelf.key}
                        value={shelf.key}>
                        {shelf.name}
                    </option>
                ))}
                <option value="none">None</option>
            </select>
        </div>
    );
}

BookShelfSelector.defaultProps = {
    value: '',
}

BookShelfSelector.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default BookShelfSelector;