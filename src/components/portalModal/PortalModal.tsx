import { useEffect } from 'react'
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('root-dialog');
const PortalModal: React.FC = props => {
    const el = document.createElement('div');

    useEffect(() => {
        
        modalRoot?.appendChild(el)
        return () => {
            modalRoot?.removeChild(el)
        }
    }, [el])

    return ReactDOM.createPortal(
        props.children,
        el
    );
}

export default PortalModal

