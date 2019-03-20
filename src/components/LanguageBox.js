import React from 'react';

class LanguageBox extends React.Component {
        
    render() {
        const { name, color } = this.props;
        return <span className='language-display' style={{color: color}}>{name}</span>
    }
}

export default LanguageBox;