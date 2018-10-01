import React, { PureComponent } from 'react';
import socketIOClient from 'socket.io-client'
import Chart from 'chart.js';

import {
  Row,
  Column,
  Container,
} from '@Styled/Responsive';

import {
  createChartData,
} from './Home.utils';



class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this._chart = null;

    this.onDatapoints = this.onDatapoints.bind(this);
    this.onNewDatapoints = this.onNewDatapoints.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }
  componentDidMount() {
    const socket = socketIOClient('http://localhost:4004');

    socket.on('datapoints', this.onDatapoints);
    socket.on('newDatapoints', this.onNewDatapoints);
  }

  updateChart(datapoints) {
    if (this._chart) {
      console.log('update chart');
      this._chart.data.datasets.forEach((dataset, index) => {
        if (dataset.label === datapoints.user.username) {
          dataset.data.push({ x: datapoints.x, y: datapoints.y });
          console.log('got label');
        }
      });
      this._chart.update();
    } else {
      const chartData = createChartData(datapoints);
      console.log('create chart');
      this._chart = new Chart(this.canvasRef.current, chartData);
    }
  }
  onDatapoints(datapoints) {
    console.log('got datapoints');
    this.updateChart(JSON.parse(datapoints));
  }
  onNewDatapoints(newDatapoint) {
    console.log('got new datapoints');
    this.updateChart(JSON.parse(newDatapoint));
  }

  render() {
    return (
      <Container>
        <Row wrap="wrap" mb={4}>
          <Column>
            <canvas ref={this.canvasRef}/>
          </Column>
        </Row>


      </Container>
    );
  }
}
export default Home;
