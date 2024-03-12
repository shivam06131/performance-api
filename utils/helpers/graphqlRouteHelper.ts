import axios from 'axios';
import { PerformaceData } from '../types/genericTypes';
import { performance } from 'perf_hooks';
import logger from './logger';

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });

export const evaluateApiPerformance = async (virtualUsers: number, graphqlQuery: string): Promise<PerformaceData> => {
  try {
    logger.info(`evaluateApiPerformance started.`);
    const responseTimes: number[] = [];

    const globalStart: number = performance.now();
    for (let i = 0; i < virtualUsers; i++) {
      const start: number = performance.now();
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.GRAPHQL_ENDPOINT,
        headers: {
          // 'WM_CONSUMER.ID': '',
          // 'WM_SVC.NAME': 'PEOPLE-API-GATEWAY',
          // 'WM_SVC.ENV': 'stg:1.0.0',
          // 'WM_SEC.KEY_VERSION': '1',
          // 'Content-Type': 'application/json',
          // 'WM_CONSUMER.INTIMESTAMP': '',
          // 'REQUEST_SOURCE': 'API_PROXY'
        },
      };

      await axios.post(config.url, { query: graphqlQuery }, config);

      const end: number = performance.now();
      // const responseTime = (end - start) / 1000; // Convert to seconds
      const responseTime: number = end - start;
      responseTimes.push(responseTime);
    }
    const globalEnd: number = performance.now();
    const globalTotalTimeTaken: number = globalEnd - globalStart;
    const sortedResponseTimes: number[] = responseTimes.sort((a, b) => a - b);

    // Calculate Average, Min & Max time.
    const averageTime: number = responseTimes.reduce((sum, time) => sum + time, 0) / virtualUsers;
    const minTime: number = Math.min(...responseTimes);
    const maxTime: number = Math.max(...responseTimes);

    // Calculate requests per second
    const totalTimeInSeconds: number = responseTimes.reduce((sum, time) => sum + time, 0) / 1000;
    const requestPerSecond: number = virtualUsers / totalTimeInSeconds;

    // Calculate the 90th percentile
    const percentileIndex: number = Math.floor(0.9 * virtualUsers);
    const ninetyPercentile: number = sortedResponseTimes[percentileIndex];

    // Calculate the 95th percentile
    const percentileIndex95: number = Math.floor(0.95 * virtualUsers);
    const ninetyFifthPercentile: number = sortedResponseTimes[percentileIndex95];

    logger.info(`evaluateApiPerformance success.`);

    return {
      averageTime: Number(averageTime.toFixed(2)),
      minTime: Number(minTime.toFixed(2)),
      maxTime: Number(maxTime.toFixed(2)),
      requestPerSecond: Number(requestPerSecond.toFixed(2)),
      totoalVirtualUsers: virtualUsers,
      ninetyPercentile: Number(ninetyPercentile.toFixed(2)),
      ninetyFifthPercentile: Number(ninetyFifthPercentile.toFixed(2)),
      totalTimeTaken: Number(globalTotalTimeTaken.toFixed(2)),
    };
  } catch (error) {
    logger.error(`Error in evaluateApiPerformance : ${JSON.stringify(error?.stack)}`);
    throw new Error(error);
  }
};
