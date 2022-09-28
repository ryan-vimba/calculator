import './ButtonBox.css';
import Button from './Button';

const whiteButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

const buttonPlacement = (buttonValues, buttonHandler) => (
    buttonValues.flat().map((btn, i) => {
        return (
        <Button 
            key={i} 
            className={btn in whiteButtons ? 'white-button' : 'red-button'}
            value={btn}
            onClick={buttonHandler}/>
        );
    })
);

export const ButtonBox = ({className, buttonValues, buttonHandler}) => {
    var children = buttonPlacement(buttonValues, buttonHandler);
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default ButtonBox;