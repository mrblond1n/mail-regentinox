import * as moment from 'moment';
import 'moment/locale/ru';

export const getFormattedDate = (date, format = 'L') =>
    date && moment(date).isValid() ? moment(date).format(format) : '';
