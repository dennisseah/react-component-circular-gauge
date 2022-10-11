import "./App.css";
import CircularGauge from "./dcomponents/CircularGauge";

function App() {
    return (
        <div className="App">
            <div style={{ display: "flex" }}>
                <CircularGauge
                    gaugeId="gauge1"
                    percentage={30}
                    color="#C14646"
                />
                <CircularGauge
                    gaugeId="gauge2"
                    percentage={60}
                    color="#E09D00"
                />
                <CircularGauge
                    gaugeId="gauge3"
                    percentage={80}
                    color="#1A9898"
                />
            </div>
        </div>
    );
}

export default App;
