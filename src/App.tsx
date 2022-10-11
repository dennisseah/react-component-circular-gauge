import React from "react";
import "./App.css";
import CircularGauge from "./dcomponents/CircularGauge";

class App extends React.Component {
    state = {
        val: 30,
    };
    render() {
        return (
            <div className="App">
                <button
                    onClick={() => {
                        this.setState({ val: 60 });
                    }}
                >
                    Test
                </button>
                <div style={{ display: "flex" }}>
                    <CircularGauge
                        gaugeId="gauge1"
                        percentage={this.state.val}
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
}

export default App;
