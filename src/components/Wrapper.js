import "./Wrapper.css"

export const Wrapper = ({children}) => (
    <div style={{padding: '50px', backgroundColor: '#AAAAAA'}}>
        <div className='wrapper'>{children}</div>
    </div>
);

export default Wrapper;