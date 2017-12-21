import Triangle from '../util/triangle';
import { Side } from '../util/interfaces';
import * as React from 'react';

interface State {
    triangle: string;
}

export default class App extends React.Component<{}, State> { 
    constructor(props: {}) {
        super(props);
        this.state = { triangle: '' };
    }

    public handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const sides = this.parseInput(event.target.value);
        if (sides.length !== 3 || isNaN(sides[sides.length - 1])) { return; }
        let valid = true;
        sides.forEach(side => {
            if (typeof side !== 'number') {
                valid = false;
            }
        });
        if (valid) {
            const args: Side[] = sides.map(side => {
                return {length: side};
            });
            try {
                const t = new Triangle(args);
                this.setState({triangle: t.getShapeType().split(':')[1]});
            } catch (err) {
                this.setState({triangle: 'Not a triangle'});
            }
        }
    }

    public render() {
        return (
            <div className="app">
                <div>
                    <h4>Input a comma separated list of side values</h4>
                    <input 
                        className="input" 
                        onChange={e => this.handleOnChange(e)}
                    />
                </div>
                <div>
                    Triangle Type: {this.state.triangle}
                </div>
            </div>
        );
    }
    
    private parseInput(str: string): number[] {
        return str.split(',')
        .map(s => s.trim())
        .map(s => parseInt(s, 10));
    }
}