import './Button.css';

export const Button = ({className, value, onClick}) => (
    <button className={className} onClick={onClick}>
        {value}
    </button>
);

export default Button;