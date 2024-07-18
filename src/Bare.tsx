import './App.css'

function Bare({ value, valueMax, name }: { value: number; valueMax: number; name: string }) {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <p style={{marginRight: '10px'}}><strong>{name}</strong></p>
            <div style={{ width: '200px', backgroundColor: 'red', height: '50px' }}>
                <div style={{ width: `${(value * 200) / valueMax}px`, backgroundColor: 'green', height: '100%' }} />
            </div>
        </div>
    );
}

export default Bare;