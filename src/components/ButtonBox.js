import './ButtonBox.css';
import Button from './Button';

const whiteButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

const buttonPlacement = (buttonValues) => (
    buttonValues.flat().map((btn, i) => {
        return (
        <Button 
            key={i} 
            className={btn in whiteButtons ? 'white-button' : 'red-button'}
            value={btn}
            onClick={() => console.log(`${btn} clicked!`)}/>
        );
    })
);

export const ButtonBox = ({className, buttonValues}) => {
    var children = buttonPlacement(buttonValues);
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default ButtonBox;