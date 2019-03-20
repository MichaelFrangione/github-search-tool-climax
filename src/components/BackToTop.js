import React from 'react';
import _throttle from 'lodash/throttle';
import octocatArm from '../images/Octocat-arm.png';

class BackToTop extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            shouldShow: false
        }

        this.onScroll = _throttle(this.onScroll.bind(this), 200);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll() {
        let shouldShow = false;

        if (window.scrollY > 300) {
            shouldShow = true; 
        }
        this.setState({ shouldShow });
    }

    scrollToTop(){
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        });
    }

    render() {
        const { shouldShow } = this.state;
        return (
            <div className={`back-to-top-container ${shouldShow ? 'show' : '' }`}>
                <h3 onClick={() => { this.scrollToTop() } }>Back To Top</h3>
                <img src={octocatArm} alt="Back to Top"/>
            </div>
        )
    }
}
  
export default BackToTop;