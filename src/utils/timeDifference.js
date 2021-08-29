import moment from 'moment';

export default function timedifference(timestamp1, timestamp2) {
  const date1 = moment(timestamp1);
  const date2 = moment(timestamp2);
  const difference = moment.duration(date1.diff(date2));

  return difference;
}
