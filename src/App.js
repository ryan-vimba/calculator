// import logo from './logo.svg';
import './App.css';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import Branding from './components/Branding';
import SolarPanel from './components/SolarPanel';
import ButtonBox from './components/ButtonBox';

const buttonValuesLeft = [
  ['+/-', '√', '%'],
  ['MRC', 'M-', 'M+'],
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['ON/C', '0', '.']
];

const buttonValuesRight = [
  ['÷'], 
  ['x'], 
  ['-'], 
  ['+'], 
  ['=']
];

function App() {
  return (
    <Wrapper>
      <Screen value={0}/>
      <Branding/>
      <SolarPanel/>
      <ButtonBox className="buttonBox left" buttonValues={buttonValuesLeft}/>
      <ButtonBox className="buttonBox right" buttonValues={buttonValuesRight}/>
    </Wrapper>
  );
}

export default App;
